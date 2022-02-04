$(document).ready(() => {
    getToTalVisitorCnt();
    auth();
});

function logOut() {
    if (window.confirm("로그아웃 하시겠습니까?")) {
        sessionStorage.clear();
        location.href = "/login";
    }
}

function moveMyPage() {
    const admin_id = sessionStorage.getItem("_id");
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
            sessionStorage.setItem("_id", decodedToken.admin_id);

            if (position == "guest") {
                alert("Guest는 마이페이지 접근 권한이 없습니다!");
                location.href = "/";
            }
        },
        error: (err) => {
            alert("마이페이지 이동에 실패하였습니다.");
            location.href = "/";
        },
    });

    location.href = `/mypage/${admin_id}`;
}

function getToTalVisitorCnt() {
    const selector = document.querySelector("#totVisitorCnt");

    $.ajax({
        type: "get",
        url: `/api/statistics`,
        data: {},
        success: (res) => {
            const totVisitorCnt = res[0].totVisitorCnt;
            selector.innerText = `누적 방문자: ${totVisitorCnt}명`;
        },
        error: (err) => {
            alert("방문자수 조회에 실패하였니다!");
        },
    });
}
