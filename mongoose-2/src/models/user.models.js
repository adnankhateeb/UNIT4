
const mongoose = require('mongoose');

//create userSchema

const userSchema = new mongoose.Schema(
    {
        firstName : {type: String, required: true},
        lastName : {type: String, required: true},
        dateOfBirth : {type: String, required: true},
        userType: {type: String, required: true},
        createdAt: {type: String, required: false},
        updatedAt : {type: String, required: false}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

//Create and export its module.

const User = mongoose.model("user", userSchema);

module.exports = User;