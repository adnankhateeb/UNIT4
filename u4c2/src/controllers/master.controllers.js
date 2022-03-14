const express = require('express');

const Master = require('../models/MasterAccount.models');
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const master = await Master.create(req.body);

    return res.status(200).send(master);
  } catch (er) {
    return res.status(500).send(er.message);
  }
});

router.get('', async (req, res) => {
  try {
    const master = await Master.find().populate('userId').lean().exec();

    return res.status(200).send(master);
  } catch (error) {
    return res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const master = await Master.find({ _id: req.params.id })
      .populate('userId')
      .lean()
      .exec();

    return res.status(200).send(master);
  } catch (error) {
    return res.status(500).send(err.message);
  }
});

router.get('/accts/:id', async(req,res) => {
    
})

module.exports = router;
