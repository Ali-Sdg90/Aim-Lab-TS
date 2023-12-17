dateNow = new Date().toLocaleString().toString().split(/, /g)[0];

// ["12/17/2023","6:02:12 PM"]
// console.log(new Date().toLocaleString().toString().split(/, /g));

data = {
    labels: roundTime_History.map((date) => {
        // Show time or date
        if (dateNow === date.split(/, /g)[0]) {
            return date.split(/, /g)[1];
        } else {
            return date.split(/, /g)[0];
        }
    }),
    datasets: [
        {
            label: "Points     ",
            data: points_History,
            borderColor: "rgba(235, 232, 54)",
            backgroundColor: "rgba(235, 232, 54, 0.5)",
            stack: "combined0",
        },
        {
            label: "Accuracy / 5     ",
            data: accuracyPercentage_History,
            borderColor: "rgba(60, 235, 54)",
            backgroundColor: "rgba(60, 235, 54, 0.5)",
            stack: "combined1",
        },
        {
            label: "Timer     ",
            data: timerDuration_History,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            stack: "combined2",
        },
        {
            label: "Hits per 10 sec",
            data: pointPerSec_History,
            borderColor: "rgba(235, 54, 54)",
            backgroundColor: "rgba(235, 54, 54, 0.5)",
            stack: "combined3",
        },
    ],
};

config = {
    type: "line",
    data: data,
    options: {
        plugins: {
            title: {
                display: false,
                text: "Performance Chart",
            },
        },
        scales: {
            y: {
                stacked: true,
            },
        },
    },
};

if (myChart) {
    myChart.destroy();
}

ctx = document.getElementById("myChart").getContext("2d");
myChart = new Chart(ctx, config);
