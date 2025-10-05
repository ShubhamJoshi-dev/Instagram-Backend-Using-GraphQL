import serverMiddleware from "../../../../middleware/auth.middeware";
import {
  likeMutation,
  unlikeMutation,
} from "../../../mutation/likeUnlike.mutation";

export const likeUnlikeMutation = {
  likePost: (_parent: any, args: any, context: any, info: any) => {
    const token = context.token;
    return serverMiddleware(token).then(
      async ({ data, status }: { data: any; status: boolean }) => {
        const isBooleanStatus = typeof status === "boolean";
        if (isBooleanStatus && status) {
          return await likeMutation(args, data);
        } else {
          return null;
        }
      }
    );
  },

  unlikePost: (_parent: any, args: any, context: any, info: any) => {
    const token = context.token;
    return serverMiddleware(token).then(
      async ({ data, status }: { data: any; status: boolean }) => {
        const isBooleanStatus = typeof status === "boolean";
        if (isBooleanStatus && status) {
          return await unlikeMutation(args, data);
        } else {
          return null;
        }
      }
    );
  },
};
