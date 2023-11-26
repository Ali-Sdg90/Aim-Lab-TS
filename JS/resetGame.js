"use strict";
const blackScreen = document.querySelector(".black-screen");
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
//# sourceMappingURL=resetGame.js.map