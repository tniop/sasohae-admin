$(document).ready(() => {
    checkAdminPosition();
});

let newRows = [];

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

let columData = [];
function exportExcel() {
    let selectedColum = [];

    // 데이터인 newRows만큼 추출
    for (let i = 0; i < newRows.length; i++) {
        // 필요한 컬럼의 데이터만 추출해서 배열로 만듬
        for (let j = 0; j < 5; j++) {
            // 처음에 th(컬럼명) 부분 먼저 추출
            if (i == 0 && j == 0) {
                selectedColum.push(
                    document.getElementsByTagName("th")[0].innerText
                );
                selectedColum.push(
                    document.getElementsByTagName("th")[1].innerText
                );
                selectedColum.push(
                    document.getElementsByTagName("th")[2].innerText
                );
                selectedColum.push(
                    document.getElementsByTagName("th")[3].innerText
                );
                selectedColum.push(
                    document.getElementsByTagName("th")[4].innerText
                );
            }
            // url 컬럼일 때
            if (j == 2) {
                // img url 에서 src 내부 url만 추출
                selectedColum.push(newRows[i][j].split('"')[3]);
            } else {
                selectedColum.push(newRows[i][j]);
            }
        }
    }
    // 각 행의 데이터를 하나의 배열에 각각 담음 (행의 길이 만큼 배열 생성)
    for (i = 0; i < selectedColum.length; i += 5) {
        columData.push(selectedColum.slice(i, i + 5));
    }

    const wb = XLSX.utils.book_new();
    const newWorksheet = excelHandler.getWorksheet();
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        excelHandler.getExcelFileName()
    );
}

const excelHandler = {
    getExcelFileName: function () {
        return "sasohae-gift-data.xlsx";
    },
    getSheetName: function () {
        return "giftList Sheet";
    },
    getExcelData: function () {
        return columData;
    },
    getWorksheet: function () {
        return XLSX.utils.aoa_to_sheet(this.getExcelData());
    },
};

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
}

function checkAdminPosition() {
    const admin_id = sessionStorage.getItem("_id");

    $.ajax({
        type: "get",
        url: `/api/admins/${admin_id}`,
        data: {},
        success: (response) => {
            const adminPosition = response.adminPosition;
            makeTable(adminPosition);
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function makeTable(adminPosition) {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);
    $.ajax({
        type: "GET",
        url: `/api/gifts/`,
        data: {},
        success: (res) => {
            const allGifts = res;

            for (let i = 0; i < allGifts.length; i++) {
                let tempRow = [];
                if (adminPosition != "guest") {
                    tempRow.push(`${i + 1}`);
                    tempRow.push(allGifts[i].giftName);
                    tempRow.push(
                        `<img width="80px" src="${allGifts[i].giftUrl}">`
                    );
                    tempRow.push(allGifts[i].giftRecommendCnt.toString());
                    tempRow.push(allGifts[i].giftLikeCnt.toString());
                    tempRow.push(`<input type="button" id="${allGifts[i].gift_id}" onclick="location.href='/gifts/${allGifts[i].gift_id}'"
                                    class="btn btn-outline-primary" value="상세페이지">`);
                    tempRow.push(
                        `<img src="../public/assets/img/deleteBtn.png" id="delete${allGifts[i].gift_id}" onClick="deleteItem(this.id)" width="40px" style="cursor:pointer;">`
                    );
                } else {
                    tempRow.push(`${i + 1}`);
                    tempRow.push(allGifts[i].giftName);
                    tempRow.push(
                        `<img width="80px" src="${allGifts[i].giftUrl}">`
                    );
                    tempRow.push(allGifts[i].giftRecommendCnt.toString());
                    tempRow.push(allGifts[i].giftLikeCnt.toString());
                    tempRow.push(`<input type="button" id="${allGifts[i].gift_id}" onclick="alert('권한이 필요한 작업입니다!')"
                                    class="btn btn-outline-primary" value="상세페이지">`);
                    tempRow.push(
                        `<img src="../public/assets/img/deleteBtn.png" id="delete${allGifts[i].gift_id}" onClick="alert('권한이 필요한 작업입니다!')" width="40px" style="cursor:pointer;">`
                    );
                }

                newRows.push(tempRow);
            }

            dataTable.rows().add(newRows);
        },
    });
}

function moveToInsert() {
    const admin_id = sessionStorage.getItem("_id");

    $.ajax({
        type: "get",
        url: `/api/admins/${admin_id}`,
        data: {},
        success: (response) => {
            const adminPosition = response.adminPosition;

            if (adminPosition != "guest") {
                location.href = "/giftInsert";
            } else {
                alert("권한이 필요한 작업입니다!");
            }
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}
