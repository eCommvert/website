import { NextResponse } from 'next/server';

// Temporarily disable Clerk middleware to fix site-wide 500s
// We'll re-enable it once Clerk is properly configured
export default function middleware() {
  return NextResponse.next();
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ],
};
