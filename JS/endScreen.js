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
    accuracyPercentage_History.push(+(accuracyPercentage / 5).toFixed(2));
    pointPerSec_History.push(pointPerSec);
    roundTime_History.push(new Date().toLocaleString().toString());
    updateLocalStorage();
};
const updateLocalStorage = () => {
    const setLocalStorage = {
        points_History: points_History,
        timerDuration_History: timerDuration_History,
        accuracyPercentage_History: accuracyPercentage_History,
        pointPerSec_History: pointPerSec_History,
        roundTime_History: roundTime_History,
    };
    localStorage.setItem("Aim-Lab-TS-Records", JSON.stringify(setLocalStorage));
};
const getLocalStorage = localStorage.getItem("Aim-Lab-TS-Records");
if (getLocalStorage) {
    const parseLocalStorage = JSON.parse(getLocalStorage);
    points_History = parseLocalStorage.points_History;
    timerDuration_History = parseLocalStorage.timerDuration_History;
    accuracyPercentage_History = parseLocalStorage.accuracyPercentage_History;
    pointPerSec_History = parseLocalStorage.pointPerSec_History;
    roundTime_History = parseLocalStorage.roundTime_History;
    dataCounter = points_History.length;
}
const darkShadow = document.querySelector(".dark-shadow");
const endScreenContents = document.querySelector(".content-container");
const endScreenBtns = document.querySelector(".end-screen-btns");
const pointNumber = document.querySelector(".point-number");
const accuracyNumber = document.querySelector(".accuracy-number");
const timerNumber = document.querySelector(".timer-number");
const ppsNumber = document.querySelector(".pps-number");
const showEndScreen = () => {
    let delayEndScreen = false;
    if (!(settingClicked % 2)) {
        settingBtn?.click();
        delayEndScreen = true;
    }
    setTimeout(() => {
        if (endScreen) {
            endScreen.style.display = "block";
        }
        setTimeout(() => {
            darkShadow.style.opacity = "1";
            endScreenContents.style.display = "flex";
            endScreenBtns.style.display = "flex";
            endScreenContents.classList.add("content-container-animation");
            endScreenBtns.classList.add("end-screen-btns-animation");
            pointNumber.textContent = points.toString();
            accuracyNumber.textContent = accuracyPercentage.toString();
            timerNumber.textContent = timerDuration.toString();
            ppsNumber.textContent = calculateHitPerSec().toFixed(2);
            addDataToHistory();
        }, 0);
    }, delayEndScreen ? 550 : 0);
};
const addChartJS = () => {
    const script = document.createElement("script");
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
    if (endScreen) {
        endScreen.style.display = "none";
    }
    endScreenContents.style.display = "none";
    endScreenBtns.style.display = "none";
    endScreenContents.classList.remove("content-container-animation");
    endScreenBtns.classList.remove("end-screen-btns-animation");
    removeChartJS();
    blackFlash(true);
    startGameCounter();
});
const deleteRecordsBtn = document.querySelector(".delete-records");
deleteRecordsBtn.addEventListener("click", () => {
    localStorage.removeItem("Aim-Lab-TS-Records");
    points_History = [];
    timerDuration_History = [];
    accuracyPercentage_History = [];
    pointPerSec_History = [];
    roundTime_History = [];
    dataCounter = 0;
    addDataToHistory();
    removeChartJS();
    addChartJS();
});
const saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", () => {
    window.print();
});
//# sourceMappingURL=endScreen.js.map