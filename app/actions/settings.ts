"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const setting = await prisma.setting.findUnique({ where: { key: "global_settings" } });
    if (setting) {
      return JSON.parse(setting.value);
    }
    return { hideJoin: true }; // Default
  } catch (e) {
    return { hideJoin: true };
  }
}

export async function setHideJoin(hideJoin: boolean) {
  try {
    const current = await getSettings();
    const newSettings = { ...current, hideJoin };
    
    await prisma.setting.upsert({
      where: { key: "global_settings" },
      update: { value: JSON.stringify(newSettings, null, 2) },
      create: { key: "global_settings", value: JSON.stringify(newSettings, null, 2) }
    });
    
    // Revalidate the entire site so layout and pages refresh
    revalidatePath("/", "layout");
    
    return hideJoin;
  } catch (error) {
    console.error("Failed to save settings:", error);
    throw new Error("Failed to save settings");
  }
}
