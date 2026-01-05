import express from "express";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import createApolloServer from "./graphql/index.js";
import UserService from "./services/user.js";

async function startServer() {
  const app = express();

  // 🔑 CORS (REQUIRED for Expo Web)
  app.use(
    cors({
      origin: "http://localhost:8081", // Expo web
      credentials: true,
    })
  );

  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(await createApolloServer(), {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) return {};

        try {
          const payload = UserService.decodeJWT(token);
          return { userId: payload.id };
        } catch {
          return {};
        }
      },
    })
  );

  app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000/graphql");
  });
}

startServer();
