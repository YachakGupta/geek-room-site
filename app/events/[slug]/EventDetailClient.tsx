"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EventDetails, WinnerTeam } from "../data";
import { Calendar, MapPin, Clock, Trophy, Users, ArrowRight, ChevronDown } from "lucide-react";
import GallerySlideshow from "./GallerySlideshow";

function WinnerTeamAccordion({ team, label, dotColor, position }: { team: WinnerTeam; label: string; dotColor: string; position: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="flex flex-col rounded-xl bg-background border border-foreground/10 shadow-sm transition hover:shadow-md hover:border-foreground/20 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex flex-col gap-1.5 p-3 focus:outline-none focus:bg-foreground/5 transition-colors"
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground/50">{label}</span>
          <ChevronDown className={`h-4 w-4 text-foreground/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className={`flex h-8 w-8 items-center justify-center shrink-0 rounded-full text-sm font-bold ${dotColor}`}>
            {position}
          </span>
          <div>
            <span className="font-semibold text-lg block">{team.leader}</span>
            {team.teamName && (
              <span className="text-xs text-foreground/60 font-medium">Team: {team.teamName}</span>
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-foreground/5 border-t border-foreground/5"
          >
            <div className="p-4 py-3">
              <h5 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Team Members</h5>
              <ul className="space-y-2">
                {team.members.map((member, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground/80">{member.name}</span>
                    {member.name === team.leader && <span className="text-[10px] bg-foreground/10 px-2 py-0.5 rounded-full font-bold">LEADER</span>}
                    {member.role && member.name !== team.leader && <span className="text-xs text-foreground/50">{member.role}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function GalleryGrid({ images }: { images: string[] }) {
  const [showAll, setShowAll] = useState(false);
  
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-foreground/10">
        <img src={images[0]} alt="Gallery image" className="w-full h-full object-cover" />
      </div>
    );
  }

  const remainingCount = images.length - 1;

  return (
    <div className="space-y-4">
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Main First Image */}
        <motion.div 
          layout
          className="relative aspect-video rounded-2xl overflow-hidden border border-foreground/10"
        >
          <img src={images[0]} alt="Gallery main image" className="w-full h-full object-cover" />
        </motion.div>

        {/* Second Space: Folder Stack OR Expanded Grid */}
        <AnimatePresence mode="popLayout">
          {!showAll ? (
            // Folder Stack Animation
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowAll(true)}
              className="relative aspect-video cursor-pointer select-none group"
            >
              {/* Stack items behind */}
              <div className="absolute inset-2 -top-2 rounded-2xl bg-foreground/5 border border-foreground/10 transition-transform group-hover:-translate-y-1 rotate-2" />
              <div className="absolute inset-1 w-[98%] left-1 rounded-2xl bg-foreground/10 border border-foreground/10 transition-transform group-hover:-translate-y-2 -rotate-1" />
              
              {/* Top stack item */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-foreground/20 shadow-lg text-foreground bg-background">
                <img src={images[1]} alt="Gallery preview" className="w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[2px]">
                  <span className="text-3xl font-extrabold shadow-sm">+{remainingCount}</span>
                  <span className="text-sm font-semibold uppercase tracking-wider mt-1 opacity-80">More Photos</span>
                </div>
              </div>
            </motion.div>
          ) : (
            // Expanded Rest of Images
            images.slice(1).map((img, idx) => (
              <motion.div 
                key={img}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="relative aspect-video rounded-xl overflow-hidden border border-foreground/10"
              >
                <img src={img} alt={`Gallery image ${idx + 2}`} className="w-full h-full object-cover" />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Show Less Button when expanded */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex justify-center pt-4 overflow-hidden"
          >
            <button
              onClick={() => setShowAll(false)}
              className="group flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-foreground hover:text-background"
            >
              Show Less
              <ChevronDown className="h-4 w-4 rotate-180 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EventDetailClient({ event }: { event: EventDetails }) {
  const isPast = event.type === "past";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/events"
        className="inline-flex min-h-[44px] items-center text-sm font-medium text-foreground/70 hover:text-foreground transition-colors mb-6"
      >
        ← Back to Events
      </Link>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="space-y-6 text-center">
          <div className="inline-block rounded-full bg-foreground/10 px-3 py-1 text-sm font-semibold capitalize text-foreground/80 mb-4">
            {event.type} Event
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 tracking-tight">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-foreground/70 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Hero Image / Slideshow */}
        {((isPast && event.gallery && event.gallery.length > 0) || event.image) && (
          <motion.div variants={itemVariants} className="relative aspect-video w-full overflow-hidden rounded-3xl border border-foreground/10 shadow-2xl">
            {isPast && event.gallery && event.gallery.length > 0 ? (
              <GallerySlideshow images={event.image ? [event.image, ...event.gallery] : event.gallery} />
            ) : (
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </motion.div>
        )}

        <div className="grid gap-12 md:grid-cols-3">
          {/* Main Content */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">About this event</h2>
            <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
            
            {/* Gallery (for past events) */}
            {isPast && event.gallery && event.gallery.length > 0 && (
              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-bold">Event Gallery</h2>
                <GalleryGrid images={event.gallery} />
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                {isPast ? <Trophy className="h-5 w-5 text-yellow-500" /> : <Users className="h-5 w-5" />}
                {isPast ? "Event Highlights" : "Registration"}
              </h3>
              
              {isPast ? (
                <div className="space-y-4">
                  {event.winners && event.winners.length > 0 ? (
                    <div>
                      <h4 className="font-medium text-foreground/80 mb-2">Winners</h4>
                      <ul className="space-y-4">
                        {event.winners.map((team, idx) => {
                          const labels = ["Winner", "1st Runner Up", "2nd Runner Up"];
                          const label = labels[idx] || `Position ${idx + 1}`;
                          
                          // Styling for Gold, Silver, Bronze
                          const colors = [
                            "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500", // Gold
                            "bg-slate-300/50 text-slate-700 dark:text-slate-300",    // Silver
                            "bg-amber-600/20 text-amber-700 dark:text-amber-500"     // Bronze
                          ];
                          const dotColor = colors[idx] || "bg-foreground/10 text-foreground";

                          return (
                            <WinnerTeamAccordion 
                              key={idx} 
                              team={team} 
                              label={label} 
                              dotColor={dotColor} 
                              position={idx + 1} 
                            />
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground/70">A fantastic event successfully concluded.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm text-foreground/70">
                    Secure your spot now! Space is limited and spots are filling up fast.
                  </p>
                  
                  {event.registrationLink && (
                    <motion.a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 font-semibold text-background transition-colors hover:bg-foreground/90 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Register Now
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      {/* Button shine effect */}
                      <motion.div 
                        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-background/20 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 1 }}
                      />
                    </motion.a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
