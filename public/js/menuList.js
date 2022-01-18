$(document).ready(function () {
    getMenuList();
});

function getMenuList() {
    $("#menuList").empty();
    $.ajax({
        type: "GET",
        url: "/api/menus",
        data: {},
        success: function (response) {
            const allMenus = response;
            for (let i = 0; i < 10; i++) {
                makeTable(allMenus[i]);
            }
            let totalData = allMenus.length; // 총 데이터 수
            let dataPerPage = 10; // 한 페이지에 나타낼 데이터 수
            let pageCount = 3; // 한 화면에 나타낼 페이지 수
            paging(totalData, dataPerPage, pageCount, 1);
        },
    });
}

function makeTable(info) {
    let htmlTemp = `<tr>
                        <td>${info["menu_id"]}</td>
                        <td>${info["menuName"]}</td>
                        <td><img width="37px" src="${info["menuUrl"]}"></td>
                        <td>${info["menuRecommendCnt"]}</td>
                        <td>${info["menuLikeCnt"]}</td>
                        <td id="${info["menu_id"]}" style="cursor:pointer;" onClick="moveToDetail(this.id)">상세</td>
                        <td><input type="button" id="${info["menu_id"]}" onClick="deleteItem(this.id)"
                                class="btn btn-outline-primary" value="삭제"></td>
                    </tr>
                    `;
    $("#menuList").append(htmlTemp);
}

function moveToInsert() {
    location.href = "/menuInsert";
}

function moveToDetail(Idx) {
    const menu_id = Idx;
    location.href = `/menuDetail/${menu_id}`;
}

function deleteItem(Idx) {
    const menu_id = Idx;
    if (window.confirm("정말로 삭제하시겠습니까?")) {
        $.ajax({
            type: "delete",
            url: `/api/menus/${menu_id}`,
            data: {},
            success: (res) => {
                alert("메뉴 정보가 삭제되었습니다!");
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
    // var $pingingView = $("#paging");

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

        getPagingMenus(selectedPage);

        paging(totalData, dataPerPage, pageCount, selectedPage);
    });
}

function getPagingMenus(Idx) {
    const menu_id = Idx - 1;

    $.ajax({
        type: "get",
        url: `/api/menus/paging/${menu_id}`,
        data: {},
        success: (res) => {
            const selectedMenus = res;
            console.log(selectedMenus);
            $("#menuList").empty();
            for (let i = 0; i < selectedMenus.length; i++) {
                let htmlTemp = `<tr>
                        <td>${selectedMenus[i]["menu_id"]}</td>
                        <td>${selectedMenus[i]["menuName"]}</td>
                        <td><img width="37px" src="${selectedMenus[i]["menuUrl"]}"></td>
                        <td>${selectedMenus[i]["menuRecommendCnt"]}</td>
                        <td>${selectedMenus[i]["menuLikeCnt"]}</td>
                        <td id="${selectedMenus[i]["menu_id"]}" style="cursor:pointer;" onClick="moveToDetail(this.id)">상세</td>
                        <td><input type="button" id="${selectedMenus[i]["menu_id"]}" onClick="deleteItem(this.id)"
                                class="btn btn-outline-primary" value="삭제"></td>
                    </tr>
                    `;
                $("#menuList").append(htmlTemp);
            }
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}
