"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EventDetails } from "./data";
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

function DetailScrambleText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <ScrambleText
      text={text}
      delay={0}
      speed={20}
      className={className}
    />
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function EventsClient({ events }: { events: EventDetails[] }) {
  const [activeTab, setActiveTab] = useState<"past" | "upcoming">("past");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredEvents = events.filter((e) => e.type === activeTab);

  const getTabPosition = () => {
    return activeTab === "past" ? "0%" : "100%";
  };

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex justify-center mb-10">
        <div className="relative flex w-full max-w-md rounded-full bg-foreground/5 p-1 backdrop-blur-sm border border-foreground/10">
          <div className="absolute inset-1 pointer-events-none">
            <motion.div
              className="h-full w-1/2 rounded-full bg-foreground"
              initial={false}
              animate={{ x: getTabPosition() }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <button
            onClick={() => setActiveTab("past")}
            className={`relative w-1/2 rounded-full py-2.5 text-sm font-semibold transition-colors z-10 ${
              activeTab === "past" ? "text-background" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`relative w-1/2 rounded-full py-2.5 text-sm font-semibold transition-colors z-10 ${
              activeTab === "upcoming" ? "text-background" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div key={event.slug} variants={itemVariants} layout>
                  <Link
                    href={`/events/${event.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#00F2FF]/20 bg-[#050505] transition-all duration-500 hover:border-[#00F2FF]/60 hover:shadow-[0_0_40px_rgba(0,242,255,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-2"
                    onMouseEnter={() => setHoveredCard(event.slug)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00F2FF]/10 via-transparent to-[#FF8C00]/10 rounded-3xl animate-pulse" />
                    </div>

                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-all duration-700 opacity-60 group-hover:opacity-30 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00F2FF]/5 to-[#FF8C00]/5" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent group-hover:via-[#050505]/90 transition-all duration-500" />

                      <div className="absolute inset-0 flex flex-col p-6">
                        <div className="flex items-start justify-between">
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#00F2FF]/10 border border-[#00F2FF]/30 backdrop-blur-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00F2FF]"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00F2FF] animate-pulse" />
                            <DetailScrambleText text={event.type === "past" ? "Past Event" : "Upcoming"} />
                          </motion.span>

                          <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="rounded-lg bg-[#050505]/80 backdrop-blur-md border border-foreground/20 px-2.5 py-1.5 text-xs font-mono text-foreground/70"
                          >
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </motion.span>
                        </div>

                        <div className="mt-auto">
                          {hoveredCard !== event.slug && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2 text-sm text-[#00F2FF]/60 group-hover:text-[#00F2FF] transition-colors"
                            >
                              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              <span>Hover to reveal</span>
                            </motion.div>
                          )}

                          <AnimatePresence>
                            {hoveredCard === event.slug && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, y: 20 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: 20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-3 overflow-hidden"
                              >
                                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-xl">
                                  <DetailScrambleText text={event.title} />
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                                  {event.time && (
                                    <div className="flex items-center gap-2 text-foreground/80">
                                      <Clock className="h-3.5 w-3.5 text-[#FF8C00]" />
                                      <DetailScrambleText text={event.time} />
                                    </div>
                                  )}
                                  {event.location && (
                                    <div className="flex items-center gap-2 text-foreground/80">
                                      <MapPin className="h-3.5 w-3.5 text-[#FF8C00]" />
                                      <span className="truncate">
                                        <DetailScrambleText text={event.location} />
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed">
                                  <DetailScrambleText text={event.description} />
                                </p>

                                <div className="flex items-center flex-wrap gap-2 pt-2">
                                  <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-2 text-sm font-semibold text-[#00F2FF]"
                                  >
                                    <DetailScrambleText text="View Details" />
                                    <ArrowRight className="h-4 w-4" />
                                  </motion.span>

                                  {event.registrationLink && event.type === "upcoming" && (
                                    <motion.a
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.15 }}
                                      href={event.registrationLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-1.5 rounded-lg bg-[#00F2FF]/20 hover:bg-[#00F2FF]/30 border border-[#00F2FF]/30 px-3 py-1.5 text-xs font-semibold text-[#00F2FF] transition-colors"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      <DetailScrambleText text="Register" />
                                    </motion.a>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00F2FF]/30 rounded-tl-2xl group-hover:border-[#00F2FF] transition-colors duration-300" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00F2FF]/30 rounded-tr-2xl group-hover:border-[#FF8C00] transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00F2FF]/30 rounded-bl-2xl group-hover:border-[#FF8C00] transition-colors duration-300" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00F2FF]/30 rounded-br-2xl group-hover:border-[#00F2FF] transition-colors duration-300" />
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex min-h-[200px] flex-col items-center justify-center text-center">
                <p className="text-lg font-medium text-foreground/60">No events found in this category.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
