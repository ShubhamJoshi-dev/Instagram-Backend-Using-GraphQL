import mongoose from "mongoose";

const unlikeSchema = new mongoose.Schema({
  unlikeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },

  unlikeAt: {
    type: Date,
    default: new Date(),
  },
});

const unlikeModel = mongoose.model("Unlikes", unlikeSchema);

export default unlikeModel;
