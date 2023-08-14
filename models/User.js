const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    PhoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    FathersPhone: {
      type: String,
      required: true,
      unique: true,
    },

    Wallet: {
      type: Number,
      required: true,
      default: 0,
    },
    roles: {
      type: String,
      enum: ["user", "teacher", "Admin"],
      default: "user",
    },
    StudentLevel: {
      type: String,
      required: true,
    },

    enrolledCourses: [
      { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Courses" },
    ],

    WatchedVedio: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "vedios",
        match: { roles: { $in: ["user"] } },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
