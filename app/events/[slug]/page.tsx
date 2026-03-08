import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eventsData } from "../data";
import EventDetailClient from "./EventDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  if (!event) return { title: "Event — GeekRoom JEMTEC" };

  return {
    title: `${event.title} — GeekRoom JEMTEC`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);

  if (!event) notFound();

  return <EventDetailClient event={event} />;
}
