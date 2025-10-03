import serverMiddleware from "../../../../middleware/auth.middeware";
import { commentPostMutation } from "../../../mutation/comment.mutation";

export const commentMutation = {
  commentPost: (_parent: any, args: any, context: any, _info: any) => {
    const token = context.token;
    return serverMiddleware(token).then(
      async ({ data, status }: { data: any; status: boolean }) => {
        const isBooleanStatus = typeof status === "boolean";
        if (isBooleanStatus && status) {
          return await commentPostMutation(args, data);
        } else {
          return null;
        }
      }
    );
  },
};
