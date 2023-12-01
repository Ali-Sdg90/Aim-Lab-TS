"use strict";
points = 90;
timerDuration = 25;
accuracyPercentage = 80;
const calculatePointPerSec = () => {
    pointPerSec = Math.trunc(points / timerDuration);
};
calculatePointPerSec();
let DATA_COUNT = 0;
let points_History = [];
let timerDuration_History = [];
let accuracyPercentage_History = [];
let pointPerSec_History = [];
let roundTime_History = [];
const addDataToHistory = () => {
    DATA_COUNT++;
    points_History.push(points);
    timerDuration_History.push(timerDuration);
    accuracyPercentage_History.push(accuracyPercentage);
    pointPerSec_History.push(pointPerSec);
    roundTime_History.push(new Date().toLocaleString().replace(/, /g, "\n"));
};
addDataToHistory();
points = 190;
calculatePointPerSec();
timerDuration = 15;
addDataToHistory();
calculatePointPerSec();
addDataToHistory();
//# sourceMappingURL=endScreen.js.map