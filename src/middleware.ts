import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Skip middleware if Supabase credentials are not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase credentials not configured, skipping auth middleware");
    return NextResponse.next();
  }

  try {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);

    let response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protect admin routes (except login page)
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!user && !request.nextUrl.pathname.startsWith("/admin/login")) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      if (user && request.nextUrl.pathname.startsWith("/admin/login")) {
        // Redirect to dashboard if already logged in
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's an error, just let the request through
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Only match admin routes
     */
    "/admin/:path*",
  ],
};
