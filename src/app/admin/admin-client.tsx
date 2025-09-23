"use client";

import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import AdminPage from "./admin-page";

const OWNER_EMAILS = (process.env.NEXT_PUBLIC_OWNER_EMAILS || "")
  .split(",")
  .map((v) => v.trim())
  .filter(Boolean);

export default function AdminClient() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const isAllowed = OWNER_EMAILS.length === 0 || OWNER_EMAILS.includes(email);

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


