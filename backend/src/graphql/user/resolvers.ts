import UserService from "../../services/user.js";
import { prismaClient } from "../../lib/db.js";

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { userId }: any) => {
      if (!userId) return null;
      return prismaClient.user.findUnique({ where: { id: userId } });
    },
  },

  Mutation: {
    register: (_: any, payload: any) => {
      return UserService.createUser(payload);
    },

    login: async (_: any, payload: any) => {
      const token = await UserService.login(payload);
      return { token };
    },
  },
};
