const path = require('path');

const express = require('express');

const transporter = require('../configs/mail');

const User = require('../models/user.models');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);

    transporter.sendMail({
      from: '"Admin" <admin@nowhere.com>', // sender address
      to: user.email, // list of receivers
      subject: `Welcome to ABC systems ${user.firstName} ${user.lastName}`, // Subject line
      text: `Hi ${user.firstName}, please confirm your email address`, // plain text body
    });

    transporter.sendMail({
      from: '"Admin" <admin@nowhere.com>', // sender address
      to: 'admin1@nowhere.com, admin2@nowhere.com, admin3@nowhere.com, admin4@nowhere.com, admin5@nowhere.com', // list of receivers
      subject: `${user.firstName} ${user.lastName} has registered with us`, // Subject line
      text: `Please welcome ${user.firstName} ${user.lastName}`, // plain text body
    });

    return res.status(201).send({ user: user });
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
});


router.get("/", async (req, res) => {
    try {
        const pageNumber = req.query.page;
        const pageSize = req.query.pagesize || 30;
        
        const skip = (pageNumber - 1) * pageSize;

        const users = await User.find().skip(skip).limit(pageSize).lean().exec();

        const totalPages = Math.ceil((await User.find().countDocuments()) / pageSize);
        return res.status(200).send({ users, totalPages });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


module.exports = router;