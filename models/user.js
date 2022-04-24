const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Normal",
    },
    cart: {
      type: Array,
      default: [],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    nickname: String,
    phone: String,
    profileImage: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
