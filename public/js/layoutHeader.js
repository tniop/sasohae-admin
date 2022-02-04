$(document).ready(() => {
    getToTalVisitorCnt();
});

function logOut() {
    if (window.confirm("로그아웃 하시겠습니까?")) {
        sessionStorage.clear();
        location.href = "/login";
    }
}

function moveMyPage() {
    const admin_id = sessionStorage.getItem("_id");
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

function checkAdminPosition() {
    const admin_id = sessionStorage.getItem("_id");

    $.ajax({
        type: "get",
        url: `/api/admins/${admin_id}`,
        data: {},
        success: (response) => {
            const adminPosition = response.adminPosition;
            if (adminPosition == "guest") {
                alert("Guest는 정보 수정이 불가능 합니다!");
                location.href = "/";
                return;
            } 
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}