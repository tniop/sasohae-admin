$(document).ready(() => {
    auth();
});

function auth() {
    const token = sessionStorage.getItem("token");

    $.ajax({
        type: "get",
        url: "/api/auth",
        headers: {
            authorization: `${token}`,
        },
        success: (res) => {
            const decodedToken = res;
            const position = decodedToken.position;

            const tempHtml = `<div class="sb-sidenav-menu-heading">Admin</div>
                                <a class="nav-link" href="/adminList">
                                    <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                    관리자
                                </a>`;
            if (position == "master") {
                $("#admin").append(tempHtml);
            }
        },
        error: (err) => {
            alert("로그인 페이지로 이동합니다!");
            location.href = "/login";
        },
    });
}
