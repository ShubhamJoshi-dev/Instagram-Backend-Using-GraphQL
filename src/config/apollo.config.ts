import { ApolloServerOptions, BaseContext } from "@apollo/server";
import { rootQuery } from "../graphql/query/root.query";
import { resolvers } from "../graphql/resolver/root.resolver";

const apolloConfig = {
  typeDefs: rootQuery,
  resolvers: resolvers,
} as ApolloServerOptions<BaseContext>;

export default apolloConfig;
