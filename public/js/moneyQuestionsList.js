$(document).ready(() => {
    getMoneyQuestionList();
});

function getMoneyQuestionList() {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);

    $.ajax({
        type: "get",
        url: `/api/moneyQuestions`,
        data: {},
        success: (response) => {
            const allMoneyQuestions = response;
            let newRows = [];

            console.log(allMoneyQuestions);

            for (let i = 0; i < allMoneyQuestions.length; i++) {
                let tempRow = [];
                tempRow.push(`${i + 1}`);
                tempRow.push(allMoneyQuestions[i].moneyQuestion);
                tempRow.push(allMoneyQuestions[i].positiveAnswerQuestion);
                tempRow.push(allMoneyQuestions[i].negativeAnswerQuestion);
                tempRow.push(
                    allMoneyQuestions[i].positiveChangeValue.toString()
                );
                tempRow.push(`<input type="button" id="${allMoneyQuestions[i].moneyQuestion_id}" onclick="location.href='/moneyQuestions/${allMoneyQuestions[i].moneyQuestion_id}'"
                class="btn btn-outline-primary" value="상세페이지">`);
                tempRow.push(
                    `<img style="cursor:pointer;" src="../public/assets/img/deleteBtn.png" id="${allMoneyQuestions[i].moneyQuestion_id}" onClick="deleteItem(this.id)" width="40px">`
                );

                newRows.push(tempRow);
            }
            dataTable.rows().add(newRows);
        },
    });
}

function moveToInsert() {
    location.href = "moneyQuestionsInsert";
}

function deleteItem(id) {
    let moneyQuestion_id = id;
    console.log(moneyQuestion_id);
    if (confirm("정말로 삭제하시겠습니까?") == true) {
    } else {
        return false;
    }
    $.ajax({
        type: "DELETE",
        url: `/api/moneyQuestions/${moneyQuestion_id}`,
        data: {},
        success: function (response) {
            alert("삭제 완료!");
            location.href = location.href;
            history.go(0);
        },
    });
}
