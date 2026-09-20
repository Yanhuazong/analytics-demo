"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useIsLoggedIn, setAuthLoggedIn } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const loggedIn = useIsLoggedIn();

  function handleSignOut() {
    setAuthLoggedIn(false);
    router.push("/");
  }

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/">
          Lumen <span>Analytics</span>
        </Link>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={pathname === link.href ? "active" : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
          <li id="nav-auth">
            {loggedIn ? (
              <>
                <Link href="/account" className={pathname === "/account" ? "active" : undefined}>
                  Account
                </Link>{" "}
                <button type="button" className="linklike" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/login" className={pathname === "/login" ? "active" : undefined}>
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
