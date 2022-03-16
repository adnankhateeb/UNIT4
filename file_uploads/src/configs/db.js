const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(
    'mongodb+srv://adnan:adnan@cluster0.rlrcf.mongodb.net/file_uploads?retryWrites=true&w=majority'
  );
};
