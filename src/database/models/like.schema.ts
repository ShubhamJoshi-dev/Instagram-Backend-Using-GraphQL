import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  likeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },

  likeAt: {
    type: Date,
    default: new Date(),
  },
});

const likeModel = mongoose.model("Likes", likeSchema);
export default likeModel;
