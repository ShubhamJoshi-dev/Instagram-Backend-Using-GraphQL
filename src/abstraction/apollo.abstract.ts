export abstract class ApolloServerAbstract {
  abstract startGraphQLServer: () => Promise<void>;
}
