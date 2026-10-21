import { createPrismaClient } from "./lib/prisma.js";

// type Binding = {
//     DATABASE_URL= string;
// }
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
    
}

export const prisma = createPrismaClient(databaseUrl)