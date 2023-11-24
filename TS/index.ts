// index.ts --------------------------------------------------
let points: number;
let hitClicks: number;
let numberOfClicks: number;
let timerDuration: number = 20;
let maxTimeCounter: number = timerDuration;
let TimeInterval: number | undefined = 0;
let gameVolume: number = 0.4;

const gameTargets: HTMLElement | null = document.querySelector(".game-targets");
const blackScreen: null | HTMLElement = document.querySelector(".black-screen");
const pointValue: HTMLElement | null = document.querySelector(".point-value");
const accuracyValue: HTMLElement | null =
    document.querySelector(".accuracy-value");

const timer: HTMLElement | null = document.querySelector(".timer-section");

const timerNumHelper = (timeNumber: number, fillerChar: string): string => {
    return String(Math.trunc(timeNumber)).padStart(2, fillerChar);
};

const updateTimer = (): void => {
    if (timer) {
        const minValue: string = timerNumHelper(maxTimeCounter / 60, " ");
        const secValue: string = timerNumHelper(maxTimeCounter % 60, "0");
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

    // resetGame();
};

blackFlash();

const playSounds = (soundNumber: number) => {
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

gameTargets?.addEventListener("click", (): void => {
    numberOfClicks++;
    calculateAccuracy();
    playSounds(2);

    gameTargets.style.cursor = `url("../Imgs/custom-cursor-clicked.png"), auto`;

    setTimeout(() => {
        gameTargets.style.cursor = `url("../Imgs/custom-cursor.png"), auto`;
    }, 200);
});

const updatePointValue = (addToPoints: boolean): void => {
    addToPoints ? points++ : (points -= 5);

    if (pointValue) {
        pointValue.textContent = String(points);
    }
};

const reloadBtn: HTMLElement | null = document.querySelector(".reload-btn");

let rotateDeg: number = 0;

if (reloadBtn) {
    reloadBtn.addEventListener("click", (): void => {
        reloadBtn.style.transform = `rotate(${(rotateDeg += 360)}deg)`;

        setTimeout(() => {
            blackFlash();
            // resetTimer();

            setTimeout(() => {
                startGameCounter();
            }, 100);
        }, 500);
    });
}

const settingBtn: HTMLElement | null = document.querySelector(".setting-btn");
const settingPage: HTMLElement | null = document.querySelector(".setting-page");

let settingClicked = 0;

if (settingBtn && settingPage) {
    settingBtn.addEventListener("click", function () {
        if (settingClicked++ % 2 != 0) {
            settingPage.style.display = "grid";

            setTimeout(() => {
                settingPage.style.opacity = "1";
            }, 0);
        } else {
            settingPage.style.opacity = "0";

            setTimeout(() => {
                settingPage.style.display = "none";
            }, 300);
        }
        settingBtn.style.transform = `rotate(${settingClicked * 90}deg)`;
    });
}

// setting.ts ---------------------------------------------------

let NoTargets: number = 4;
let NoBombs: number = 2;
let targetsCanMove: boolean = false;
let bombsCanMove: boolean = true;
let movementSpeed: number = 2000;
let targetsClickMode: boolean = true;
let bombsClickMode: boolean = false;
let targetsSize: number = 60;
let bombsSize: number = 70;

let validInputsArray: boolean[] = [true, true, true, true];

const NoTargets_MinMax: number[] = [1, 200];
const NoBombs_MinMax: number[] = [0, 200];
const timerDuration_MinMax: number[] = [5, 600];
const movementSpeed_MinMax: number[] = [100, 4000];

const NoTargetsInput = document.getElementById(
    "number-of-targets"
) as HTMLInputElement;
const NoBombsInput: HTMLInputElement | null = document.getElementById(
    "number-of-bombs"
) as HTMLInputElement;
const targetsCanMoveInput: HTMLInputElement | null = document.getElementById(
    "targets-can-move"
) as HTMLInputElement;
const bombsCanMoveInput: HTMLInputElement | null = document.getElementById(
    "bombs-can-move"
) as HTMLInputElement;
const timerDurationInput: HTMLInputElement | null = document.getElementById(
    "timer-duration"
) as HTMLInputElement;
const movementSpeedInput: HTMLInputElement | null = document.getElementById(
    "movement-speed"
) as HTMLInputElement;
const targetsClickModeInput: HTMLInputElement | null = document.getElementById(
    "targets-click-mode"
) as HTMLInputElement;
const bombsClickModeInput: HTMLInputElement | null = document.getElementById(
    "bombs-click-mode"
) as HTMLInputElement;
const targetsSizeInput: HTMLInputElement | null = document.getElementById(
    "targets-size"
) as HTMLInputElement;
const bombsSizeInput: HTMLInputElement | null = document.getElementById(
    "bombs-size"
) as HTMLInputElement;

const applyBtn: HTMLElement | null = document.querySelector(".apply-btn");

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

const addTitle = (input: HTMLElement, minMax: number[]): void => {
    input.title = `Min: ${minMax[0]}\nMax: ${minMax[1]}`;
};

addTitle(NoTargetsInput, NoTargets_MinMax);
addTitle(NoBombsInput, NoBombs_MinMax);
addTitle(timerDurationInput, timerDuration_MinMax);
addTitle(movementSpeedInput, movementSpeed_MinMax);

// localStorge

const inputValidationChecker = (
    input: HTMLInputElement,
    minMax: number[],
    validationNumber: number
): void => {
    input.addEventListener("input", (): void => {
        if (+input.value >= minMax[0] && +input.value <= minMax[1]) {
            console.log("ok");
            input.style.background = "#d1d1d1";
            input.style.color = "#000";
            validInputsArray[validationNumber] = true;
        } else {
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

const NoTargetsStar: HTMLElement | null = document.querySelector(
    ".number-of-targets-star"
) as HTMLElement;
const NoBombstsStar: HTMLElement | null = document.querySelector(
    ".number-of-bombs-star"
) as HTMLElement;
const targetsCanMoveStar: HTMLElement | null = document.querySelector(
    ".targets-can-move-star"
) as HTMLElement;
const bombsCanMoveStar: HTMLElement | null = document.querySelector(
    ".bombs-can-move-star"
) as HTMLElement;
const timerDurationStar: HTMLElement | null = document.querySelector(
    ".timer-duration-star"
) as HTMLElement;
const movementSpeedStar: HTMLElement | null = document.querySelector(
    ".movement-speed-star"
) as HTMLElement;
const targetsClickModeStar: HTMLElement | null = document.querySelector(
    ".targets-click-mode-star"
) as HTMLElement;
const bombsClickModeStar: HTMLElement | null = document.querySelector(
    ".bombs-click-mode-star"
) as HTMLElement;
const targetsSizeStar: HTMLElement | null = document.querySelector(
    ".targets-size-star"
) as HTMLElement;
const bombsSizeStar: HTMLElement | null = document.querySelector(
    ".bombs-size-star"
) as HTMLElement;

const InputStarChecker = (
    input: HTMLInputElement,
    setValueForInput: number | boolean,
    star: HTMLElement
): void => {
    const InputStarCheckerFunc = (): void => {
        // console.log(">>>", setValueForInput, input.value);

        if (typeof setValueForInput === "number") {
            if (+input.value !== setValueForInput) {
                star.style.display = "block";
            } else {
                star.style.display = "none";
            }
        } else {
            if (input.checked !== setValueForInput) {
                star.style.display = "block";
            } else {
                star.style.display = "none";
            }
        }
    };

    InputStarCheckerFunc();

    input.removeEventListener("change", InputStarCheckerFunc);
    input.addEventListener("change", InputStarCheckerFunc);
};

const setStarCheckers = (): void => {
    InputStarChecker(NoTargetsInput, NoTargets, NoTargetsStar);
    InputStarChecker(NoBombsInput, NoBombs, NoBombstsStar);
    InputStarChecker(targetsCanMoveInput, targetsCanMove, targetsCanMoveStar);
    InputStarChecker(bombsCanMoveInput, bombsCanMove, bombsCanMoveStar);
    InputStarChecker(timerDurationInput, timerDuration, timerDurationStar);
    InputStarChecker(movementSpeedInput, movementSpeed, movementSpeedStar);
    InputStarChecker(bombsClickModeInput, bombsClickMode, bombsClickModeStar);
    InputStarChecker(targetsSizeInput, targetsSize, targetsSizeStar);
    InputStarChecker(bombsSizeInput, bombsSize, bombsSizeStar);
    InputStarChecker(
        targetsClickModeInput,
        targetsClickMode,
        targetsClickModeStar
    );
};

const bombsShowcaseContainer: HTMLElement | null =
    document.querySelector(".bombs-container");
const targetsShowcaseContainer: HTMLElement | null =
    document.querySelector(".targets-container");

const bombsShowcase: HTMLElement | null = document.querySelector(
    ".bombs-ball-showcase"
) as HTMLElement;
const targetsShowcase: HTMLElement | null = document.querySelector(
    ".targets-ball-showcase"
) as HTMLElement;

const showcaseTransition = (
    container: HTMLElement | null,
    introTransition: boolean
): void => {
    if (container) {
        container.style.opacity = String(+introTransition);
    }
};

let targetsFadeOutTimeout: number | undefined;
let bombsFadeOutTimeout: number | undefined;
let zIndexCounter: number = 1;

const showcaseTransitions = (
    input: HTMLInputElement,
    showcaseContainer: HTMLElement | null,
    showcaseBall: HTMLElement,
    timeoutValue: number | undefined
): void => {
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

showcaseTransitions(
    bombsSizeInput,
    bombsShowcaseContainer,
    bombsShowcase,
    bombsFadeOutTimeout
);
showcaseTransitions(
    targetsSizeInput,
    targetsShowcaseContainer,
    targetsShowcase,
    targetsFadeOutTimeout
);

const gameCounter: null | HTMLElement = document.querySelector(".game-counter");

let counterStartNumber = 4;
let gameTimerInterval: number | undefined;

const startGameCounter = () => {
    console.log("startGameCounter");

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
            gameCounter.style.boxShadow = `inset 0 0 ${
                counterStartNumber * 25
            }px ${counterStartNumber * 5}px rgba(0, 30, 255, 0.5)`;

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

                console.log(counterStartNumber);
                resetTimer();
            }
        };

        updateCounter();

        gameTimerInterval = setInterval(updateCounter, 1000);
    }
};

applyBtn?.addEventListener("click", () => {
    let allowApply: boolean = true;

    for (let i: number = 0; i < 4; i++) {
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
    } else {
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

        for (let i: number = 0; i < +NoTargetsInput.value; i++) {
            gameTargets.innerHTML += `<div class="game-target"></div>`;
        }
        for (let i: number = 0; i < +NoBombsInput.value; i++) {
            gameTargets.innerHTML += `<div class="bad-target"></div>`;
        }
    }

    const targets: NodeListOf<HTMLElement> =
        document.querySelectorAll(".game-target");
    const bombs: NodeListOf<HTMLElement> =
        document.querySelectorAll(".bad-target");

    const randomNumberMaker = (): number => {
        return Math.trunc(Math.random() * 100);
    };

    const randomPositionMaker = (target: HTMLElement): void => {
        target.style.top = `${randomNumberMaker()}%`;
        target.style.left = `${randomNumberMaker()}%`;
    };

    targets.forEach((target: HTMLElement) => {
        randomPositionMaker(target);

        target.style.width = `${targetsSize}px`;
        target.style.height = `${targetsSize}px`;

        if (targetsCanMove) {
            setInterval(() => {
                randomPositionMaker(target);
            }, movementSpeed - Math.trunc((Math.random() * movementSpeed) / 4));
        }

        target.addEventListener(
            targetsClickMode ? "click" : "mouseenter",
            (): void => {
                randomPositionMaker(target);
                updatePointValue(true);
                console.log("Good Boom");

                if (targetsClickMode) {
                    hitClicks += 2;
                    numberOfClicks++;
                    calculateAccuracy();
                    playSounds(3);
                }
            }
        );
    });

    bombs.forEach((target: HTMLElement) => {
        randomPositionMaker(target);

        target.style.width = `${bombsSize}px`;
        target.style.height = `${bombsSize}px`;

        if (bombsCanMove) {
            setInterval(() => {
                randomPositionMaker(target);
            }, movementSpeed - Math.trunc((Math.random() * movementSpeed) / 4));
        }

        target.addEventListener(
            bombsClickMode ? "click" : "mouseenter",
            (): void => {
                randomPositionMaker(target);
                updatePointValue(false);
                console.log("Bad Boom");
                playSounds(4);
            }
        );
    });
    setStarCheckers();
};

applySetting();

const volumeIcon: HTMLElement | null = document.querySelector(
    ".volume-indicator"
) as HTMLElement;
const volumeInput: HTMLInputElement | null = document.querySelector(
    ".volume-input"
) as HTMLInputElement;

volumeInput.addEventListener("input", (): void => {
    const volumeValue = +volumeInput.value;

    if (volumeValue) {
        volumeIcon.style.background = `
            url("../Imgs/volume-icons/volume-icon-${
                Math.trunc(volumeValue / (100 / 3)) + 1
            }.png") 
            center no-repeat, rgba(46, 57, 101, 0.8)
        `;
    } else {
        volumeIcon.style.background = `
            url("../Imgs/volume-icons/volume-icon-0.png") 
            center no-repeat, rgba(46, 57, 101, 0.8)
        `;
    }
    volumeIcon.style.backgroundSize = "35px";

    gameVolume = volumeValue / 200;

    console.log(gameVolume);
});
