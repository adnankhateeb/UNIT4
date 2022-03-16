const express = require('express');

const User = require('../models/user.models');

const upload = require('../middlewares/uploads');

const router = express.Router();

const fs = require('fs');

router.get('', async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post('', upload.single('profilePic'), async (req, res) => {
  try {
    //   const user = await User.create(req.body)
    const user = await User.create({
      firstName: req.body.firstName,
      profilePic: req.file.path,
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    fs.unlink(user.profilePic, (err) => {
      if (err) throw err;
      console.log(`${user.firstName} user deleted`);
    });
    user.delete();
    res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch('/update/:id', upload.single('profilePic'), async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    fs.unlink(user.profilePic, (err) => {
      if (err) throw err;
      console.log(`${user.firstName}'s profile picture updated!`);
    });
    user.profilePic = req.file.path;
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
