$(document).ready(() => {
    getGiftList();
});

function getGiftList() {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);
    $.ajax({
        type: "GET",
        url: `/api/gifts/`,
        data: {},
        success: (res) => {
            const allGifts = res;
            let newRows = [];

            for (let i = 0; i < allGifts.length; i++) {
                let tempRow = [];
                tempRow.push(`${i+1}`);
                tempRow.push(allGifts[i].giftName);
                tempRow.push(`<img width="80px" src="${allGifts[i].giftUrl}">`);
                tempRow.push(allGifts[i].giftRecommendCnt.toString());
                tempRow.push(allGifts[i].giftLikeCnt.toString());
                tempRow.push(`<input type="button" id="${allGifts[i].gift_id}" onclick="location.href='/gifts/${allGifts[i].gift_id}'"
                class="btn btn-outline-primary" value="상세페이지">`);
                tempRow.push(
                    `<img src="../public/assets/img/deleteBtn.png" id="delete${allGifts[i].gift_id}" onClick="deleteItem(this.id)" width="40px" style="cursor:pointer;">`
                );

                newRows.push(tempRow);
            }

            dataTable.rows().add(newRows);
        },
    });
}

function moveToInsert() {
    location.href = "/giftInsert";
}

function deleteItem(id) {
    const gift_id = id.split("delete")[1];
    if (confirm("정말로 삭제하시겠습니까?") == true) {
    } else {
        return false;
    }
    $.ajax({
        type: "DELETE",
        url: `/api/gifts/${gift_id}`,
        data: {},
        success: function (response) {
            location.href = location.href;
            history.go(0);
        },
        error: function (error) {
            alert(error.responseJSON.errorMessage);
        },
    });
}
