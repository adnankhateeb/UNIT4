const express = require("express");

const router = express.Router();

const Student = require("../models/student.models.js");

router.get("", async (req, res) => {
  try {
    const students = await Student.find()
      .populate({
        path: "userId",
        select: { firstName: 1, lastName: 1 },
      })
      .lean()
      .exec();

    return res.status(200).send({ student: students }); // []
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.status(200).send({ student: student });
  } catch (error) {
    console.log("error:", error.message);
  }
});



router.get("/:id", async (req, res) => {
  try {
    const students = await Student.findById(req.params.id)
      .populate("userId")
      .lean()
      .exec();

    return res.status(200).send(students);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send(student);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await User.findByIdAndDelete(req.params.id);

    return res.status(200).send({ student: student }); // []
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
