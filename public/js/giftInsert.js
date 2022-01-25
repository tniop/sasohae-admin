$(document).ready(() => {
    checkAdminPosition();
});

function insertInfo() {
    const giftName = $("#giftName").val();
    let giftTarget = [];
    let giftEvent = [];
    let age = [];
    let sex = "";
    const giftAnswerExpensive = $("#expensive").val();
    const giftAnswerPersonality = $("#personality").val();
    const giftAnswerEmotional = $("#emotional").val();
    const giftAnswerTrendy = $("#trendy").val();
    const formData = new FormData();
    const img = document.getElementById("imgFile").files[0];

    giftList(giftTarget, "giftTarget");
    giftList(giftEvent, "giftEvent");
    giftList(age, "age");

    if ($("#giftName").val() == "") {
        alert("선물이름을 입력해 주세요!");
        $("#giftName").focus();
        return;
    }

    if ($("#imgFile").val() == "") {
        alert("이미지 파일을 첨부해 주세요!");
        return;
    }

    if (giftTarget.length == 0 || giftEvent.length == 0 || age.length == 0) {
        alert("체크박스를 체크해 주세요!");
        return;
    }

    const radioLength = document.getElementsByName("sexRadios").length;
    for (let i = 0; i < radioLength; i++) {
        if (document.getElementsByName("sexRadios")[i].checked == true) {
            sex = document.getElementsByName("sexRadios")[i].value;
        }
    }

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

    if (window.confirm("선물을 등록 하시겠습니까?")) {
        $.ajax({
            type: "POST",
            url: "/api/gifts",
            traditional: true,
            contentType: false,
            processData: false,
            data: formData,
            success: function (response) {
                alert("선물 등록에 성공하였습니다!");
                location.href = "/giftList";
            },
            error: function (error) {
                alert(error.responseJSON.errorMessage);
            },
        });
    }
}

function getSelectedGift() {
    const gift_id = window.location.href.split("/")[4];
    $("#giftList").empty();

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
                                    </div>`;
            $("#imgFile").append(htmlTemp);

            for (let i = 0; i < target.length; i++) {
                const value = ["1", "2", "3", "4", "5", "6", "7", "8"];
                for (let j = 0; j < value.length; j++) {
                    if (target[i] == value[j]) {
                        $("#giftTargetCheckbox" + target[i]).prop(
                            "checked",
                            true
                        );
                    } else if (target[i] == "*") {
                        $("#giftTargetCheckboxAll").prop("checked", true);
                    }
                }
            }

            for (let i = 0; i < event.length; i++) {
                const value = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
                for (let j = 0; j < value.length; j++) {
                    if (event[i] == value[j]) {
                        $("#giftEventCheckbox" + event[i]).prop(
                            "checked",
                            true
                        );
                    } else if (event[i] == "*") {
                        $("#giftEventCheckboxAll").prop("checked", true);
                    }
                }
            }

            if (sex == "*") {
                $("#sexRadiosAll").prop("checked", true);
            } else if (sex == "M") {
                $("#sexRadios1").prop("checked", true);
            } else if (sex == "W") {
                $("#sexRadios2").prop("checked", true);
            }

            for (let i = 0; i < age.length; i++) {
                const value = ["20", "30", "40", "50", "60"];
                for (let j = 0; j < value.length; j++) {
                    if (age[i] == value[j]) {
                        $(
                            "#ageCheckbox" +
                                String(Number(age[i].split("")[0]) - 1)
                        ).prop("checked", true);
                    } else if (age[i] == "*") {
                        $("#ageCheckboxAll").prop("checked", true);
                    }
                }
            }
            $("#expensive").val(`${expensive}`, true);
            $("#personality").val(`${personality}`, true);
            $("#emotional").val(`${emotional}`, true);
            $("#trendy").val(`${trendy}`, true);
        },
    });
}

function reviseInfo() {
    const gift_id = window.location.href.split("/")[4];
    const giftTarget = [];
    const giftEvent = [];
    const age = [];
    let sex = "";

    expensive = $("#expensive").val();
    personality = $("#personality").val();
    emotional = $("#emotional").val();
    trendy = $("#trendy").val();

    giftList(giftTarget, "giftTarget");
    giftList(giftEvent, "giftEvent");
    giftList(age, "age");

    if (giftTarget.length == 0 || giftEvent.length == 0 || age.length == 0) {
        alert("체크박스를 체크해 주세요!");
        return;
    }

    const radioLength = document.getElementsByName("sexRadios").length;
    for (let i = 0; i < radioLength; i++) {
        if (document.getElementsByName("sexRadios")[i].checked == true) {
            sex = document.getElementsByName("sexRadios")[i].value;
        }
    }

    if (window.confirm("선물을 수정 하시겠습니까?")) {
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
                alert("성공적으로 변경되었습니다.");
                location.href = location.href;
                history.go(0);
            },
            error: function (error) {
                alert(error.responseJSON.errorMessage);
            },
        });
    }
}

function giftList(arr, name) {
    const giftList = document.getElementsByName(name);
    giftList.forEach((node) => {
        if (node.checked) {
            arr.push(node.value);
        }
    });
}

function IsCheckAllChecked(name) {
    const giftType = document.getElementsByName(name);

    if (giftType[0].checked) {
        for (let i = 1; i < giftType.length; i++) {
            giftType[i].checked = false;
            giftType[i].disabled = true;
        }
    } else {
        for (let i = 1; i < giftType.length; i++) {
            giftType[i].disabled = false;
        }
    }
}

function chkboxAllChecked(name) {
    const giftTarget = document.getElementsByName("giftTarget");
    const giftEvent = document.getElementsByName("giftEvent");
    const age = document.getElementsByName("age");

    if (
        giftTarget[1].checked &&
        giftTarget[2].checked &&
        giftTarget[3].checked &&
        giftTarget[4].checked &&
        giftTarget[5].checked &&
        giftTarget[6].checked &&
        giftTarget[7].checked
    ) {
        giftTarget[0].checked = true;
        IsCheckAllChecked(name);
    }

    if (
        giftEvent[1].checked &&
        giftEvent[2].checked &&
        giftEvent[3].checked &&
        giftEvent[4].checked &&
        giftEvent[5].checked &&
        giftEvent[6].checked &&
        giftEvent[7].checked &&
        giftEvent[8].checked
    ) {
        giftEvent[0].checked = true;
        IsCheckAllChecked(name);
    }

    if (
        age[1].checked &&
        age[2].checked &&
        age[3].checked &&
        age[4].checked &&
        age[5].checked
    ) {
        age[0].checked = true;
        IsCheckAllChecked(name);
    }
}

function backToList() {
    location.href = "/giftList";
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
                return;
            }
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}
