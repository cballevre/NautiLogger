import { copycat } from '@snaplet/copycat';
import { createSeedClient } from '@snaplet/seed';
import bcrypt from 'bcryptjs';

import { boatSystemList } from '../../src/models/boat-system.ts';

const hashPassword = async (password: string) => {
  const saltRounds = 6;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const main = async () => {
  const seed = await createSeedClient({ dryRun: true });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const authenticatedUser = {
    instance_id: '00000000-0000-0000-0000-000000000000',
    aud: 'authenticated',
    role: 'authenticated',
    email_confirmed_at: new Date(),
    raw_app_meta_data: {
      provider: 'email',
      providers: ['email'],
    },
    raw_user_meta_data: {
      email_verified: true,
    },
    banned_until: null,
  };

  const { users } = await seed.users([
    {
      email: 'loick.perron@example.com',
      encrypted_password: await hashPassword('password'),
      ...authenticatedUser,
    },
    {
      email: 'alain.gautier@example.com',
      encrypted_password: await hashPassword('password'),
      ...authenticatedUser,
    },
  ]);

  const { boats } = await seed.boats(
    (x) =>
      x(4, ({ seed }) => ({
        name: copycat.firstName(seed),
        interventions: [{}, {}],
      })),
    { connect: { users } },
  );

  await seed.equipments(
    (x) =>
      x(50, ({ seed }) => ({
        name: copycat.lastName(seed),
        system_key:
          boatSystemList[Math.floor(Math.random() * boatSystemList.length)],
      })),
    { connect: { boats } },
  );

  process.exit();
};

main();
