"use client";

import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/join", label: "Join" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer({ hideJoin }: { hideJoin?: boolean }) {
  return (
    <footer
      className="relative w-full"
      style={{
        backgroundColor: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-1" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "1.0625rem",
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
              fontSize: "1.0625rem",
              color: "#00F2FF",
              letterSpacing: "-0.02em",
            }}
          >
            ROOM
          </span>
        </Link>

        {/* Nav links */}
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {navLinks
            .filter((link) => !(hideJoin && link.href === "/join"))
            .map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.38)",
                    fontWeight: 400,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)";
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
        </ul>

        {/* Copyright */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8125rem",
            color: "rgba(255,255,255,0.22)",
          }}
        >
          © Geek Room {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
