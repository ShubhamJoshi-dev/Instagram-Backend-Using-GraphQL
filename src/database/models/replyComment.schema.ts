import mongoose from "mongoose";
import { logEmptyAttribute } from "../../utils/common.utils";

const reployCommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, logEmptyAttribute("Comment")],
  },
});

const replyCommentModel = mongoose.model("ReplyComment", reployCommentSchema);
export default replyCommentModel;
