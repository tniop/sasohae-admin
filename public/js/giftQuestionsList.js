$(document).ready(() => {
    getQuestionsList();
});

let newRows = [];
function getQuestionsList() {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);
    $.ajax({
        type: "GET",
        url: `/api/giftQuestions/`,
        data: {},
        success: (res) => {
            const allGiftQuestions = res;
            for (let i = 0; i < allGiftQuestions.length; i++) {
                let tempRow = [];
                tempRow.push(`${i + 1}`);
                tempRow.push(allGiftQuestions[i].giftQuestionType);
                tempRow.push(allGiftQuestions[i].giftQuestion);
                tempRow.push(`<input type="button" id="${allGiftQuestions[i].giftQuestion_id}" onclick="location.href='/giftQuestions/${allGiftQuestions[i].giftQuestion_id}'"
                class="btn btn-outline-primary" value="상세페이지">`);
                tempRow.push(
                    `<img src="../public/assets/img/deleteBtn.png" id="delete${allGiftQuestions[i].giftQuestion_id}" onClick="deleteItem(this.id)" width="40px" style="cursor:pointer;">`
                );

                newRows.push(tempRow);
            }

            dataTable.rows().add(newRows);
        },
    });
}

function moveToInsert() {
    location.href = "/giftQuestionsInsert";
}

function deleteItem(id) {
    let giftQuestion_id = id.split("delete")[1]
    if (confirm("정말로 삭제하시겠습니까?") == true) {
    } else {
        return false;
    }
    $.ajax({
        type: "DELETE",
        url: `/api/giftQuestions/${giftQuestion_id}`,
        data: {},
        success: function (response) {
            location.href = location.href
            history.go(0);
        },
        error: function (error) {
            alert(error.responseJSON.errorMessage)
        },
    });
}


let columData = [];
function exportExcel() {
    let selectedColum = [];
  
    // 데이터인 newRows만큼 추출
    for (let i = 0; i < newRows.length; i++) {
        // 필요한 컬럼의 데이터만 추출해서 배열로 만듬
        for (let j = 0; j < 3; j++) {
            // 처음에 th(컬럼명) 부분 먼저 추출
            if (i == 0 && j == 0) {
                selectedColum.push(document.getElementsByTagName('th')[0].innerText);
                selectedColum.push(document.getElementsByTagName('th')[1].innerText);
                selectedColum.push(document.getElementsByTagName('th')[2].innerText);             
            }
            selectedColum.push(newRows[i][j])
        }
    }

    // 각 행의 데이터를 하나의 배열에 각각 담음 (행의 길이 만큼 배열 생성)
    for (i = 0; i < selectedColum.length; i += 3) {
        columData.push(selectedColum.slice(i, i + 3));
    }
    
    // workbook 생성
    const wb = XLSX.utils.book_new();
    // 시트 만들기 
    const newWorksheet = excelHandler.getWorksheet();
    // workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
    // 엑셀 파일 만들기 
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    // 엑셀 파일 내보내기 
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), excelHandler.getExcelFileName());
}

const excelHandler = {
    getExcelFileName: function () {
        return 'sasohae-giftQuestions-data.xlsx';
    },
    getSheetName: function () {
        return 'giftQuestionsList Sheet';
    },
    getExcelData: function () {
        return columData;
    },
    getWorksheet: function () {
        return XLSX.utils.aoa_to_sheet(this.getExcelData());
    }
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    const view = new Uint8Array(buf);  //create uint8array as viewer
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}