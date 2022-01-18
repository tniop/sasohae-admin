/* giftQuestionsList */

// 선물 질문 리스트
function getQuestionsList() {
    const param = document.location.href.split("=");
    // 페이징처리 떄문에 uri에 /list 추가되어 아래와 같이 처리
    let page = "";
    if (param[1] == "list") {
        page = param[2];
    } else {
        page = param[1];
    }

    $("#giftQuestionsList").empty()
    $.ajax({
        type: "GET",
        url: `/api/giftQuestions/list/${page}`,
        data: {},
        success: function (response) {
            let giftsQuestionsData = response["giftsQuestionsData"]
            let startPage = response["startPage"] // 시작페이지
            let currentPage = response["currentPage"] // 현재페이지
            let endPage = response["endPage"] // 끝페이지
            let totalPage = response["totalPage"] // 전체페이지 수
            let maxInfo = response["maxInfo"] // 한 화면에 보여지는 글의 수 (10개)
            let totalInfo = response["totalInfo"] // 총 데이터 수
            let hideInfo = response["hideInfo"] // 가려지는 데이터 수

            for (let i = 0; i < giftsQuestionsData.length; i++) {
                let htmlTemp = `<tr id="tr">
                                <td id="no"></td>
                                <td>${giftsQuestionsData[i]["giftQuestionType"]}</td>
                                <td>${giftsQuestionsData[i]["giftQuestion"]}</td>
                                <td style="cursor:pointer;"  onclick="location.href='/giftQuestions/${giftsQuestionsData[i]["giftQuestion_id"]}'">상세페이지 이동</td>
                                <td style="cursor:pointer;"><img src="../public/assets/img/deleteBtn.png" id="delete${giftsQuestionsData[i]["giftQuestion_id"]}" onClick="deleteItem(this.id)" width="40px"></td>
                            </tr>`
                $("#giftQuestionsList").append(htmlTemp)
            }
        }
    }).then(function pagination(response) {
        startPage = response["startPage"]
        currentPage = response["currentPage"]
        endPage = response["endPage"]
        totalPage = response["totalPage"]
        maxInfo = response["maxInfo"]
        totalInfo = response["totalInfo"]
        hideInfo = response["hideInfo"]

        // 테이블 데이터 카운트에 대한 정보
        let showCnt = `<div class="dataTable-info" id="tableInfo">Showing ${currentPage} to ${endPage} of ${totalInfo} entries</div>`
        $("#tableDataCntInfo").append(showCnt);

        // 페이지 이전버튼
        if (startPage == 1) {
            $("#prevPage").css("display", "block");
        } else {
            prev = `<li class="pager" id="prevPage"><a href="/giftQuestionsList?page=${startPage - 1}" data-page="${startPage - 1}">‹</a></li>`
            $("#paginationNavTag").append(prev);
        }
        // 페이지 숫자버튼
        for (let i = startPage; i <= endPage; i++) {
            if (i < startPage) {
                i == startPage;
            } else {
                let pageHtmlTemp = `<li class="" id="clickedPage${i}"><a href="/giftQuestionsList?page=${i}" data-page="${i}">${i}</a></li>`
                $("#paginationNavTag").append(pageHtmlTemp);
            }
        }
        // 페이지 다음버튼
        if (endPage < totalPage) {
            next = `<li class="pager" id="nextPage"><a href="/giftQuestionsList?page=${endPage + 1}" data-page="${endPage + 1}">›</a></li>`
            $("#paginationNavTag").append(next);
        } else {
            $("#nextPage").css("display", "block");
        }

        // 페이지에 따른 No 처리
        for (let i = 0; i <= totalPage; i++) {
            if (currentPage == 1) {
                console.log("currentPage: " + currentPage)
                let tdNumbering = document.getElementById("giftQuestionsList").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = `${i + 1}`;
            } else {
                console.log("다음")
                for (let j = 1; j <= currentPage; j++) {
                    let startNo = (currentPage - 1) * 10
                    tdNumbering = document.getElementById("giftQuestionsList").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = `${i + 1 + startNo}`;
                }
            }
        }
    });
}

function moveToInsert() {
    location.href = "/giftQuestionsInsert";
}

function backToList() {
    location.href = location.href
    history.go(-1);
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

    let chkType = "";
    const radioLength = document.getElementsByName("giftQuestionType").length;
    for (var i = 0; i < radioLength; i++) {
        if (document.getElementsByName("giftQuestionType")[i].checked == true) {
            chkType = (document.getElementsByName("giftQuestionType")[i].value);
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

    let chkType = "";
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

// function backToList() {
//     location.href = location.href
//     history.go(-1);
// }



/* giftQuestionsInsert */

// 선물 질문 등록
function insertInfo(checkedRadio) {
    // 체크된 라디오 버튼 확인   
    const radio_length = document.getElementsByName("giftQuestionType").length;
    for (var i = 0; i < radio_length; i++) {
        if (document.getElementsByName("giftQuestionType")[i].checked == true) {
            var chkType = (document.getElementsByName("giftQuestionType")[i].value);
        }
    }
    if ($("#giftQuestion").val() == "") { // 미입력 상태일 경우 
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
            location.href = location.href
            history.go(-1);
        },
        error: function (error) {
            alert(error.responseJSON.errorMessage)
        },
    });
}

// function backToList() {
//     // location.href = "/giftQuestionsList";
//     location.href = location.href
//     history.go(-1);
// }