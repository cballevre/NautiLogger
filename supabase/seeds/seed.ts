import { copycat } from '@snaplet/copycat';
import { createSeedClient } from '@snaplet/seed';
import bcrypt from 'bcryptjs';

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

  const { users } = await seed.users([
    {
      instance_id: '00000000-0000-0000-0000-000000000000',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'loick.perron@example.com',
      encrypted_password: await hashPassword('password'),
      email_confirmed_at: new Date(),
      raw_app_meta_data: {
        provider: 'email',
        providers: ['email'],
      },
      raw_user_meta_data: {
        email_verified: true,
      },
      banned_until: null,
    },
    {
      aud: 'authenticated',
      role: 'authenticated',
      email: 'alain.gautier@example.com',
      encrypted_password: await hashPassword('password'),
      email_confirmed_at: new Date(),
      raw_app_meta_data: {
        provider: 'email',
        providers: ['email'],
      },
      raw_user_meta_data: {
        email_verified: true,
      },
      banned_until: null,
    },
  ]);

  await seed.boats(
    (x) =>
      x(4, ({ seed }) => ({
        name: copycat.firstName(seed),
        interventions: [{}, {}],
        equipments: [{}, {}],
      })),
    { connect: { users } },
  );

  process.exit();
};

main();
