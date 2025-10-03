import { healthQueryResolver } from "./health.query";
import { postQueryResolver } from "./post.query";
import { userQueryResolver } from "./user.query";

export const baseQueryResolver = {
  ...healthQueryResolver,
  ...userQueryResolver,
  ...postQueryResolver,
};
