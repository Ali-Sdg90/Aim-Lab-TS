points = 90;

timerDuration = 25;

accuracyPercentage = 80;

const calculatePointPerSec = () => {
    pointPerSec = Math.trunc(points / timerDuration);
};
calculatePointPerSec();

let DATA_COUNT = 0;

let points_History: number[] = [];
let timerDuration_History: number[] = [];
let accuracyPercentage_History: number[] = [];
let pointPerSec_History: number[] = [];
let roundTime_History: string[] = [];

const addDataToHistory = () => {
    DATA_COUNT++;
    points_History.push(points);
    timerDuration_History.push(timerDuration);
    accuracyPercentage_History.push(accuracyPercentage);
    pointPerSec_History.push(pointPerSec);
    roundTime_History.push(new Date().toLocaleString().toString());
};
// console.log(new Date().toLocaleString().toString().split(/, /g));

addDataToHistory();

points = 190;
calculatePointPerSec();

timerDuration = 15;

addDataToHistory();
addDataToHistory();
addDataToHistory();
addDataToHistory();
addDataToHistory();
