"use strict";
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
            showEndScreen();
        }
    }
};
const calculateAccuracy = () => {
    accuracyPercentage = +((hitClicks / numberOfClicks) * 100).toFixed(0);
    if (accuracyValue && targetsClickMode) {
        accuracyValue.textContent = accuracyPercentage.toString();
    }
};
const updatePointValue = (addToPoints) => {
    addToPoints ? points++ : (points -= 5);
    if (pointValue) {
        pointValue.textContent = String(points);
    }
};
//# sourceMappingURL=calculateScores.js.map