import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  age: Number,
  mobile: String,
  gender: String,
  email: String,
  password: String
});

export default mongoose.model("User", userSchema);
