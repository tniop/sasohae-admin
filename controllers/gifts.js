const gifts = require("../models/gifts");

async function getAllGifts(req, res) {
    try {
        const allGifts = await gifts.find({});
        res.status(200).send(allGifts);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "전체 선물 조회에 실패하였습니다!",
        });
    }
}

async function getSelectedGift(req, res) {
    try {
        const { gift_id } = req.params;
        const selectedGift = await gifts.findOne({ gift_id });
        res.status(200).send(selectedGift);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 선물 조회에 실패하였습니다!",
        });
    }
}

async function createGift(req, res) {
    try {
        const giftUrl = req.file.location;
        const {
            giftName,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerExpensive,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
            giftLikeCnt,
            giftResultCnt,
        } = req.body;
        await gifts.create({
            giftName,
            giftUrl,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerExpensive,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
            giftLikeCnt,
            giftResultCnt,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "선물 정보 등록에 실패하였습니다!",
        });
    }
}

async function updateGift(req, res) {
    try {
        const { gift_id } = req.params;
        const giftUrl = req.file.location;
        const {
            giftName,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerExpensive,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
            giftRecommendCnt,
            giftLikeCnt,
            giftResultCnt,
        } = req.body;
        await gifts.updateMany(
            { gift_id },
            {
                $set: {
                    giftName,
                    giftUrl,
                    giftTarget,
                    giftEvent,
                    sex,
                    age,
                    giftAnswerExpensive,
                    giftAnswerPersonality,
                    giftAnswerEmotional,
                    giftAnswerTrendy,
                    giftRecommendCnt,
                    giftLikeCnt,
                    giftResultCnt,
                },
            }
        );
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "선물 정보 갱신에 실패하였습니다!",
        });
    }
}

async function deleteGift(req, res) {
    try {
        const { gift_id } = req.params;
        await gifts.deleteOne({ gift_id });
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "선물 삭제에 실패하였습니다!",
        });
    }
}

module.exports = {
    getAllGifts,
    getSelectedGift,
    createGift,
    updateGift,
    deleteGift,
};
