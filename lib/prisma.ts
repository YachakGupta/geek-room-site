import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Ensure the client always has access to the DATABASE_URL even if env() fails in schema.prisma on Vercel
const getPrismaClient = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

// Prevent multiple PrismaClient instances in development
let prismaInstance: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prismaInstance = getPrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = getPrismaClient();
  }
  prismaInstance = globalThis.prisma;
}

export const prisma = prismaInstance;
export default prismaInstance;
