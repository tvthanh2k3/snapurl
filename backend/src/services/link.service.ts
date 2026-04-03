import { nanoid } from 'nanoid';
import prisma from '../utils/db';

export const createShortLink = async (originalUrl: string) => {
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      const shortCode = nanoid(6);
      const link = await prisma.link.create({
        data: {
          originalUrl,
          shortCode,
        },
      });
      return link;
    } catch (error: any) {
      if (error.code === 'P2002') {
        attempts++;
        continue;
      }
      throw error;
    }
  }

  throw new Error('Không thể tạo mã rút gọn duy nhất sau nhiều lần thử');
};

export const getLinkByShortCode = async (shortCode: string) => {
  return prisma.link.findUnique({
    where: { shortCode }
  });
};

export const recordClick = async (linkId: string, ipAddress?: string, userAgent?: string) => {
  await prisma.$transaction([
    prisma.link.update({
      where: { id: linkId },
      data: { clicks: { increment: 1 } }
    }),
    prisma.click.create({
      data: {
        linkId,
        ipAddress: ipAddress ?? null,
        userAgent: userAgent ?? null
      }
    })
  ]);
};

export const getAnalytics = async (shortCode: string) => {
  const link = await prisma.link.findUnique({
    where: { shortCode },
    include: {
      ClickEvents: {
        orderBy: { clickedAt: 'desc' },
        take: 100
      }
    }
  });

  return link;
};
