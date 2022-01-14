async function adminAuth(req, res) {
    try {
        const adminInfo = req.user;
        const nickname = adminInfo.adminNickname;
        const position = adminInfo.adminPosition;
        res.status(200).send({ nickname, position });
        // res.status(200).send({ adminInfo });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "인증에 실패하였습니다!",
        });
    }
}

module.exports = adminAuth;
