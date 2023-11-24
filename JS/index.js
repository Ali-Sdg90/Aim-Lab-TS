"use strict";
let points;
let hitClicks;
let numberOfClicks;
let timerDuration = 20;
let maxTimeCounter = timerDuration;
let TimeInterval = 0;
let gameVolume = 0.4;
const gameTargets = document.querySelector(".game-targets");
const blackScreen = document.querySelector(".black-screen");
const pointValue = document.querySelector(".point-value");
const accuracyValue = document.querySelector(".accuracy-value");
const timer = document.querySelector(".timer-section");
const timerNumHelper = (timeNumber, fillerChar) => {
    return String(Math.trunc(timeNumber)).padStart(2, fillerChar);
};
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
const resetTimer = () => {
    console.log("IN");
    maxTimeCounter = timerDuration;
    clearInterval(TimeInterval);
    TimeInterval = setInterval(() => {
        updateTimer();
    }, 1000);
};
const resetGame = () => {
    points = 0;
    hitClicks = 0;
    numberOfClicks = 0;
    if (accuracyValue) {
        accuracyValue.textContent = "100";
    }
    if (pointValue) {
        pointValue.textContent = String(points);
    }
};
const blackFlash = () => {
    if (blackScreen) {
        blackScreen.style.display = "block";
        blackScreen.style.opacity = "1";
        setTimeout(() => {
            blackScreen.style.opacity = "0";
            setTimeout(() => {
                blackScreen.style.display = "none";
            }, 500);
        }, 10);
    }
};
blackFlash();
const playSounds = (soundNumber) => {
    const gunLoading = new Audio("../Sounds/gun-loading.aac");
    const gunMiss = new Audio("../Sounds/gun-shot-miss.aac");
    const gunHit = new Audio("../Sounds/gun-shot-hit.aac");
    const bombExplode = new Audio("../Sounds/bomb-explode.aac");
    gunLoading.volume = gameVolume;
    gunMiss.volume = gameVolume;
    gunHit.volume = gameVolume;
    bombExplode.volume = gameVolume;
    switch (soundNumber) {
        case 1:
            gunLoading.play();
            break;
        case 2:
            gunMiss.play();
            break;
        case 3:
            gunHit.play();
            break;
        case 4:
            bombExplode.play();
            break;
        default:
            break;
    }
};
const calculateAccuracy = () => {
    const showAccuracy = ((hitClicks / numberOfClicks) * 100).toFixed(0);
    if (accuracyValue && targetsClickMode) {
        accuracyValue.textContent = String(showAccuracy);
    }
};
gameTargets?.addEventListener("click", () => {
    numberOfClicks++;
    calculateAccuracy();
    playSounds(2);
    gameTargets.style.cursor = `url("../Imgs/custom-cursor-clicked.png"), auto`;
    setTimeout(() => {
        gameTargets.style.cursor = `url("../Imgs/custom-cursor.png"), auto`;
    }, 200);
});
const updatePointValue = (addToPoints) => {
    addToPoints ? points++ : (points -= 5);
    if (pointValue) {
        pointValue.textContent = String(points);
    }
};
const reloadBtn = document.querySelector(".reload-btn");
let rotateDeg = 0;
if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
        reloadBtn.style.transform = `rotate(${(rotateDeg += 360)}deg)`;
        setTimeout(() => {
            blackFlash();
            setTimeout(() => {
                startGameCounter();
            }, 100);
        }, 500);
    });
}
const settingBtn = document.querySelector(".setting-btn");
const settingPage = document.querySelector(".setting-page");
let settingClicked = 0;
if (settingBtn && settingPage) {
    settingBtn.addEventListener("click", function () {
        if (settingClicked++ % 2 != 0) {
            settingPage.style.display = "grid";
            setTimeout(() => {
                settingPage.style.opacity = "1";
            }, 0);
        }
        else {
            settingPage.style.opacity = "0";
            setTimeout(() => {
                settingPage.style.display = "none";
            }, 300);
        }
        settingBtn.style.transform = `rotate(${settingClicked * 90}deg)`;
    });
}
let NoTargets = 4;
let NoBombs = 2;
let targetsCanMove = false;
let bombsCanMove = true;
let movementSpeed = 2000;
let targetsClickMode = true;
let bombsClickMode = false;
let targetsSize = 60;
let bombsSize = 70;
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
const gameCounter = document.querySelector(".game-counter");
let counterStartNumber = 4;
let gameTimerInterval;
const startGameCounter = () => {
    setTimeout(() => {
        playSounds(1);
    }, 500);
    clearInterval(TimeInterval);
    if (timer) {
        timer.textContent = "--:--";
    }
    if (accuracyValue) {
        accuracyValue.textContent = "100";
    }
    if (pointValue) {
        pointValue.textContent = "0";
    }
    if (gameCounter) {
        if (gameTimerInterval) {
            clearInterval(gameTimerInterval);
        }
        gameCounter.style.display = "flex";
        gameCounter.style.opacity = "1";
        counterStartNumber = 4;
        const updateCounter = () => {
            gameCounter.style.boxShadow = `inset 0 0 ${counterStartNumber * 25}px ${counterStartNumber * 5}px rgba(0, 30, 255, 0.5)`;
            if (counterStartNumber > 0) {
                gameCounter.textContent = String(counterStartNumber - 1);
            }
            counterStartNumber--;
            if (!counterStartNumber) {
                setTimeout(() => {
                    clearInterval(gameTimerInterval);
                    setTimeout(() => {
                        gameCounter.style.display = "none";
                    }, 300);
                    gameCounter.style.opacity = "0";
                    resetGame();
                }, 1000);
                resetTimer();
            }
        };
        updateCounter();
        gameTimerInterval = setInterval(updateCounter, 1000);
    }
};
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
        applySetting();
    }
    else {
        applyBtn.style.background = "#bc0000";
        applyBtn.style.cursor = "not-allowed";
        setTimeout(() => {
            applyBtn.style.background = "rgba(255, 255, 255, 0.2)";
            applyBtn.style.cursor = "pointer";
        }, 400);
    }
    settingBtn?.click();
    if (settingBtn && reloadBtn) {
        settingBtn.style.zIndex = "2";
        reloadBtn.style.zIndex = "2";
    }
    startGameCounter();
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
            if (targetsClickMode) {
                hitClicks += 2;
                numberOfClicks++;
                calculateAccuracy();
                playSounds(3);
            }
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
            playSounds(4);
        });
    });
    setStarCheckers();
};
applySetting();
const volumeIcon = document.querySelector(".volume-indicator");
const volumeInput = document.querySelector(".volume-input");
volumeInput.addEventListener("input", () => {
    const volumeValue = +volumeInput.value;
    if (volumeValue) {
        volumeIcon.style.background = `
            url("../Imgs/volume-icons/volume-icon-${Math.trunc(volumeValue / (100 / 3)) + 1}.png") 
            center no-repeat, rgba(46, 57, 101, 0.8)
        `;
    }
    else {
        volumeIcon.style.background = `
            url("../Imgs/volume-icons/volume-icon-0.png") 
            center no-repeat, rgba(46, 57, 101, 0.8)
        `;
    }
    volumeIcon.style.backgroundSize = "35px";
    gameVolume = volumeValue / 200;
});
//# sourceMappingURL=index.js.map