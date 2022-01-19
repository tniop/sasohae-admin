$(document).ready(() => {
    getBoardList();
});

function getBoardList() {
    const datatablesSimple = document.getElementById("datatablesSimple");
    const dataTable = new simpleDatatables.DataTable(datatablesSimple);

    $.ajax({
        type: "get",
        url: `/api/boards`,
        data: {},
        success: (res) => {
            const allBoards = res;
            let newRows = [];

            for (let i = 0; i < allBoards.length; i++) {
                let tempRow = [];
                tempRow.push(allBoards[i].board_id.toString());
                tempRow.push(allBoards[i].comment);
                tempRow.push(allBoards[i].createdAt);
                tempRow.push(`<input type="button" id="${allBoards[i].board_id}" onClick="blindItem(this.id)"
                    class="btn btn-outline-primary" value="블라인드">`);
                tempRow.push(`<input type="button" id="${allBoards[i].board_id}" onClick="deleteItem(this.id)"
                    class="btn btn-outline-primary" value="삭제">`);

                newRows.push(tempRow);
            }

            dataTable.rows().add(newRows);
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function blindItem(Idx) {
    const board_id = Idx;
    const blindString = "(관리자에 의해 블라인드 처리된 게시글입니다)";

    if (window.confirm("블라인드 처리 하시겠습니까?")) {
        $.ajax({
            type: "put",
            url: `/api/boards/${board_id}`,
            data: {
                comment: blindString,
            },
            success: (res) => {
                alert("해당 댓글을 블라인드 처리하였습니다!");
                location.reload(true);
                return;
            },
            error: (err) => {
                alert(err.responseJSON.errorMessage);
            },
        });
    }
}

function deleteItem(Idx) {
    const board_id = Idx;

    if (window.confirm("정말로 삭제하시겠습니까?")) {
        $.ajax({
            type: "delete",
            url: `/api/boards/${board_id}`,
            data: {},
            success: (res) => {
                alert("해당 댓글이 삭제되었습니다!");
                location.reload(true);
                return;
            },
            error: (err) => {
                alert(err.responseJSON.errorMessage);
            },
        });
    }
}
