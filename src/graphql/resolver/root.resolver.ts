import { healthResolver } from "../../resolvers/health.resolver";

export const resolvers = {
  Query: {
    health: (_parent: any, _args: any, _context: any, _info: any) => {
      return healthResolver();
    },
  },
};
