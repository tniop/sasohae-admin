/* giftQuestionsDetail */

// 선물 질문 상세
function getSelectedQuestion(giftQuestion_id) {
    // giftQuestion_id 가져옴
    const param = document.location.href.split("/");
    giftQuestion_id = param[4];
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
            // 질문 타입 radio 입력
            const type = selectedGiftQuestions.giftQuestionType;
            const question = selectedGiftQuestions.giftQuestion;

            if (type == "personality") {
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

// 수정버튼 클릭 시 giftQuestionType, giftQuestion input 활성화
function activateInput() {
    if ($("#giftQuestion").attr("disabled", true)) {
        $("#giftQuestion").attr("disabled", false);
    }
    if ($("#personality").attr("disabled", true)) {
        $("#personality").attr("disabled", false);
    }
    if ($("#emotional").attr("disabled", true)) {
        $("#emotional").attr("disabled", false);
    }
    if ($("#trendy").attr("disabled", true)) {
        $("#trendy").attr("disabled", false);
    }
}

// 수정 버튼 클릭 시 
function reviseInfo() {
    activateInput() // 버튼, input 활성화

    const radioLength = document.getElementsByName("giftQuestionType").length;
    for (let i = 0; i < radioLength; i++) {
        if (document.getElementsByName("giftQuestionType")[i].checked == true) {
            (document.getElementsByName("giftQuestionType")[i].value);
        }
    }
    if ($("#giftQuestion").val() == "") {
        alert("공백 없이 입력해주세요!");
        $("#giftQuestion").focus();
        return;
    }
    $("#reviseBtn").click(function () {
        reviseBtnClickAgain();
    });
}

function reviseBtnClickAgain() {
    const param = document.location.href.split("/");
    let giftQuestion_id = param[4];

    const radioLength = document.getElementsByName("giftQuestionType").length;
    for (let i = 0; i < radioLength; i++) {
        if (document.getElementsByName("giftQuestionType")[i].checked == true) {
            chkType = (document.getElementsByName("giftQuestionType")[i].value);
        }
    }
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


/* giftQuestionsInsert */

// 선물 질문 등록
function insertInfo(checkedRadio) {
    // 체크된 라디오 버튼 확인   
    const radio_length = document.getElementsByName("giftQuestionType").length;
    for (let i = 0; i < radio_length; i++) {
        if (document.getElementsByName("giftQuestionType")[i].checked == true) {
            chkType = (document.getElementsByName("giftQuestionType")[i].value);
        }
    }
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

function backToList() {
    location.href = "/giftQuestionsList";
}
