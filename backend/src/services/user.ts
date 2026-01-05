import { prismaClient } from "../lib/db.js";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export default class UserService {
  private static hashPassword(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  static async createUser(payload: CreateUserPayload) {
  const salt = randomBytes(32).toString("hex");
  const hashedPassword = this.hashPassword(salt, payload.password);

  return prismaClient.user.create({
    data: {
      firstName: payload.firstName,
      lastName: payload.lastName ?? null, // ✅ FIX
      email: payload.email,
      password: hashedPassword,
      salt,
    },
  });
}

  static async login(payload: LoginPayload) {
    const user = await prismaClient.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) throw new Error("User not found");

    const hashedPassword = this.hashPassword(user.salt, payload.password);
    if (hashedPassword !== user.password) {
      throw new Error("Invalid credentials");
    }

    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string
    );
  }

  static decodeJWT(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };
  }
}
