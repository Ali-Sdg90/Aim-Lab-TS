"use strict";
let points = 0;
let accuracy = 100;
const pointValue = document.querySelector(".point-value");
const accuracyValue = document.querySelector(".accuracy-value");
const loseAccuracy = () => {
    accuracy -= 10;
    if (accuracyValue) {
        accuracyValue.textContent = String(accuracy);
    }
};
const updatePointValue = (addToPoints) => {
    if (addToPoints) {
        points++;
    }
    else {
        loseAccuracy();
        points -= 10;
    }
    if (pointValue) {
        pointValue.textContent = String(points);
    }
};
const reloadBtn = document.querySelector(".reload-btn");
let rotateDeg = 0;
if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
        reloadBtn.style.transform = `rotate(${(rotateDeg += 360)}deg)`;
        console.log("l");
        setTimeout(() => {
            location.reload();
        }, 500);
    });
}
const settingBtn = document.querySelector(".setting-btn");
const settingPage = document.querySelector(".setting-page");
let settingClicked = 0;
if (settingBtn && settingPage) {
    settingBtn.addEventListener("click", function () {
        if (settingClicked++ % 2 == 0) {
            settingPage.style.transition = "opacity 0.3s";
            settingPage.style.display = "grid";
            setTimeout(() => {
                settingPage.style.opacity = "1";
            }, 0);
        }
        else {
            setTimeout(() => {
                settingPage.style.display = "none";
            }, 300);
            settingPage.style.opacity = "0";
        }
        settingBtn.style.transform = `rotate(${settingClicked * 90}deg)`;
    });
}
let maxTimeCounter = 5;
const timer = document.querySelector(".timer-section");
const timerNumHelper = (timeNumber, fillerChar) => {
    return String(Math.trunc(timeNumber)).padStart(2, fillerChar);
};
let TimeInterval = 0;
const updateTimer = () => {
    if (timer) {
        const minValue = timerNumHelper(maxTimeCounter / 60, " ");
        const secValue = timerNumHelper(maxTimeCounter % 60, "0");
        timer.textContent = `${minValue}:${secValue}`;
        if (!maxTimeCounter--) {
            console.log("End of the timer");
            clearInterval(TimeInterval);
        }
    }
};
updateTimer();
if (timer) {
    TimeInterval = setInterval(() => {
        updateTimer();
    }, 1000);
}
const gameTargets = document.querySelector(".game-targets");
let NoTargets = 4;
let NoBombs = 2;
let targetsCanMove = false;
let bombsCanMove = true;
let timerDuration = 60;
let movementSpeed = 2000;
let alwaysReady = false;
let validInputsArray = [true, true, true, true];
const NoTargets_MinMax = [1, 200];
const NoBombs_MinMax = [0, 200];
const timerDuration_MinMax = [5, 3000];
const movementSpeed_MinMax = [100, 4000];
const NoTargetsInput = document.getElementById("number-of-targets");
const NoBombsInput = document.getElementById("number-of-bombs");
const targetsCanMoveInput = document.getElementById("targets-can-move");
const bombsCanMoveInput = document.getElementById("bombs-can-move");
const timerDurationInput = document.getElementById("timer-duration");
const movementSpeedInput = document.getElementById("movement-speed");
const alwaysReadyInput = document.getElementById("always-ready");
const applyBtn = document.querySelector(".apply-btn");
NoTargetsInput.value = String(NoTargets);
NoBombsInput.value = String(NoBombs);
targetsCanMoveInput.checked = targetsCanMove;
bombsCanMoveInput.checked = bombsCanMove;
timerDurationInput.value = String(timerDuration);
movementSpeedInput.value = String(movementSpeed);
alwaysReadyInput.checked = alwaysReady;
const addTitle = (input, minMax) => {
    input.title = `Min: ${minMax[0]}\nMax: ${minMax[1]}`;
};
addTitle(NoTargetsInput, NoTargets_MinMax);
addTitle(NoBombsInput, NoBombs_MinMax);
addTitle(timerDurationInput, timerDuration_MinMax);
addTitle(movementSpeedInput, movementSpeed_MinMax);
const inputValidationChecker = (input, minMax, validationNumber) => {
    input.addEventListener("input", () => {
        if (+input.value >= minMax[0] && +input.value <= minMax[1]) {
            console.log("ok");
            input.style.background = "#d1d1d1";
            input.style.color = "#000";
            validInputsArray[validationNumber] = true;
        }
        else {
            console.log("no!");
            input.style.background = "#bc0000";
            input.style.color = "#fff";
            validInputsArray[validationNumber] = false;
        }
    });
};
inputValidationChecker(NoTargetsInput, NoTargets_MinMax, 0);
inputValidationChecker(NoBombsInput, NoBombs_MinMax, 1);
inputValidationChecker(timerDurationInput, timerDuration_MinMax, 2);
inputValidationChecker(movementSpeedInput, movementSpeed_MinMax, 3);
applyBtn?.addEventListener("click", () => {
    let allowApply = true;
    for (let i = 0; i < 3; i++) {
        if (validInputsArray[i] === false) {
            allowApply = false;
        }
    }
    if (allowApply) {
        NoTargets = +NoTargetsInput.value;
        NoBombs = +NoBombsInput.value;
        targetsCanMove = targetsCanMoveInput.checked;
        bombsCanMove = bombsCanMoveInput.checked;
        timerDuration = +timerDurationInput.value;
        movementSpeed = +movementSpeedInput.value;
        alwaysReady = alwaysReadyInput.checked;
        applySetting();
    }
    else {
        console.log("no!");
        applyBtn.style.background = "#bc0000";
        applyBtn.style.cursor = "not-allowed";
        setTimeout(() => {
            applyBtn.style.background = "rgba(255, 255, 255, 0.2)";
            applyBtn.style.cursor = "pointer";
        }, 400);
    }
});
const applySetting = () => {
    if (gameTargets) {
        gameTargets.innerHTML = "";
        for (let i = 0; i < +NoTargetsInput.value; i++) {
            gameTargets.innerHTML += `<div class="game-target"></div>`;
        }
        for (let i = 0; i < +NoBombsInput.value; i++) {
            gameTargets.innerHTML += `<div class="bad-target"></div>`;
        }
    }
    const targets = document.querySelectorAll(".game-target");
    const badTargets = document.querySelectorAll(".bad-target");
    const randomNumberMaker = () => {
        return Math.trunc(Math.random() * 100);
    };
    const randomPositionMaker = (target) => {
        target.style.top = `${randomNumberMaker()}%`;
        target.style.left = `${randomNumberMaker()}%`;
    };
    targets.forEach((target) => {
        randomPositionMaker(target);
        if (targetsCanMove) {
            setInterval(() => {
                randomPositionMaker(target);
            }, movementSpeed - Math.trunc((Math.random() * movementSpeed) / 4));
        }
        target.addEventListener("mouseenter", () => {
            randomPositionMaker(target);
            updatePointValue(true);
            console.log("Good Boom");
        });
    });
    badTargets.forEach((target) => {
        randomPositionMaker(target);
        if (bombsCanMove) {
            setInterval(() => {
                randomPositionMaker(target);
            }, movementSpeed - Math.trunc((Math.random() * movementSpeed) / 4));
        }
        target.addEventListener("mouseenter", () => {
            randomPositionMaker(target);
            updatePointValue(false);
            console.log("Bad Boom");
        });
    });
};
applySetting();
//# sourceMappingURL=index.js.map