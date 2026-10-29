import { BadRequestException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { UPLOADS_DIR } from '../app.setup.js';

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Detects the real image type from magic bytes; the client's mimetype is not trusted. */
function sniffImage(buf: Buffer): 'jpg' | 'png' | 'webp' | 'gif' | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (buf.toString('ascii', 0, 4) === 'GIF8') return 'gif';
  return null;
}

/** Saves an uploaded product image and returns its public path. */
export async function saveProductImage(file: Express.Multer.File | undefined) {
  if (!file) throw new BadRequestException('Choose an image to upload.');
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new BadRequestException('Images must be 5 MB or smaller.');
  }
  const ext = sniffImage(file.buffer);
  if (!ext) throw new BadRequestException('Only JPG, PNG, WebP or GIF images are allowed.');

  const dir = join(UPLOADS_DIR, 'products');
  await mkdir(dir, { recursive: true });
  const name = `${Date.now().toString(36)}-${randomBytes(6).toString('hex')}.${ext}`;
  await writeFile(join(dir, name), file.buffer);
  return { url: `/uploads/products/${name}` };
}
