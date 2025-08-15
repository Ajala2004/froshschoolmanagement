const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true },
    time: { type: Number, default: 5 },
    marks: { type: Number, default: 1 },
    attempts: { type: Number, default: 1 },
});

const examSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required: true
    },
    questions: [questionSchema],
    available: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("exam", examSchema);
