import { timingSafeEqual } from "node:crypto";
import type { Request } from "@google-cloud/functions-framework";
import { config } from "@/config";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length > 0 && bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function isAuthorized(req: Request): boolean {
  const [authType, token] = req.headers.authorization?.split(" ") ?? [];
  return authType === "Bearer" && !!token && safeEqual(token, config.server.secretKey);
}