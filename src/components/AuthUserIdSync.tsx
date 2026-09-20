"use client";

import { useEffect } from "react";
import { useIsLoggedIn, useUserId } from "@/lib/auth";
import { setGaUserId } from "@/lib/gtag";

/**
 * Mounted once in the root layout. Whenever the "logged in" state or
 * user ID changes (login, logout, or just loading the app already
 * logged in from a previous session), pushes the User-ID into GA4.
 * Because this lives in the persistent layout rather than a page, it
 * doesn't need to re-run per navigation the way the static site's
 * per-page <head> snippet does — an SPA sets it once per session.
 */
export default function AuthUserIdSync() {
  const loggedIn = useIsLoggedIn();
  const userId = useUserId();

  useEffect(() => {
    if (loggedIn && userId) {
      setGaUserId(userId);
    }
  }, [loggedIn, userId]);

  return null;
}
