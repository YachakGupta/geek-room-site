"use server";

import { prisma } from "@/lib/prisma";

export async function submitTicket(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const issueType = formData.get("issueType") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !issueType || !message) {
      return { success: false, error: "All fields are required." };
    }

    const ticket = await prisma.ticket.create({
      data: {
        name,
        email,
        issueType,
        message,
      },
    });

    return { success: true, ticketId: ticket.id };
  } catch (error) {
    console.error("Error submitting ticket:", error);
    return { success: false, error: "Failed to submit ticket." };
  }
}
