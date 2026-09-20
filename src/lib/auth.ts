"use client";

import { useSyncExternalStore } from "react";

/**
 * Fake "logged in" state, stored in localStorage only — there is no real
 * backend or authentication anywhere in this demo. Reads go through
 * useSyncExternalStore (the React-recommended way to subscribe to an
 * external mutable store like localStorage) instead of useEffect+useState,
 * which also means every component using these hooks re-renders
 * automatically the moment login/logout happens, with no prop drilling.
 */

const LOGGED_IN_KEY = "lumen_logged_in";
const USER_ID_KEY = "lumen_user_id";
const MEMBER_SINCE_KEY = "lumen_member_since";
const AUTH_CHANGED_EVENT = "lumen-auth-changed";

function readLoggedIn(): boolean {
  try {
    return localStorage.getItem(LOGGED_IN_KEY) === "true";
  } catch {
    return false;
  }
}

function readUserId(): string | null {
  try {
    return localStorage.getItem(USER_ID_KEY);
  } catch {
    return null;
  }
}

function readMemberSince(): string | null {
  try {
    return localStorage.getItem(MEMBER_SINCE_KEY);
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(AUTH_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function useIsLoggedIn(): boolean {
  return useSyncExternalStore(subscribe, readLoggedIn, () => false);
}

export function useUserId(): string | null {
  return useSyncExternalStore(subscribe, readUserId, () => null);
}

export function useMemberSince(): string | null {
  return useSyncExternalStore(subscribe, readMemberSince, () => null);
}

/** Reuses the same ID across sessions in this browser, like a returning user. */
export function getOrCreateUserId(): string {
  let id = readUserId();
  if (!id) {
    id = "demo_" + Math.random().toString(36).slice(2, 10);
    try {
      localStorage.setItem(USER_ID_KEY, id);
      localStorage.setItem(MEMBER_SINCE_KEY, new Date().toISOString().slice(0, 10));
    } catch {}
  }
  return id;
}

export function setAuthLoggedIn(value: boolean) {
  try {
    localStorage.setItem(LOGGED_IN_KEY, value ? "true" : "false");
  } catch {}
  notifyAuthChanged();
}
