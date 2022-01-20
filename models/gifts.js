const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const gifts = new mongoose.Schema({
    gift_id: {
        type: Number,
        unique: true,
        required: true,
        default: 0,
    },
    giftName: {
        type: String,
        required: true,
    },
    giftUrl: {
        type: String,
        required: true,
    },
    giftTarget: {
        type: Array,
        required: true,
        default: [],
    },
    giftEvent: {
        type: Array,
        required: true,
        default: [],
    },
    sex: {
        type: String,
        required: true,
    },
    age: {
        type: Array,
        required: true,
        default: [],
    },
    giftAnswerExpensive: {
        type: String,
        required: true,
    },
    giftAnswerPersonality: {
        type: String,
        required: true,
    },
    giftAnswerEmotional: {
        type: String,
        required: true,
    },
    giftAnswerTrendy: {
        type: String,
        required: true,
    },
    giftRecommendCnt: {
        type: Number,
        default: 0,
    },
    giftLikeCnt: {
        type: Number,
        default: 0,
    },
    giftResultCnt: {
        type: Number,
        default: 0,
    },
});

gifts.plugin(autoIncrement.plugin, {
    model: "gifts",
    field: "gift_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("gifts", gifts);
