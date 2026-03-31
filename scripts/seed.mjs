import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Team
  const teamPath = path.join(__dirname, '..', 'data', 'team.json');
  if (fs.existsSync(teamPath)) {
    const teamData = JSON.parse(fs.readFileSync(teamPath, 'utf8'));
    for (const member of teamData) {
      await prisma.teamMember.upsert({
        where: { id: member.id },
        update: {},
        create: {
          id: member.id,
          name: member.name,
          role: member.role || "",
          category: member.category,
          photo: member.photo,
          gmail: member.gmail || "",
          linkedin: member.linkedin || ""
        }
      });
    }
    console.log(`Successfully seeded ${teamData.length} team members.`);
  }

  // Seed Events
  const eventsPath = path.join(__dirname, '..', 'data', 'events.json');
  if (fs.existsSync(eventsPath)) {
    const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    for (const event of eventsData) {
      // Upsert event
      const createdEvent = await prisma.event.upsert({
        where: { id: event.id },
        update: {},
        create: {
          id: event.id,
          title: event.title,
          description: event.description,
          date: new Date(event.date),
          status: event.status,
          category: event.category || "unknown",
          image: event.image,
          location: event.location,
          time: event.time || "",
          gallery: event.gallery || []
        }
      });

      // Insert winners if they exist
      if (event.winners) {
        for (const winner of event.winners) {
          // just create, since we don't have a unique constraint on rank+eventId
          await prisma.winner.create({
            data: {
              eventId: createdEvent.id,
              rank: winner.rank,
              teamName: winner.teamName,
              photo: winner.photo || null,
              members: winner.members || []
            }
          });
        }
      }
    }
    console.log(`Successfully seeded ${eventsData.length} events.`);
  }

  console.log("Database seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
