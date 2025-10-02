import { healthResolver } from "../../resolvers/health.resolver";

export const resolvers = {
  Query: {
    health: (_parent: any, args: any, context: any, info: any) => {
      return healthResolver();
    },
  },
};
