function insertInfo() {
    const formData = new FormData();
    const menuName = $("#menuName").val();
    const img = $("#image")[0].files[0];
    const menuStyle = document.querySelector("#menuStyle").value;
    let menuWith = [];
    let menuType = [];

    menuList(menuWith, "menuWith");
    menuList(menuType, "menuType");

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

function menuList(arr, name) {
    const menuList = document.getElementsByName(name);
    menuList.forEach((node) => {
        if (node.checked) {
            arr.push(node.value);
        }
    });
}

function IsCheckAllChecked(name) {
    const menuType = document.getElementsByName(name);

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

function chkboxAllChecked(name) {
    const menuType = document.getElementsByName("menuType");
    const menuWith = document.getElementsByName("menuWith");

    if (menuType[1].checked && menuType[2].checked && menuType[3].checked) {
        menuType[0].checked = true;
        IsCheckAllChecked(name)
    }

    if (
        menuWith[1].checked &&
        menuWith[2].checked &&
        menuWith[3].checked &&
        menuWith[4].checked &&
        menuWith[5].checked
    ) {
        menuWith[0].checked = true;
        IsCheckAllChecked(name)
    }
}

function goToList() {
    location.href = "/menuList";
}
