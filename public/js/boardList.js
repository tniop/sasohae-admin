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
            for (
                let i = allBoards.length - 1;
                i >= allBoards.length - 10;
                i--
            ) {
                let tempTableList = `<tr>
                                        <td>${allBoards[i].board_id}</td>
                                        <td>${allBoards[i].comment}</td>
                                        <td>${allBoards[i].createdAt}</td>
                                        <td><input type="button" id="${allBoards[i].board_id}" onClick="blindItem(this.id)"
                                                class="btn btn-outline-primary" value="블라인드"></td>
                                        <td><input type="button" id="${allBoards[i].board_id}" onClick="deleteItem(this.id)"
                                                class="btn btn-outline-primary" value="삭제"></td>
                                    </tr>`;
                $("#boardList").append(tempTableList);
            }
            let totalData = allBoards.length; // 총 데이터 수
            let dataPerPage = 10; // 한 페이지에 나타낼 데이터 수
            let pageCount = 5; // 한 화면에 나타낼 페이지 수
            paging(totalData, dataPerPage, pageCount, 1);
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

function paging(totalData, dataPerPage, pageCount, currentPage) {
    const totalPage = Math.ceil(totalData / dataPerPage); // 총 페이지 수
    const pageGroup = Math.ceil(currentPage / pageCount); // 페이지 그룹

    let last = pageGroup * pageCount; // 화면에 보여질 마지막 페이지 번호
    if (last > totalPage) {
        last = totalPage;
    }
    let first = last - (pageCount - 1); // 화면에 보여질 첫번째 페이지 번호
    let next = last + 1;
    let prev = first - 1;

    let html = "";

    if (prev > 0) {
        html += "<a href=# id='prev'><</a> ";
    }

    for (let i = first; i <= last; i++) {
        html += "<a href='#' id=" + i + ">" + i + "</a> ";
    }

    if (last < totalPage) {
        html += "<a href=# id='next'>></a>";
    }

    $("#paging").html(html); // 페이지 목록 생성
    $("#paging a").css("color", "black");
    $("#paging a#" + currentPage).css({
        "text-decoration": "none",
        color: "red",
        "font-weight": "bold",
    }); // 현재 페이지 표시

    $("#paging a").click(function () {
        const $item = $(this);
        const $id = $item.attr("id");
        let selectedPage = $item.text();

        if ($id == "next") {
            selectedPage = next;
        }

        if ($id == "prev") {
            selectedPage = prev;
        }

        getPagingBoards(selectedPage);

        paging(totalData, dataPerPage, pageCount, selectedPage);
    });
}

function getPagingBoards(Idx) {
    const board_id = Idx - 1;
    console.log(board_id);
    $.ajax({
        type: "get",
        url: `/api/boards/paging/${board_id}`,
        data: {},
        success: (res) => {
            const selectedBoards = res;
            $("#boardList").empty();
            for (let i = 0; i < selectedBoards.length; i++) {
                let tempTableList = `<tr>
                                        <td>${selectedBoards[i].board_id}</td>
                                        <td>${selectedBoards[i].comment}</td>
                                        <td>${selectedBoards[i].createdAt}</td>
                                        <td><input type="button" id="${selectedBoards[i].board_id}" onClick="blindItem(this.id)"
                                                class="btn btn-outline-primary" value="블라인드"></td>
                                        <td><input type="button" id="${selectedBoards[i].board_id}" onClick="deleteItem(this.id)"
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
