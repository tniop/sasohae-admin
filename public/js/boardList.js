$(document).ready(() => {
    makeTable();
});

function makeTable() {
    $.ajax({
        type: "get",
        url: `/api/boards`,
        data: {},
        success: (res) => {
            const allBoards = res;
            for (let i = allBoards.length - 1; i >= 0; i--) {
                let tempTableList = `<tr>
                                        <td>${allBoards[i].board_id}</td>
                                        <td>${allBoards[i].comment}</td>
                                        <td>${allBoards[i].createdAt}</td>
                                        <td><input type="button" id="${allBoards[i].board_id}" onClick="deleteItem(this.id)"
                                                class="btn btn-outline-primary" value="삭제"></td>
                                    </tr>`;
                $("#boardList").append(tempTableList);
            }
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
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
