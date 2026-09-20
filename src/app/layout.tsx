import type { Metadata } from "next";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GAPageViewTracker from "@/components/GAPageViewTracker";
import AuthUserIdSync from "@/components/AuthUserIdSync";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumen Analytics — GA4 + Next.js classroom demo",
  description:
    "A fictional SaaS site built to demonstrate Google Analytics 4 event tracking inside a Next.js app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />

        {/* Loads gtag.js and sends the initial page_view — see src/lib/gtag.ts
            and src/components/GAPageViewTracker.tsx for how custom + route-change
            events are handled on top of this. */}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <Suspense fallback={null}>
          <GAPageViewTracker />
        </Suspense>
        <AuthUserIdSync />
      </body>
    </html>
  );
}
