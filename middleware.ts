import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// In local development without Clerk keys, make middleware a no-op to prevent blocking routes
const hasClerk = !!process.env.CLERK_SECRET_KEY;

export default hasClerk ? clerkMiddleware() : function middleware() {
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
