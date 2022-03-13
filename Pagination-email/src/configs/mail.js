const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "d6bcb79fa2cf0c", // generated ethereal user
    pass: "a40cee1b5bc004", // generated ethereal password
  },
});
