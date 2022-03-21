const mongoose = require('mongoose');

const connect = () => {
  try {
    return mongoose.connect(
      'mongodb+srv://adnan:adnan@cluster0.rlrcf.mongodb.net/library?retryWrites=true&w=majority'
    );
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = connect;