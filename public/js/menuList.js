$(document).ready(() => {
    getMenuList();
});

let newRows = [];
function getMenuList() {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);

    $.ajax({
        type: "get",
        url: `/api/menus`,
        data: {},
        success: (res) => {
            const allMenus = res;
        
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


// csv 추출
let columData = [];
function exportExcel() {
    let selectedColum = [];

    // 데이터인 newRows만큼 추출
    for (let i = 0; i < newRows.length; i++) {
        // 필요한 컬럼의 데이터만 추출해서 배열로 만듬
        for (let j = 0; j < 5; j++) {
            // 처음에 th(컬럼명) 부분 먼저 추출
            if (i == 0 && j == 0) {
                selectedColum.push(document.getElementsByTagName('th')[0].innerText);
                selectedColum.push(document.getElementsByTagName('th')[1].innerText);
                selectedColum.push(document.getElementsByTagName('th')[2].innerText);
                selectedColum.push(document.getElementsByTagName('th')[3].innerText);
                selectedColum.push(document.getElementsByTagName('th')[4].innerText);
            }
            // url 컬럼일 때 
            if (j == 2) {
                // img url 에서 src 내부 url만 추출
                selectedColum.push((newRows[i][j]).split('"')[3]);
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
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), excelHandler.getExcelFileName());
}

const excelHandler = {
    getExcelFileName: function () {
        return 'sasohae-menu-data.xlsx';
    },
    getSheetName: function () {
        return 'menuList Sheet';
    },
    getExcelData: function () {
        return columData;
    },
    getWorksheet: function () {
        return XLSX.utils.aoa_to_sheet(this.getExcelData());
    }
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}