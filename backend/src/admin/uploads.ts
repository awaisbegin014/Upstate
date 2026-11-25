import { BadRequestException } from '@nestjs/common';
import type { RequestHandler } from 'express';
import { randomBytes } from 'node:crypto';
import type { PrismaService } from '../prisma/prisma.service.js';

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const CONTENT_TYPES = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
} as const;

type ImageExt = keyof typeof CONTENT_TYPES;

/** Detects the real image type from magic bytes; the client's mimetype is not trusted. */
function sniffImage(buf: Buffer): ImageExt | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (buf.toString('ascii', 0, 4) === 'GIF8') return 'gif';
  return null;
}

/**
 * Saves an uploaded product image and returns its public path.
 *
 * Images are stored in the database rather than on disk: managed hosts
 * (Hostinger Node.js, Render) replace the app's files on every deploy, which
 * would silently delete anything written there.
 */
export async function saveProductImage(prisma: PrismaService, file: Express.Multer.File | undefined) {
  if (!file) throw new BadRequestException('Choose an image to upload.');
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new BadRequestException('Images must be 5 MB or smaller.');
  }
  const ext = sniffImage(file.buffer);
  if (!ext) throw new BadRequestException('Only JPG, PNG, WebP or GIF images are allowed.');

  const path = `products/${Date.now().toString(36)}-${randomBytes(6).toString('hex')}.${ext}`;
  await prisma.uploadedFile.create({
    data: { path, contentType: CONTENT_TYPES[ext], data: new Uint8Array(file.buffer) },
  });
  return { url: `/uploads/${path}` };
}

/** A path under /uploads as written by saveProductImage, e.g. "products/abc-123.jpg". */
const UPLOAD_PATH = /^[a-z]+\/[\w-]+\.(jpg|png|webp|gif)$/;

/**
 * Serves /uploads/* from the database. Paths are unique and never reused, so
 * responses can be cached for a year.
 */
export function serveUploads(prisma: PrismaService): RequestHandler {
  return (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const path = req.path.replace(/^\//, '');
    if (!UPLOAD_PATH.test(path)) {
      res.status(404).end();
      return;
    }
    prisma.uploadedFile
      .findUnique({ where: { path }, select: { contentType: true, data: true } })
      .then((file) => {
        if (!file) {
          res.status(404).end();
          return;
        }
        res.set({
          'Content-Type': file.contentType,
          'Content-Length': String(file.data.length),
          'Cache-Control': 'public, max-age=31536000, immutable',
        });
        if (req.method === 'HEAD') res.end();
        else res.end(Buffer.from(file.data));
      })
      .catch(next);
  };
}
