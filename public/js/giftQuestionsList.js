$(document).ready(() => {
    getQuestionsList();
    checkCsv();
    
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

function checkCsv() { 
    console.log("checkCsv 함수 들어옴")
    //다운로드 하이퍼링크에 클릭 이벤트 발생시 saveCSV 함수를 호출하도록 이벤트 리스너를 추가
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("downloadCsv").addEventListener("click", function () {
            saveCSV("data.csv"); // CSV파일 다운로드 함수 호출
            return false;
        })
    });
}


//CSV 생성 함수
function saveCsv(fileName) {
    let selectedColum = [];
    
    //CSV 문자열 생성
    let downLink = document.getElementById("downloadCsv");
    let csv = ""; //CSV최종 문자열을 저장하는 변수

    // 필요한 컬럼(앞에서 3개)만 데이터 추출하여 selectedColum에 담음
    for (let i = 0; i < newRows.length; i++) {
        for (var j = 0; j < 3; j++) {
            //console.log(newRows[j][i])
            selectedColum.push(newRows[i][j])
        } 
       
    }
    csv += selectedColum.join(',') + (j == 2 ? '\n' : ''); // 배열을 문자열+줄바꿈으로 변환


    const korean = "\uFEFF";
    csv = korean + csv;

    // CSV 파일 저장
    csvFile = new Blob([csv], { type: "text/csv;" }); // 생성한 CSV 문자열을 Blob 데이터로 생성
    downLink.href = window.URL.createObjectURL(csvFile); // Blob 데이터를 URL 객체로 감싸 다운로드 하이퍼링크에 붙임.
    downLink.download = fileName; // 인자로 받은 다운로드 파일명을 지정
    window.open(downLink.href); // 별도 추가함
}