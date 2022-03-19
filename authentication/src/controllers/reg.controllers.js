const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {body, validationResult} = require('express-validator');
const express = require('express');

const router = express.Router();
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

router.post(
  '',
  body('name').trim().not().isEmpty().withMessage('Name cannot be empty'),
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .custom((value) => {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      if (!value.match(passw)) {
        throw new Error('Password must be strong');
      }
      return true;
    })
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('Password and confirm password should match');
      }
      return true;
    }),
  async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      let user = await User.findOne({ email: req.body.email });

      //checking email
      if (user) {
        return res.status(400).send({ message: 'Email already exists' });
      }

      // if new user, create it or allow to register;
      user = await User.create(req.body);

      const token = generateToken(user);
      return res.status(200).send({ user, token });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

module.exports = router;
