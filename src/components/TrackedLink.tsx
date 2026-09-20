"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/gtag";

type Props = {
  href: string;
  eventName: string;
  eventParams?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
};

/** A next/link that fires a GA4 event on click, before navigating. */
export default function TrackedLink({ href, eventName, eventParams, className, children }: Props) {
  return (
    <Link href={href} className={className} onClick={() => trackEvent(eventName, eventParams)}>
      {children}
    </Link>
  );
}
