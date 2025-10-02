import { authMutation } from "./user/auth.mutation";

export const baseMutationResolver = {
  ...authMutation,
};
