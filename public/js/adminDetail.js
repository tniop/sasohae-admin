$(document).ready(() => {
    checkAdminPosition();
});

function insertInfo() {
    const admin_id = window.location.href.split("/")[4];

    $.ajax({
        type: "get",
        url: `/api/admins/${admin_id}`,
        data: {},
        success: (res) => {
            const adminInfo = res;
            const radioButtonChk = adminInfo.adminPosition;
            chkRadioButton(radioButtonChk);
            document.querySelector("#adminName").value = adminInfo.adminName;
            document.querySelector("#adminNickname").value =
                adminInfo.adminNickname;
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function updateAdmin() {
    const admin_id = window.location.href.split("/")[4];
    const master_id = sessionStorage.getItem("_id");

    const positionList = document.getElementsByName("titleRadios");
    let adminPosition = "";

    positionList.forEach((node) => {
        if (node.checked) {
            adminPosition = node.value;
        }
    });

    const adminName = $("#adminName").val();
    const password = $("#password").val();
    const passwordChk = $("#passwordConfirm").val();

    if (!adminPosition) {
        alert("직급을 선택 해주세요!");
        return;
    }

    if (!password || !passwordChk) {
        alert("비밀번호를 입력 해주세요!");
        return;
    }

    if (password != passwordChk) {
        alert("비밀번호를 확인 해주세요!");
        document.querySelector("#password").value = "";
        document.querySelector("#passwordConfirm").value = "";
        return;
    }

    $.ajax({
        type: "put",
        url: `/api/admins/${admin_id}`,
        data: {
            adminPosition,
            adminName,
            password,
            master_id,
        },
        success: (res) => {
            alert("관리자 수정에 성공하였습니다!");
            location.href = "/adminList";
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function goToList() {
    location.href = "/adminList";
}

function chkRadioButton(position) {
    const radioButtonGroup = document.getElementsByName("titleRadios");
    for (let i = 0; i < radioButtonGroup.length; i++) {
        if (radioButtonGroup[i].value == position) {
            radioButtonGroup[i].checked = true;
            return;
        }
    }
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
            } else {
                insertInfo();
            }
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}
