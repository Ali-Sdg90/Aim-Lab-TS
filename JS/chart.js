const actions = [
    {
        name: "Randomize",
        handler(chart) {
            chart.data.datasets.forEach((dataset) => {
                dataset.data = Array.from(
                    { length: chart.data.labels.length },
                    () => getRandomInt(0, 100)
                );
            });
            chart.update();
        },
    },
    {
        name: "Add Dataset",
        handler(chart) {
            const data = chart.data;
            const dsColor = getRandomColor();
            const newDataset = {
                label: "Dataset " + (data.datasets.length + 1),
                backgroundColor: dsColor,
                borderColor: dsColor,
                borderWidth: 1,
                stack: "combined",
                data: Array.from({ length: data.labels.length }, () =>
                    getRandomInt(0, 100)
                ),
            };
            chart.data.datasets.push(newDataset);
            chart.update();
        },
    },
    {
        name: "Add Data",
        handler(chart) {
            const data = chart.data;
            if (data.datasets.length > 0) {
                data.labels.push(
                    getNextMonth(data.labels[data.labels.length - 1])
                );
                data.datasets.forEach((dataset) => {
                    dataset.data.push(getRandomInt(0, 100));
                });
                chart.update();
            }
        },
    },
    {
        name: "Remove Dataset",
        handler(chart) {
            chart.data.datasets.pop();
            chart.update();
        },
    },
    {
        name: "Remove Data",
        handler(chart) {
            chart.data.labels.splice(-1, 1); // remove the label first
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
            chart.update();
        },
    },
];

// console.log(new Date().toLocaleString());
// console.log(new Date().toLocaleString().replace(/, /g, "\n"));

// console.log(roundTime_History);

const dateNow = new Date().toLocaleString().toString().split(/, /g)[0];
// console.log(dateNow);

const data = {
    labels: roundTime_History.map((date) => {
        if (dateNow === date.split(/, /g)[0]) {
            return date.split(/, /g)[1];
        } else {
            return date.split(/, /g)[0];
        }
    }),
    // labels: roundTime_History,
    datasets: [
        {
            label: "Points",
            data: points_History,
            borderColor: "rgba(235, 232, 54)",
            backgroundColor: "rgba(235, 232, 54, 0.5)",
            stack: "combined0",
            // type: "bar",
        },
        {
            label: "Accuracy",
            data: timerDuration_History,
            borderColor: "rgba(60, 235, 54)",
            backgroundColor: "rgba(60, 235, 54, 0.5)",
            stack: "combined1",
        },
        {
            label: "Timer",
            data: accuracyPercentage_History,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            stack: "combined2",
        },
        {
            label: "Points per sec",
            data: pointPerSec_History,
            borderColor: "rgba(235, 54, 54)",
            backgroundColor: "rgba(235, 54, 54, 0.5)",
            stack: "combined3",
        },
    ],
};

const config = {
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

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, config);
