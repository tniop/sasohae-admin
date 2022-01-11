const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        res.render("dashboard");
    } catch (error) {
        res.render("error");
    }
});

router.get("/error", (req, res, next) => {
    try {
        res.render("error");
    } catch (error) {
        res.sendStatus(404).send({ errorMessage: "페이지를 찾을 수 없습니다." });
    }
});

module.exports = router;