const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(
    'mongodb+srv://adnan:adnan@cluster0.rlrcf.mongodb.net/todo?retryWrites=true&w=majority'
  );
};
