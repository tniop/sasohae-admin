const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const giftQuestions = new mongoose.Schema({
    giftQuestion_id: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    giftQuestion: {
        type: String,
        required: true,
    },
    giftQuestionType: {
        type: String,
        required: true,
    },
});

giftQuestions.plugin(autoIncrement.plugin, {
    model: "giftQuestions",
    field: "giftQuestion_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("giftQuestions", giftQuestions);
