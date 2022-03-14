const mongoose = require('mongoose');

const branchSchema = mongoose.Schema(
    {
        name : {type: String, required : true},
        address : {type: String, required : true},
        IFSC : {type: String, required : true},
        MICR : {type: String, required : true},
        createdAt : {type: String, required : true},
        updatedAt : {type: String, required : true}
        
    }
)

const Branch = new mongoose.model('branch', branchSchema)

module.exports = Branch;