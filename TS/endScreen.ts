const calculateHitPerSec = (): number => {
    pointPerSec = +(hitClicks / timerDuration / 2).toFixed(3) * 10;
    return pointPerSec;
};

// Number of available data in table
let dataCounter = 0;

let points_History: number[] = [];
let timerDuration_History: number[] = [];
let accuracyPercentage_History: number[] = [];
let pointPerSec_History: number[] = [];
let roundTime_History: string[] = [];

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
    const setLocalStorage: {
        [key: string]: string[] | number[];
    } = {
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

const darkShadow: HTMLElement | null = document.querySelector(
    ".dark-shadow"
) as HTMLElement;
const endScreenContents: HTMLElement | null = document.querySelector(
    ".content-container"
) as HTMLElement;
const endScreenBtns: HTMLElement | null = document.querySelector(
    ".end-screen-btns"
) as HTMLElement;
const pointNumber: HTMLElement | null = document.querySelector(
    ".point-number"
) as HTMLElement;
const accuracyNumber: HTMLElement | null = document.querySelector(
    ".accuracy-number"
) as HTMLElement;
const timerNumber: HTMLElement | null = document.querySelector(
    ".timer-number"
) as HTMLElement;
const ppsNumber: HTMLElement | null = document.querySelector(
    ".pps-number"
) as HTMLElement;

const showEndScreen = () => {
    let delayEndScreen = false;

    // Close the setting if it's open
    if (!(settingClicked % 2)) {
        settingBtn?.click();
        delayEndScreen = true;
    }

    setTimeout(
        () => {
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
            }, 0); // SUPER COOL
        },
        // delayEndScreen set to 550 only when setting is already open
        delayEndScreen ? 550 : 0
    );
};

// Add Chart.js Script
const addChartJS = () => {
    const script: HTMLScriptElement = document.createElement("script");
    script.src = "./JS/chart.js";
    script.id = "chartJS";
    document.head.appendChild(script);
};

// Remove Chart.js Script
const removeChartJS = () => {
    const script = document.getElementById("chartJS");
    if (script) {
        document.head.removeChild(script);
    }
};

// ------ For Test Chart.js ------

// points = 90;
// timerDuration = 25;
// accuracyPercentage = 80;
// calculateHitPerSec();
// showEndScreen();
// addChartJS();
// if (endScreen) {
//     endScreen.style.display = "block";
// }
// const settingPageTEMP = document.querySelector(".setting-page") as HTMLElement;
// settingPageTEMP.style.display = "none";

// -------------------------------

const playAgainBtn: HTMLElement | null = document.querySelector(
    ".play-again-btn"
) as HTMLElement;

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

const deleteRecordsBtn: HTMLElement | null = document.querySelector(
    ".delete-records"
) as HTMLElement;

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

const saveBtn: HTMLElement | null = document.querySelector(
    ".save-btn"
) as HTMLElement;

saveBtn.addEventListener("click", () => {
    window.print();
});
