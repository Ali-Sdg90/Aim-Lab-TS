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
        points -= 10;
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
    target.addEventListener("mouseenter", (): void => {
        randomPositionMaker(target);
        updatePointValue(true);
        console.log("boom");
    });
});

badTargets.forEach((target: HTMLElement) => {
    randomPositionMaker(target);

    setInterval(() => {
        randomPositionMaker(target);
    }, 2000 - Math.trunc(Math.random() * 500));

    target.addEventListener("mouseenter", (): void => {
        randomPositionMaker(target);
        updatePointValue(false);
        console.log("boom");
    });
});

// setting.ts ---------------------------------------------------

const gameTargets: HTMLElement | null = document.querySelector("game-targets");

const NoTargets = document.getElementById("number-of-targets");
const NoBombs: HTMLElement | null = document.getElementById("number-of-bombs");
const bombsCanMove: HTMLElement | null =
    document.getElementById("bombs-can-move");
const targetsCanMove: HTMLElement | null =
    document.getElementById("targets-can-move");
const timerDuration: HTMLElement | null =
    document.getElementById("timer-duration");
const movementSpeed: HTMLElement | null =
    document.getElementById("movement-speed");
const alwaysReady: HTMLElement | null = document.getElementById("always-ready");

if (NoTargets && gameTargets) {
    const input = NoTargets as HTMLInputElement;

    for (let i: number = 0; i < +input.value; i++) {
        gameTargets.innerHTML += `<div class="game-target"></div>`;
    }
}
