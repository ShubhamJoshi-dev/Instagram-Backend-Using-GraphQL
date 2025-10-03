import serverMiddleware from "../../../middleware/auth.middeware";
import { getAllPostService } from "../../mutation/post.mutation";

export const postQueryResolver = {
  posts: (_parent: any, args: any, context: any, _info: any) => {
    const token = context.token;
    return serverMiddleware(token).then(
      async ({ data, status }: { data: any; status: boolean }) => {
        const isBooleanStatus = typeof status === "boolean";
        if (isBooleanStatus && status) {
          return await getAllPostService();
        } else {
          return null;
        }
      }
    );
  },
};

