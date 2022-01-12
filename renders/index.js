const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        res.render("dashboard");
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftStatistics", (req, res, next) => {
    try {
        res.render("./statistics/giftStatistics");
    } catch (error) {
        res.render("error");
    }
});

router.get("/menuStatistics", (req, res, next) => {
    try {
        res.render("./statistics/menuStatistics");
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftQuestionsList", (req, res, next) => {
    try {
        res.render("./gifts/giftQuestionsList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftList", (req, res, next) => {
    try {
        res.render("./gifts/giftList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/menuList", (req, res, next) => {
    try {
        res.render("./menus/menuList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/moneyQuestionsList", (req, res, next) => {
    try {
        res.render("./money/moneyQuestionsList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/boardList", (req, res, next) => {
    try {
        res.render("./boards/boardList");
    } catch (error) {
        res.render("error");
    }
});





router.get("/login", (req, res, next) => {
    try {
        res.render("login");
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