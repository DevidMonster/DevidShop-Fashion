const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: {
      type: String,
      default: null
    },
    state:  {
      type: String,
      default: null
    },
    country:  {
      type: String,
      default: null
    },
    occupation:  {
      type: String,
      default: null
    },
    phoneNumber:  {
      type: String,
      required: true
    },
    transactions: Array,
    avatar:  {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;