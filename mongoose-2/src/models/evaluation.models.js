const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema (
    {
        dateOfEvaluation : {type: String, required: true},
        instructorId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required: true
        },
        batchId : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "batch",
            required: true
        },
        createdAt: {type: String, required: false},
        updatedAt : {type: String, required: false}
    },
    {
        versionKey: false,
        timestamps: true
    }
)

// model

const Evaluation = mongoose.model("evaluation", evaluationSchema)

module.exports = Evaluation;