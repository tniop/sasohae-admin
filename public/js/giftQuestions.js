function insertInfo(checkedRadio) {
    const chkType = buttonClick("giftQuestionType");
    if ($("#giftQuestion").val() == "") {
        alert("공백 없이 입력해주세요!");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/api/giftQuestions",
        data: {
            giftQuestionType: chkType,
            giftQuestion: $("#giftQuestion").val(),
        },
        success: function (response) {
            location.href = "/giftQuestionsList";
        },
        error: function (error) {
            alert(error.responseJSON.errorMessage)
        },
    });
}

function getSelectedQuestion() {
    const giftQuestion_id = window.location.href.split("/")[4];
    $("#giftQuestionsList").empty()

    $.ajax({
        type: "GET",
        url: `/api/giftQuestions/${giftQuestion_id}`,
        data: {},
        error: function (xhr, status, error) {
            if (status == 404) {
                alert("존재하지 않는 항목입니다.");
            }
            location.href = location.href
            history.go(-1);
        },
        success: function (selectedGiftQuestions) {
            const type = selectedGiftQuestions.giftQuestionType;
            const question = selectedGiftQuestions.giftQuestion;
            if (type == "personality") { // 질문 타입 radio 입력
                $("#personality").prop("checked", true);
            } else if (type == "emotional") {
                $("#emotional").prop("checked", true);
            } else if (type == "trendy") {
                $("#trendy").prop("checked", true);
            }
            $("#giftQuestion").val(question);
        }
    });
}

function reviseInfo() {
    const giftQuestion_id = window.location.href.split("/")[4];
    if ($("#giftQuestion").val() == "") {
        alert("공백 없이 입력해주세요!");
        $("#giftQuestion").focus();
        return;
    }
    const chkType = buttonClick("giftQuestionType");

    if (confirm("정말로 수정하시겠습니까?")) {
        $.ajax({
            type: "PUT",
            url: `/api/giftQuestions/${giftQuestion_id}`,
            data: {
                giftQuestionType: chkType,
                giftQuestion: $("#giftQuestion").val(),
            },
            success: function (response) {
                location.href = location.href
                history.go(0);
            },
            error: function (error) {
                alert(error.responseJSON.errorMessage)
            },
        });
    }
}

function buttonClick(name) {
    let tempChkType = "";
    const tempLength = document.getElementsByName(name).length;
    for (let i = 0; i < tempLength; i++) {
        if (document.getElementsByName(name)[i].checked == true) {
            tempChkType = document.getElementsByName(name)[i].value;
        }
    }
    return tempChkType;
}

function backToList() {
    location.href = "/giftQuestionsList";
}