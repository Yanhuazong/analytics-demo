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
        {/*
          These three must mount BEFORE {children}. React runs effects in
          tree order (children's effects fire before later siblings'), and
          <GoogleAnalytics>'s init script is what creates window.dataLayer
          in the first place. With it positioned after {children}, every
          page's own on-mount trackEvent() calls (view_item_list on
          /pricing, begin_checkout on /checkout/[plan], etc.) raced ahead
          of that initialization and were silently dropped — visible in
          the console as "@next/third-parties: GA dataLayer dataLayer does
          not exist". Mounting these first guarantees the array (and the
          initial gtag('config', ...) call) exists before any page code runs.
        */}
        {/*
          debugMode routes every hit into GA4 DebugView automatically, no
          browser extension required. This is a classroom demo site where
          being able to inspect events live is the whole point, so it's
          left on unconditionally — for a real production site you'd want
          this off (or gated behind an env var) so regular visitor traffic
          doesn't all get flagged as debug traffic.
        */}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} debugMode />
        <Suspense fallback={null}>
          <GAPageViewTracker />
        </Suspense>
        <AuthUserIdSync />

        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
