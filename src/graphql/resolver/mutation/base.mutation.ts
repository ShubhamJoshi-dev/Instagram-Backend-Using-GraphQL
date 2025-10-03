import { authMutation } from "./user/auth.mutation";
import { postMutation } from "./post/post.mutation";
import { commentMutation } from "./comment/comment.mutation";

export const baseMutationResolver = {
  ...authMutation,
  ...postMutation,
  ...commentMutation,
};
