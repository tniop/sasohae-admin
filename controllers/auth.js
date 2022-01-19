async function adminAuth(req, res) {
    try {
        const adminInfo = req.user;
        const admin_id = adminInfo.admin_id;
        const position = adminInfo.adminPosition;
        res.status(200).send({ admin_id, position });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "인증에 실패하였습니다!",
        });
    }
}

module.exports = adminAuth;
