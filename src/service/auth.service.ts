import bcrypt from "bcrypt";
import { IAuthCreate } from "../interface/auth.interface";
import getBcryptInstances from "../helpers/bcrypt.helper";
import StatusCode from "http-status-codes";
import getPayloadInstances from "../helpers/payload.helper";
import getBaseQuery from "../database/operations/base";
import userModel from "../database/models/user.schema";
import { excludeKeysFromObject } from "../utils/common.utils";

async function createUserService(args: { user: IAuthCreate }) {
  const { name, email, password } = args.user;

  const payloadInstance = getPayloadInstances();
  const bcryptInstances = getBcryptInstances();

  const baseInstance = getBaseQuery();

  const selectInstance = await baseInstance.getSelect();
  const createInstance = await baseInstance.getCreate();

  const isNameExists = await selectInstance.findOne("name", name, userModel);

  if (isNameExists) {
    const errorMessage = `The Name : ${name} Already Exists , Please Enter Different Name`;
    const errorCode = StatusCode.BAD_REQUEST;
    return payloadInstance.createErrorPayload(errorMessage, errorCode);
  }

  const isEmailExists = await selectInstance.findOne("email", email, userModel);
  if (isEmailExists) {
    const errorMessage = `The Email : ${email} Already Exists , Please Enter Different Email`;
    const errorCode = StatusCode.BAD_REQUEST;
    return payloadInstance.createErrorPayload(errorMessage, errorCode);
  }

  const encryptedValue = await bcryptInstances.encryptPassword(password);

  const createPayload: IAuthCreate = Object.seal({
    name: name,
    email: email,
    password: encryptedValue,
  });

  const saveResult = await createInstance.createPayload(
    createPayload,
    userModel
  );

  return {
    user: excludeKeysFromObject(saveResult._doc, "_id,__v"),
  };
}

export default createUserService;
