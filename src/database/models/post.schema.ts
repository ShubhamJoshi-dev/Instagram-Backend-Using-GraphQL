import mongoose from "mongoose";
import { logEmptyAttribute } from "../../utils/common.utils";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, logEmptyAttribute("Title")],
  },

  description: {
    type: String,
    required: [true, logEmptyAttribute("Description")],
  },

  tags: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags",
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
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

  createdAt: {
    type: Date,
    default: new Date(),
  },

  updatedAt: {
    type: Date,
    default: new Date(),
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const postModel = mongoose.model("Posts", postSchema);

export default postModel;
