import { ApolloServer, BaseContext } from "@apollo/server";
import { ErrorAnyType } from "./types/types";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerAbstract } from "./abstraction/apollo.abstract";
import { baseConnector } from "./base/base.connect";
import graphLogger from "./libs/logger.libs";
import apolloConfig from "./config/apollo.config";

class StartApolloServer implements ApolloServerAbstract {
  public async startGraphQLServer(): Promise<void> {
    try {
      const server = new ApolloServer<BaseContext>(apolloConfig);
      const { url } = await startStandaloneServer(server);
      const { status } = await baseConnector();
      graphLogger.info(
        `Apollo Server is Running on the URL: ${url} with the Connector Base Status : ${status}`
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
