const userAccessTime = require("../models/userAccessTime");

async function getUserAccessTime(req, res) {
    try {
        const allUserAccessTime = await userAccessTime.find(
            {},
            { _id: false, userCnt: false, updatedAt: false, __v: false }
        );
        res.status(200).send(allUserAccessTime);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = { getUserAccessTime };
