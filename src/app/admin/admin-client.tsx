"use client";

import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import AdminPage from "./admin-page";

export default function AdminClient() {
  const { user, isLoaded } = useUser();
  
  // Debug logging
  console.log('AdminClient - isLoaded:', isLoaded, 'user:', user);
  
  // Check if user has admin role in Clerk metadata (server-side verified)
  const isAllowed = user?.publicMetadata?.role === 'admin' || 
                   user?.publicMetadata?.admin === true ||
                   user?.publicMetadata?.owner === true;

  // Check if Clerk keys are available (runtime check for satellite mode)
  const hasClerkKeys = !!(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  );

  // If no Clerk keys, show admin page directly (for development)
  if (!hasClerkKeys) {
    return <AdminPage />;
  }

  // Show loading while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading authentication...</p>
        <p className="text-sm text-muted-foreground mt-2">
          If this takes too long, please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <div className="container mx-auto p-6 text-center">
          <p className="mb-4">Please sign in to access the admin dashboard.</p>
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
      <SignedIn>
        {isAllowed ? (
          <AdminPage />
        ) : (
          <div className="container mx-auto p-6 text-center">
            <p>You are signed in but not authorized to access this area.</p>
          </div>
        )}
      </SignedIn>
    </>
  );
}


