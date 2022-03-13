const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect(
        "mongodb+srv://adnan:adnan@cluster0.rlrcf.mongodb.net/library?retryWrites=true&w=majority"
    );
};

module.exports = connect;
