const menus = require("../models/menus");

async function getAllMenus(req, res) {
    try {
        const allMenus = await menus.find({});
        res.status(200).send(allMenus);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "전체 메뉴 조회에 실패하였습니다!",
        });
    }
}

async function getSelectedMenu(req, res) {
    try {
        const { menu_id } = req.params;
        const selectedMenu = await menus.findOne({ menu_id });
        if (!selectedMenu) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
        res.status(200).send(selectedMenu);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "개별 메뉴 조회에 실패하였습니다!",
        });
    }
}

async function getPagingMenus(req, res) {
    try {
        const menu_id = req.params.menu_id;
        const startNumber = Number(menu_id) * 10;
        const selectedMenus = await menus
            .find({})
            .limit(10)
            .skip(startNumber)
            .sort({ _id: 1 });
        res.status(200).send(selectedMenus);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "메뉴 조회에 실패하였습니다!",
        });
    }
}

async function createMenu(req, res) {
    try {
        const menuUrl = req.file.location;
        let { menuName, menuType, menuStyle, menuWith } = req.body;
        menuType = JSON.parse(menuType);
        menuWith = JSON.parse(menuWith);
        await menus.create({
            menuName,
            menuUrl,
            menuType,
            menuStyle,
            menuWith,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "메뉴 생성에 실패하였습니다!",
        });
    }
}

async function updateMenu(req, res) {
    try {
        const { menu_id } = req.params;
        const selectedMenu = await menus.findOne({ menu_id });
        if (!selectedMenu) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
        const { menuType, menuStyle, menuWith } = req.body;
        await menus.updateOne(
            { menu_id },
            { $set: { menuType, menuStyle, menuWith } }
        );
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "메뉴 갱신에 실패하였습니다!",
        });
    }
}

async function deleteMenu(req, res) {
    try {
        const { menu_id } = req.params;
        const selectedMenu = await menus.findOne({ menu_id });
        if (!selectedMenu) {
            res.status(400).send({
                errorMessage: "존재하지 않는 정보입니다!",
            });
            return;
        }
        await menus.deleteOne({ menu_id });
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "메뉴 삭제에 실패하였습니다!",
        });
    }
}

module.exports = {
    getAllMenus,
    getSelectedMenu,
    getPagingMenus,
    createMenu,
    updateMenu,
    deleteMenu,
};
