import { healthResolver } from "../../resolvers/health.resolver";
import { baseMutationResolver } from "./mutation/base.mutation";
import { baseQueryResolver } from "./queries/base.query";

export const resolvers = {
  Query: {
    ...baseQueryResolver,
  },
  Mutation: {
    ...baseMutationResolver,
  },
};
