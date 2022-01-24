function getSelectedGift() {
    const gift_id = window.location.href.split("/")[4];
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

            // 선물타겟 체크박스
            for (let i = 0; i < target.length; i++) {
                const value = ["1", "2", "3", "4", "5", "6", "7", "8"]
                for (let j = 0; j < value.length; j++) {
                    if (target[i] == value[j]) {
                        $("#giftTargetCheckbox" + target[i]).prop("checked", true);
                    } else if (target[i] == "*") {
                        $("#giftTargetCheckboxAll").prop("checked", true);
                    }
                }
            }
            // 선물목적 체크박스
            for (let i = 0; i < event.length; i++) {
                const value = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                for (let j = 0; j < value.length; j++) {
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
            // 연령대
            for (let i = 0; i < age.length; i++) {
                const value = ["20", "30", "40", "50", "60"]
                for (let j = 0; j < value.length; j++) {
                    if (age[i] == value[j]) {
                        $("#ageCheckbox" + String(Number(age[i].split("")[0]) - 1)).prop("checked", true);
                    } else if (age[i] == "*") {
                        $("#ageCheckboxAll").prop("checked", true);
                    }
                }
            }
            
            /*
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
              console.log($("#" + surveryAnswerList[i]).val());
          }
          본 코드에 문제 있어서 아래 처럼 일단 수정해둠
          */

            // Expensive
            if (expensive == "*") {
                $("#expensive").val("*", true);
            } else if (expensive == "T") {
                $("#expensive").val("T", true);
            } else if (expensive == "F") {
                $("#expensive").val("F", true);
            }
            // Personality
            if (personality == "*") {
                $("#personality").val("*", true);
            } else if (personality == "T") {
                $("#personality").val("T", true);
            } else if (personality == "F") {
                $("#personality").val("F", true);
            }
            // Emotional
            if (emotional == "*") {
                $("#emotional").val("*", true);
            } else if (emotional == "T") {
                $("#emotional").val("T", true);
            } else if (emotional == "F") {
                $("#emotional").val("F", true);
            }
            // Trendy
            if (trendy == "*") {
                $("#trendy").val("*", true);
            } else if (trendy == "T") {
                $("#trendy").val("T", true);
            } else if (trendy == "F") {
                $("#trendy").val("F", true);
            }
            
        }
    });
}

function reviseInfo() {
    const gift_id = window.location.href.split("/")[4];

    if (confirm("수정하시겠습니까?") == true) {
    } else {
        return false;
    }

    const giftTarget = [];
    const giftTargetList = document.getElementsByName("giftTarget");
    giftTargetList.forEach((node) => {
        if (node.checked) {
            giftTarget.push(node.value);
        }
    });

    const giftEvent = [];
    const giftEventList = document.getElementsByName("giftEvent");
    giftEventList.forEach((node) => {
        if (node.checked) {
            giftEvent.push(node.value);
        }
    });

    const age = [];
    const ageList = document.getElementsByName("age");
    ageList.forEach((node) => {
        if (node.checked) {
            age.push(node.value);
        }
    });
    
    if (giftTarget.length == 0 || giftEvent.length == 0 || age.length == 0) {
        alert("체크박스를 체크해 주세요!")
        return;
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
            giftTarget: giftTarget,
            giftEvent: giftEvent,
            sex: sex,
            age: age,
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


/* giftInsert */
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
  
    const giftTarget = [];
    const giftTargetList = document.getElementsByName("giftTarget");
    giftTargetList.forEach((node) => {
        if (node.checked) {
            giftTarget.push(node.value);
        }
    });

    const giftEvent = [];
    const giftEventList = document.getElementsByName("giftEvent");
    giftEventList.forEach((node) => {
        if (node.checked) {
            giftEvent.push(node.value);
        }
    });

    const age = [];
    const ageList = document.getElementsByName("age");
    ageList.forEach((node) => {
        if (node.checked) {
            age.push(node.value);
        }
    });

    if (giftTarget.length == 0 || giftEvent.length == 0 || age.length == 0) {
        alert("체크박스를 체크해 주세요!")
        return;
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
            location.href = "/giftList";
        },
        error: function (error) {
            alert(error.responseJSON.errorMessage)
        },
    });

}

function backToList() {
    location.href = "/giftList";
}



// /* insert, detail 페이지 공통 사용 */
// 선물타겟 체크박스를 전체선택한 경우
function targetAllChkClicked() {
    $("#giftTargetCheckboxAll").click(function () {
        const length = $(".targetChk").size();
        if ($("#giftTargetCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < length; i++) {
                $("#giftTargetCheckbox" + i).prop("checked", false)
                $("#giftTargetCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < length; i++) {
                $("#giftTargetCheckbox" + i).prop("disabled", false);
            }
        }
    });
}
// // 선물목적 체크박스를 전체선택한 경우
function eventAllChkClicked() {
    $("#giftEventCheckboxAll").click(function () {
        const length = $(".eventChk").size();
        if ($("#giftEventCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < length; i++) {
                $("#giftEventCheckbox" + i).prop("checked", false)
                $("#giftEventCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < length; i++) {
                $("#giftEventCheckbox" + i).prop("disabled", false);
            }
        }
    });
}
// // 연령대 체크박스를 전체선택한 경우
function ageAllChkClicked() {
    $("#ageCheckboxAll").click(function () {
        const length = $(".ageChk").size();
        if ($("#ageCheckboxAll").is(":checked", true)) {
            for (let i = 0; i < length; i++) {
                $("#ageCheckbox" + i).prop("checked", false);
                $("#ageCheckbox" + i).prop("disabled", true);
            }
        } else {
            for (let i = 0; i < length; i++) {
                $("#ageCheckbox" + i).prop("disabled", false);
            }
        }
    });
}
