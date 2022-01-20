$(document).ready(() => {
    insertInfo();
});

function insertInfo() {
    const admin_id = sessionStorage.getItem("_id");

    $.ajax({
        type: "get",
        url: `/api/admin/${admin_id}`,
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
    const admin_id = sessionStorage.getItem("_id");
    const password = $("#password").val();
    const passwordChk = $("#passwordConfirm").val();

    console.log(password, passwordChk);

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
        url: `/api/admin/password/change/${admin_id}`,
        data: {
            password,
        },
        success: (res) => {
            alert("정보 변경에 성공하였습니다!");
            location.href = "/";
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function goToMain() {
    location.href = "/";
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
