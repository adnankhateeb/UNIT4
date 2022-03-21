const mongoose = require('mongoose');
const multer  = require('multer')
const upload = multer({ dest: '' })

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    age: { type: Number, required: true },
    email: { type: Number, required: true, unique: true },
    profileImages: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = new mongoose.model('user', userSchema);

module.exports = User;
