"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

type PageEntry = { route: string; filePath: string };

export default function AdminPages() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const allowed = (process.env.NEXT_PUBLIC_OWNER_EMAILS || "")
    .split(",")
    .map(v => v.trim())
    .filter(Boolean)
    .includes(email);

  const [pages, setPages] = useState<PageEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/pages", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setPages(json.pages || []);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <SignedOut>
        <div className="container mx-auto p-6 text-center">
          <p className="mb-4">Please sign in to access the admin dashboard.</p>
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
      <SignedIn>
        {!allowed ? (
          <div className="container mx-auto p-6 text-center">
            <p>You are signed in but not authorized to access this area.</p>
          </div>
        ) : (
          <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Site Pages</h1>
              <button
                className="text-sm px-3 py-1 rounded border hover:bg-accent"
                onClick={load}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time scan of <code className="px-1 rounded bg-muted">src/app</code> for <code className="px-1 rounded bg-muted">page.tsx</code> files (API excluded). Use Refresh after adding pages.
            </p>
            {error && (
              <div className="mb-4 text-sm text-red-500">{error}</div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Route</th>
                    <th className="py-2">File</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="py-6 text-muted-foreground">No pages detected.</td>
                    </tr>
                  ) : (
                    pages.map((p) => (
                      <tr key={p.filePath} className="border-b hover:bg-muted/40">
                        <td className="py-2 pr-4">
                          <Link href={p.route} className="text-primary hover:underline">
                            {p.route}
                          </Link>
                        </td>
                        <td className="py-2 font-mono text-xs break-all">{p.filePath.replace(process.cwd() + "/", "")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </main>
        )}
      </SignedIn>
    </>
  );
}


