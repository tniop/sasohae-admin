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
                if (menuType[i] == "*") {
                    $("#menuTypeCheckboxAll").prop("checked", true);
                    IsMenuTypeCheckAllChecked();
                    break;
                }
                for (let j = 0; j < valueArray.length; j++) {
                    if (menuType[i] == valueArray[j]) {
                        $("#menuTypeCheckbox" + valueArray[j]).prop(
                            "checked",
                            true
                        );
                    }
                }
            }

            for (let i = 0; i < menuWith.length; i++) {
                let valueArray = ["1", "2", "3", "4", "5"];
                if (menuWith[i] == "*") {
                    $("#menuWithCheckboxAll").prop("checked", true);
                    IsMenuWithCheckboxAllChecked();
                    break;
                }
                for (let j = 0; j < valueArray.length; j++) {
                    if (menuWith[i] == valueArray[j]) {
                        $("#menuWithCheckbox" + valueArray[j]).prop(
                            "checked",
                            true
                        );
                    }
                }
            }
            $("#menuStyle").val(`${menuStyle}`, true);
            chkboxAllChecked();
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

function IsMenuTypeCheckAllChecked() {
    const menuType = document.getElementsByName("menuType");

    if (menuType[0].checked) {
        for (let i = 1; i < menuType.length; i++) {
            menuType[i].checked = false;
            menuType[i].disabled = true;
        }
    } else {
        for (let i = 1; i < menuType.length; i++) {
            menuType[i].disabled = false;
        }
    }
}

function IsMenuWithCheckboxAllChecked() {
    const menuWith = document.getElementsByName("menuWith");

    if (menuWith[0].checked) {
        for (let i = 1; i < menuWith.length; i++) {
            menuWith[i].checked = false;
            menuWith[i].disabled = true;
        }
    } else {
        for (let i = 1; i < menuWith.length; i++) {
            menuWith[i].disabled = false;
        }
    }
}

function chkboxAllChecked() {
    const menuType = document.getElementsByName("menuType");
    const menuWith = document.getElementsByName("menuWith");

    if (menuType[1].checked && menuType[2].checked && menuType[3].checked) {
        menuType[0].checked = true;
        IsMenuTypeCheckAllChecked();
    }

    if (
        menuWith[1].checked &&
        menuWith[2].checked &&
        menuWith[3].checked &&
        menuWith[4].checked &&
        menuWith[5].checked
    ) {
        menuWith[0].checked = true;
        IsMenuWithCheckboxAllChecked();
    }
}

function goToList() {
    location.href = "/menuList";
}
