"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EventDetails } from "./data";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function EventsClient({ events }: { events: EventDetails[] }) {
  const [activeTab, setActiveTab] = useState<"past" | "upcoming">("past");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredEvents = events.filter((e) => e.type === activeTab);

  return (
    <div className="mt-8 sm:mt-12">
      {/* Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="relative flex w-full max-w-sm rounded-full bg-foreground/5 p-1 backdrop-blur-sm border border-foreground/10">
          <button
            onClick={() => setActiveTab("past")}
            className={`relative w-1/2 rounded-full py-3 text-sm font-semibold transition-colors z-10 ${
              activeTab === "past" ? "text-background" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Past Events
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`relative w-1/2 rounded-full py-3 text-sm font-semibold transition-colors z-10 ${
              activeTab === "upcoming" ? "text-background" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Upcoming Events
          </button>
          
          {/* Animated Tab Background */}
          <div className="absolute inset-1 pointer-events-none">
            <motion.div
              className="h-full w-1/2 rounded-full bg-foreground"
              initial={false}
              animate={{
                x: activeTab === "past" ? "0%" : "100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div 
        className="relative min-h-[400px] group/list"
        onMouseLeave={() => setHoveredCard(null)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => {
                const isHovered = hoveredCard === event.slug;
                const isOtherHovered = hoveredCard !== null && !isHovered;

                return (
                  <motion.div
                    key={event.slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: isOtherHovered ? 0.6 : 1, 
                      scale: isHovered ? 1.05 : 1,
                      filter: isOtherHovered ? "blur(4px)" : "blur(0px)"
                    }}
                    transition={{ 
                      delay: isHovered || isOtherHovered ? 0 : index * 0.1, 
                      duration: isHovered || isOtherHovered ? 0.2 : 0.4 
                    }}
                    onMouseEnter={() => setHoveredCard(event.slug)}
                    className="z-10"
                    style={{ zIndex: isHovered ? 20 : 10 }}
                  >
                    <Link
                      href={`/events/${event.slug}`}
                      className="group flex flex-col h-full overflow-hidden rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm shadow-xl transition-all hover:border-foreground/30 hover:shadow-2xl"
                    >
                      {/* Event Image */}
                      {event.image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        </div>
                      )}
                      
                      {/* Event Info */}
                      <div className="flex flex-col flex-grow p-6 relative z-10 -mt-8 bg-gradient-to-b from-transparent to-background">
                        <h3 className="text-xl font-bold text-foreground drop-shadow-md">{event.title}</h3>
                        
                        <div className="mt-4 space-y-2 text-sm text-foreground/80 font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="mt-4 line-clamp-3 text-sm text-foreground/70 flex-grow">
                          {event.description}
                        </p>
                        
                        <div className="mt-6 flex items-center justify-between text-sm font-bold text-foreground opacity-80 group-hover:opacity-100 transition-opacity">
                          <span>{activeTab === "upcoming" ? "Register Now" : "View Highlights"}</span>
                          <motion.span
                            className="inline-block bg-foreground text-background rounded-full p-1.5"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </motion.span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
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
