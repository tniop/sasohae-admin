function initializePassword() {
    const positionList = document.getElementsByName("titleRadios");
    let adminPosition = "";

    positionList.forEach((node) => {
        if (node.checked) {
            adminPosition = node.value;
        }
    });
    const adminName = $("#adminName").val();
    const adminNickname = $("#adminNickname").val();

    if (!adminPosition || !adminName || !adminNickname) {
        alert("비밀번호 초기화에 이용 될 정보를 입력해주세요!");
        return;
    }

    $.ajax({
        type: "put",
        url: `/api/admins/password/initialize`,
        data: {
            adminPosition,
            adminName,
            adminNickname,
        },
        success: (response) => {
            alert(response.successMessage);
            window.close();
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function closeWindow() {
    window.close();
}
