const mongoose = require('mongoose');

const masterSchema = mongoose.Schema({
  balance: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'branch',
    required: true,
  },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

const Master = new mongoose.model('master', masterSchema);

module.exports = Master;
