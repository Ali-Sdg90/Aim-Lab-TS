// index.ts --------------------------------------------------
let points: number = 0;

const pointValue: HTMLElement | null = document.querySelector(".point-value");

const updatePointValue = (addToPoints: boolean): void => {
    if (addToPoints) {
        points++;
    } else {
        points -= 10;
    }
    
    if (pointValue) {
        pointValue.textContent = String(points);
    }
};

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
