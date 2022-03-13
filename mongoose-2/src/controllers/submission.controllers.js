const express = require('express')


const router = express.Router();

const Submission = require("../models/submission.models")



router.get("", async (req, res) => {
  try {
    const submissions = await Submission.find().lean().exec();

    return res.status(200).send({ submission: submissions }); // []
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
  try {

    const submission = await Submission.create(req.body);

    return res.status(200).send({ submission: submission })
  } catch (error) {
    res.status(500).send({ message: err.message })
  }
});


router.get("/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).lean().exec();
    // db.users.findOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(submission);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})

    return res.status(200).send(submission);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});



// FIND ALL EVALS BY ID AND ALL STUDENTS IN THAT EVAL
router.get("/evals/:id", async (req, res) => {
  try {
    const evals = await Submission.find({ evaluationId: req.params.id }).populate({
      path: "studentId",
      select: { firstName: 1, lastName: 1 }
    }).lean().exec();

    return res.status(200).send(evals)
  } catch {
    return res.status(500).send({ message: err.message });

  }
})


// for the top scorer
router.get("/evals/:id/topper", async (req, res) => {
  try {
    const top = await Submission.find({ evaluationId: req.params.id }).populate({
      path: "studentId",
      select: { firstName: 1, lastName: 1 }
    }).sort({ marks: -1 }).limit(1).lean().exec();

    return res.status(200).send(top)
  } catch {
    return res.status(500).send({ message: err.message });

  }
})


module.exports = router;
