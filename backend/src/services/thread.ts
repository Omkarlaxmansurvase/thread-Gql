import { prismaClient } from "../lib/db.js";

export default class ThreadService {
  static create(content: string, userId: number) {
    return prismaClient.thread.create({
      data: {
        content,
        authorId: userId,
      },
    });
  }

  static getAll() {
    return prismaClient.thread.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static getById(id: number) {
    return prismaClient.thread.findUnique({
      where: { id },
    });
  }

  static async delete(id: number, userId: number) {
    const thread = await prismaClient.thread.findUnique({ where: { id } });

    if (!thread || thread.authorId !== userId) {
      throw new Error("Not authorized");
    }

    await prismaClient.thread.delete({ where: { id } });
    return true;
  }
}
