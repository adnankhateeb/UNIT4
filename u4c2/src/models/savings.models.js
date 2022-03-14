const mongoose = require('mongoose');

const savingsSchema = mongoose.Schema({
  account_number: { type: Number, required: true, unique: true },
  balance: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  masterId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'master',
    required: true
  },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

const Saving = new mongoose.model('saving', savingsSchema);

module.exports = Saving;
