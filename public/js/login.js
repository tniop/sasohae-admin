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
