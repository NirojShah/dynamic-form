import { model, Schema } from "mongoose";

const UserModel = new Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: [true, "Organization is required."],
  },
  role: {
    type: [],
  },
});

const User = model("Users", UserModel);

export default User;
