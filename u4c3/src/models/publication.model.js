const mongoose = require('mongoose');

const publicationModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Publication = new mongoose.model('publication', publicationModel);

module.exports = Publication;
