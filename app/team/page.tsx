"use client";

import React, { useState } from "react";

type Member = {
  id: number;
  name: string;
  role: string;
  photo: string;
  gmail: string;
  linkedin: string;
};

const coreMembers: Member[] = [
  { id: 1, name: "Ronit Mathur", role: "President", photo: "/ronit.png", gmail: "ronit.oct11@gmail.com", linkedin: "https://www.linkedin.com/in/r0nit-mathur/" },
  { id: 2, name: "Paras Dudeja", role: "General Secretary", photo: "/paras.jpeg", gmail: "", linkedin: "https://www.linkedin.com/in/paras-dudeja-8154aa351/" },
  { id: 3, name: "Punish Ahuja", role: "Treasurer", photo: "/punish.jpeg", gmail: "apunish4@gmail.com", linkedin: "https://www.linkedin.com/in/punish-ahuja-b25352336/" },
  { id: 4, name: "Rudra Dutt Sharma", role: "Vice President", photo: "/rudra.jpeg", gmail: "rdsharma459@gmail.com", linkedin: "https://www.linkedin.com/in/rdsharma1/" },
];

const headMembers: Member[] = [
  { id: 5, name: "Alok Sahoo", role: "Tech Head", photo: "/alok.jpeg", gmail: "alokksahoo154@gmail.com", linkedin: "https://www.linkedin.com/in/alok-kumar-sahoo154/" },
  { id: 6, name: "Lakshita Parashar", role: "Publicity Head", photo: "/lakshita.jpeg", gmail: "lakshitaparashar2005@gmail.com", linkedin: "https://www.linkedin.com/in/lakshita-parashar-59b144293/" },
  { id: 7, name: "Rudra Dutt Sharma", role: "Management Head", photo: "/rudra.jpeg", gmail: "rdsharma459@gmail.com", linkedin: "https://www.linkedin.com/in/rdsharma1/" },
];

const techMembers: Member[] = [
  { id: 8, name: "Sahil Singh", role: "", photo: "/sahil.webp", gmail: "sahilsinghnwal975@gmail.com", linkedin: "https://www.linkedin.com/in/sahil-nawal-73471b2a3/" },
  { id: 9, name: "Abhinav Jha", role: "", photo: "/abhinav.jpeg", gmail: "jhaabhinav961@gmail.com", linkedin: "https://www.linkedin.com/in/abhinav-jha-9bb6992a7/" },
  { id: 10, name: "Yachak Gupta", role: "", photo: "/yachak.jpeg", gmail: "yachakgupta@gmail.com", linkedin: "https://www.linkedin.com/in/yachak-gupta-a25bab30a/" },
  { id: 11, name: "Dhairya Jindal", role: "", photo: "/dhairya.jpeg", gmail: "dhairyajindal4@gmail.com", linkedin: "https://www.linkedin.com/in/dhairya-jindal/" },
];

const publicityMembers: Member[] = [
  { id: 12, name: "Divyanshi Tiwari", role: "", photo: "/divyanshi.jpeg", gmail: "divyannshitiwarii@gmail.com", linkedin: "https://www.linkedin.com/in/divyanshi-tiwari-50203630b" },
  { id: 13, name: "Arya Singh", role: "", photo: "/arya.jpeg", gmail: "aryasingh25238@gmail.com", linkedin: "https://www.linkedin.com/in/arya-singh-1b120836b/" },
  { id: 14, name: "Aishwarya Singh", role: "", photo: "/aishwarya.jpeg", gmail: "singhaishwarya.2512@gmail.com", linkedin: "https://www.linkedin.com/in/aishwarya-singh-a78817370/" },
  { id: 15, name: "Manvi Yadav", role: "", photo: "/manvi.jpeg", gmail: "manviy792@gmail.com", linkedin: "https://www.linkedin.com/in/manvi-yadav-63878934b/" },
  { id: 16, name: "Bhavya Kokaria", role: "", photo: "/bhavya.jpeg", gmail: "bhavyakokaria@gmail.com", linkedin: "https://www.linkedin.com/in/bhavya-kokaria-031b1a361/" },
];

const designMembers: Member[] = [
  { id: 17, name: "Mokshya Dangwal", role: "", photo: "/mokshya.jpeg", gmail: "dangwalmokshya@gmail.com", linkedin: "https://www.linkedin.com/in/mokshya-dangwal-452959375/" },
  { id: 18, name: "Rajat Kumar Popli", role: "", photo: "/rajat.jpeg", gmail: "seemarajatdua@gmail.com", linkedin: "https://www.linkedin.com/in/rajat-kumar-popli-211165363/" },
  { id: 19, name: "Pushp Singla", role: "", photo: "/pushp.png", gmail: "pushp2325@gmail.com", linkedin: "https://www.linkedin.com/in/pushp-singla-7200ba329/" },
  { id: 20, name: "Sudhanshu Verma", role: "", photo: "/sudhanshu.jpeg", gmail: "sud6v6verma@gmail.com", linkedin: "https://www.linkedin.com/in/sudhanshu-verma-26920237a/" },
];

const managementMembers: Member[] = [
  { id: 23, name: "Shailendra Pal", role: "", photo: "/shailendra.webp", gmail: "shailendrrr18@gmail.com", linkedin: "https://www.linkedin.com/in/shailendra-pal-54382937a/" },
  { id: 24, name: "Abhinav Sharma", role: "", photo: "/abhinav_sharma.jpeg", gmail: "abhi8077208979@gmail.com", linkedin: "https://www.linkedin.com/in/abhinav-sharma-59a835356/" },
  { id: 25, name: "Member 25", role: "", photo: "", gmail: "", linkedin: "https://linkedin.com" },
  { id: 26, name: "Member 26", role: "", photo: "", gmail: "", linkedin: "https://linkedin.com" },
];

const CARD_W = 200;
const CARD_H = 290;
const GAP = 28;

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function FifaCard({ member, active, onEyeClick }: {
  member: Member;
  active: boolean;
  onEyeClick: (member: Member) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => { if (active) setFlipped((f) => !f); }}
      style={{
        width: `${CARD_W}px`, height: `${CARD_H}px`, flexShrink: 0,
        cursor: active ? "pointer" : "default", perspective: "1000px",
        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease, filter 0.45s ease",
        transform: active ? "scale(1.2) translateY(-12px)" : "scale(0.8)",
        opacity: active ? 1 : 0.4,
        filter: active ? "none" : "blur(1.5px)",
        zIndex: active ? 10 : 1,
      }}
    >
      <div style={{
        width: "100%", height: "100%", position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>

        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" as "hidden",
          borderRadius: "16px", overflow: "hidden",
          border: active ? "1px solid rgba(0,242,255,0.35)" : "1px solid rgba(0,242,255,0.07)",
          boxShadow: active ? "0 0 50px rgba(0,242,255,0.12), 0 12px 40px rgba(0,0,0,0.9)" : "0 4px 16px rgba(0,0,0,0.5)",
          background: "#050505",
        }}>
          {member.photo ? (
            <>
              <img src={member.photo} alt={member.name} style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top center",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.95) 100%)",
              }} />
            </>
          ) : (
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(160deg, #0e1a0e 0%, #050505 55%, #0a0a14 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: "90px", height: "90px", borderRadius: "50%",
                background: "linear-gradient(135deg, #0d2020, #0a0a14)",
                border: "2px solid rgba(0,242,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "36px", fontFamily: "'Bebas Neue', sans-serif", color: "rgba(0,242,255,0.45)",
              }}>{member.name.charAt(0)}</div>
            </div>
          )}

          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #00F2FF, #FF8C00)", opacity: active ? 0.9 : 0.3, zIndex: 2 }} />

          {/* Eye button — calls page-level handler */}
          {active && (
            <button
              onClick={(e) => { e.stopPropagation(); if (member.photo) onEyeClick(member); }}
              style={{
                position: "absolute", top: "10px", right: "10px", zIndex: 3,
                background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,242,255,0.3)",
                borderRadius: "6px", color: "#00F2FF", width: "28px", height: "28px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: member.photo ? "pointer" : "not-allowed",
                opacity: member.photo ? 1 : 0.3, backdropFilter: "blur(4px)", padding: 0,
              }}
            >
              <EyeIcon />
            </button>
          )}

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 12px 14px", zIndex: 2, textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.12em", color: "#ffffff", textTransform: "uppercase", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>{member.name}</div>
            {member.role && <div style={{ fontSize: "10px", color: "#00F2FF", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", marginTop: "4px", opacity: 0.9 }}>{member.role}</div>}
          </div>

          {active && !flipped && (
            <div style={{ position: "absolute", bottom: "8px", right: "10px", fontSize: "8px", color: "rgba(255,140,0,0.5)", fontFamily: "'JetBrains Mono', monospace", zIndex: 3 }}>TAP ↻</div>
          )}
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" as "hidden",
          transform: "rotateY(180deg)", borderRadius: "16px", overflow: "hidden",
          background: "linear-gradient(160deg, #0a0a14 0%, #050505 55%, #0e1a0e 100%)",
          border: "1px solid rgba(255,140,0,0.3)",
          boxShadow: "0 0 40px rgba(255,140,0,0.08), 0 12px 40px rgba(0,0,0,0.9)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "14px", padding: "20px",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #FF8C00, #00F2FF)", opacity: 0.9 }} />

          <div style={{ width: "64px", height: "64px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(0,242,255,0.3)", background: "linear-gradient(135deg, #0d2020, #0a0a14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {member.photo
              ? <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              : <span style={{ fontSize: "22px", fontFamily: "'Bebas Neue', sans-serif", color: "rgba(0,242,255,0.5)" }}>{member.name.charAt(0)}</span>
            }
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.14em", color: "#ededed" }}>{member.name}</div>
            {member.role && <div style={{ fontSize: "10px", color: "#FF8C00", fontFamily: "'JetBrains Mono', monospace", marginTop: "3px" }}>{member.role}</div>}
          </div>

          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #00F2FF, transparent)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
            <a href={`mailto:${member.gmail}`} onClick={(e) => e.stopPropagation()}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "8px", background: "rgba(0,242,255,0.06)", border: "1px solid rgba(0,242,255,0.2)", textDecoration: "none", color: "#00F2FF", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", overflow: "hidden" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{member.gmail}</span>
            </a>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "8px", background: "rgba(255,140,0,0.06)", border: "1px solid rgba(255,140,0,0.2)", textDecoration: "none", color: "#FF8C00", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
          <div style={{ position: "absolute", bottom: "8px", right: "10px", fontSize: "8px", color: "rgba(0,242,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>TAP ↺</div>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
function TeamSection({ title, subtitle, members, accentColor, onEyeClick }: {
  title: string; subtitle: string; members: Member[]; accentColor: string;
  onEyeClick: (member: Member) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const prev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const next = () => setActiveIdx((i) => Math.min(members.length - 1, i + 1));
  const offset = -(activeIdx * (CARD_W + GAP));

  return (
    <section style={{ marginBottom: "80px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
          <div style={{ width: "3px", height: "28px", background: accentColor, borderRadius: "2px", boxShadow: `0 0 12px ${accentColor}99` }} />
          <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.15em", color: "#ededed", margin: 0, textTransform: "uppercase" }}>{title}</h2>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(237,237,237,0.4)", fontFamily: "'JetBrains Mono', monospace", marginLeft: "15px", letterSpacing: "0.04em" }}>{subtitle}</p>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(90deg, #050505, transparent)", zIndex: 20, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(270deg, #050505, transparent)", zIndex: 20, pointerEvents: "none" }} />

        <div style={{ overflow: "hidden", padding: `${CARD_H * 0.22}px 0` }}>
          <div style={{
            display: "flex", gap: `${GAP}px`,
            transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
            transform: `translateX(calc(50% - ${CARD_W / 2}px + ${offset}px))`,
          }}>
            {members.map((member, i) => (
              <FifaCard key={member.id} member={member} active={i === activeIdx} onEyeClick={onEyeClick} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "12px" }}>
          <button onClick={prev} disabled={activeIdx === 0} style={{
            background: "transparent", border: `1px solid ${accentColor}44`, color: accentColor,
            borderRadius: "8px", padding: "8px 18px", cursor: activeIdx === 0 ? "not-allowed" : "pointer",
            opacity: activeIdx === 0 ? 0.25 : 1, fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", transition: "all 0.2s",
          }}>← PREV</button>

          <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
            {members.map((_, i) => (
              <div key={i} onClick={() => setActiveIdx(i)} style={{
                width: i === activeIdx ? "22px" : "6px", height: "6px", borderRadius: "3px",
                background: i === activeIdx ? accentColor : "rgba(237,237,237,0.18)",
                cursor: "pointer", transition: "all 0.3s ease",
                boxShadow: i === activeIdx ? `0 0 8px ${accentColor}` : "none",
              }} />
            ))}
          </div>

          <button onClick={next} disabled={activeIdx === members.length - 1} style={{
            background: "transparent", border: `1px solid ${accentColor}44`, color: accentColor,
            borderRadius: "8px", padding: "8px 18px", cursor: activeIdx === members.length - 1 ? "not-allowed" : "pointer",
            opacity: activeIdx === members.length - 1 ? 0.25 : 1, fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", transition: "all 0.2s",
          }}>NEXT →</button>
        </div>

        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "10px", color: "rgba(237,237,237,0.25)", fontFamily: "'JetBrains Mono', monospace" }}>
          {members[activeIdx]?.name}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const [lightbox, setLightbox] = useState<Member | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: "#050505", padding: "clamp(24px, 5vw, 64px) clamp(16px, 5vw, 48px)", overflowX: "hidden" }}>

      {/* LIGHTBOX — rendered at page root so it's never clipped */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(10px)",
        }}>
          <div style={{ textAlign: "center", padding: "20px" }} onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.photo} alt={lightbox.name} style={{
              maxWidth: "80vw", maxHeight: "75vh",
              borderRadius: "16px",
              border: "1px solid rgba(0,242,255,0.3)",
              boxShadow: "0 0 60px rgba(0,242,255,0.15)",
              display: "block", margin: "0 auto",
            }} />
            <div style={{ marginTop: "16px", color: "#ededed", fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", letterSpacing: "0.12em" }}>{lightbox.name}</div>
            {lightbox.role && <div style={{ color: "#00F2FF", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", marginTop: "4px" }}>{lightbox.role}</div>}
            <button onClick={() => setLightbox(null)} style={{
              marginTop: "20px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.5)", borderRadius: "8px", padding: "8px 20px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", cursor: "pointer",
            }}>✕ CLOSE</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "800px", marginBottom: "64px" }}>
        <div style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: "#00F2FF", letterSpacing: "0.2em", marginBottom: "12px", opacity: 0.65 }}>// THE PEOPLE</div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em", color: "#ededed", margin: "0 0 16px", lineHeight: 1 }}>
          CORE TEAM &amp; MEMBERS
        </h1>
        <p style={{ fontSize: "15px", color: "rgba(237,237,237,0.5)", fontFamily: "var(--font-geist-sans), system-ui, sans-serif", lineHeight: 1.65, maxWidth: "520px" }}>
          The people behind GEEKROOM — dedicated to building and growing our tech community. Click any card to flip it and connect.
        </p>
        <div style={{ height: "1px", background: "linear-gradient(90deg, #00F2FF, #FF8C00, transparent)", marginTop: "28px", opacity: 0.3 }} />
      </div>

      <TeamSection title="Core" subtitle="The founding pillars of GEEKROOM" members={coreMembers} accentColor="#00F2FF" onEyeClick={setLightbox} />
      <TeamSection title="Heads" subtitle="Leading each domain with vision" members={headMembers} accentColor="#FF8C00" onEyeClick={setLightbox} />
      <TeamSection title="Tech Department" subtitle="Building the digital backbone" members={techMembers} accentColor="#00F2FF" onEyeClick={setLightbox} />
      <TeamSection title="Publicity Department" subtitle="Amplifying the GEEKROOM voice" members={publicityMembers} accentColor="#FF8C00" onEyeClick={setLightbox} />
      <TeamSection title="Design Department" subtitle="Crafting the visual identity" members={designMembers} accentColor="#00F2FF" onEyeClick={setLightbox} />
      <TeamSection title="Management Department" subtitle="Keeping everything in motion" members={managementMembers} accentColor="#FF8C00" onEyeClick={setLightbox} />
    </main>
  );
}