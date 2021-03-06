const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    pincode: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Others'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = new mongoose.model('user', userSchema);
module.exports = User;
