import { NextResponse } from "next/server";
import { ipAddress } from "@vercel/functions";
import type { NextRequest } from "next/server";
const blockedIPs = new Set<string>(["1.1.1.1", "2.2.2.2"]);

const allowedBots = [
  "googlebot",
  "bingbot",
  "duckduckbot",
  "yandexbot",
  "baiduspider",
];

const blockedAgents = ["bot", "crawler", "spider", "curl", "wget", "python"];

export function proxy(request: NextRequest) {
  const ip = ipAddress(request);
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

  if (!ip) {
    return NextResponse.next();
  }

  if (blockedIPs.has(ip)) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  const isBot = blockedAgents.some((agent) => userAgent.includes(agent));

  const isAllowedBot = allowedBots.some((bot) => userAgent.includes(bot));

  if (isBot && !isAllowedBot) {
    return new NextResponse("Bot Blocked", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
