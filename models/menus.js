const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const menus = new mongoose.Schema({
    menu_id: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    menuName: {
        type: String,
        required: true,
    },
    menuUrl: {
        type: String,
        required: true,
    },
    menuType: {
        type: Array,
        required: true,
        default: [],
    },
    menuStyle: {
        type: String,
        required: true,
    },
    menuWith: {
        type: Array,
        required: true,
        default: [],
    },
    menuRecommendCnt: {
        type: Number,
        default: 0,
    },
    menuLikeCnt: {
        type: Number,
        default: 0,
    },
    menuResultCnt: {
        type: Number,
        default: 0,
    },
});

menus.plugin(autoIncrement.plugin, {
    model: "menus",
    field: "menu_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("menus", menus);
