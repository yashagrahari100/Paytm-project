import { prisma } from '../src/index';
import bcrypt from 'bcrypt';

async function main() {
  const alicePassword = await bcrypt.hash('alice', 10);
  const bobPassword = await bcrypt.hash('bob', 10);

  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {
      password: alicePassword,
      name: 'alice',
    },
    create: {
      number: '9999999999',
      password: alicePassword,
      name: 'alice',
      balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: 'Success',
          amount: 20000,
          token: '122',
          provider: 'HDFC Bank',
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {
      password: bobPassword,
      name: 'bob',
    },
    create: {
      number: '9999999998',
      password: bobPassword,
      name: 'bob',
      balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: 'Failure',
          amount: 2000,
          token: '123',
          provider: 'HDFC Bank',
        },
      },
    },
  });

  console.log({ alice, bob });
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
