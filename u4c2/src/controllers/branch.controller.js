const express = require('express');

const Branch = require('../models/branchDetails.models');
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const branch = await Branch.create(req.body);

    return res.status(200).send(branch);
  } catch (er) {
    return res.status(500).send(er.message);
  }
});

router.get('', async (req, res) => {
  try {
    const branch = await Branch.find().lean().exec();

    return res.status(200).send(branch);
  } catch (error) {
    return res.status(500).send(err.message);
  }
});


module.exports = router;