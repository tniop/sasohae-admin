function insertInfo() {
    const formData = new FormData();
    const menuName = $("#menuName").val();
    const img = $("#image")[0].files[0];
    const menuStyle = document.querySelector("#menuStyle").value;
    const menuWith = [];
    const menuType = [];

    const menuWithList = document.getElementsByName("menuWith");
    menuWithList.forEach((node) => {
        if (node.checked) {
            menuWith.push(node.value);
        }
    });

    const menuTypeList = document.getElementsByName("menuType");
    menuTypeList.forEach((node) => {
        if (node.checked) {
            menuType.push(node.value);
        }
    });

    if ($("#image")[0] == 0) {
        alert("이미지 파일을 첨부해 주세요!");
        return;
    }

    if (menuType.length == 0 || menuWith.length == 0) {
        alert("체크박스를 선택 해주세요!");
        return;
    }

    formData.append("menuName", menuName);
    formData.append("img", img);
    formData.append("menuType", JSON.stringify(menuType));
    formData.append("menuStyle", menuStyle);
    formData.append("menuWith", JSON.stringify(menuWith));

    if (window.confirm("메뉴를 등록 하시겠습니까?")) {
        $.ajaxSettings.traditional = true;
        $.ajax({
            url: "/api/menus",
            type: "POST",
            contentType: false,
            processData: false,
            data: formData,
            success: (res) => {
                alert("메뉴 등록에 성공하였습니다!");
                location.href = "menuList";
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
