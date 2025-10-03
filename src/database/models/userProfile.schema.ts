import mongoose from "mongoose";
import { logEmptyAttribute } from "../../utils/common.utils";

const userProfileSchema = new mongoose.Schema({
  userProfileName: {
    type: String,
    required: [true, logEmptyAttribute("User Profile Names")],
  },

  primaryEmail: {
    type: String,
    required: [true, logEmptyAttribute("Primary Email")],
  },

  secondaryEmail: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  isDeactivated: {
    type: Boolean,
    default: false,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const userProfileModel = mongoose.model("UserProfile", userProfileSchema);

export default userProfileModel;
