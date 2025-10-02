import userModel from "../database/models/user.schema";
import getBaseQuery from "../database/operations/base";
import { IDecodedPayload } from "../interface/auth.interface";
import { includeKeyIntoObjects } from "../utils/common.utils";

async function getUserService(payload: Partial<IDecodedPayload>) {
  const { userId } = payload;

  const baseInstance = getBaseQuery();

  const selectInstance = await baseInstance.getSelect();

  const userData = await selectInstance.findOne("_id", userId, userModel);

  const excludedPayload = includeKeyIntoObjects(
    userData._doc,
    "name",
    "email",
    "password"
  );

  return excludedPayload;
}

export { getUserService };
