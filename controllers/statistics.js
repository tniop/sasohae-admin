const statistics = require("../models/statistics");

async function getAllStatistics(req, res) {
    try {
        const allStatistics = await statistics.find(
            {},
            { _id: false, statistic_id: false, __v: false }
        );
        res.status(200).send(allStatistics);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "전체 통계 조회에 실패하였습니다!",
        });
    }
}

module.exports = {
    getAllStatistics,
};
