import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectdRoutes = ["/dashboard", "/posts/create"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtected =
    protectdRoutes.includes(path) || path.startWith("/posts/edit/");
  const isPublic = publicRoutes.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/statc|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
