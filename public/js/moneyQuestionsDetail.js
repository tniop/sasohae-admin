$(document).ready(function () {
    setQuestion();
});

function setQuestion() {
    const moneyQuestion_id = window.location.href.split("/")[4];
    $.ajax({
        type: "GET",
        url: `/api/moneyQuestions/${moneyQuestion_id}`,
        data: {},
        success: function (response) {
            $("#moneyQuestion").val(response["moneyQuestion"]);
            $("#positiveAnswerQuestion").val(
                response["positiveAnswerQuestion"]
            );
            $("#negativeAnswerQuestion").val(
                response["negativeAnswerQuestion"]
            );
            $("#positiveChangeValue").val(response["positiveChangeValue"]);
        },
    });
}

function reviseInfo() {
    const moneyQuestion_id = window.location.href.split("/")[4];
    if (
        $("#moneyQuestion").val() != "" &&
        $("#positiveAnswerQuestion").val() != "" &&
        $("#negativeAnswerQuestion").val() != "" &&
        $("#positiveChangeValue").val() != ""
    ) {
        $.ajax({
            type: "PUT",
            url: `/api/moneyQuestions/${moneyQuestion_id}`,
            data: {
                moneyQuestion: $("#moneyQuestion").val(),
                positiveAnswerQuestion: $("#positiveAnswerQuestion").val(),
                negativeAnswerQuestion: $("#negativeAnswerQuestion").val(),
                positiveChangeValue: $("#positiveChangeValue").val(),
            },
            success: function (response) {
                alert("저장되었습니다.");
                location.href = "/moneyQuestionsList";
            },
        });
    } else {
        alert("입력칸을 모두 채워주세요.");
    }
}

function goToList() {
    location.href = "/moneyQuestionsList";
}
