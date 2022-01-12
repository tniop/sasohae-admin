const boards = require("../models/boards");

async function getBoards(req, res) {
    try {
        const allBoards = await boards.find({});
        res.status(200).send(allBoards);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 조회에 실패하였습니다!",
        });
    }
}

async function deleteBoards(req, res) {
    try {
        const { board_id } = req.params;
        await boards.deleteOne({ board_id });
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 삭제에 실패하였습니다!",
        });
    }
}

async function createBoards(req, res) {
    try {
        const { comment } = req.body;
        await boards.create({ comment });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 등록에 실패하였습니다!",
        });
    }
}

module.exports = { getBoards, deleteBoards, createBoards };