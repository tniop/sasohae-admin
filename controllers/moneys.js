const moneyQuestions = require("../models/moneyQuestions");

async function getAllMoneyQuestion(req, res) {
    try {
        const allMoneyQuestion = await moneyQuestions.find({});
        res.status(200).send(allMoneyQuestion);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "전체 축의금질문 조회에 실패하였습니다!",
        });
    }
}

async function getMoneyQuestion(req, res) {
    try {
        const { moneyQuestion_id } = req.params;
        const selectedMoneyQuestion = await moneyQuestions.findOne({
            moneyQuestion_id,
        });
        if (!selectedMoneyQuestion) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
        res.status(200).send(selectedMoneyQuestion);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 축의금질문 조회에 실패하였습니다!",
        });
    }
}

async function createMoneyQuestions(req, res) {
    try {
        let {
            moneyQuestion_id,
            moneyQuestion,
            positiveAnswerQuestion,
            negativeAnswerQuestion,
            positiveChangeValue,
        } = req.body;
        moneyQuestion_id = Number(moneyQuestion_id);
        positiveChangeValue = Number(positiveChangeValue);

        await moneyQuestions.create({
            moneyQuestion_id,
            moneyQuestion,
            positiveAnswerQuestion,
            negativeAnswerQuestion,
            positiveChangeValue,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 축의금질문 등록에 실패하였습니다!",
        });
    }
}

async function updateMoneyQuestion(req, res) {
    try {
        const { moneyQuestion_id } = req.params;
        const selectedMoneyQuestion = await moneyQuestions.findOne({
            moneyQuestion_id,
        });
        if (!selectedMoneyQuestion) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다",
            });
            return;
        }
        const {
            moneyQuestion,
            positiveAnswerQuestion,
            negativeAnswerQuestion,
            positiveChangeValue,
        } = req.body;
        await moneyQuestions.updateOne(
            { moneyQuestion_id },
            {
                $set: {
                    moneyQuestion,
                    positiveAnswerQuestion,
                    negativeAnswerQuestion,
                    positiveChangeValue,
                },
            }
        );
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 축의금질문 갱신에 실패하였습니다!",
        });
    }
}

async function deleteMoneyQuestion(req, res) {
    try {
        const { moneyQuestion_id } = req.params;
        console.log(moneyQuestion_id);
        const selectedMoneyQuestion = await moneyQuestions.findOne({
            moneyQuestion_id,
        });
        if (!selectedMoneyQuestion) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다",
            });
            return;
        }
        await moneyQuestions.deleteOne({ moneyQuestion_id });
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 축의금질문 삭제에 실패하였습니다!",
        });
    }
}

module.exports = {
    getAllMoneyQuestion,
    getMoneyQuestion,
    createMoneyQuestions,
    updateMoneyQuestion,
    deleteMoneyQuestion,
};
