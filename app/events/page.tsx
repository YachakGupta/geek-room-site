import type { Metadata } from "next";
import { eventsData } from "./data";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events — GeekRoom JEMTEC",
  description: "Upcoming and past events by GeekRoom JEMTEC.",
};

export default function EventsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 tracking-tight">
          GeekRoom Events
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl">
          Discover our upcoming workshops, hackathons, and tech talks, or explore the highlights of our past events.
        </p>
      </div>

      {/* Interactive Tabs & Event Cards */}
      <EventsClient events={eventsData} />
    </main>
  );
}
