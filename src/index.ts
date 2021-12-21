import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { resolvers } from "./resolvers";
import { authChecker, connect, verifyJwt } from "./utils";
import { Context } from "./types";
import { User } from "./schemas";

async function main() {
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  const app = express();

  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      if (ctx.req.headers["authorization"]) {
        const user = verifyJwt<User>(ctx.req.headers["authorization"]);
        ctx.user = user as User;
        return ctx;
      }
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Up...");
  });

  await connect();
}

main().catch((err) => console.log("kh:", err));
