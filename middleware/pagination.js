const paging = (page, totalInfo) => {
    const maxInfo = 10; // 동일 화면에 보여지는 글의 수
    const maxPage = 5; // 동일 화면에 보여지는 페이지(버튼)의 수
    let currentPage = page ? parseInt(page) : 1; 
    const hideInfo = page === 1 ? 0 : (page - 1) * maxInfo; 
    const totalPage = Math.ceil(totalInfo / maxInfo); 

    if (currentPage > totalPage) { 
        currentPage = totalPage;
    }

    const startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1; 
    let endPage = startPage + maxPage - 1; 

    if (endPage > totalPage) { 
        endPage = totalPage;
    }

    return { startPage, currentPage, endPage, hideInfo, maxInfo, totalPage }; 
};

module.exports = paging;