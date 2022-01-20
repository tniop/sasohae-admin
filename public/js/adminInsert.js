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

    $.ajax({
        type: "post",
        url: `/api/sign-up`,
        data: {
            adminPosition,
            adminName,
            adminNickname,
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
