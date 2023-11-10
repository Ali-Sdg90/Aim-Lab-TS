// index.ts --------------------------------------------------
let points: number = 0;
let accuracy: number = 100;

const pointValue: HTMLElement | null = document.querySelector(".point-value");
const accuracyValue: HTMLElement | null =
    document.querySelector(".accuracy-value");

const loseAccuracy = (): void => {
    accuracy -= 10;
    if (accuracyValue) {
        accuracyValue.textContent = String(accuracy);
    }
};

const updatePointValue = (addToPoints: boolean): void => {
    if (addToPoints) {
        points++;
    } else {
        loseAccuracy();
        points -= 5;
    }

    if (pointValue) {
        pointValue.textContent = String(points);
    }
};

const reloadBtn: HTMLElement | null = document.querySelector(".reload-btn");

let rotateDeg: number = 0;

if (reloadBtn) {
    reloadBtn.addEventListener("click", (): void => {
        reloadBtn.style.transform = `rotate(${(rotateDeg += 360)}deg)`;
        console.log("l");

        setTimeout(() => {
            location.reload();
        }, 500);
    });
}

const settingBtn: HTMLElement | null = document.querySelector(".setting-btn");
const settingPage: HTMLElement | null = document.querySelector(".setting-page");

let settingClicked = 0;

if (settingBtn && settingPage) {
    settingBtn.addEventListener("click", function () {
        if (settingClicked++ % 2 == 0) {
            settingPage.style.transition = "opacity 0.3s";
            settingPage.style.display = "grid";

            setTimeout(() => {
                settingPage.style.opacity = "1";
            }, 0);
        } else {
            setTimeout(() => {
                settingPage.style.display = "none";
            }, 300);

            settingPage.style.opacity = "0";
        }
        settingBtn.style.transform = `rotate(${settingClicked * 90}deg)`;
    });
}

// Timer.ts --------------------------------------------------

let maxTimeCounter: number = 5;

const timer: HTMLElement | null = document.querySelector(".timer-section");

const timerNumHelper = (timeNumber: number, fillerChar: string): string => {
    return String(Math.trunc(timeNumber)).padStart(2, fillerChar);
};

let TimeInterval: number = 0;

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
updateTimer();

if (timer) {
    TimeInterval = setInterval(() => {
        updateTimer();
    }, 1000);
}

// target.ts ----------------------------------------------------

// setting.ts ---------------------------------------------------

const gameTargets: HTMLElement | null = document.querySelector(".game-targets");

let NoTargets: number = 4;
let NoBombs: number = 2;
let targetsCanMove: boolean = false;
let bombsCanMove: boolean = true;
let timerDuration: number = 60;
let movementSpeed: number = 2000;
let alwaysReady: boolean = false;

let validInputsArray: boolean[] = [true, true, true, true];

const NoTargets_MinMax: number[] = [1, 200];
const NoBombs_MinMax: number[] = [0, 200];
const timerDuration_MinMax: number[] = [5, 3000];
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
const alwaysReadyInput: HTMLInputElement | null = document.getElementById(
    "always-ready"
) as HTMLInputElement;

const applyBtn: HTMLElement | null = document.querySelector(".apply-btn");

NoTargetsInput.value = String(NoTargets);
NoBombsInput.value = String(NoBombs);
targetsCanMoveInput.checked = targetsCanMove;
bombsCanMoveInput.checked = bombsCanMove;
timerDurationInput.value = String(timerDuration);
movementSpeedInput.value = String(movementSpeed);
alwaysReadyInput.checked = alwaysReady;

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
const alwaysReadyStar: HTMLElement | null = document.querySelector(
    ".always-ready-star"
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
    InputStarChecker(alwaysReadyInput, alwaysReady, alwaysReadyStar);
};

applyBtn?.addEventListener("click", () => {
    let allowApply: boolean = true;

    for (let i: number = 0; i < 3; i++) {
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
    } else {
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

        for (let i: number = 0; i < +NoTargetsInput.value; i++) {
            gameTargets.innerHTML += `<div class="game-target"></div>`;
        }
        for (let i: number = 0; i < +NoBombsInput.value; i++) {
            gameTargets.innerHTML += `<div class="bad-target"></div>`;
        }
    }

    const targets: NodeListOf<HTMLElement> =
        document.querySelectorAll(".game-target");
    const badTargets: NodeListOf<HTMLElement> =
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

        if (targetsCanMove) {
            setInterval(() => {
                randomPositionMaker(target);
            }, movementSpeed - Math.trunc((Math.random() * movementSpeed) / 4));
        }

        target.addEventListener("click", (): void => {
            randomPositionMaker(target);
            updatePointValue(true);
            console.log("Good Boom");
        });
    });

    badTargets.forEach((target: HTMLElement) => {
        randomPositionMaker(target);

        if (bombsCanMove) {
            setInterval(() => {
                randomPositionMaker(target);
            }, movementSpeed - Math.trunc((Math.random() * movementSpeed) / 4));
        }

        target.addEventListener("mouseenter", (): void => {
            randomPositionMaker(target);
            updatePointValue(false);
            console.log("Bad Boom");
        });
    });
    setStarCheckers();
};

applySetting();
