const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const boards = new mongoose.Schema(
    {
        board_id: {
            type: Number,
            unique: true,
            required: true,
            default: 0,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

boards.plugin(autoIncrement.plugin, {
    model: "boards",
    field: "board_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("boards", boards);
