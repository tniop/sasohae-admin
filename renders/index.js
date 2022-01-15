const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        res.render("dashboard");
    } catch (error) {
        res.render("error");
    }
});

/* statistics */
router.get("/giftStatistics", (req, res, next) => {
    try {
        res.render("./giftStatistics"); // res.render("./statistics/giftStatistics");
    } catch (error) {
        res.render("error");
    }
});

router.get("/menuStatistics", (req, res, next) => {
    try {
        res.render("./menuStatistics"); // res.render("./statistics/menuStatistics");
    } catch (error) {
        res.render("error");
    }
});

/* giftQuestions */
router.get("/giftQuestionsList", (req, res, next) => {
    try {
        res.render("./giftQuestionsList"); // res.render("./gifts/giftQuestionsList"); -> gifts 폴더 내부 파일
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftQuestionsInsert", (req, res, next) => {
    try {
        res.render("./giftQuestionsInsert"); // res.render("./gifts/giftQuestionsList"); -> gifts 폴더 내부 파일
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftQuestions/:giftQuestion_id", (req, res, next) => {
    try {
        res.render("./giftQuestionsDetail"); // res.render("./gifts/giftQuestionsList"); -> gifts 폴더 내부 파일
    } catch (error) {
        res.render("error");
    }
});

/* gift */
router.get("/giftList", (req, res, next) => {
    try {
        res.render("./giftList"); // res.render("./gifts/giftList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftInsert", (req, res, next) => {
    try {
        res.render("./giftInsert");
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftDetail", (req, res, next) => {
    try {
        res.render("./giftDetail");
    } catch (error) {
        res.render("error");
    }
});

/* menus */
router.get("/menuList", (req, res, next) => {
    try {
        res.render("./menuList"); // res.render("./menus/menuList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/menuInsert", (req, res, next) => {
    try {
        res.render("./menuInsert"); // res.render("./menus/menuInsert");
    } catch (error) {
        res.render("error");
    }
});

router.get("/menuDetail", (req, res, next) => {
    try {
        res.render("./menuDetail"); // res.render("./menus/menuDetail");
    } catch (error) {
        res.render("error");
    }
});

/* moneyQuestions */
router.get("/moneyQuestionsList", (req, res, next) => {
    try {
        res.render("./moneyQuestionsList"); // res.render("./money/moneyQuestionsList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/moneyQuestionsInsert", (req, res, next) => {
    try {
        res.render("./moneyQuestionsInsert"); // res.render("./money/moneyQuestionsInsert");
    } catch (error) {
        res.render("error");
    }
});

router.get("/moneyQuestions/:moneyQuestion_id", (req, res, next) => {
    try {
        res.render("./moneyQuestionsDetail"); // res.render("./money/moneyQuestionsDetail");
    } catch (error) {
        res.render("error");
    }
});

/* boards */
router.get("/boardList", (req, res, next) => {
    try {
        res.render("./boardList"); // res.render("./boards/boardList");
    } catch (error) {
        res.render("error");
    }
});

/* admin management */
router.get("/adminList", (req, res, next) => {
    try {
        res.render("adminList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/adminInsert", (req, res, next) => {
    try {
        res.render("adminInsert");
    } catch (error) {
        res.render("error");
    }
});

router.get("/adminDetail", (req, res, next) => {
    try {
        res.render("adminDetail");
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

module.exports = router;
