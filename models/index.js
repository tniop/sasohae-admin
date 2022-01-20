const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI, {})
        .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
    console.error("몽고DB 연결 에러", err);
});

mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊김. 연결을 재시도함");
    connect();
});

module.exports = connect;
