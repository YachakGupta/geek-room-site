"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export type Winner = {
  rank: string;
  teamName: string;
  members?: string[];
  photo?: string;
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  registrationLink?: string;
  image: string;
  status: "upcoming" | "past";
  category?: string;
  time?: string;
  registrationOpen?: boolean;
  gallery?: string[];
  winners?: Winner[];
  formSchema?: unknown;
};

export async function addEvent(eventData: EventItem) {
  try {
    await prisma.event.create({
      data: {
        id: eventData.id || undefined,
        title: eventData.title,
        description: eventData.description,
        date: new Date(eventData.date),
        location: eventData.location,
        registrationLink: eventData.registrationLink || null,
        image: eventData.image,
        status: eventData.status,
        category: eventData.category,
        time: eventData.time,
        registrationOpen: eventData.registrationOpen ?? true,
        gallery: eventData.gallery || [],
        winners: {
          create: eventData.winners?.map(w => ({
            rank: w.rank,
            teamName: w.teamName,
            members: w.members || [],
            photo: w.photo || null
          })) || []
        }
      }
    });

    revalidatePath("/events");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to add event:", error);
    return { success: false, error: errorMessage };
  }
}

export async function updateEvent(id: string, eventData: Partial<EventItem>) {
  try {
    // If winners are provided, we overwrite the existing winners for simplicity
    if (eventData.winners) {
      await prisma.winner.deleteMany({ where: { eventId: id } });
    }

    await prisma.event.update({
      where: { id },
      data: {
        title: eventData.title,
        description: eventData.description,
        date: eventData.date ? new Date(eventData.date) : undefined,
        location: eventData.location,
        registrationLink: eventData.registrationLink,
        image: eventData.image,
        status: eventData.status,
        category: eventData.category,
        time: eventData.time,
        registrationOpen: eventData.registrationOpen,
        gallery: eventData.gallery,
        winners: eventData.winners ? {
          create: eventData.winners.map(w => ({
            rank: w.rank,
            teamName: w.teamName,
            members: w.members || [],
            photo: w.photo || null
          }))
        } : undefined
      }
    });

    revalidatePath("/events");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to update event:", error);
    return { success: false, error: errorMessage };
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } });

    revalidatePath("/events");
    revalidatePath("/admin");
    revalidatePath("/gallery");

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to delete event:", error);
    return { success: false, error: errorMessage };
  }
}

export async function registerForEvent(registrationData: {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  college: string;
}) {
  try {
    await prisma.eventRegistration.create({
      data: {
        eventId: registrationData.eventId,
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone,
        college: registrationData.college,
      }
    });

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Registration failed:", error);
    return { success: false, error: errorMessage };
  }
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is missing. Falling back to local events.json");
      const dataPath = path.join(process.cwd(), 'data', 'events.json');
      if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as EventItem[];
      }
      return [];
    }

    const rawEvents = await prisma.event.findMany({
      include: { winners: true },
      orderBy: { date: "asc" }
    });

    const todayDate = new Date();
    todayDate.setHours(0,0,0,0);

    const upcoming: EventItem[] = [];
    const past: EventItem[] = [];

    for (const e of rawEvents) {
      let status = e.status;
      
      // Auto-transition to past
      if (status === "upcoming" && e.date < todayDate) {
        status = "past";
        // Update DB in background seamlessly
        prisma.event.update({ where: { id: e.id }, data: { status: "past" } }).catch(console.error);
      }

      const formatted: EventItem = {
        ...e,
        date: e.date.toISOString().split('T')[0] || e.date.toISOString(), 
        status: status as "upcoming" | "past",
        category: e.category || undefined,
        time: e.time || undefined,
        registrationLink: e.registrationLink || undefined,
        winners: e.winners.map((w: { rank: string; teamName: string; members: string[]; photo: string | null }) => ({
          rank: w.rank,
          teamName: w.teamName,
          members: w.members,
          photo: w.photo || undefined
        }))
      };

      if (status === "upcoming") {
        upcoming.push(formatted);
      } else {
        past.push(formatted);
      }
    }

    // Sort past descending
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [...upcoming, ...past] as EventItem[];
  } catch (error: any) {
    console.error("Failed to fetch events", error);
    return [];
  }
}

// ── Form Submissions ───────────────────────────────────────────

export type FormSubmissionData = {
  id: string;
  eventId: string;
  data: Record<string, unknown>;
  submitted: string;
};

export async function submitFormResponse(eventId: string, formData: Record<string, unknown>) {
  try {
    await prisma.formSubmission.create({
      data: {
        eventId,
        data: formData as any,
      },
    });
    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Form submission failed:", error);
    return { success: false, error: errorMessage };
  }
}

export async function getFormSubmissions(eventId: string): Promise<FormSubmissionData[]> {
  try {
    const submissions = await prisma.formSubmission.findMany({
      where: { eventId },
      orderBy: { submitted: "desc" },
    });
    return submissions.map((s: { id: string; eventId: string; data: unknown; submitted: Date }) => ({
      id: s.id,
      eventId: s.eventId,
      data: s.data as Record<string, unknown>,
      submitted: s.submitted.toISOString(),
    }));
  } catch (error: unknown) {
    console.error("Failed to fetch submissions:", error);
    return [];
  }
}

export async function getSubmissionCount(eventId: string): Promise<number> {
  try {
    return await prisma.formSubmission.count({ where: { eventId } });
  } catch {
    return 0;
  }
}

export async function exportSubmissionsCSV(eventId: string): Promise<string> {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        FormField: true,
        submissions: {
          orderBy: { submitted: "desc" },
          select: {
            data: true,
            submitted: true,
            id: true
          }
        }
      }
    });

    if (!event || !event.submissions || event.submissions.length === 0) return "";

    // Check if FormField exists, if not use default fields
    interface FormField {
      id: string;
      label: string;
    }
    const schema = (event.FormField && event.FormField.length > 0) ? (event.FormField as unknown as FormField[]) : null;
    const fieldLabels = schema
      ? schema.map((f: FormField) => f.label)
      : ["Name", "Email", "Phone", "College"];

    const fieldKeys = schema
      ? schema.map((f: FormField) => f.id)
      : ["name", "email", "phone", "college"];

    const header = ["#", "Submitted At", ...fieldLabels].join(",");
    const rows = event.submissions.map((s: { data: unknown; submitted: Date }, i: number) => {
      const data = s.data as Record<string, unknown>;
      const values = fieldKeys.map((key: string) => {
        const val = data[key] ?? "";
        const str = Array.isArray(val) ? val.join("; ") : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      });
      return [i + 1, s.submitted.toISOString(), ...values].join(",");
    });

    return [header, ...rows].join("\n");
  } catch (error: unknown) {
    console.error("CSV export failed:", error);
    return "";
  }
}
