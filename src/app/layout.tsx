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
  // TEMPORARY: Disable Clerk completely due to proxy URL issues
  // TODO: Fix NEXT_PUBLIC_CLERK_PROXY_URL environment variable in Vercel
  const hasClerkKeys = false; // Force disable Clerk

  // Debug logging
  console.log('RootLayout - hasClerkKeys (FORCED OFF):', hasClerkKeys);
  console.log('TEMPORARY: Clerk disabled due to proxy URL configuration issues');

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
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
