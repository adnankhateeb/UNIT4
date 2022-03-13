
const mongoose = require('mongoose');

//create studentSchema

const studentSchema = new mongoose.Schema(
    {
        rollId : {type: String, required: true},
        currentBatch : {type: String, required : true},
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        batchId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "batch",
            required : true
        },
        createdAt: {type: String, required: false},
        updatedAt : {type: String, required: false}
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Student = mongoose.model("student", studentSchema);

module.exports = Student