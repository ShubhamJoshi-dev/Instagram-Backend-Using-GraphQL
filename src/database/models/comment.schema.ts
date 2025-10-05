import mongoose from "mongoose";
import { logEmptyAttribute } from "../../utils/common.utils";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, logEmptyAttribute("Comment")],
  },

  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  commentCreatedAt: {
    type: Date,
    default: new Date(),
  },

  commentUpdatedAt: {
    type: Date,
    default: new Date(),
  },

  replyComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReplyComment",
    },
  ],

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],

  unlikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unlikes",
    },
  ],
});

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel;
