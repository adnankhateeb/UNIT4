const { body, validationResult } = require('express-validator');
const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const Book = require('../models/book.model');
const upload = require('../middlewares/uploads');

router.post('', upload.single('coverImage'), async (req, res) => {
  try {
    //   const user = await User.create(req.body)
    const book = await Book.create({
      likes: req.body.likes,
      coverImage: req.file.path,
      content: req.body.content,
      authorId: req.body.authorId,
      publicationId: req.body.publicationId,
    });
    return res.status(200).send(book);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
