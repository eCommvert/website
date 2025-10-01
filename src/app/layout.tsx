import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SiteChrome from "@/components/site-chrome";
import { ClerkProvider } from "@clerk/nextjs";
import { GTMScript } from "@/components/gtm";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "eCommvert - Strategic PPC Partner for E-commerce Growth",
  description: "Scale Your Google Ads Without Hiring a Full-Time Manager. Strategic oversight for e-commerce brands spending $10K+/month. Senior expertise with immediate start vs. 2-3 month hiring process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if Clerk keys are available
  const hasClerkKeys = !!(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    process.env.CLERK_SECRET_KEY
  );

  // Debug logging
  console.log('RootLayout - hasClerkKeys:', hasClerkKeys);
  console.log('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY exists:', !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  console.log('CLERK_SECRET_KEY exists:', !!process.env.CLERK_SECRET_KEY);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased`}>
        <GTMScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {hasClerkKeys ? (
            <ClerkProvider
              publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
              signInUrl="/sign-in"
              signUpUrl="/sign-up"
              afterSignInUrl="/admin"
              afterSignUpUrl="/admin"
            >
              <SiteChrome>{children}</SiteChrome>
            </ClerkProvider>
          ) : (
            <SiteChrome>{children}</SiteChrome>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
