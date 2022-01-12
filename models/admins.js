const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const admins = new mongoose.Schema({
    admin_id: {
        type: Number,
        unique: true,
        required: true,
        default: 0,
    },
    adminPosition: {
        type: String,
        required: true,
    },
    adminName: {
        type: String,
        required: true,
    },
    adminNickname: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

admins.plugin(autoIncrement.plugin, {
    model: "admins",
    field: "admin_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("boards", boards);
