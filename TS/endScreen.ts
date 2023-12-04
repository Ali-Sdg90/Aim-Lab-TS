const calculateHitPerSec = (): number => {
    pointPerSec = +(hitClicks / timerDuration / 2).toFixed(3) * 10;
    return pointPerSec;
};

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
};

const endScreen: HTMLElement | null = document.querySelector(
    ".end-screen"
) as HTMLElement;
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
    console.log("END SCREEN!");
    let delayEndScreen = false;

    if (!(settingClicked % 2)) {
        settingBtn?.click();
        delayEndScreen = true;
    }

    setTimeout(
        () => {
            endScreen.style.display = "block";

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
        delayEndScreen ? 550 : 0
    );
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

// ------ TEMP ------

// points = 90;
// timerDuration = 25;
// accuracyPercentage = 80;
// calculateHitPerSec();
// showEndScreen();
// showChartJS();
// endScreen.style.display = "block";
// const settingPageTEMP = document.querySelector(".setting-page") as HTMLElement;
// settingPageTEMP.style.display = "none";

// ------------------

const playAgainBtn: HTMLElement | null = document.querySelector(
    ".play-again-btn"
) as HTMLElement;

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
