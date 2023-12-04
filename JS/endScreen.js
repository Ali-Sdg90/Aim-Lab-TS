"use strict";
const calculateHitPerSec = () => {
    pointPerSec = +(hitClicks / timerDuration / 2).toFixed(3) * 10;
    return pointPerSec;
};
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
    accuracyPercentage_History.push(accuracyPercentage / 5);
    pointPerSec_History.push(pointPerSec);
    roundTime_History.push(new Date().toLocaleString().toString());
};
const endScreen = document.querySelector(".end-screen");
const endScreenContents = document.querySelector(".content-container");
const endScreenBtns = document.querySelector(".end-screen-btns");
const pointNumber = document.querySelector(".point-number");
const accuracyNumber = document.querySelector(".accuracy-number");
const timerNumber = document.querySelector(".timer-number");
const ppsNumber = document.querySelector(".pps-number");
const showEndScreen = () => {
    console.log("END SCREEN!");
    endScreen.style.display = "block";
    endScreenContents.style.display = "flex";
    endScreenBtns.style.display = "flex";
    endScreenContents.classList.add("content-container-animation");
    endScreenBtns.classList.add("end-screen-btns-animation");
    pointNumber.textContent = points.toString();
    accuracyNumber.textContent = accuracyPercentage.toString();
    timerNumber.textContent = timerDuration.toString();
    ppsNumber.textContent = calculateHitPerSec().toString();
    addDataToHistory();
};
const addChartJS = () => {
    let script = document.createElement("script");
    script.src = "./JS/chart.js";
    script.id = "chartJS";
    document.head.appendChild(script);
};
const removeChartJS = () => {
    const script = document.getElementById("chartJS");
    if (script) {
        document.head.removeChild(script);
    }
};
const playAgainBtn = document.querySelector(".play-again-btn");
playAgainBtn.addEventListener("click", () => {
    endScreen.style.display = "none";
    endScreenContents.style.display = "none";
    endScreenBtns.style.display = "none";
    endScreenContents.classList.remove("content-container-animation");
    endScreenBtns.classList.remove("end-screen-btns-animation");
    removeChartJS();
    blackFlash();
    startGameCounter();
});
//# sourceMappingURL=endScreen.js.map