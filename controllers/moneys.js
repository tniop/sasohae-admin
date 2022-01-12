const moneyQuestions = require("../models/moneyQuestions");

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
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { createMoneyQuestions };
