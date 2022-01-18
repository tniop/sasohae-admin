async function insertInfo() {
    const positionList = document.getElementsByName("titleRadios");
    let adminPosition = "";

    positionList.forEach((node) => {
        if (node.checked) {
            adminPosition = node.value;
        }
    });

    const adminName = $("#adminName").val();
    const adminNickname = $("#adminNickname").val();
    const password = $("#password").val();
    const passwordChk = $("#passwordConfirm").val();

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
        type: "post",
        url: `/api/sign-up`,
        data: {
            adminPosition,
            adminName,
            adminNickname,
            password,
        },
        success: (res) => {
            alert("관리자 등록에 성공하였습니다!");
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
