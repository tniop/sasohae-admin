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

    console.log(formData.get("menuName"));
    console.log(formData.get("img"));
    console.log(formData.get("menuType"));
    console.log(formData.get("menuStyle"));
    console.log(formData.get("menuWith"));

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

function goToList() {
    location.href = "/menuList";
}
