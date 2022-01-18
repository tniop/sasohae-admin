const statistics = require("../models/statistics");

async function getAllStatistics(req, res) {
    try {
        const allStatistics = await statistics.find(
            {},
            { _id: false, statistic_id: false, __v: false }
        );
        res.status(200).send(allStatistics);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    getAllStatistics,
};
