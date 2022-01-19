function login() {
    const adminNickname = $("#inputEmail").val();
    const password = $("#inputPassword").val();

    $.ajax({
        type: "POST",
        url: `/api/login`,
        data: {
            adminNickname,
            password,
        },
        success: (res) => {
            sessionStorage.setItem("token", res.token);
            location.href = "/";
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
            document.querySelector("#inputPassword").value = "";
        },
    });
}

function forgetPassword() {
    const popupOpneX = window.screen.width / 2 - 537 / 2;
    const popupOpneY = window.screen.height / 2 - 537 / 2;

    window.open(
        "/password",
        "",
        "status=no, height=537, width=537, left=" +
            popupOpneX +
            ", top=" +
            popupOpneY
    );
}
