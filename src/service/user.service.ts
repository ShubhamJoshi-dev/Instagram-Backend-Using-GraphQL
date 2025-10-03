import userModel from "../database/models/user.schema";
import userProfileModel from "../database/models/userProfile.schema";
import getBaseQuery from "../database/operations/base";
import StatusCode from "http-status-codes";
import getPayloadInstances from "../helpers/payload.helper";
import {
  IDecodedPayload,
  IUser,
  IUserProfile,
} from "../interface/auth.interface";
import { includeKeyIntoObjects } from "../utils/common.utils";

async function getUserService(payload: Partial<IDecodedPayload>): Promise<
  | {
      user: IUser;
      userProfile: IUserProfile;
    }
  | {
      error: {
        message: string;
        code: number;
      };
    }
> {
  const { userId } = payload;

  const apiPayload = {
    user: {} as IUser,
    userProfile: {} as IUserProfile,
  };

  const baseInstance = getBaseQuery();
  const payloadInstance = getPayloadInstances();

  const selectInstance = await baseInstance.getSelect();

  const userData = await selectInstance.findOne("_id", userId, userModel);

  const isEmptyUserData = typeof userData === "object" && !userData;

  if (isEmptyUserData) {
    const errorMessage = `The User Does not Exists on the System`;
    const errorStatusCode = StatusCode.BAD_REQUEST;
    return payloadInstance.createErrorPayload(errorMessage, errorStatusCode);
  }

  const excludedPayload = includeKeyIntoObjects(
    userData._doc,
    "name",
    "email",
    "password"
  );

  const userProfileData = await selectInstance.findOne(
    "userId",
    userId,
    userProfileModel
  );

  const userProfileExcludedPayload = includeKeyIntoObjects(
    userProfileData._doc,
    "userProfileName",
    "primaryEmail",
    "isDeleted",
    "isDeactivated"
  );

  const isUserProfileNull =
    Object.entries(apiPayload["user"]).length === 0 &&
    Object.entries(apiPayload["userProfile"]).length === 0;

  if (isUserProfileNull) {
    apiPayload["user"] = excludedPayload;
    apiPayload["userProfile"] = userProfileExcludedPayload;
  }

  return apiPayload;
}

export { getUserService };
