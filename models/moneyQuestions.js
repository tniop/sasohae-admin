const mongoose = require("mongoose");

const moneyQuestions = new mongoose.Schema({
    moneyQuestion_id: {
        type: Number,
        unique: true,
        required: true,
    },
    moneyQuestion: {
        type: String,
        required: true,
    },
    positiveAnswerQuestion: {
        type: String,
        required: true,
    },
    negativeAnswerQuestion: {
        type: String,
        required: true,
    },
    positiveChangeValue: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("moneyQuestions", moneyQuestions);
