import ThreadService from "../../services/thread.js";
import { prismaClient } from "../../lib/db.js";

export const resolvers = {
  Thread: {
    author: (parent: any) => {
      return prismaClient.user.findUnique({
        where: { id: parent.authorId },
      });
    },
  },

  Query: {
    getAllThreads: () => {
      return ThreadService.getAll();
    },

    getThread: (_: any, { id }: any) => {
      return ThreadService.getById(Number(id));
    },
  },

  Mutation: {
    createThread: (_: any, { content }: any, { userId }: any) => {
      if (!userId) throw new Error("Unauthorized");
      return ThreadService.create(content, userId);
    },

    deleteThread: (_: any, { id }: any, { userId }: any) => {
      if (!userId) throw new Error("Unauthorized");
      return ThreadService.delete(Number(id), userId);
    },
  },
};
