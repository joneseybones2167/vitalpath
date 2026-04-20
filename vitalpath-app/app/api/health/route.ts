import { NextResponse } from "next/server";

/**
 * GET /api/health
 * Lightweight health-check endpoint. Useful for:
 *  - Cloudflare Pages deployment verification
 *  - Uptime monitoring
 *  - Confirming the Edge runtime is working
 *
 * Note: `runtime = "edge"` is required for API routes when deploying
 * via @cloudflare/next-on-pages — all routes must run on the Edge runtime.
 */
export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "vitalpath-portal",
    timestamp: new Date().toISOString(),
  });
}
