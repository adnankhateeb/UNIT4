const express = require('express');
const User = require('../models/user.models');

const router = express.Router();

router.get('', async (req, res) => {
  try {
    let user = await User.find().lean().exec();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


module.exports = router;