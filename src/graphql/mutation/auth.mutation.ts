import {
  createUserService,
  loginUserService,
} from "../../service/auth.service";

async function createUserMutation(payload: any) {
  const graphqlResponse = await createUserService(payload);
  return graphqlResponse;
}

async function loginUserMutation(payload: any) {
  const graphqlResponse = await loginUserService(payload);
  return graphqlResponse
}

export { createUserMutation , loginUserMutation};
