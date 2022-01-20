const mongoose = require("mongoose");

const statistics = new mongoose.Schema({
    statistic_id: {
        type: Number,
        unique: true,
        required: true,
        default: 1,
    },
    totVisitorCnt: {
        type: Number,
        default: 0,
    },
    giftSurveyUsersCnt: {
        type: Number,
        default: 0,
    },
    giftRandomUsersCnt: {
        type: Number,
        default: 0,
    },
    moneyUsersCnt: {
        type: Number,
        default: 0,
    },
    menuUsersCnt: {
        type: Number,
        default: 0,
    },
    boardUsersCnt: {
        type: Number,
        default: 0,
    },
    boardWriteUsersCnt: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("statistics", statistics);
