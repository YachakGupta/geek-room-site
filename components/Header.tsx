"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { X, Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/join", label: "Join" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header({ hideJoin }: { hideJoin?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;
  const email = user?.primaryEmailAddress?.emailAddress;
  const isAdminOrOwner = role === "admin" || role === "owner" || email === "sahilnwal975@gmail.com";

  const displayedLinks = navLinks.filter(
    (link) => !(hideJoin && link.href === "/join")
  );
  const allLinks = isAdminOrOwner
    ? [...displayedLinks, { href: "/admin", label: "Admin" }]
    : displayedLinks;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{
        backgroundColor: "rgba(5,5,5,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12 h-16">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 min-h-[44px] min-w-[44px]"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "1.1875rem",
              color: "#ededed",
              letterSpacing: "-0.02em",
            }}
          >
            GEEK
          </span>
          <span
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "1.1875rem",
              color: "#00F2FF",
              letterSpacing: "-0.02em",
            }}
          >
            ROOM
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {allLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: isActive
                      ? "#ededed"
                      : "rgba(255,255,255,0.45)",
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#ededed";
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.45)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                      style={{ backgroundColor: "#00F2FF" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side — auth + mobile btn */}
        <div className="flex items-center gap-3">
          {isLoaded && isSignedIn && (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8 border border-white/10",
                },
              }}
            />
          )}
          {isLoaded && !isSignedIn && (
            <Link
              href="/sign-in"
              className="hidden md:inline-flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                border: "1.5px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,242,255,0.35)";
                (e.currentTarget as HTMLElement).style.color = "#ededed";
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,242,255,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              Sign in
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#ededed";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav dropdown */}
      <div
        id="mobile-nav"
        aria-hidden={!menuOpen}
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "100vh" : "0",
          opacity: menuOpen ? 1 : 0,
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
          backgroundColor: "rgba(14,14,18,0.95)",
        }}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {allLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-3 py-3 rounded-xl text-base font-medium transition-all duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: isActive ? "#ededed" : "rgba(255,255,255,0.45)",
                    backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                    borderLeft: isActive ? "2px solid #00F2FF" : "2px solid transparent",
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          {isLoaded && !isSignedIn && (
            <li className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Sign in
              </Link>
            </li>
          )}
          {isLoaded && isSignedIn && (
            <li className="mt-3 pt-3 flex justify-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
