import { Request, Response, NextFunction } from 'express';
import * as linkService from '../services/link.service';

export const createLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { originalUrl } = req.body;
    const link = await linkService.createShortLink(originalUrl);

    const baseUrl = req.protocol + '://' + req.get('host');

    res.status(201).json({
      id: link.id,
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
      shortUrl: `${baseUrl}/${link.shortCode}`,
      createdAt: link.createdAt
    });
  } catch (error) {
    next(error);
  }
};

import cache from '../utils/cache';

export const redirectLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawShortCode = req.params.shortCode;
    const shortCode = Array.isArray(rawShortCode) ? rawShortCode[0] : rawShortCode;

    let cachedLink = cache.get<{ id: string, originalUrl: string }>(shortCode as string);

    if (!cachedLink) {
      const link = await linkService.getLinkByShortCode(shortCode as string);

      if (!link) {
        return res.status(404).json({ message: 'Không tìm thấy đường dẫn' });
      }

      cachedLink = { id: link.id, originalUrl: link.originalUrl };
      cache.set(shortCode as string, cachedLink);
    }

    const rawIp = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
    const ip = Array.isArray(rawIp) ? rawIp[0] : rawIp;

    const rawUserAgent = req.headers['user-agent'] || req.get('user-agent');
    const userAgent = Array.isArray(rawUserAgent) ? rawUserAgent[0] : rawUserAgent;

    linkService.recordClick(cachedLink.id, ip as string | undefined, userAgent as string | undefined).catch(err => {
      console.error('Error recording click:', err);
    });

    res.redirect(302, cachedLink.originalUrl);
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawShortCode = req.params.shortCode;
    const shortCode = Array.isArray(rawShortCode) ? rawShortCode[0] : rawShortCode;
    const link = await linkService.getAnalytics(shortCode as string);

    if (!link) {
      return res.status(404).json({ message: 'Không tìm thấy đường dẫn' });
    }

    res.status(200).json({
      shortCode: link.shortCode,
      originalUrl: link.originalUrl,
      totalClicks: link.clicks,
      createdAt: link.createdAt,
      recentClicks: link.ClickEvents
    });
  } catch (error) {
    next(error);
  }
};
