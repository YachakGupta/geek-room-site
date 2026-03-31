"use client";
import React, { useMemo } from "react";
import TeamShowcase from "./TeamShowcase";
import { DynamicBackground } from "@/components/about/DynamicBackground";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  category: string;
  photo: string;
  gmail: string;
  linkedin: string;
};

interface TeamClientProps {
  members: TeamMember[];
  loggedInEmail: string | null;
}

const CATEGORY_ORDER = ["Core", "Heads", "Tech", "Design", "Publicity", "Management"];

export default function TeamClient({ members }: TeamClientProps) {
  // Group the dynamic members by category
  const teamDepartments = useMemo(() => {
    const grouped: Record<string, TeamMember[]> = {};
    for (const m of members) {
      if (!grouped[m.category]) grouped[m.category] = [];
      grouped[m.category].push(m);
    }
    return CATEGORY_ORDER
      .filter((cat) => grouped[cat] && grouped[cat].length > 0)
      .map((cat) => ({ title: cat, members: grouped[cat] }));
  }, [members]);

  return (
    <main className="relative min-h-screen text-[#F2F2F2]" style={{ fontFamily: "var(--font-geist-sans), Inter, Arial, sans-serif" }}>
      <DynamicBackground />
      
      <div className="relative z-10 w-full overflow-hidden">
        <section
          style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <div style={{
              position: "absolute", top: "-30%", left: "-20%", width: "70%", height: "70%",
              background: "radial-gradient(circle, rgba(22,155,155,0.28) 0%, transparent 70%)",
              filter: "blur(80px)"
            }} />
            <div style={{
              position: "absolute", bottom: "-30%", right: "-20%", width: "60%", height: "60%",
              background: "radial-gradient(circle, rgba(232,90,42,0.22) 0%, transparent 70%)",
              filter: "blur(80px)"
            }} />
          </div>
          <div style={{ zIndex: 1 }}>
            <p
              style={{
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#169B9B",
                fontSize: "0.85rem",
                fontWeight: 700
              }}
            >
              Studio
            </p>
            <h1
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                margin: 0,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 700,
                background: "linear-gradient(135deg, #169B9B 0%, #E85A2A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 28px rgba(22, 155, 155, 0.3))"
              }}
            >
              Meet our team
            </h1>
          </div>
        </section>

        {members.length === 0 ? (
          <section style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '50vh', display: 'grid', placeItems: 'center' }}>
            <div>
              <h2 style={{ color: '#FF4444', fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>SYSTEM OFFLINE</h2>
              <p style={{ color: 'rgba(237,237,237,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Failed to establish connection with the central database. Team nodes cannot be loaded at this time. Please verify database connectivity and credentials.
              </p>
            </div>
          </section>
        ) : (
          teamDepartments.map((dept, idx) => (
            <TeamShowcase key={dept.title} title={dept.title} members={dept.members} index={idx} total={teamDepartments.length} />
          ))
        )}

        <section
          style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ opacity: 0.65, fontSize: "1.05rem" }}>Want to work with us?</p>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                margin: 0,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              Let&apos;s build something remarkable.
            </h2>
          </div>
        </section>
      </div>
    </main>
  );
}