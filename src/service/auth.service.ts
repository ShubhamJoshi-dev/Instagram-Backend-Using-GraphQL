import bcrypt from "bcrypt";
import { IAuthCreate, IAuthLogin } from "../interface/auth.interface";
import getBcryptInstances from "../helpers/bcrypt.helper";
import StatusCode from "http-status-codes";
import getPayloadInstances from "../helpers/payload.helper";
import getBaseQuery from "../database/operations/base";
import userModel from "../database/models/user.schema";
import { excludeKeysFromObject } from "../utils/common.utils";
import getJWTInstance from "../helpers/jwt.helper";
import userProfileModel from "../database/models/userProfile.schema";

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

  const saveUserId = saveResult._doc._id;

  const userProfilePayload = Object.preventExtensions({
    userProfileName: name,
    primaryEmail: email,
    userId: saveUserId,
  });

  const saveProfileResult = await createInstance.createPayload(
    userProfilePayload,
    userProfileModel
  );

  return {
    user: excludeKeysFromObject(saveResult._doc, "_id,__v"),
  };
}

async function loginUserService(args: { user: IAuthLogin }) {
  const { name, password } = args.user;

  const baseInstance = getBaseQuery();
  const jwtInstance = getJWTInstance();
  const payloadInstance = getPayloadInstances();
  const bcryptInstance = getBcryptInstances();

  const selectQuery = await baseInstance.getSelect();

  const isNameExists = await selectQuery.findOne("name", name, userModel);

  if (!isNameExists) {
    const errorMessage = `The Name : ${name} Does not Exists on the Syste,`;
    const errorCode = StatusCode.BAD_REQUEST;
    return payloadInstance.createErrorPayload(errorMessage, errorCode);
  }

  const compareStatus = await bcryptInstance.comparePassword(
    password,
    isNameExists._doc.password
  );

  const isInvalidPassword =
    typeof compareStatus === "boolean" && !compareStatus;

  if (isInvalidPassword) {
    const errorMessage = `The Password Does not Match , Please Enter the Correct Password`;
    const errorCode = StatusCode.UNAUTHORIZED;
    return payloadInstance.createErrorPayload(errorMessage, errorCode);
  }

  const jwtPayload = Object.preventExtensions({
    name: isNameExists._doc.name,
    email: isNameExists._doc.email,
    userId: isNameExists._doc._id,
  });

  const [accessToken, refreshToken] = await Promise.all([
    jwtInstance.createAccessToken(jwtPayload),
    jwtInstance.createRefreshToken(jwtPayload),
  ]);

  const payload = {
    tokens: {
      accessToken,
      refreshToken,
    },
  };

  return payload;
}

export { createUserService, loginUserService };
