$(document).ready(() => {
    getAdminList();
});

function getAdminList() {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);

    $.ajax({
        type: "get",
        url: `/api/admin`,
        data: {},
        success: (res) => {
            const allAdmins = res;
            let newRows = [];

            let count = 0;
            for (let i = 0; i < allAdmins.length; i++) {
                let tempRow = [];
                if (allAdmins[i].adminPosition != "master") {
                    tempRow.push(`${count + 1}`);
                    tempRow.push(allAdmins[i].adminPosition);
                    tempRow.push(allAdmins[i].adminNickname);
                    tempRow.push(allAdmins[i].adminName);
                    tempRow.push(`<input type="button" id="${allAdmins[i].admin_id}" onClick="moveToDetail(this.id)"
                    class="btn btn-outline-primary" value="상세페이지">`);
                    tempRow.push(
                        `<img style="cursor:pointer;" src="../public/assets/img/deleteBtn.png" id="${allAdmins[i].admin_id}" onClick="deleteItem(this.id)" width="40px">`
                    );

                    newRows.push(tempRow);
                    count++;
                }
            }
            dataTable.rows().add(newRows);
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
    location.href = `/adminDetail/${admin_id}`;
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
