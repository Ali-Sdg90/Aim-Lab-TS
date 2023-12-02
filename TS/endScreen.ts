points = 90;

timerDuration = 25;

accuracyPercentage = 80;

const calculatePointPerSec = (): number => {
    pointPerSec = Math.trunc(points / timerDuration);
    return pointPerSec;
};
calculatePointPerSec();

let dataCounter = 0;

let points_History: number[] = [];
let timerDuration_History: number[] = [];
let accuracyPercentage_History: number[] = [];
let pointPerSec_History: number[] = [];
let roundTime_History: string[] = [];

// const chartJSScript: HTMLScriptElement | null =
//     document.querySelector(".Add-Chart-JS");

const addDataToHistory = () => {
    dataCounter++;
    points_History.push(points);
    timerDuration_History.push(timerDuration);
    accuracyPercentage_History.push(accuracyPercentage);
    pointPerSec_History.push(pointPerSec);
    roundTime_History.push(new Date().toLocaleString().toString());

    console.log("PLEASE Work...");

    // Create a new script element
    const scriptElement = document.createElement("script");
    scriptElement.src = "./JS/chart.js";

    // Append the script element to the document body
    document.body.appendChild(scriptElement);
};

// console.log(new Date().toLocaleString().toString().split(/, /g));

addDataToHistory();
addDataToHistory();
addDataToHistory();

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

// setTimeout(() => {
//     showEndScreen();
// }, 2000);
