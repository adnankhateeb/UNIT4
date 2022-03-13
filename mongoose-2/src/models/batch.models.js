const mongoose = require('mongoose');


const batchSchema = new mongoose.Schema(
    {
        batchName : {type: String, required: true},
        createdAt: {type: String, required: false},
        updatedAt : {type: String, required: false}
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Batch = mongoose.model('batch', batchSchema);

module.exports = Batch;