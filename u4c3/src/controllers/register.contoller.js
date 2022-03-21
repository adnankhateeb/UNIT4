const mongoose = require('mongoose');

const { body, validationResult } = require('express-validator');
const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const upload = require('../middlewares/uploads');

router.post(
  '',
  body('firstName')
    .isLength({ min: 3, max: 30 })
    .withMessage('Name length must be between 3 and 30 characters'),
  body('lastName')
    .isLength({ min: 3, max: 30 })
    .withMessage('Name length must be between 3 and 30 characters'),
  body('age')
    .not()
    .isEmpty()
    .custom((age) => {
      if (age < 1 || age > 150) {
        throw new Error('Age must be between 1 and 150');
      }
      return true;
    }),
  body('profileImages').not().isEmpty().withMessage('Enter atleast one image'),
  upload.array('profileImages', 5),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const filePaths = req.files.map((file) => {
        return file.path;
      });

      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        userPictures: filePaths,
      });

      return res.status(500).send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

module.exports = router;
