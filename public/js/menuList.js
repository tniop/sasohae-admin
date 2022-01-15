$(document).ready(function () {
    getMenuList();
});

function getMenuList() {
    $("#menuList").empty();
    $.ajax({
        type: "GET",
        url: "/api/menus",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                makeTable(response[i]);
            }
        },
    });
}

function makeTable(info) {
    let htmlTemp = `<tr>
                        <td>${info["menu_id"]}</td>
                        <td>${info["menuName"]}</td>
                        <td><img width="37px" src="${info["menuUrl"]}"></td>
                        <td>${info["menuType"]}</td>
                        <td>${info["menuStyle"]}</td>
                        <td>${info["menuWith"]}</td>
                        <td>${info["menuRecommendCnt"]}</td>
                        <td>${info["menuLikeCnt"]}</td>
                        <td id="${info["menu_id"]}" style="cursor:pointer;" onClick="moveToDetail(this.id)">상세</td>
                        <td><input type="button" id="${info["menu_id"]}" onClick="deleteItem(this.id)"
                                class="btn btn-outline-primary" value="삭제"></td>
                    </tr>
                    `;
    $("#menuList").append(htmlTemp);
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
