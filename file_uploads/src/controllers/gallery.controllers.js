const express = require('express');
const path = require('path');
const Gallery = require('../models/gallery.models');
const upload = require('../middlewares/uploads');
const fs = require('fs');

const router = express.Router();

router.post('', upload.array('userPictures', 5), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => {
      return file.path;
    });

    const user = await Gallery.create({
      userId: req.body.userId,
      userPictures: filePaths,
    });

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get('', async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .populate({
        path: 'userId',
        select: { firstName: true, profilePic: true },
      })
      .lean()
      .exec();

    return res.status(200).send(gallery);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    // to find the gallery by id
    let gallery = await Gallery.findOne({ _id: req.params.id });
    // let files = [];

    //to get all file paths in an array
    // gallery.userPictures.map((file) => {
    //   files.push(file);
    // });

    // console.log(files);

    // send each array element into the unlink function to delete them
    gallery.userPictures.forEach((f) => fs.unlink(f, (err) => {
      if (err) throw err;
    }));
    console.log(`Gallery deleted`);

    //delete gallery
    gallery.delete();

    //send the deleted gallery's info to the user!
    res.send(gallery);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
