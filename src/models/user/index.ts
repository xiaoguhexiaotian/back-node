// src/models/User.ts

import { mongoose } from "../../config/db.config";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
