var winrate_ranked = $(".winrate_ranked .chart");
var killparticipation_class = $(".kp #chart");
var role_class = $(".role .chart");
var blueside_class = $(".blueside .chart");
var redside_class = $(".redside .chart");

var chart_options = {
    legend: {
        display: false,
        maintainAspectRatio: false
    }
}
var chart_options_semi = {
    legend: {
        display: false
    },

    tooltip: {
        tooltipFillColor: "red"
    },
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI
}

var winrate_ranked = new Chart(winrate_ranked, {
    type: 'doughnut',
    data: {
        labels: [
            "Win",
            "Loss"
        ],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: [
                    "#1F8ECD",
                    "#EE5A52"
                ]
            }]
    },
    options: chart_options
});

var blueside = new Chart(blueside_class, {
    type: 'doughnut',
    data: {
        labels: [
            "Win",
            "Loss"
        ],
        datasets: [
            {
                data: [0],
                backgroundColor: [
                    "#1F8ECD",
                    "#1e7eb2"
                ]
            }]
    },
    options: chart_options
});

var redside = new Chart(redside_class, {
    type: 'doughnut',
    data: {
        labels: [
            "Win",
            "Loss"
        ],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: [
                    "#EE5A52",
                    "#c44b44"
                ]
            }]
    },
    options: chart_options
});


var role_chart = new Chart(role_class, {
    type: 'doughnut',
    data: {
        labels: [
            "Carry",
            "Captain",
            "Jungler"
        ],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: [
                    "#A02E2D",
                    "#F2D051",
                    "#81A950"
                ]
            }]
    },
    options: chart_options_semi
});


var killparticipation = new Chart(killparticipation_class, {
    type: 'doughnut',
    data: {
        labels: [
            "Part",
            "Not Part"
        ],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: [
                    "#26262B",
                    "#D3D3D3"
                ]
            }]
    },
    options: chart_options
});



