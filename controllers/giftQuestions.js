const giftQuestions = require("../models/giftQuestions");
const paging = require("../middleware/pagination");

async function getAllGiftQuestions(req, res) {
    try {
        const { page } = req.params;
        // 총 데이터 카운트
        const totalInfo = await giftQuestions.countDocuments({});

        if (!totalInfo) { 
            throw Error();
        }

        let {
            startPage,
            currentPage,
            endPage,
            hideInfo,
            maxInfo,
            totalPage,
        } = paging(page, totalInfo);

        const giftsQuestionsData = await giftQuestions.find({}) 
            .sort({ giftQuestion_id: 1 })
            .skip(hideInfo)
            .limit(maxInfo);

        // console.log(startPage, currentPage, endPage, hideInfo, maxInfo, totalPage, totalInfo)
        // const allGiftQuestions = await giftQuestions.find({}); // 모든 정보 가져옴
        
        res.status(200).send({
            giftsQuestionsData: giftsQuestionsData,
            startPage: startPage,
            currentPage: currentPage,
            endPage: endPage,
            hideInfo: hideInfo,
            maxInfo: maxInfo,
            totalPage: totalPage,
            totalInfo: totalInfo,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "전체 선물질문 조회에 실패하였습니다!",
        });
    }
}

// 모든 질문 가져옴(페이징 처리 이전)
// async function getAllGiftQuestions(req, res) {
//     try {
//         const allGiftQuestions = await giftQuestions.find({});
//         res.status(200).send(allGiftQuestions);
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({
//             errorMessage: "전체 선물질문 조회에 실패하였습니다!",
//         });
//     }
// }

async function getSelectedGiftQuestion(req, res) {
    try {
        const { giftQuestion_id } = req.params;
        const selectedGiftQuestions = await giftQuestions.findOne({
            giftQuestion_id,
        });
        if (!selectedGiftQuestions) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
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
        const selectedGiftQuestions = await giftQuestions.findOne({
            giftQuestion_id,
        });
        if (!selectedGiftQuestions) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
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
        const selectedGiftQuestions = await giftQuestions.findOne({
            giftQuestion_id,
        });
        if (!selectedGiftQuestions) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
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
