const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
    {
        evaluationId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "evaluation",
            required : true
        },
        studentId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        marks : {type: Number, required: true},
        createdAt: {type: String, required: false},
        updatedAt : {type: String, required: false}
    },
    {
        versionKey: false,
        timestamps: true
    }
)


const Submission = mongoose.model("submission", submissionSchema);

module.exports = Submission;