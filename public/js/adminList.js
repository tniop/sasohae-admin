$(document).ready(() => {
    makeTable();
});

function makeTable() {
    $.ajax({
        type: "get",
        url: `/api/admin`,
        data: {},
        success: (res) => {
            const alladmins = res;
            for (let i = 0; i < alladmins.length; i++) {
                let tempTableList = `<tr>
                                        <td>${alladmins[i].admin_id}</td>
                                        <td>${alladmins[i].adminPosition}</td>
                                        <td>${alladmins[i].adminNickname}</td>
                                        <td>${alladmins[i].adminName}</td>
                                        <td id="${alladmins[i].admin_id}" style="cursor:pointer;" onClick="moveToDetail(this.id)">상세페이지</td>
                                        <td><input type="button" id="${alladmins[i].admin_id}" onClick="deleteItem(this.id)" class="btn btn-outline-primary" value="삭제"></td>
                                    </tr>`;
                $("#adminTable").append(tempTableList);
            }
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function moveToInsert() {
    location.href = "/adminInsert";
}

function moveToDetail(Idx) {
    const admin_id = Idx;
    console.log(admin_id);
    location.href = `adminDetail/${admin_id}`;
}

function deleteItem(Idx) {
    const admin_id = Idx;

    if (window.confirm("정말로 삭제하시겠습니까?")) {
        $.ajax({
            type: "delete",
            url: `/api/admin/${admin_id}`,
            data: {},
            success: (res) => {
                alert("관리자 정보가 삭제되었습니다!");
                location.reload(true);
                return;
            },
            error: (err) => {
                alert(err.responseJSON.errorMessage);
            },
        });
    }
}
