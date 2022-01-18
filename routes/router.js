const express = require("express");
const router = express.Router();
const passport = require("passport");
/* ==================== controllers ==================== */
const {
    getBoards,
    deleteBoards,
    createBoards,
} = require("../controllers/boards");
const {
    getAllGifts,
    getSelectedGift,
    createGift,
    updateGift,
    deleteGift,
} = require("../controllers/gifts");
const {
    getAllMenus,
    getSelectedMenu,
    createMenu,
    updateMenu,
    deleteMenu,
} = require("../controllers/menus");
const {
    getAllGiftQuestions,
    getSelectedGiftQuestion,
    createGiftQuestion,
    updateGiftQuestion,
    deleteGiftQuestion,
} = require("../controllers/giftQuestions");
const {
    getAllAdmins,
    getSelectedAdmin,
    createAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
} = require("../controllers/admins");
const adminAuth = require("../controllers/auth");
const {
    getAllMoneyQuestion,
    getMoneyQuestion,
    createMoneyQuestions,
    updateMoneyQuestion,
    deleteMoneyQuestion,
} = require("../controllers/moneys");
const { getUserAccessTime } = require("../controllers/userAccessTime");
/* ==================================================*/

/* ==================== middleware ====================*/
const upload = require("../middleware/upload");
const passportAutheticator = require("../middleware/authenticator");
const paging = require("../middleware/pagination");
/* ==================================================*/

/* ==================== router ==================== */
router.get("/boards", getBoards);
router.delete("/boards/:board_id", deleteBoards);
router.post("/boards", createBoards);

router.get("/gifts", getAllGifts);
router.get("/gifts/:gift_id", getSelectedGift);
router.post("/gifts", upload.single("img"), createGift);
router.put("/gifts/:gift_id", updateGift);
router.delete("/gifts/:gift_id", deleteGift);

router.get("/menus", getAllMenus);
router.get("/menus/:menu_id", getSelectedMenu);
router.post("/menus", upload.single("img"), createMenu);
router.put("/menus/:menu_id", upload.single("img"), updateMenu);
router.delete("/menus/:menu_id", deleteMenu);

router.get("/moneyQuestions", getAllMoneyQuestion);
router.get("/moneyQuestions/:moneyQuestion_id", getMoneyQuestion);
router.post("/moneyQuestions", createMoneyQuestions);
router.put("/moneyQuestions/:moneyQuestion_id", updateMoneyQuestion);
router.delete("/moneyQuestions/:moneyQuestion_id", deleteMoneyQuestion);

router.get("/user", getUserAccessTime);

router.get("/giftQuestions/list/:page", getAllGiftQuestions, paging);
router.get("/giftQuestions/:giftQuestion_id", getSelectedGiftQuestion);
router.post("/giftQuestions", createGiftQuestion);
router.put("/giftQuestions/:giftQuestion_id", updateGiftQuestion);
router.delete("/giftQuestions/:giftQuestion_id", deleteGiftQuestion);

router.get("/admin", getAllAdmins);
router.get("/admin/:admin_id", getSelectedAdmin);
router.post("/sign-up", createAdmin);
router.post("/login", loginAdmin);
router.put("/admin/:admin_id", updateAdmin);
router.delete("/admin/:admin_id", deleteAdmin);

router.get("/auth", passportAutheticator(), adminAuth);
/* ==================================================*/

module.exports = router;
