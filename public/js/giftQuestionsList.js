$(document).ready(() => {
    getQuestionsList();
});

function getQuestionsList() {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);
    $.ajax({
        type: "GET",
        url: `/api/giftQuestions/`,
        data: {},
        success: (res) => {
            const allGiftQuestions = res;
            let newRows = [];
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