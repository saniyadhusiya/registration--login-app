import bcrypt from "bcryptjs";

export const generateUserId = (name) => {
  return name + Math.floor(1000 + Math.random() * 9000);
};

export const generatePassword = async () => {
  const random = Math.random().toString(36).slice(-8);
  const hashed = await bcrypt.hash(random, 10);
  return { random, hashed };
};
