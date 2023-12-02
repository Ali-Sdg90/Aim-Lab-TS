"use strict";
points = 90;
timerDuration = 25;
accuracyPercentage = 80;
const calculatePointPerSec = () => {
    pointPerSec = Math.trunc(points / timerDuration);
    return pointPerSec;
};
calculatePointPerSec();
let dataCounter = 0;
let points_History = [];
let timerDuration_History = [];
let accuracyPercentage_History = [];
let pointPerSec_History = [];
let roundTime_History = [];
const addDataToHistory = () => {
    dataCounter++;
    points_History.push(points);
    timerDuration_History.push(timerDuration);
    accuracyPercentage_History.push(accuracyPercentage);
    pointPerSec_History.push(pointPerSec);
    roundTime_History.push(new Date().toLocaleString().toString());
    console.log("PLEASE Work...");
    const scriptElement = document.createElement("script");
    scriptElement.src = "./JS/chart.js";
    document.body.appendChild(scriptElement);
};
addDataToHistory();
addDataToHistory();
addDataToHistory();
const endScreenContents = document.querySelector(".content-container");
const endScreenBtns = document.querySelector(".end-screen-btns");
const pointNumber = document.querySelector(".point-number");
const accuracyNumber = document.querySelector(".accuracy-number");
const timerNumber = document.querySelector(".timer-number");
const ppsNumber = document.querySelector(".pps-number");
const showEndScreen = () => {
    console.log("END SCREEN!");
    endScreenContents.style.display = "flex";
    endScreenContents.classList.add("content-container-animation");
    endScreenBtns.style.display = "flex";
    endScreenBtns.classList.add("end-screen-btns-animation");
    pointNumber.textContent = points.toString();
    accuracyNumber.textContent = accuracyPercentage.toString();
    timerNumber.textContent = timerDuration.toString();
    ppsNumber.textContent = calculatePointPerSec().toString();
    addDataToHistory();
};
//# sourceMappingURL=endScreen.js.map