import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting data migration from JSON -> PostgreSQL...");

  // 1. Migrate Team Members
  try {
    const teamFile = await fs.readFile(path.join(process.cwd(), "data", "team.json"), "utf8");
    const teamMembers = JSON.parse(teamFile);
    
    // Clear existing to avoid duplicates if run multiple times
    await prisma.teamMember.deleteMany();
    
    // We map id explicitly if it is integer to preserve links if any
    for (const member of teamMembers) {
      await prisma.teamMember.create({
        data: {
          name: member.name,
          role: member.role,
          category: member.category,
          photo: member.photo,
          gmail: member.gmail,
          linkedin: member.linkedin,
        }
      });
    }
    console.log(`✅ Migrated \${teamMembers.length} team members.`);
  } catch (err: any) {
    if (err.code === 'ENOENT') console.log("⚠️ No team.json found, skipping.");
    else console.error("❌ Failed team migration:", err);
  }

  // 2. Migrate Settings
  try {
    const settingsFile = await fs.readFile(path.join(process.cwd(), "data", "settings.json"), "utf8");
    // Settings is usually just { hideJoin: true }
    // We store stringified json in the `value` or map it.
    await prisma.setting.deleteMany();
    await prisma.setting.create({
      data: {
        key: 'global_settings',
        value: settingsFile
      }
    });
    console.log(`✅ Migrated settings.`);
  } catch (err: any) {
    if (err.code === 'ENOENT') console.log("⚠️ No settings.json found, skipping.");
    else console.error("❌ Failed settings migration:", err);
  }

  // 3. Migrate Events
  try {
    const eventsFile = await fs.readFile(path.join(process.cwd(), "data", "events.json"), "utf8");
    const events = JSON.parse(eventsFile);
    
    await prisma.event.deleteMany();

    for (const event of events) {
      // Setup winners to create inline
      const winnersData = event.winners ? event.winners.map((w: any) => ({
        rank: w.rank,
        teamName: w.teamName,
        members: w.members || [],
        photo: w.photo || null
      })) : [];

      await prisma.event.create({
        data: {
          id: event.id,
          title: event.title,
          description: event.description,
          date: new Date(event.date),
          location: event.location,
          registrationLink: event.registrationLink || null,
          image: event.image,
          status: event.status, // "upcoming" or "past"
          category: event.category || "hackathon",
          time: event.time || null,
          registrationOpen: event.registrationOpen !== false,
          gallery: event.gallery || [],
          winners: {
            create: winnersData
          }
        }
      });
    }
    console.log(`✅ Migrated \${events.length} events with their winners.`);
  } catch (err: any) {
    if (err.code === 'ENOENT') console.log("⚠️ No events.json found, skipping.");
    else console.error("❌ Failed events migration:", err);
  }

  console.log("🎉 Migration complete!");
}

main()
  .catch((e) => {
    console.error("Migration fatal error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
