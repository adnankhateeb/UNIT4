const { body, validationResult } = require('express-validator');
const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const Comment = require('../models/comment.model');

router.post('',  async (req, res) => {
  try {
    //   const user = await User.create(req.body)
    const comment = await Comment.create({
      body: req.body.body,
      userId: req.file.userId,
      bookId: req.body.content,
    });
    return res.status(200).send(comment);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
