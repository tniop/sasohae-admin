const boards = require("../models/boards");

async function getBoards(req, res) {
    try {
        const allBoards = await boards.find({}).sort({ _id: -1 });
        res.status(200).send(allBoards);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 조회에 실패하였습니다!",
        });
    }
}

async function updateBoards(req, res) {
    try {
        const { board_id } = req.params;
        const selectedComment = await boards.findOne({ board_id });
        if (!selectedComment) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
        const { comment } = req.body;
        await boards.updateOne({ board_id }, { $set: { comment } });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "블라인드 처리에 실패하였습니다!",
        });
    }
}

async function deleteBoards(req, res) {
    try {
        const { board_id } = req.params;
        const selectedComment = await boards.findOne({ board_id });
        if (!selectedComment) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
        await boards.deleteOne({ board_id });
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 삭제에 실패하였습니다!",
        });
    }
}

module.exports = {
    getBoards,
    updateBoards,
    deleteBoards,
};
