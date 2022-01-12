const express = require("express");
const router = express.Router();
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
const upload = require("../middleware/upload");

/* ==================== controllers ====================*/
router.get("/boards", getBoards);
router.delete("/boards/:board_id", deleteBoards);
router.post("/boards", createBoards);

router.get("/gifts", getAllGifts);
router.get("/gifts/:gift_id", getSelectedGift);
router.post("/gifts", upload.single("img"), createGift);
router.put("/gifts/:gift_id", upload.single("img"), updateGift);
router.delete("/gifts/:gift_id", deleteGift);

/* ==================================================*/

/* ==================== middleware ====================*/

/* ==================================================*/

/* ==================== router ====================*/

/* ==================================================*/

module.exports = router;
