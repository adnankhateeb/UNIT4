const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { body, validationResult } = require('express-validator');
const express = require('express');

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

router.post(
  '',
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  body('password').not().isEmpty().withMessage('Password is required'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.findOne({ email: req.body.email });
      //checked if mail exists
      if (!user) {
        return res.status(400).send('Wrong Email or Password');
      }

      //if email exists, check password;
      const match = user.checkPassword(req.body.password);

      // if it doesn't match
      if (!match) {
        return res.status(400).send({ message: 'Wrong Email or Password' });
      }

      // if it matches
      const token = generateToken(user);
      return res.status(200).send({ user, token });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

module.exports = router;
