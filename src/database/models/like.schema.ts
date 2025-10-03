import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  likeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  likeAt: {
    type: Date,
    default: new Date(),
  },
});

const likeModel = mongoose.model("Likes", likeSchema);
export default likeModel;
