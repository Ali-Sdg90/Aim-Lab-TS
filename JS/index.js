"use strict";
let points = 0;
const pointValue = document.querySelector(".point-value");
const updatePointValue = (addToPoints) => {
    if (addToPoints) {
        points++;
    }
    else {
        points -= 10;
    }
    if (pointValue) {
        pointValue.textContent = String(points);
    }
};
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
const targets = document.querySelectorAll(".game-target");
const randomNumberMaker = () => {
    return Math.trunc(Math.random() * 100);
};
const randomPositionMaker = (target) => {
    target.style.top = `${randomNumberMaker()}%`;
    target.style.left = `${randomNumberMaker()}%`;
};
targets.forEach((target) => {
    randomPositionMaker(target);
    target.addEventListener("mouseenter", () => {
        randomPositionMaker(target);
        updatePointValue(true);
        console.log("boom");
    });
});
//# sourceMappingURL=index.js.map