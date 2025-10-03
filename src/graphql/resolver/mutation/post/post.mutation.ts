import { postUserMutation } from "../../../mutation/post.mutation";
import serverMiddleware from "../../../../middleware/auth.middeware";

export const postMutation = {
  postUser: (_parent: any, args: any, context: any, _info: any) => {
    const token = context.token;
    return serverMiddleware(token).then(
      async ({ data, status }: { data: any; status: boolean }) => {
        const isBooleanStatus = typeof status === "boolean";
        if (isBooleanStatus && status) {
          return await postUserMutation(args, data);
        } else {
          return null;
        }
      }
    );
  },
};
