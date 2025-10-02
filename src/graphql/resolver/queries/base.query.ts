import { healthQueryResolver } from "./health.query";
import { userQueryResolver } from "./user.query";

export const baseQueryResolver = {
  ...healthQueryResolver,
  ...userQueryResolver,
};
