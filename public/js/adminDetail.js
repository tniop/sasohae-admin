$(document).ready(() => {
    insertInfo();
});

function insertInfo() {
    let params = window.location.href.split("/");
    const admin_id = params[4];

    $.ajax({
        type: "get",
        url: `/api/admin/${admin_id}`,
        data: {},
        success: (res) => {
            const adminInfo = res;
            const radioButtonChk = adminInfo.adminPosition;
            console.log(radioButtonChk);
            chkRadioButton(radioButtonChk);
            document.querySelector("#adminName").value = adminInfo.adminName;
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function updateAdmin() {
    let params = window.location.href.split("/");
    const admin_id = params[4];

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
        url: `/api/admin/${admin_id}`,
        data: {
            adminPosition,
            adminName,
            password,
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
        if (radioButtonGroup[i] == position) {
            radioButtonGroup[i].checked = true;
            return;
        }
    }
}
