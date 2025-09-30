import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// In local development without Clerk keys, make middleware a no-op to prevent blocking routes
const hasClerk = !!process.env.CLERK_SECRET_KEY;
const debugMode = process.env.CLERK_DEBUG === 'true';

export default (hasClerk && !debugMode) ? clerkMiddleware() : function middleware() {
  return NextResponse.next();
};

export const config = {
  matcher: [
    // Only run Clerk middleware where it's actually needed to avoid site-wide failures
    '/admin(.*)',
    // Exclude diagnostic routes from Clerk middleware
    '/((?!api/_clerk-env|api/_health).*)'
  ],
};
