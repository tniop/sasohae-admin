// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#292b2c";

$(document).ready(function () {
    getAcessTime();
    getStatistics();
    getGiftData();
    getMenuData();
});

function getAcessTime() {
    let userAccessPerDay = [];
    let userAccessTime = [];
    let temp = [];
    $.ajax({
        type: "GET",
        url: "/api/user",
        data: {},
        success: function (response) {
            let tempDate;
            for (let i = 0; i < response.length; i++) {
                tempDate = new Date(
                    response[Object.keys(response)[i]].createdAt
                );
                temp[i] = String(tempDate.toLocaleString()).split(" ");

                userAccessPerDay[i] = temp[i].slice(0, 3);
                userAccessTime[i] = temp[i].slice(3, 5);
            }
            makeDayChart(userAccessPerDay);
            makeTimeChart(userAccessTime);
        },
    });
}

function getDatesStartToLast(startDate, lastDate) {
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!(regex.test(startDate) && regex.test(lastDate)))
        return "Not Date Format";
    let result = [];
    let curDate = new Date(startDate);
    while (curDate <= new Date(lastDate)) {
        result.push(curDate.toISOString().split("T")[0]);
        curDate.setDate(curDate.getDate() + 1);
    }
    return result;
}

function makeDayChart(data) {
    let info = [];
    for (let i = 0; i < data.length; i++) {
        info[i] = data[i][0].slice(0, data[i][0].length - 1);
        if (data[i][1].slice(0, data[i][1].length - 1).length === 1)
            info[i] += "-0";
        else info[i] += "-";
        info[i] += data[i][1].slice(0, data[i][1].length - 1);
        if (data[i][2].slice(0, data[i][2].length - 1).length === 1)
            info[i] += "-0";
        else info[i] += "-";
        info[i] += data[i][2].slice(0, data[i][2].length - 1);
    }

    const firstDate = info[0];
    const lastDate = info[info.length - 1];

    const servicePeriod = getDatesStartToLast(firstDate, lastDate);

    var tempFirstDate = new Date(firstDate);
    var tempLastDate = new Date(lastDate);
    var dateDiffer = Math.ceil(
        (tempLastDate.getTime() - tempFirstDate.getTime()) / (1000 * 3600 * 24)
    );

    let tempDayData = [];
    for (let i = 0; i <= dateDiffer; i++)
        tempDayData[i] = {
            date: servicePeriod[i],
            count: 0,
        };

    for (let i = 0; i < info.length; i++)
        for (let j = 0; j < tempDayData.length; j++)
            if (tempDayData[j].date === info[i]) {
                tempDayData[j].count++;
                break;
            }

    let visitorCnt = [];
    for (let i = 0; i <= dateDiffer; i++) visitorCnt.push(tempDayData[i].count);

    const ctx = document.getElementById("dayChart");
    const myLineChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: servicePeriod,
            datasets: [
                {
                    label: "접속자 수",
                    backgroundColor: "rgba(2,117,216,1)",
                    borderColor: "rgba(2,117,216,1)",
                    data: visitorCnt,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        time: {
                            unit: "day",
                        },
                        gridLines: {
                            display: false,
                        },
                        // ticks: { // 가로축 옵션 필요시 사용
                        //     maxTicksLimit: 6
                        // }
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max:
                                Math.ceil(
                                    Math.max(...visitorCnt) /
                                        Math.pow(
                                            10,
                                            Math.max(...visitorCnt).toString()
                                                .length - 1
                                        )
                                ) *
                                Math.pow(
                                    10,
                                    Math.max(...visitorCnt).toString().length -
                                        1
                                ),
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            plugins: {
                bgColor: {
                    backgroundColor: "white",
                },
            },
            legend: {
                display: false,
            },
        },
        plugins: [
            {
                // pdf 추출 시 적용할 style set
                id: "bgColor",
                beforeDraw: (chart, steps, options) => {
                    const { ctx, width, height } = chart;
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                },
            },
        ],
    });
}

function downloadPDF(chartId) {
    const canvas = document.getElementById(chartId);
    const canvasImage = canvas.toDataURL("image/jpeg", 1.0);

    let pdf = new jsPDF("landscape");
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, "JPEG", 10, 40, 280, 150);
    pdf.text(15, 15, "Statistics Of https://sasohae.com/"); // pdf 다운로드 시 상단 안내 문구
    pdf.save("chart.pdf"); // 파일명
}

function makeTimeChart(data) {
    const info = data;
    let timeCnt = new Array(24).fill(0);
    let tempTime = 0;

    for (let i = 0; i < info.length; i++) {
        tempTime = parseInt(info[i][1].split(":")[0]);
        if (info[i][0] === "오후") {
            tempTime += 12;
            if (tempTime === 24) {
                // 밤12시
                tempTime = 0;
            }
        }
        timeCnt[tempTime]++;
    }

    const ctx = document.getElementById("timeChart");
    const myLineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                "00:00",
                "01:00",
                "02:00",
                "03:00",
                "04:00",
                "05:00",
                "06:00",
                "07:00",
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00",
                "23:00",
            ],
            datasets: [
                {
                    label: "접속자 수",
                    lineTension: 0.3,
                    backgroundColor: "rgba(2,117,216,0.2)",
                    borderColor: "rgba(2,117,216,1)",
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(2,117,216,1)",
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(2,117,216,1)",
                    pointHitRadius: 50,
                    pointBorderWidth: 2,
                    data: timeCnt,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        time: {
                            unit: "time",
                        },
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            maxTicksLimit: 7,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max:
                                Math.ceil(
                                    Math.max(...timeCnt) /
                                        Math.pow(
                                            10,
                                            Math.max(...timeCnt).toString()
                                                .length - 1
                                        )
                                ) *
                                Math.pow(
                                    10,
                                    Math.max(...timeCnt).toString().length - 1
                                ),
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, .125)",
                        },
                    },
                ],
            },
            plugins: {
                bgColor: {
                    backgroundColor: "white",
                },
            },
            legend: {
                display: false,
            },
            plugins: [
                {
                    // pdf 추출 시 적용할 style set
                    id: "bgColor",
                    beforeDraw: (chart, options) => {
                        const { ctx, width, height } = chart;
                        ctx.fillStyle = options.backgroundColor;
                        ctx.fillRect(0, 0, width, height);
                        ctx.restore();
                    },
                },
            ],
        },
    });
}

function getStatistics() {
    $.ajax({
        type: "GET",
        url: "/api/statistics",
        data: {},
        success: function (response) {
            const temp = response[Object.keys(response)[0]];
            makeStatisticsChart(temp);
            makeUserChart(temp);
            makeGiftUserChart(temp);
            makeBoardUserChart(temp);
        },
    });
}

function makeStatisticsChart(data) {
    const info = data;
    const userCnt = [
        info.totVisitorCnt,
        info.giftSurveyUsersCnt,
        info.giftRandomUsersCnt,
        info.menuUsersCnt,
        info.moneyUsersCnt,
        info.boardUsersCnt,
        info.boardWriteUsersCnt,
    ];

    const ctx = document.getElementById("statisticsChart");
    const myLineChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "전체방문자",
                "선물추천",
                "선물랜덤추천",
                "메뉴추천",
                "축의금추천",
                "고민게시판방문자",
                "고민게시판작성자",
            ],
            datasets: [
                {
                    label: "인원 수",
                    backgroundColor: "rgba(2,117,216,1)",
                    borderColor: "rgba(2,117,216,1)",
                    data: userCnt,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        // ticks: { // 가로축 옵션 필요시 사용
                        //     maxTicksLimit: 6
                        // }
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max:
                                Math.ceil(
                                    Math.max(...userCnt) /
                                        Math.pow(
                                            10,
                                            Math.max(...userCnt).toString()
                                                .length - 1
                                        )
                                ) *
                                Math.pow(
                                    10,
                                    Math.max(...userCnt).toString().length - 1
                                ),
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            plugins: {
                bgColor: {
                    backgroundColor: "white",
                },
            },
            legend: {
                display: false,
            },
        },
        plugins: [
            {
                // pdf 추출 시 적용할 style set
                id: "bgColor",
                beforeDraw: (chart, steps, options) => {
                    const { ctx, width, height } = chart;
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                },
            },
        ],
    });
}

function makeUserChart(data) {
    const info = data;
    tempData = {
        datasets: [
            {
                backgroundColor: ["#0C4377", "#2182B3", "#43D8F9", "#8EF9FD"],
                data: [
                    info.giftSurveyUsersCnt + info.giftRandomUsersCnt,
                    info.menuUsersCnt,
                    info.moneyUsersCnt,
                    info.boardWriteUsersCnt,
                ],
            },
        ],
        labels: ["선물추천", "메뉴추천", "축의금추천", "고민게시판 작성자"],
    };
    const ctx = document.getElementById("userChart");
    const myPieChart = new Chart(ctx, {
        type: "pie",
        data: tempData,
        options: {
            plugins: {
                bgColor: {
                    backgroundColor: "white",
                },
            },
        },
        plugins: [
            {
                // pdf 추출 시 적용할 style set
                id: "bgColor",
                beforeDraw: (chart, steps, options) => {
                    const { ctx, width, height } = chart;
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                },
            },
        ],
    });
}

function makeGiftUserChart(data) {
    const info = data;
    tempData = {
        datasets: [
            {
                backgroundColor: ["#0C4377", "#30ABD6"],
                data: [info.giftSurveyUsersCnt, info.giftRandomUsersCnt],
            },
        ],
        labels: ["질문", "랜덤"],
    };
    const ctx = document.getElementById("giftUserChart");
    const myPieChart = new Chart(ctx, {
        type: "doughnut",
        data: tempData,
        options: {
            plugins: {
                bgColor: {
                    backgroundColor: "white",
                },
            },
        },
        plugins: [
            {
                // pdf 추출 시 적용할 style set
                id: "bgColor",
                beforeDraw: (chart, steps, options) => {
                    const { ctx, width, height } = chart;
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                },
            },
        ],
    });
}

function makeBoardUserChart(data) {
    const info = data;
    tempData = {
        datasets: [
            {
                backgroundColor: ["#0C4377", "#30ABD6"],
                data: [
                    info.boardUsersCnt - info.boardWriteUsersCnt,
                    info.boardWriteUsersCnt,
                ],
            },
        ],
        labels: ["작성x", "작성o"],
    };
    const ctx = document.getElementById("boardUserChart");
    const myPieChart = new Chart(ctx, {
        type: "doughnut",
        data: tempData,
        options: {
            plugins: {
                bgColor: {
                    backgroundColor: "white",
                },
            },
        },
        plugins: [
            {
                // pdf 추출 시 적용할 style set
                id: "bgColor",
                beforeDraw: (chart, steps, options) => {
                    const { ctx, width, height } = chart;
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                },
            },
        ],
    });
}

function getGiftData() {
    let tempData = [];
    $.ajax({
        type: "GET",
        url: "/api/gifts",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                tempData[i] = {
                    giftName: response[Object.keys(response)[i]].giftName,
                    giftRecommendCnt:
                        response[Object.keys(response)[i]].giftRecommendCnt,
                };
            }
            makeGiftChart(tempData);
        },
    });
}

function makeGiftChart(data) {
    const info = data; // 객체의 배열을 받아서
    result = info.sort(function (a, b) {
        // giftRecommendCnt 를 기준으로 내림차순
        return b.giftRecommendCnt - a.giftRecommendCnt;
    });

    let tempGiftName = [];
    let tempGiftRecommendCnt = [];

    for (let i = 0; i < 20; i++) {
        tempGiftName[i] = info[i].giftName;
        tempGiftRecommendCnt[i] = info[i].giftRecommendCnt;
    }

    const ctx = document.getElementById("giftChart");
    const myLineChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: tempGiftName,
            datasets: [
                {
                    label: "추천 수",
                    backgroundColor: "rgba(2,117,216,1)",
                    borderColor: "rgba(2,117,216,1)",
                    data: tempGiftRecommendCnt,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        // ticks: { // 가로축 옵션 필요시 사용
                        //     maxTicksLimit: 6
                        // }
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max:
                                Math.ceil(
                                    Math.max(...tempGiftRecommendCnt) /
                                        Math.pow(
                                            10,
                                            Math.max(
                                                ...tempGiftRecommendCnt
                                            ).toString().length - 1
                                        )
                                ) *
                                Math.pow(
                                    10,
                                    Math.max(...tempGiftRecommendCnt).toString()
                                        .length - 1
                                ),
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            plugins: {
                bgColor: {
                    backgroundColor: "white",
                },
            },
            legend: {
                display: false,
            },
        },
        plugins: [
            {
                // pdf 추출 시 적용할 style set
                id: "bgColor",
                beforeDraw: (chart, steps, options) => {
                    const { ctx, width, height } = chart;
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                },
            },
        ],
    });
}

function getMenuData() {
    let tempData = [];
    $.ajax({
        type: "GET",
        url: "/api/menus",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                tempData[i] = {
                    menuName: response[Object.keys(response)[i]].menuName,
                    menuRecommendCnt:
                        response[Object.keys(response)[i]].menuRecommendCnt,
                };
            }
            makeMenuChart(tempData);
        },
    });
}

function makeMenuChart(data) {
    const info = data; // 객체의 배열을 받아서
    result = info.sort(function (a, b) {
        // menuRecommendCnt 를 기준으로 내림차순
        return b.menuRecommendCnt - a.menuRecommendCnt;
    });

    let tempMenuName = [];
    let tempMenuRecommendCnt = [];

    for (let i = 0; i < 20; i++) {
        tempMenuName[i] = info[i].menuName;
        tempMenuRecommendCnt[i] = info[i].menuRecommendCnt;
    }

    const ctx = document.getElementById("menuChart");
    const myLineChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: tempMenuName,
            datasets: [
                {
                    label: "추천 수",
                    backgroundColor: "rgba(2,117,216,1)",
                    borderColor: "rgba(2,117,216,1)",
                    data: tempMenuRecommendCnt,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        // ticks: { // 가로축 옵션 필요시 사용
                        //     maxTicksLimit: 6
                        // }
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max:
                                Math.ceil(
                                    Math.max(...tempMenuRecommendCnt) /
                                        Math.pow(
                                            10,
                                            Math.max(
                                                ...tempMenuRecommendCnt
                                            ).toString().length - 1
                                        )
                                ) *
                                Math.pow(
                                    10,
                                    Math.max(...tempMenuRecommendCnt).toString()
                                        .length - 1
                                ),
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            plugins: {
                bgColor: {
                    backgroundColor: "white",
                },
            },
            legend: {
                display: false,
            },
        },
        plugins: [
            {
                // pdf 추출 시 적용할 style set
                id: "bgColor",
                beforeDraw: (chart, steps, options) => {
                    const { ctx, width, height } = chart;
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                },
            },
        ],
    });
}
