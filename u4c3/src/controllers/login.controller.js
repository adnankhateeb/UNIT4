const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const express = require('express');

const router = express.Router();


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
      if (!user) {
        return res.status(400).send('Wrong Email or Password');
      }

      const match = user.checkPassword(req.body.password);

      if (!match) {
        return res.status(400).send({ message: 'Wrong Email or Password' });
      }

      return res.status(200).send({ user });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

module.exports = router;