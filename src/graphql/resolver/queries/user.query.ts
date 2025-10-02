import serverMiddleware from "../../../middleware/auth.middeware";
import { getUserService } from "../../../service/user.service";

export const userQueryResolver = {
  user: (_parent: any, args: any, context: any, info: any) => {
    const token = context.token;
    return serverMiddleware(token).then(
      async ({ data, status }: { data: any; status: boolean }) => {
        const isBooleanStatus = typeof status === "boolean";
        if (isBooleanStatus && status) {
          return await getUserService(data);
        } else {
          return null;
        }
      }
    );
  },
};
