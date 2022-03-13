const express = require('express')
const router = express.Router();

const Evaluation = require("../models/evaluation.models")



router.get("", async (req, res) => {
  try {
    const evaluation = await Evaluation.find().lean().exec();

    return res.status(200).send({ eval: evaluation }); // []
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {

  try{
    const evaluation = await Evaluation.create(req.body);
    return res.status(200).send({eval  : evaluation})
  } catch(err){
    return res.status(500).send({message : err.message})
  }
});

// body => req.body
// url => req.params
// query string => req.query

router.get("/:id", async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id).lean().exec();
    // db.users.findOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(evaluation);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const evaluation = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})

    return res.status(200).send(evaluation);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


module.exports = router;
