function logOut() {
    if (window.confirm("로그아웃 하시겠습니까?")) {
        sessionStorage.clear();
        location.href = "/login";
    }
}
