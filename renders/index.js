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
        res.render("./giftStatistics");
    } catch (error) {
        res.render("error");
    }
});

router.get("/menuStatistics", (req, res, next) => {
    try {
        res.render("./menuStatistics");
    } catch (error) {
        res.render("error");
    }
});

/* giftQuestions */
router.get("/giftQuestionsList", (req, res, next) => {
    try {
        res.render("./giftQuestionsList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftQuestionsInsert", (req, res, next) => {
    try {
        res.render("./giftQuestionsInsert");
    } catch (error) {
        res.render("error");
    }
});

router.get("/giftQuestions/:giftQuestion_id", (req, res, next) => {
    try {
        res.render("./giftQuestionsDetail");
    } catch (error) {
        res.render("error");
    }
});

/* gift */
router.get("/giftList", (req, res, next) => {
    try {
        res.render("./giftList");
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

router.get("/gifts/:gift_id", (req, res, next) => {
    try {
        res.render("./giftDetail");
    } catch (error) {
        res.render("error");
    }
});

/* menus */
router.get("/menuList", (req, res, next) => {
    try {
        res.render("./menuList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/menuInsert", (req, res, next) => {
    try {
        res.render("./menuInsert");
    } catch (error) {
        res.render("error");
    }
});

router.get("/menuDetail/:menu_id", (req, res, next) => {
    try {
        res.render("./menuDetail");
    } catch (error) {
        res.render("error");
    }
});

/* moneyQuestions */
router.get("/moneyQuestionsList", (req, res, next) => {
    try {
        res.render("./moneyQuestionsList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/moneyQuestionsInsert", (req, res, next) => {
    try {
        res.render("./moneyQuestionsInsert");
    } catch (error) {
        res.render("error");
    }
});

router.get("/moneyQuestions/:moneyQuestion_id", (req, res, next) => {
    try {
        res.render("./moneyQuestionsDetail");
    } catch (error) {
        res.render("error");
    }
});

/* boards */
router.get("/boardList", (req, res, next) => {
    try {
        res.render("./boardList");
    } catch (error) {
        res.render("error");
    }
});

/* admin management */
router.get("/adminList", (req, res, next) => {
    try {
        res.render("./adminList");
    } catch (error) {
        res.render("error");
    }
});

router.get("/adminInsert", (req, res, next) => {
    try {
        res.render("./adminInsert");
    } catch (error) {
        res.render("error");
    }
});

router.get("/adminDetail/:admin_id", (req, res, next) => {
    try {
        res.render("./adminDetail");
    } catch (error) {
        res.render("error");
    }
});

router.get("/login", (req, res, next) => {
    try {
        res.render("./login");
    } catch (error) {
        res.render("error");
    }
});

router.get("/password", (req, res, next) => {
    try {
        res.render("./initializePassword");
    } catch (error) {
        res.render("error");
    }
});

/* my page */
router.get("/mypage/:admin_id", (req, res, next) => {
    try {
        res.render("./myPage");
    } catch (error) {
        res.render("error");
    }
});

module.exports = router;
