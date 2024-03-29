import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // token will exist if user is login
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // allow the request if the following is true...
  //1) its a request for next-auth session & provider fetching
  // 2) the token exist
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have token AND are requesting  a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
