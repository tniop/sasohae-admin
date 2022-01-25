$(document).ready(() => {
    checkAdminPosition();
});

function insertInfo() {
    const moneyQuestion_id = $("#moneyQuestion_id").val();
    const moneyQuestion = $("#moneyQuestion").val();
    const positiveAnswerQuestion = $("#positiveAnswerQuestion").val();
    const negativeAnswerQuestion = $("#negativeAnswerQuestion").val();
    const positiveChangeValue = $("#positiveChangeValue").val();

    if (
        !moneyQuestion_id ||
        !moneyQuestion ||
        !positiveAnswerQuestion ||
        !negativeAnswerQuestion ||
        !positiveChangeValue
    ) {
        alert("축의금 질문 등록을 위한 정보를 기입해주세요!");
        return;
    }
    if (window.confirm("축의금 질문을 등록하시겠습니까?")) {
        $.ajax({
            type: "post",
            url: "/api/moneyQuestions",
            data: {
                moneyQuestion_id,
                moneyQuestion,
                positiveAnswerQuestion,
                negativeAnswerQuestion,
                positiveChangeValue,
            },
            success: (response) => {
                alert("축의금 질문 등록에 성공하였습니다!");
                location.href = "/moneyQuestionsList";
            },
            error: (err) => {
                alert(err.responseJSON.errorMessage);
            },
        });
    }
}

function moveToList() {
    location.href = "/moneyQuestionsList";
}

function checkAdminPosition() {
    const admin_id = sessionStorage.getItem("_id");

    $.ajax({
        type: "get",
        url: `/api/admins/${admin_id}`,
        data: {},
        success: (response) => {
            const adminPosition = response.adminPosition;
            if (adminPosition == "guest") {
                alert("권한이 필요한 페이지입니다!");
                location.href = "/";
            }
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}
