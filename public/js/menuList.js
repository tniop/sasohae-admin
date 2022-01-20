$(document).ready(() => {
    getMenuList();
});

function getMenuList() {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);

    $.ajax({
        type: "get",
        url: `/api/menus`,
        data: {},
        success: (res) => {
            const allMenus = res;
            let newRows = [];

            for (let i = 0; i < allMenus.length; i++) {
                let tempRow = [];
                tempRow.push(`${i + 1}`);
                tempRow.push(allMenus[i].menuName);
                tempRow.push(`<img width="37px" src="${allMenus[i].menuUrl}">`);
                tempRow.push(allMenus[i].menuRecommendCnt.toString());
                tempRow.push(allMenus[i].menuLikeCnt.toString());
                tempRow.push(`<input type="button" id="${allMenus[i].menu_id}" onClick="moveToDetail(this.id)"
                class="btn btn-outline-primary" value="상세페이지">`);
                tempRow.push(
                    `<img style="cursor:pointer;" src="../public/assets/img/deleteBtn.png" id="${allMenus[i].menu_id}" onClick="deleteItem(this.id)" width="40px">`
                );

                newRows.push(tempRow);
            }
            dataTable.rows().add(newRows);
        },
    });
}

function moveToInsert() {
    location.href = "/menuInsert";
}

function moveToDetail(Idx) {
    const menu_id = Idx;
    location.href = `/menuDetail/${menu_id}`;
}

function deleteItem(Idx) {
    const menu_id = Idx;
    if (window.confirm("정말로 삭제하시겠습니까?")) {
        $.ajax({
            type: "delete",
            url: `/api/menus/${menu_id}`,
            data: {},
            success: (res) => {
                alert("메뉴 정보가 삭제되었습니다!");
                location.reload(true);
                return;
            },
            error: (err) => {
                alert(err.responseJSON.errorMessage);
            },
        });
    }
}
