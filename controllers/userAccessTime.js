const userAccessTime = require("../models/userAccessTime");

async function getUserAccessTime(req, res) {
    try {
        const allUserAccessTime = await userAccessTime.find(
            {},
            { _id: false, userCnt: false, updatedAt: false, __v: false }
        );
        res.status(200).send(allUserAccessTime);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "전체 사용자방문시간 조회에 실패하였습니다!",
        });
    }
}

module.exports = { getUserAccessTime };
