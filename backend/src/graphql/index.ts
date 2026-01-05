import { ApolloServer } from "@apollo/server";
import user from "./user/index.js";
import thread from "./thread/index.js";

export default async function createApolloServer() {
  const server = new ApolloServer({
    typeDefs: [user.typedefs, thread.typedefs],
    resolvers: [user.resolvers, thread.resolvers],
  });

  
  await server.start();

  return server;
}
