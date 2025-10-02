import { IAuthCreate } from "../../interface/auth.interface";
import createUserService from "../../service/auth.service";

async function createUserMutation(payload: any) {
  const graphqlResponse = await createUserService(payload);
  console.log(graphqlResponse)
  return graphqlResponse;
}

export { createUserMutation };
