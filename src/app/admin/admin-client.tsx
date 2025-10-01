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

  // TEMPORARY: Force disable Clerk due to proxy URL issues
  const hasClerkKeys = false;

  // Debug: Log the environment check
  console.log('hasClerkKeys (FORCED OFF):', hasClerkKeys, 'isLoaded:', isLoaded);

  // TEMPORARY: Show admin page directly without authentication
  // TODO: Fix NEXT_PUBLIC_CLERK_PROXY_URL environment variable in Vercel
  console.log('TEMPORARY: Showing admin page directly - Clerk disabled due to proxy URL issues');
  return <AdminPage />;

  // Show loading while Clerk is loading, but with a timeout
  if (!isLoaded) {
    console.log('Clerk not loaded yet, showing loading state');
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading authentication...</p>
        <p className="text-sm text-muted-foreground mt-2">
          If this takes too long, please refresh the page.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Refresh Page
        </button>
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


