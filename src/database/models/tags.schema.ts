import mongoose from "mongoose";
import { logEmptyAttribute } from "../../utils/common.utils";

const tagsSchema = new mongoose.Schema({
  tags: {
    type: [String],
    required: [true, logEmptyAttribute("tags")],
  },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },

  tagsCreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  tagsCreatedAt: {
    type: Date,
    default: new Date(),
  },
});

const tagsModel = mongoose.model("Tags", tagsSchema);
export default tagsModel;
