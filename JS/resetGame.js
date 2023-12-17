"use strict";
const blackScreen = document.querySelector(".black-screen");
const resetTimer = () => {
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
const blackFlash = (resetUI) => {
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
    if (resetUI) {
        if (settingPage && endScreen && settingBtn) {
            settingPage.style.display = "none";
            settingClicked = 1;
            settingBtn.style.transform = `rotate(90deg)`;
            endScreen.style.display = "none";
        }
    }
};
blackFlash(false);
const gameCounter = document.querySelector(".game-counter");
let counterStartNumber = 4;
let gameTimerInterval;
const startGameCounter = () => {
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
            gameCounter.style.boxShadow = `inset 0 0 ${counterStartNumber * 25}px ${counterStartNumber * 5}px rgba(0, 30, 255, 0.5)`;
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
                resetTimer();
            }
        };
        updateCounter();
        gameTimerInterval = setInterval(updateCounter, 1000);
    }
};
//# sourceMappingURL=resetGame.js.map