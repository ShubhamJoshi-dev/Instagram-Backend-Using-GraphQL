import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `The Name Field is Missing`],
  },
  email: {
    type: String,
    required: [true, `The Email is Missing`],
  },
  password: {
    type: String,
    required: [true, `The Password is Missing`],
  },
});

const userModel = mongoose.model("Users", userSchema);
export default userModel;
