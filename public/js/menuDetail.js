$(document).ready(() => {
    insertInfo();
});

function insertInfo() {
    let params = window.location.href.split("/");
    const menu_id = params[4];
    $.ajax({
        type: "get",
        url: `/api/menus/${menu_id}`,
        data: {},
        success: (res) => {
            const menuInfo = res;
            const menuType = menuInfo.menuType;
            const menuStyle = menuInfo.menuStyle;
            const menuWith = menuInfo.menuWith;
            document.querySelector("#menuName").value = menuInfo.menuName;
            document.querySelector("#menuUrl").src = menuInfo.menuUrl;

            for (let i = 0; i < menuType.length; i++) {
                let valueArray = ["1", "2", "3"];
                for (let j = 0; j < valueArray.length; j++) {
                    if (menuType[i] == valueArray[j]) {
                        $("#menuTypeCheckbox" + valueArray[j]).prop(
                            "checked",
                            true
                        );
                    } else if (menuType[i] == "*") {
                        $("#menuTypeCheckboxAll").prop("checked", true);
                    }
                }
            }

            for (let i = 0; i < menuWith.length; i++) {
                let valueArray = ["1", "2", "3", "4", "5"];
                for (let j = 0; j < valueArray.length; j++) {
                    if (menuWith[i] == valueArray[j]) {
                        $("#menuWithCheckbox" + valueArray[j]).prop(
                            "checked",
                            true
                        );
                    } else if (menuType[i] == "*") {
                        $("#menuWithCheckboxAll").prop("checked", true);
                    }
                }
            }

            $("#menuStyle").val(`${menuStyle}`, true);
        },
        error: (err) => {
            alert(err.responseJSON.errorMessage);
        },
    });
}

function updateMenu() {
    let params = window.location.href.split("/");
    const menu_id = params[4];
    const menuType = [];
    const menuStyle = document.querySelector("#menuStyle").value;
    const menuWith = [];

    const menuTypeList = document.getElementsByName("menuType");
    menuTypeList.forEach((node) => {
        if (node.checked) {
            menuType.push(node.value);
        }
    });

    const menuWithList = document.getElementsByName("menuWith");
    menuWithList.forEach((node) => {
        if (node.checked) {
            menuWith.push(node.value);
        }
    });

    if (menuType.length == 0 || menuWith.length == 0) {
        alert("체크박스를 선택 해주세요!");
        return;
    }

    if (confirm("정말로 수정하시겠습니까?")) {
        $.ajaxSettings.traditional = true;
        $.ajax({
            type: "put",
            url: `/api/menus/${menu_id}`,
            data: {
                menu_id,
                menuType,
                menuStyle,
                menuWith,
            },
            success: (res) => {
                alert("메뉴 수정에 성공하였습니다!");
                location.href = "/menuList";
            },
            error: (err) => {
                alert(err.responseJSON.errorMessage);
            },
        });
    }
}

function goToList() {
    location.href = "/menuList";
}
