import {
  createUserMutation,
  loginUserMutation,
} from "../../../mutation/auth.mutation";

export const authMutation = {
  createUser: (_parent: any, args: any, _context: any, _info: any) => {
    return createUserMutation(args);
  },
  loginUser: (_parent: any, args: any, _context: any, _info: any) => {
    return loginUserMutation(args);
  },
};
