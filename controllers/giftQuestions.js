const giftQuestions = require("../models/giftQuestions");

async function getAllGiftQuestions(req, res) {
    try {
        const allGiftQuestions = await giftQuestions.find({});
        res.status(200).send(allGiftQuestions);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "전체 선물질문 조회에 실패하였습니다!",
        });
    }
}

async function getSelectedGiftQuestion(req, res) {
    try {
        const { giftQuestion_id } = req.params;
        const selectedGiftQuestions = await giftQuestions.findOne({
            giftQuestion_id,
        });
        res.status(200).send(selectedGiftQuestions);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 선물질문 조회에 실패하였습니다!",
        });
    }
}

async function createGiftQuestion(req, res) {
    try {
        const { giftQuestion, giftQuestionType } = req.body;
        await giftQuestions.create({ giftQuestion, giftQuestionType });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 선물질문 등록에 실패하였습니다!",
        });
    }
}

async function updateGiftQuestion(req, res) {
    try {
        const { giftQuestion_id } = req.params;
        const { giftQuestion, giftQuestionType } = req.body;
        await giftQuestions.updateOne(
            { giftQuestion_id },
            { $set: { giftQuestion, giftQuestionType } }
        );
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 선물질문 갱신에 실패하였습니다!",
        });
    }
}

async function deleteGiftQuestion(req, res) {
    try {
        const { giftQuestion_id } = req.params;
        await giftQuestions.deleteOne({ giftQuestion_id });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 선물질문 삭제에 실패하였습니다!",
        });
    }
}

module.exports = {
    getAllGiftQuestions,
    getSelectedGiftQuestion,
    createGiftQuestion,
    updateGiftQuestion,
    deleteGiftQuestion,
};
