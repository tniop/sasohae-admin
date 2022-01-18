/* giftList */

// 선물 리스트
function getGiftList() {
    const param = document.location.href.split("=");
    // 페이징처리 떄문에 uri에 /list 추가되어 아래와 같이 처리
    let page = "";
    if (param[1] == "list") {
        page = param[2];
    } else {
        page = param[1];
    }

    $("#giftList").empty()
    $.ajax({
        type: "GET",
        url: `/api/gifts/list/${page}`,
        data: {},
        success: function (response) {
            let giftsData = response["giftsData"]
            let startPage = response["startPage"] // 시작페이지
            let currentPage = response["currentPage"] // 현재페이지
            let endPage = response["endPage"] // 끝페이지
            let totalPage = response["totalPage"] // 전체페이지 수
            let maxInfo = response["maxInfo"] // 한 화면에 보여지는 글의 수 (10개)
            let totalInfo = response["totalInfo"] // 총 데이터 수
            let hideInfo = response["hideInfo"] // 가려지는 데이터 수

            for (let i = 0; i < giftsData.length; i++) {
                let htmlTemp = `<tr id="tr">
                                            <td id="no"></td>
                                            <td>${giftsData[i]["giftName"]}</td>
                                            <td><img width="80px" src="${giftsData[i]["giftUrl"]}"></td> 
                                            <td>${giftsData[i]["giftRecommendCnt"]}</td>
                                            <td>${giftsData[i]["giftLikeCnt"]}</td>
                                            <td style="cursor:pointer;"  onclick="location.href='/gifts/${giftsData[i]["gift_id"]}'">상세페이지 이동</td>
                                            <td style="cursor:pointer;"><img src="../public/assets/img/deleteBtn.png" 
                                                id="delete${giftsData[i]["gift_id"]}" onClick="deleteItem(this.id)" width="40px"></td>
                                        </tr>`
                $("#giftList").append(htmlTemp)
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
            prev = `<li class="pager" id="prevPage"><a href="/giftList?page=${startPage - 1}" data-page="${startPage - 1}">‹</a></li>`
            $("#paginationNavTag").append(prev);
        }
        // 페이지 숫자버튼
        for (let i = startPage; i <= endPage; i++) {
            if (i < startPage) {
                i == startPage;
            } else {
                let pageHtmlTemp = `<li class="" id="clickedPage${i}"><a href="/giftList?page=${i}" data-page="${i}">${i}</a></li>`
                $("#paginationNavTag").append(pageHtmlTemp);
            }
        }
        // 페이지 다음버튼
        if (endPage < totalPage) {
            next = `<li class="pager" id="nextPage"><a href="/giftList?page=${endPage + 1}" data-page="${endPage + 1}">›</a></li>`
            $("#paginationNavTag").append(next);
        } else {
            $("#nextPage").css("display", "block");
        }

        // 페이지에 따른 No 처리
        for (let i = 0; i <= totalInfo; i++) {
            if (currentPage == 1) {
                console.log("currentPage: " + currentPage)
                let tdNumbering = document.getElementById("giftList").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = `${i + 1}`;
            } else {
                console.log("다음")
                for (let j = 1; j <= currentPage; j++) {
                    let startNo = (currentPage - 1) * 10
                    tdNumbering = document.getElementById("giftList").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = `${i + 1 + startNo}`;
                }
            }
        }
    });
}
// 선물 등록 페이지 이동
function moveToInsert() {
    location.href = "/giftInsert";
}
// 선물 삭제
function deleteItem(id) {
    const gift_id = id.split("delete")[1]
    if (confirm("정말로 삭제하시겠습니까?") == true) {
    } else {
        return false;
    }
    $.ajax({
        type: "DELETE",
        url: `/api/gifts/${gift_id}`,
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



/* giftDetail */

// 선물 상세
function getSelectedGift(gift_id) {
    const param = document.location.href.split("/");
    // console.log("param: " + param) // http:,,localhost:3000,gifts,16
    gift_id = param[4];
    $("#giftList").empty()

    $.ajax({
        type: "GET",
        url: `/api/gifts/${gift_id}`,
        data: {},
        error: function (xhr, status, error) {
            if (status == 404) {
                alert("존재하지 않는 항목입니다.");
            }
            location.href = "/giftList";
        },
        success: function (selectedGift) {
            // 질문 타입 radio 입력
            const name = selectedGift.giftName;
            const url = selectedGift.giftUrl;
            const target = selectedGift.giftTarget;
            const event = selectedGift.giftEvent;
            const sex = selectedGift.sex;
            const age = selectedGift.age;
            const expensive = selectedGift.giftAnswerExpensive;
            const personality = selectedGift.giftAnswerPersonality;
            const emotional = selectedGift.giftAnswerEmotional;
            const trendy = selectedGift.giftAnswerTrendy;

            $("#giftName").val(name);

            let htmlTemp = ` <div class="form-group">
                                        <div class="form-group">
                                            <label for="file" class="col-sm-2 control-label">이미지 파일 : </label>
                                            <img src="${url}" width="80px">
                                        </div> 
                                    </div>`
            $("#imgFile").append(htmlTemp)

            // 선물타겟 체크박스 (*제외 후 항목 8개)
            for (let i = 0; i < target.length; i++) {
                const value = ["1", "2", "3", "4", "5", "6", "7", "8"]
                for (let j = 0; j < 8; j++) {
                    if (target[i] == value[j]) {
                        $("#giftTargetCheckbox" + target[i]).prop("checked", true);
                    } else if (target[i] == "*") {
                        $("#giftTargetCheckboxAll").prop("checked", true);
                    }
                }
            }
            // 선물목적 체크박스 (*제외 후 항목 9개)
            for (let i = 0; i < event.length; i++) {
                const value = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                for (let j = 0; j < 9; j++) {
                    if (event[i] == value[j]) {
                        $("#giftEventCheckbox" + event[i]).prop("checked", true);
                    } else if (event[i] == "*") {
                        $("#giftEventCheckboxAll").prop("checked", true);
                    }
                }
            }
            // 성별
            if (sex == "*") {
                $("#sexRadiosAll").prop("checked", true);
            } else if (sex == "M") {
                $("#sexRadios1").prop("checked", true);
            } else if (sex == "W") {
                $("#sexRadios2").prop("checked", true);
            }
            // 연령대 (*제외 항목 5개)
            for (let i = 0; i < age.length; i++) {
                const value = ["20", "30", "40", "50", "60"]
                for (let j = 0; j < 5; j++) {
                    if (age[i] == value[j]) {
                        $("#ageCheckbox" + String(Number(age[i].split("")[0]) - 1)).prop("checked", true);
                    } else if (age[i] == "*") {
                        $("#ageCheckboxAll").prop("checked", true);
                    }
                }
            }
            // 설문에 대한 답변 부분
            const surveryAnswerList = ["expensive", "personality", "emotional", "trendy"]
            for (let i = 0; i < surveryAnswerList.length; i++) {
                if (surveryAnswerList[i] == "*") {
                    $("#" + surveryAnswerList[i]).val("*", true);
                } else if (surveryAnswerList[i] == "T") {
                    $("#" + surveryAnswerList[i]).val("T", true);
                } else if (surveryAnswerList[i] == "F") {
                    $("#" + surveryAnswerList[i]).val("F", true);
                }
            }

        }
    });
}
// 선물타겟 체크박스 전체 선택 시 
function targetAllChkClicked() {
    $("#giftTargetCheckboxAll").click(function () {
        if ($("#giftTargetCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < 9; i++) {
                $("#giftTargetCheckbox" + i).prop("checked", false)
                $("#giftTargetCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < 9; i++) {
                $("#giftTargetCheckbox" + i).prop("disabled", false);
            }
        }
    });
}
// 선물목적 체크박스 전체 선택 시 
function eventAllChkClicked() {
    $("#giftEventCheckboxAll").click(function () {
        if ($("#giftEventCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < 10; i++) {
                $("#giftEventCheckbox" + i).prop("checked", false)
                $("#giftEventCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                $("#giftEventCheckbox" + i).prop("disabled", false);
            }
        }
    });
}
// 연령대 체크박스 전체 선택 시 
function ageAllChkClicked() {
    $("#ageCheckboxAll").click(function () {
        if ($("#ageCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < 10; i++) {
                $("#ageCheckbox" + i).prop("checked", false);
                $("#ageCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                $("#ageCheckbox" + i).prop("disabled", false);
            }
        }
    })
}

function reviseInfo() {
    // gift_id 가져옴
    const param = document.location.href.split("/");
    const gift_id = param[4];

    if (confirm("수정하시겠습니까?") == true) {
    } else {
        return false;
    }

    // 선물타겟 value 확인 및 체크박스 미선택에 대한 알림
    const targetChkArr = [];
    let targetChkCnt = 0;
    const targetChkBox = $(".targetChk");
    for (let i = 1; i <= targetChkBox.length; i++) { // 1부터->전체(*) 제외하고 들어감
        if ($("#giftTargetCheckbox" + i).is(":checked", true)) {
            result = String($("#giftTargetCheckbox" + i).val());
            targetChkArr.push(result);
            targetChkCnt++;
        } else if ($("#giftTargetCheckboxAll").is(":checked", true)) {
            targetChkArr.push("*");
            targetChkCnt++;
            break;
        }
    }
    if (targetChkCnt == 0) {
        alert("선물타겟을 체크해 주세요!")
        return false;
    }

    // 선물목적 value 확인 및 체크박스 미선택에 대한 알림
    const eventChkArr = [];
    let eventChkCnt = 0;
    const eventChkBox = $(".eventChk");
    for (let i = 1; i <= eventChkBox.length; i++) {
        if ($("#giftEventCheckbox" + i).is(":checked", true)) {
            result = String($("#giftEventCheckbox" + i).val());
            eventChkArr.push(result);
            eventChkCnt++;
        } else if ($("#giftEventCheckboxAll").is(":checked", true)) {
            eventChkArr.push("*");
            eventChkCnt++;
            break;
        }
    }
    if (eventChkCnt == 0) {
        alert("선물목적을 체크해 주세요!")
        return false;
    }

    // 연령대 value 확인 및 체크박스 미선택에 대한 알림
    const ageChkArr = [];
    let ageChkCnt = 0;
    const ageChkBox = $(".ageChk");
    for (let i = 1; i <= ageChkBox.length; i++) {
        if ($("#ageCheckbox" + i).is(":checked", true)) {
            result = String($("#ageCheckbox" + i).val());
            ageChkArr.push(result);
            ageChkCnt++;
        } else if ($("#ageCheckboxAll").is(":checked", true)) {
            ageChkArr.push("*");
            ageChkCnt++;
            break;
        }
    }
    if (ageChkCnt == 0) {
        alert("연령대를 체크해 주세요!")
        return false;
    }

    // 성별
    let sex = "";
    const radioLength = document.getElementsByName("sexRadios").length;
    for (let i = 0; i < radioLength; i++) {
        if (document.getElementsByName("sexRadios")[i].checked == true) {
            sex = (document.getElementsByName("sexRadios")[i].value);
        }
    }

    expensive = $("#expensive").val();
    personality = $("#personality").val();
    emotional = $("#emotional").val();
    trendy = $("#trendy").val();

    $.ajax({
        type: "PUT",
        url: `/api/gifts/${gift_id}`,
        traditional: true,
        data: {
            giftTarget: targetChkArr,
            giftEvent: eventChkArr,
            sex: sex,
            age: ageChkArr,
            giftAnswerExpensive: expensive,
            giftAnswerPersonality: personality,
            giftAnswerEmotional: emotional,
            giftAnswerTrendy: trendy,
        },
        success: function (response) {
            alert("성공적으로 변경되었습니다.")
            location.href = location.href
            history.go(0);
        },
        error: function (error) {
            alert(error.responseJSON.errorMessage)
        },
    });
}

function backToList() {
    location.href = location.href
    history.go(-1);
}


/* giftInsert */

// 선물타겟 체크박스를 전체선택한 경우
function targetAllChkClicked() {
    $("#giftTargetCheckboxAll").click(function () {
        if ($("#giftTargetCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < 9; i++) {
                $("#giftTargetCheckbox" + i).prop("checked", false)
                $("#giftTargetCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < 9; i++) {
                $("#giftTargetCheckbox" + i).prop("disabled", false);
            }
        }
    });
}
// 선물목적 체크박스를 전체선택한 경우
function eventAllChkClicked() {
    $("#giftEventCheckboxAll").click(function () {
        if ($("#giftEventCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < 10; i++) {
                $("#giftEventCheckbox" + i).prop("checked", false)
                $("#giftEventCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                $("#giftEventCheckbox" + i).prop("disabled", false);
            }
        }
    });
}
// 연령대 체크박스를 전체선택한 경우
function ageAllChkClicked() {
    $("#ageCheckboxAll").click(function () {
        if ($("#ageCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < 10; i++) {
                $("#ageCheckbox" + i).prop("checked", false);
                $("#ageCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                $("#ageCheckbox" + i).prop("disabled", false);
            }
        }
    });
}

function insertInfo() {
    if (confirm("등록하시겠습니까?") == true) {
    } else {
        return false;
    }

    const giftName = $("#giftName").val();
    if ($("#giftName").val() == "") {
        alert("선물이름을 입력해 주세요!");
        $("#giftName").focus();
        return;
    }

    if ($("#imgFile").val() == "") {
        alert("이미지 파일을 첨부해 주세요!");
        return;
    }

    // 선물타겟 value 확인 및 체크박스 미선택에 대한 알림
    const giftTarget = [];
    let targetChkCnt = 0;
    const targetChkBox = $(".targetChk");
    for (let i = 1; i <= targetChkBox.length; i++) { // 1부터->전체(*) 제외하고 들어감
        if ($("#giftTargetCheckbox" + i).is(":checked", true)) {
            result = String($("#giftTargetCheckbox" + i).val());
            giftTarget.push(result);
            targetChkCnt++;
        } else if ($("#giftTargetCheckboxAll").is(":checked", true)) {
            giftTarget.push("*");
            targetChkCnt++;
            break;
        }
    }
    if (targetChkCnt == 0) {
        alert("선물타겟을 체크해 주세요!")
        return false;
    }

    // 선물목적 value 확인 및 체크박스 미선택에 대한 알림
    const giftEvent = [];
    let eventChkCnt = 0;
    const eventChkBox = $(".eventChk");
    for (let i = 1; i <= eventChkBox.length; i++) {
        if ($("#giftEventCheckbox" + i).is(":checked", true)) {
            result = String($("#giftEventCheckbox" + i).val());
            giftEvent.push(result);
            eventChkCnt++;
        } else if ($("#giftEventCheckboxAll").is(":checked", true)) {
            giftEvent.push("*");
            eventChkCnt++;
            break;
        }
    }
    if (eventChkCnt == 0) {
        alert("선물목적을 체크해 주세요!")
        return false;
    }

    // 연령대 value 확인 및 체크박스 미선택에 대한 알림
    const age = [];
    let ageChkCnt = 0;
    const ageChkBox = $(".ageChk");
    for (let i = 1; i <= ageChkBox.length; i++) {
        if ($("#ageCheckbox" + i).is(":checked", true)) {
            result = String($("#ageCheckbox" + i).val());
            age.push(result);
            ageChkCnt++;
        } else if ($("#ageCheckboxAll").is(":checked", true)) {
            age.push("*");
            ageChkCnt++;
            break;
        }
    }
    if (ageChkCnt == 0) {
        alert("연령대를 체크해 주세요!")
        return false;
    }

    // 성별
    let sex = "";
    const radioLength = document.getElementsByName("sexRadios").length;
    for (let i = 0; i < radioLength; i++) {
        if (document.getElementsByName("sexRadios")[i].checked == true) {
            sex = (document.getElementsByName("sexRadios")[i].value);
        }
    }

    // 설문에 대한 답변들
    const giftAnswerExpensive = $("#expensive").val();
    const giftAnswerPersonality = $("#personality").val();
    const giftAnswerEmotional = $("#emotional").val();
    const giftAnswerTrendy = $("#trendy").val();

    const formData = new FormData();
    const img = document.getElementById("imgFile").files[0];

    // formData에 담음. DB에 배열로 담기는 부분 JSON.stringify 처리
    formData.append("giftName", giftName);
    formData.append("img", img);
    formData.append("giftTarget", JSON.stringify(giftTarget));
    formData.append("giftEvent", JSON.stringify(giftEvent));
    formData.append("sex", sex);
    formData.append("age", JSON.stringify(age));
    formData.append("giftAnswerExpensive", giftAnswerExpensive);
    formData.append("giftAnswerPersonality", giftAnswerPersonality);
    formData.append("giftAnswerEmotional", giftAnswerEmotional);
    formData.append("giftAnswerTrendy", giftAnswerTrendy);

    const body = {
        giftName,
        img,
        giftTarget,
        giftEvent,
        sex,
        age,
        giftAnswerExpensive,
        giftAnswerPersonality,
        giftAnswerEmotional,
        giftAnswerTrendy,
    }
    $.ajax({
        type: "POST",
        url: "/api/gifts",
        data: formData,
        traditional: true,
        processData: false,
        contentType: false,
        success: function (response) {
            alert("선물 등록에 성공하였습니다!")
            // location.href = "/giftList"
            location.href = location.href
            history.go(-1);
        },
        error: function (error) {
            alert(error.responseJSON.errorMessage)
        },
    });

}

function backToList() {
    location.href = location.href
    history.go(-1);
}