import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // TODO ---
  // await prisma.user.create({
  //   data: {
  //     email: 'test@test.com',
  //     username: 'test',
  //     hash: 'qrwqwrqwr',
  //   },
  // });
  // await prisma.task.create({
  //   data: { title: 'Task 1', completed: false, createdBy: 1 },
  // });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
