import { z } from 'zod';

export const createLinkSchema = z.object({
  body: z.object({
    originalUrl: z.string().url('Định dạng URL không hợp lệ'),
  }),
});
