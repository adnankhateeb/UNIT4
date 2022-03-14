const express = require('express');

const Fixed = require('../models/fixedAcct.models');
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const fixed = await Fixed.create(req.body);

    return res.status(200).send(fixed);
  } catch (er) {
    return res.status(500).send(er.message);
  }
});

router.get('', async (req, res) => {
  try {
    const fixed = await Fixed.find().populate('masterId').lean().exec();

    return res.status(200).send(fixed);
  } catch (error) {
    return res.status(500).send(err.message);
  }
});


module.exports = router;