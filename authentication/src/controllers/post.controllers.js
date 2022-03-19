const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const Post = require('../models/post.models');

router.post('', authenticate, async (req, res) => {
  req.body.user_id = req.userID;
  try {
    const post = await Post.create(req.body);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get('', authenticate, async (req, res) => {
  try {
    const post = await Post.find().populate({
      path: 'userId',
      select: { name: true, _id: 0, email: true },
    });
    return res.status(200).send(post);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.patch('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
    });
    return res.status(200).send(post);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
