import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased`}>
          <GTMScript />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
