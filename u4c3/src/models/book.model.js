const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    likes: { type: Number, required: true, default: 0 },
    coverImage: { type: String, required: false },
    content: { type: String, required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    publicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'publication',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = new mongoose.model('book', bookSchema);

module.exports = Book;
