import { IAuthCreate } from "../../interface/auth.interface";

async function createUserMutation(payload: IAuthCreate) {
  console.log(payload);
}

export { createUserMutation };
