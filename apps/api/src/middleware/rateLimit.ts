import { Request, Response, NextFunction } from "express";

type RateLimitData = { count: number; resetTime: number };

const globalRateLimitMap =
  (globalThis as any).rateLimitMap || new Map<string, RateLimitData>();

(globalThis as any).rateLimitMap = globalRateLimitMap;

export const rateLimit = (maxRequests: number, windowMs: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || "unknown";
    const now = Date.now();

    for (const [ip, data] of globalRateLimitMap.entries()) {
      if (data.resetTime <= now) {
        globalRateLimitMap.delete(ip);
      }
    }

    const current = globalRateLimitMap.get(key);

    if (!current) {
      globalRateLimitMap.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (current.resetTime <= now) {
      current.count = 1;
      current.resetTime = now + windowMs;
      return next();
    }

    if (current.count >= maxRequests) {
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: Math.ceil((current.resetTime - now) / 1000),
      });
    }

    current.count++;
    next();
  };
};
