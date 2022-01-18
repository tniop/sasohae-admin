const mongoose = require("mongoose");

const userAccessTime = new mongoose.Schema(
    {
        userCnt: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("userAccessTime", userAccessTime);
