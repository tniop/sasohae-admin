const moneyQuestions = require("../models/moneyQuestions");

async function getAllMoneyQuestion(req, res) {
    try {
        const allMoneyQuestion = await moneyQuestions.find({});
        res.status(200).send(allMoneyQuestion);
    } catch (err) {
        res.status(400).send(err);
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
                errorMessage: "존재하지 않는 정보입니다",
            });
            return;
        }
        res.status(200).send(selectedMoneyQuestion);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function createMoneyQuestions(req, res) {
    try {
        const {
            moneyQuestion_id,
            moneyQuestion,
            positiveAnswerQuestion,
            negativeAnswerQuestion,
            positiveChangeValue,
        } = req.body;
        await moneyQuestions.create({
            moneyQuestion_id,
            moneyQuestion,
            positiveAnswerQuestion,
            negativeAnswerQuestion,
            positiveChangeValue,
        });
        res.status(201).send();
    } catch (err) {
        res.status(400).send(err);
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
        res.status(400).send(err);
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
        res.status(400).send(err);
    }
}

module.exports = {
    getAllMoneyQuestion,
    getMoneyQuestion,
    createMoneyQuestions,
    updateMoneyQuestion,
    deleteMoneyQuestion,
};
