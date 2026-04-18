import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const country = geolocation(request)?.country || "UNKNOWN";
  if (country !== "SA") {
    return NextResponse.redirect(new URL("/not-available", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!not-available|_next/static|_next/image|favicon.ico).*)"],
};
