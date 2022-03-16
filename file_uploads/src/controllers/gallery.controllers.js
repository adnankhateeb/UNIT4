const express = require('express');

const Gallery = require('../models/gallery.models');
const upload = require('../middlewares/uploads');

const router = express.Router();

router.post('', upload.any('userPictures'), async (req, res) => {
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
    const gallery = await Gallery.find().lean().exec();

    return res.status(200).send(gallery);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
