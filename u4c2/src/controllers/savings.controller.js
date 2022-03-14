const express = require('express');

const Saving = require('../models/savings.models');
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const saving = await Saving.create(req.body);

    return res.status(200).send(saving);
  } catch (er) {
    return res.status(500).send(er.message);
  }
});

router.get('', async (req, res) => {
  try {
    const saving = await Saving.find().populate('masterId').lean().exec();

    return res.status(200).send(saving);
  } catch (error) {
    return res.status(500).send(err.message);
  }
});


module.exports = router;