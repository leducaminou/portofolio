// Initial admin accounts. The shared password comes from the environment (never commit it).
const password = process.env.SEED_USERS_PASSWORD;
if (!password) throw new Error("SEED_USERS_PASSWORD is not set");

export const usersData = [
  { email: "leducaminou2@gmail.com", password },
  { email: "adrienmandak@gmail.com", password },
  { email: "remyjunior386@gmail.com", password },
];
