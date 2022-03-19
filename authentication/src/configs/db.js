const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(
    'mongodb+srv://adnan:adnan@cluster0.rlrcf.mongodb.net/newDb?retryWrites=true&w=majority'
  );
};
