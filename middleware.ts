import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.next();
    }
    const { role } = req.nextauth.token?.user as any;
    const validRoles = ["admin", "client"];

    if (!validRoles.includes(role)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/medics")) {
      const validRoles = ["admin"];
      if (!validRoles.includes(role)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (req.nextUrl.pathname.startsWith("/pacients")) {
      const validRoles = ["admin"];
      if (!validRoles.includes(role)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/cases/:path*",
    "/api/cases/:path*",
    "/profileuser/:path*",
    "/api/profileuser/:path*",
    "/medics/:path*",
    "/api/medics/:path*",
    "/pacients/:path*",
    "/api/pacients/:path*",
    "/search/:path*",
    "/api/search/:path*",
  ],
};
