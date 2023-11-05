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
    target.addEventListener("mouseenter", () => {
        randomPositionMaker(target);
        updatePointValue(true);
        console.log("boom");
    });
});
const element = document.documentElement;
element.requestFullscreen();
badTargets.forEach((target) => {
    randomPositionMaker(target);
    setInterval(() => {
        randomPositionMaker(target);
    }, 2000 - Math.trunc(Math.random() * 500));
    target.addEventListener("mouseenter", () => {
        randomPositionMaker(target);
        updatePointValue(false);
        console.log("boom");
    });
});
//# sourceMappingURL=index.js.map