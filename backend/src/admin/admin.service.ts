import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { pageResult, paginate } from '../common/utils/pagination.js';
import type { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { LOW_STOCK } from './admin-catalog.service.js';
import type {
  AdminCustomerQuery,
  AdminInquiryQuery,
  AdminUpdateCustomerDto,
} from './dto/admin.dto.js';

/** Dashboard, customers and inquiries. */
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async stats() {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [
      byStatus,
      paid30,
      paidAll,
      customers,
      newInquiries,
      lowStock,
      recentOrders,
      productCount,
    ] = await Promise.all([
      this.prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
      this.prisma.order.aggregate({
        where: { paymentStatus: 'PAID', paidAt: { gte: since } },
        _sum: { totalCents: true },
        _count: { _all: true },
      }),
      this.prisma.order.aggregate({
        where: { paymentStatus: 'PAID' },
        _sum: { totalCents: true },
      }),
      this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
      this.prisma.inquiry.count({ where: { status: 'NEW' } }),
      this.prisma.product.findMany({
        where: { isActive: true, isQuoteOnly: false, stock: { lte: LOW_STOCK } },
        orderBy: { stock: 'asc' },
        take: 8,
        select: { id: true, name: true, sku: true, stock: true },
      }),
      this.prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: {
          number: true,
          contactName: true,
          company: true,
          totalCents: true,
          status: true,
          paymentStatus: true,
          createdAt: true,
        },
      }),
      this.prisma.product.count({ where: { isActive: true } }),
    ]);

    const statusCounts = Object.fromEntries(byStatus.map((s) => [s.status, s._count._all]));
    const open = ['PLACED', 'PROCESSING', 'READY_FOR_PICKUP'].reduce(
      (n, s) => n + (statusCounts[s] ?? 0),
      0,
    );
    return {
      openOrders: open,
      statusCounts,
      revenue30dCents: paid30._sum.totalCents ?? 0,
      paidOrders30d: paid30._count._all,
      revenueAllTimeCents: paidAll._sum.totalCents ?? 0,
      customers,
      newInquiries,
      activeProducts: productCount,
      lowStock,
      recentOrders,
    };
  }

  // -------------------------------------------------------------- customers

  async customers(q: AdminCustomerQuery) {
    const { page, pageSize, skip, take } = paginate(q, 25);
    const term = q.q?.trim();
    const where: Prisma.UserWhereInput = term
      ? {
          OR: [
            { email: { contains: term } },
            { firstName: { contains: term } },
            { lastName: { contains: term } },
            { company: { contains: term } },
          ],
        }
      : {};
    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          company: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: { select: { orders: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);
    const spend = await this.prisma.order.groupBy({
      by: ['userId'],
      where: { userId: { in: users.map((u) => u.id) }, paymentStatus: 'PAID' },
      _sum: { totalCents: true },
    });
    const spendBy = new Map(spend.map((s) => [s.userId, s._sum.totalCents ?? 0]));
    const items = users.map(({ _count, ...u }) => ({
      ...u,
      orderCount: _count.orders,
      paidTotalCents: spendBy.get(u.id) ?? 0,
    }));
    return pageResult(items, total, page, pageSize);
  }

  async updateCustomer(me: AuthUser, id: string, dto: AdminUpdateCustomerDto) {
    if (id === me.id && (dto.isActive === false || dto.role === 'CUSTOMER')) {
      throw new BadRequestException('You cannot deactivate or demote your own account.');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Customer not found.');
    return this.prisma.user.update({
      where: { id },
      data: {
        ...dto,
        // Revoke sessions when access changes.
        ...(dto.isActive === false || (dto.role && dto.role !== user.role)
          ? { tokenVersion: { increment: 1 } }
          : {}),
      },
      select: { id: true, isActive: true, role: true },
    });
  }

  // -------------------------------------------------------------- inquiries

  async inquiries(q: AdminInquiryQuery) {
    const { page, pageSize, skip, take } = paginate(q, 25);
    const where: Prisma.InquiryWhereInput = q.status ? { status: q.status } : {};
    const [items, total] = await this.prisma.$transaction([
      this.prisma.inquiry.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.inquiry.count({ where }),
    ]);
    return pageResult(items, total, page, pageSize);
  }

  async updateInquiry(id: string, status: 'NEW' | 'IN_PROGRESS' | 'CLOSED') {
    const exists = await this.prisma.inquiry.findUnique({ where: { id }, select: { id: true } });
    if (!exists) throw new NotFoundException('Inquiry not found.');
    return this.prisma.inquiry.update({ where: { id }, data: { status } });
  }

  async deleteInquiry(id: string) {
    await this.prisma.inquiry.deleteMany({ where: { id } });
    return { ok: true };
  }
}
