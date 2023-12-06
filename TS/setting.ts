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

        if (!+input.value) {
            input.value = "0";
        }

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
        settingBtn?.click();
        startGameCounter();

        if (settingBtn && reloadBtn) {
            settingBtn.style.zIndex = "7";
            reloadBtn.style.zIndex = "7";
        }
    } else {
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

                hitClicks += 2;
                numberOfClicks++;
                calculateAccuracy();

                playSounds(3);
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
if (gameTargets) {
    gameTargets.innerHTML = "";
}
