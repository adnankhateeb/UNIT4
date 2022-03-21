const mongoose = require('mongoose');

const { body, validationResult } = require('express-validator');
const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

router.get('', async (req, res) => {
  try {
    const user = await User.find().lean().exec();

    return res.status(200).send(user);
  } catch (er) {
    return res.status(500).send(er.message);
  }
});


module.exports = router;
