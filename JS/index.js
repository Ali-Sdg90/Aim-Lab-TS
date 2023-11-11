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
        points -= 5;
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
const gameTargets = document.querySelector(".game-targets");
let NoTargets = 4;
let NoBombs = 2;
let targetsCanMove = false;
let bombsCanMove = true;
let timerDuration = 30;
let movementSpeed = 2000;
let targetsClickMode = false;
let bombsClickMode = false;
let targetsSize = 40;
let bombsSize = 60;
let validInputsArray = [true, true, true, true];
const NoTargets_MinMax = [1, 200];
const NoBombs_MinMax = [0, 200];
const timerDuration_MinMax = [5, 600];
const movementSpeed_MinMax = [100, 4000];
const NoTargetsInput = document.getElementById("number-of-targets");
const NoBombsInput = document.getElementById("number-of-bombs");
const targetsCanMoveInput = document.getElementById("targets-can-move");
const bombsCanMoveInput = document.getElementById("bombs-can-move");
const timerDurationInput = document.getElementById("timer-duration");
const movementSpeedInput = document.getElementById("movement-speed");
const targetsClickModeInput = document.getElementById("targets-click-mode");
const bombsClickModeInput = document.getElementById("bombs-click-mode");
const targetsSizeInput = document.getElementById("targets-size");
const bombsSizeInput = document.getElementById("bombs-size");
const applyBtn = document.querySelector(".apply-btn");
NoTargetsInput.value = String(NoTargets);
NoBombsInput.value = String(NoBombs);
targetsCanMoveInput.checked = targetsCanMove;
bombsCanMoveInput.checked = bombsCanMove;
timerDurationInput.value = String(timerDuration);
movementSpeedInput.value = String(movementSpeed);
targetsClickModeInput.checked = targetsClickMode;
bombsClickModeInput.checked = bombsClickMode;
targetsSizeInput.value = String(targetsSize);
bombsSizeInput.value = String(bombsSize);
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
const NoTargetsStar = document.querySelector(".number-of-targets-star");
const NoBombstsStar = document.querySelector(".number-of-bombs-star");
const targetsCanMoveStar = document.querySelector(".targets-can-move-star");
const bombsCanMoveStar = document.querySelector(".bombs-can-move-star");
const timerDurationStar = document.querySelector(".timer-duration-star");
const movementSpeedStar = document.querySelector(".movement-speed-star");
const targetsClickModeStar = document.querySelector(".targets-click-mode-star");
const bombsClickModeStar = document.querySelector(".bombs-click-mode-star");
const targetsSizeStar = document.querySelector(".targets-size-star");
const bombsSizeStar = document.querySelector(".bombs-size-star");
const InputStarChecker = (input, setValueForInput, star) => {
    const InputStarCheckerFunc = () => {
        if (typeof setValueForInput === "number") {
            if (+input.value !== setValueForInput) {
                star.style.display = "block";
            }
            else {
                star.style.display = "none";
            }
        }
        else {
            if (input.checked !== setValueForInput) {
                star.style.display = "block";
            }
            else {
                star.style.display = "none";
            }
        }
    };
    InputStarCheckerFunc();
    input.removeEventListener("change", InputStarCheckerFunc);
    input.addEventListener("change", InputStarCheckerFunc);
};
const setStarCheckers = () => {
    InputStarChecker(NoTargetsInput, NoTargets, NoTargetsStar);
    InputStarChecker(NoBombsInput, NoBombs, NoBombstsStar);
    InputStarChecker(targetsCanMoveInput, targetsCanMove, targetsCanMoveStar);
    InputStarChecker(bombsCanMoveInput, bombsCanMove, bombsCanMoveStar);
    InputStarChecker(timerDurationInput, timerDuration, timerDurationStar);
    InputStarChecker(movementSpeedInput, movementSpeed, movementSpeedStar);
    InputStarChecker(bombsClickModeInput, bombsClickMode, bombsClickModeStar);
    InputStarChecker(targetsSizeInput, targetsSize, targetsSizeStar);
    InputStarChecker(bombsSizeInput, bombsSize, bombsSizeStar);
    InputStarChecker(targetsClickModeInput, targetsClickMode, targetsClickModeStar);
};
const bombsShowcaseContainer = document.querySelector(".bombs-container");
const targetsShowcaseContainer = document.querySelector(".targets-container");
const bombsShowcase = document.querySelector(".bombs-ball-showcase");
const targetsShowcase = document.querySelector(".targets-ball-showcase");
const showcaseTransition = (container, introTransition) => {
    if (container) {
        container.style.opacity = String(+introTransition);
    }
};
let targetsFadeOutTimeout;
let bombsFadeOutTimeout;
let zIndexCounter = 1;
const showcaseTransitions = (input, showcaseContainer, showcaseBall, timeoutValue) => {
    input.addEventListener("input", () => {
        showcaseTransition(showcaseContainer, true);
        showcaseBall.style.width = input.value + "px";
        showcaseBall.style.height = input.value + "px";
        showcaseBall.style.zIndex = String(zIndexCounter++);
        console.log(zIndexCounter);
        clearTimeout(timeoutValue);
        timeoutValue = setTimeout(() => {
            showcaseTransition(showcaseContainer, false);
        }, 1200);
    });
};
showcaseTransitions(bombsSizeInput, bombsShowcaseContainer, bombsShowcase, bombsFadeOutTimeout);
showcaseTransitions(targetsSizeInput, targetsShowcaseContainer, targetsShowcase, targetsFadeOutTimeout);
applyBtn?.addEventListener("click", () => {
    let allowApply = true;
    for (let i = 0; i < 4; i++) {
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
        targetsClickMode = targetsClickModeInput.checked;
        bombsClickMode = bombsClickModeInput.checked;
        targetsSize = +targetsSizeInput.value;
        bombsSize = +bombsSizeInput.value;
        maxTimeCounter = timerDuration;
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
    const bombs = document.querySelectorAll(".bad-target");
    const randomNumberMaker = () => {
        return Math.trunc(Math.random() * 100);
    };
    const randomPositionMaker = (target) => {
        target.style.top = `${randomNumberMaker()}%`;
        target.style.left = `${randomNumberMaker()}%`;
    };
    targets.forEach((target) => {
        randomPositionMaker(target);
        target.style.width = `${targetsSize}px`;
        target.style.height = `${targetsSize}px`;
        if (targetsCanMove) {
            setInterval(() => {
                randomPositionMaker(target);
            }, movementSpeed - Math.trunc((Math.random() * movementSpeed) / 4));
        }
        target.addEventListener(targetsClickMode ? "click" : "mouseenter", () => {
            randomPositionMaker(target);
            updatePointValue(true);
            console.log("Good Boom");
        });
    });
    bombs.forEach((target) => {
        randomPositionMaker(target);
        target.style.width = `${bombsSize}px`;
        target.style.height = `${bombsSize}px`;
        if (bombsCanMove) {
            setInterval(() => {
                randomPositionMaker(target);
            }, movementSpeed - Math.trunc((Math.random() * movementSpeed) / 4));
        }
        target.addEventListener(bombsClickMode ? "click" : "mouseenter", () => {
            randomPositionMaker(target);
            updatePointValue(false);
            console.log("Bad Boom");
        });
    });
    setStarCheckers();
};
applySetting();
let maxTimeCounter = timerDuration;
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
//# sourceMappingURL=index.js.map