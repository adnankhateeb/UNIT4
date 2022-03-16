const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    profilePic: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = new mongoose.model('user', userSchema)
module.exports = User;
