import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Temporary: Disable Clerk middleware to fix deployment
// TODO: Investigate Clerk compatibility with Next.js 15.5.2
export function middleware(request: NextRequest) {
  // Block access to admin routes temporarily
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ],
};
