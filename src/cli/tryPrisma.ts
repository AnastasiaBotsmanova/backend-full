/* eslint-disable no-console */
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// yarn ts-node-dev src/cli/tryPrisma.ts

// A `main` function so that you can use async/await
async function main() {
  await prisma.user.create({data: {
    name: 'Вася',
    email: 'vasya@test.com',
  }});
  const allUsers = await prisma.user.findMany();
  // use `console.dir` to print nested objects
  console.dir(allUsers, {depth: null});
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
