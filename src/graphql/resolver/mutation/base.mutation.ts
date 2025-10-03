import { authMutation } from "./user/auth.mutation";
import { postMutation } from "./post/post.mutation";

export const baseMutationResolver = {
  ...authMutation,
  ...postMutation,
};
