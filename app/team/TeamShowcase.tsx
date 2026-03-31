"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./TeamShowcase.css";

gsap.registerPlugin(ScrollTrigger);

type TeamMember = {
  id: number;
  name: string;
  role: string;
  category: string;
  photo: string;
  gmail: string;
  linkedin: string;
};

interface TeamShowcaseProps {
  title: string;
  members: TeamMember[];
  index: number;
  total: number;
}

export default function TeamShowcase({ title, members, index, total }: TeamShowcaseProps) {
  // Wrap the pinned section in a container to prevent React "removeChild" unmount crashes
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const current = currentRef.current;

    if (!section || !track || members.length === 0) return;

    let lenis: Lenis;
    if (!(window as any).lenisInstance) {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });
      (window as any).lenisInstance = lenis;
      
      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          if (typeof value === "number") {
            lenis.scrollTo(value, { immediate: true });
            return value;
          }
          return window.scrollY;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.body.style.transform ? "transform" : "fixed",
      });
      lenis.on("scroll", ScrollTrigger.update);
    } else {
      lenis = (window as any).lenisInstance;
    }

    let ctx = gsap.context(() => {});

    setTimeout(() => {
      ctx.add(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".team-panel", section);
        const totalScroll = () => track.scrollWidth - window.innerWidth;

        // ── Main horizontal scroll tween ──
        const horizontalTween = gsap.to(track, {
          x: () => -totalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll()}`,
            scrub: 1,
            // pinning the section which is cleanly inside a wrapper div
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) {
                gsap.to(progress, {
                  scaleX: self.progress,
                  duration: 0.1,
                  ease: "none",
                  overwrite: true,
                });
              }
              const currentIndex = Math.min(
                members.length,
                Math.max(1, Math.round(self.progress * (members.length - 1)) + 1)
              );
              if (current) {
                current.textContent = String(currentIndex).padStart(2, "0");
              }
            },
          },
        });

        // ── Per-panel animations ──
        panels.forEach((panel) => {
          const innerImage = panel.querySelector(".team-panel__image img");
          const revealEls = panel.querySelectorAll(".reveal-up");
          const image = panel.querySelector(".team-panel__image");

          if (innerImage) {
            gsap.fromTo(
              innerImage,
              { scale: 1.25, xPercent: -8 },
              {
                scale: 1,
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }

          if (revealEls.length > 0) {
            gsap.fromTo(
              revealEls,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left 65%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              { clipPath: "inset(12% 10% 12% 10% round 20px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 20px)",
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left 75%",
                  end: "left 35%",
                  scrub: true,
                },
              }
            );
          }
        });
        
        ScrollTrigger.refresh();
      });
    }, 150); // slight delay ensures DOM paints completely, especially dynamic DOM

    return () => {
      ctx.revert(); // Will cleanly remove ScrollTriggers and pin-spacers
    };
  }, [members, title]);

  return (
    <div className="team-showcase-wrapper" ref={wrapperRef}>
      <section className="team-showcase" ref={sectionRef}>
        <div className="team-showcase__hud">
          <div className="team-showcase__topline">
            <span className="team-showcase__eyebrow">
              Depts <span style={{ opacity: 0.4, margin: "0 0.5rem" }}>/</span> {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
            </span>
            <span className="team-showcase__counter">
              <span ref={currentRef}>01</span>
              <span className="team-showcase__counter-sep">/</span>
              <span>{String(members.length).padStart(2, "0")}</span>
            </span>
          </div>

          <div className="team-showcase__titlewrap">
            <h2 className="team-showcase__title">
              {title} Team
            </h2>
            <p className="team-showcase__subtitle">
              Scroll horizontally to meet the {title.toLowerCase()} members.
            </p>
          </div>

          <div className="team-showcase__progress">
            <span className="team-showcase__progress-bar" ref={progressRef} />
          </div>
        </div>

        <div className="team-showcase__track" ref={trackRef}>
          {members.map((member, i) => (
            <article className="team-panel" key={member.id}>
              <div className="team-panel__inner">
                <div className="team-panel__left">
                  <div className="team-panel__meta reveal-up">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="team-panel__name reveal-up">{member.name}</h3>
                  <p className="team-panel__role reveal-up">{member.role}</p>
                  
                  <p className="team-panel__desc reveal-up">
                    {title === "Core" && "Guiding the vision and leading the charge across all GEEKROOM initiatives."}
                    {title === "Heads" && "Directing departmental strategy and ensuring operational excellence."}
                    {title === "Tech" && "Building robust architectures, clean code, and scalable solutions."}
                    {title === "Design" && "Crafting pixel-perfect, intuitive, and stunning user experiences."}
                    {title === "Publicity" && "Amplifying our voice and building meaningful community connections."}
                    {title === "Management" && "Orchestrating resources, people, and processes seamlessly."}
                  </p>

                  <div className="team-panel__socials reveal-up">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-panel__social-link"
                      >
                        in
                      </a>
                    )}
                    {member.gmail && member.gmail !== "—" && (
                      <a
                        href={`mailto:${member.gmail}`}
                        className="team-panel__social-link"
                      >
                        ✉
                      </a>
                    )}
                  </div>
                </div>

                <div className="team-panel__right">
                  <div className="team-panel__image">
                    <img src={member.photo} alt={member.name} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
