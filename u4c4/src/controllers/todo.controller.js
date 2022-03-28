const mongoose = require('mongoose');
const express = require('express');

const Todo = require('../models/todo.model');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/todo', authenticate, async (req, res) => {
  try {
    const todo = await Todo.find({}).lean().exec();

    return res.status(200).send({ todo });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

router.post('/todo', authenticate, async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    return res.status(200).send({ todo });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

router.get('/todo/:id', authenticate, authorize, async (req, res) => {
  try {
    const todo = await Todo.find({ userId: req.params.id }).lean().exec();

    return res.status(200).send({ todo });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

router.patch('/todo/:id', authenticate, authorize, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id);

    return res.status(200).send({ todo });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

router.delete('/todo/:id', authenticate, authorize, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).send({ todo });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});


module.exports = router;