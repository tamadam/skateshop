import { ROLES } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
    const session = await getToken({ req: request, secret });


    const { pathname } = request.nextUrl;

    if (session && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith("/admin") && session?.role !== ROLES.ADMIN) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}