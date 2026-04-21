import { NextResponse } from "next/server";
import { geolocation, ipAddress } from "@vercel/functions";
import type { NextRequest } from "next/server";
const blockedIPs = ["1.1.1.1", "2.2.2.2"];

const blockedAgents = ["bot", "crawler", "spider", "curl", "wget", "python"];

export function proxy(request: NextRequest) {
  const ip = ipAddress(request) || "unknown";

  if (blockedIPs.includes(ip)) {
    console.log("Blocked IP:", ip);
    return new NextResponse("Access Denied", { status: 403 });
  }
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  if (!userAgent) {
    return new NextResponse("No User-Agent", { status: 403 });
  }

  const isBot = blockedAgents.some((agent) => userAgent.includes(agent));

  if (isBot) {
    console.log("Blocked Bot:", userAgent);
    return new NextResponse("Bot Detected", { status: 403 });
  }

  const country = geolocation(request)?.country || "UNKNOWN";
  if (country !== "SA") {
    return NextResponse.redirect(new URL("/outside-saudi", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!outside-saudi|_next/static|_next/image|favicon.ico).*)"],
};
