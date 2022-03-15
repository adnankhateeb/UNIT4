const express = require('express');
const { body, validationResult } = require('express-validator');

const User = require('../models/user.models');

const router = express.Router();

router.post(
  '',
  body('first_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First Name cannot be empty'),
  body('last_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First Name cannot be empty'),
  body('email')
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error('Email is already taken');
      }
      return true;
    }),
  body('age')
    .not()
    .isEmpty()
    .withMessage('Age cannot be empty')
    .isNumeric()
    .withMessage('Age must be a number between 1 and 100')
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new Error('Incorrect age provided');
      }
      return true;
    }),
  body('pincode')
    .not()
    .isEmpty()
    .withMessage('Pincode can not be empty')
    .isNumeric()
    .withMessage('Please enter a valid pincode')
    .isLength({ min: 6, max: 6 })
    .withMessage('Pincode must be 6 digits long'),
  async (req, res) => {
    try {
      console.log(body('first_name'));
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

router.get('', async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

module.exports = router;
