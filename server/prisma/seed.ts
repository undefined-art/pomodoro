// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Example: Creating a test user
  await prisma.user.create({
    data: {
      email: 'test',
      username: 'testuser',
      hash: 'qrwqwrqwr',
    },
  });

  // Example: Creating test tasks
  await prisma.task.create({
    data: { title: 'Task 1', completed: false, createdBy: 1 },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
