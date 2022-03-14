const mongoose = require('mongoose');

const fixedSchema = mongoose.Schema({
  account_number: { type: Number, required: true, unique: true },
  balance: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  masterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'master',
    required: true,
  },
  startDate: { type: Date, requied: true },
  maturityDate: { type: Date, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

const Fixed = new mongoose.model('fixed', fixedSchema);

module.exports = Fixed;
