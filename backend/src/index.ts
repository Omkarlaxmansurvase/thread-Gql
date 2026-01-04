import express from "express";
// import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
// import { prismaClient } from "./lib/db.js";
import createApolloServer from "./graphql/index.js";

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 3000;
    app.use(express.json());

    

    

    app.get("/", (req, res) => {
        res.send("Hello, World!");
    });

    app.use("/graphql", expressMiddleware(await createApolloServer()));

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
}

init();