"use strict";
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
//# sourceMappingURL=index.js.map