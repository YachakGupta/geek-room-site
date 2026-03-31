"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type TeamCategory = "Core" | "Heads" | "Tech" | "Publicity" | "Design" | "Management";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  category: TeamCategory;
  photo: string;
  gmail: string;
  linkedin: string;
};

export async function getMembers(): Promise<TeamMember[]> {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is missing. Falling back to local team.json");
      const fs = require('fs');
      const path = require('path');
      const dataPath = path.join(process.cwd(), 'data', 'team.json');
      if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as TeamMember[];
      }
      return [];
    }

    const members = await prisma.teamMember.findMany({
      orderBy: { id: "asc" }
    });
    // Typecast back to the specific Next.js component contract expectations seamlessly
    return members as unknown as TeamMember[];
  } catch (error: any) {
    console.error("Failed to fetch team members: Database connection or Prisma query failed.", error);
    return [];
  }
}

export async function addMember(memberData: Omit<TeamMember, "id">) {
  try {
    await prisma.teamMember.create({
      data: memberData
    });

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to add team member:", error);
    return { success: false, error: error.message };
  }
}

export async function updateMember(id: number, memberData: Partial<TeamMember>) {
  try {
    await prisma.teamMember.update({
      where: { id },
      data: memberData
    });

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update team member:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMember(id: number) {
  try {
    await prisma.teamMember.delete({
      where: { id }
    });

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete team member:", error);
    return { success: false, error: error.message };
  }
}
