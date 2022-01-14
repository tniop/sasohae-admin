function login() {
    const id = $("#inputEmail").val();
    const pw = $("#inputPassword").val();

    $.ajax({
        type: "POST",
        url: `/api/login`,
        data: {
            adminNickname: id,
            password: pw,
        },
        success: (res) => {
            localStorage.setItem("token", res.token);
            location.href = "/";
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
            document.querySelector("#inputPassword").value = "";
        },
    });
}
