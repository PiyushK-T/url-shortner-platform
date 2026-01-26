import bcrypt from "bcrypt";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
// import { env } from "../../config/env";
import { getEnv } from "../../config/env";
const env = getEnv();

type User = {
  email: string;
  passwordHash: string;
};

const users = new Map<string, User>();

export async function register(email: string, password: string) {
  if (users.has(email)) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.set(email, { email, passwordHash });

  return { email };
}

export async function login(email: string, password: string) {
  const user = users.get(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    throw new Error("Invalid credentials");
  }

const secret: Secret = env.JWT_SECRET as Secret;

const options: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN ? parseInt(env.JWT_EXPIRES_IN, 10) : "1h"
};

const token = jwt.sign({ email }, secret, options);

  return { token };
}
