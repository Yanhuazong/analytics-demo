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
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
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
