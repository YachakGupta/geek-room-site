import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const buckets = await prisma.$queryRawUnsafe("SELECT id, name, public FROM storage.buckets;");
    console.log("BUCKETS IN DATABASE:", buckets);
  } catch (e) {
    console.error("Error checking buckets:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
