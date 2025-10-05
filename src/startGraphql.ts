import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer, BaseContext } from "@apollo/server";
import { ErrorAnyType } from "./types/types";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerAbstract } from "./abstraction/apollo.abstract";
import { baseConnector } from "./base/base.connect";
import getRedisInstance from "./redis/redis.connect";
import graphLogger from "./libs/logger.libs";
import express from "express";
import http from "http";
import apolloConfig from "./config/apollo.config";
import { getEnvValue } from "./utils/env.utils";

class StartApolloServer implements ApolloServerAbstract {
  public async startGraphQLServer(): Promise<void> {
    try {
      const app = express();
      const httpServer = http.createServer(app);
      const server = new ApolloServer<BaseContext>(
        Object.assign(apolloConfig, {
          plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        })
      );
      const { status } = await baseConnector();
      await server.start();
      app.use(
        "/",
        express.json(),
        express.urlencoded({ extended: true }),
        expressMiddleware(server, {
          context: async ({ req }) => ({ token: req.headers.token }),
        })
      );
      httpServer.listen(
        { port: parseInt(getEnvValue("PORT") as string, 10) },
        () => {
          graphLogger.info(
            `Apollo Server is Running on the URL: http://localhost:${getEnvValue(
              "PORT"
            )}/graphql with the Connector Base Status : ${status}`
          );
        }
      );
    } catch (err: ErrorAnyType) {
      graphLogger.error(
        `Error Starting the Apollo Server, Due To: ${err.message}`
      );
      process.exit(1);
    }
  }
}

const getApolloInstance = (): StartApolloServer => {
  return new StartApolloServer();
};

export default getApolloInstance;
