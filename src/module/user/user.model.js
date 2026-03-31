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
    type: Schema.ObjectId,
    ref: "Users",
    required: [true, "Organization is required."],
  },
});

const User = model("Users", UserModel);

export default User;
