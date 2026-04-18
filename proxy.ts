import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "UNKNOWN";
  if (country !== "SA") {
    return NextResponse.redirect(new URL("/not-available", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
