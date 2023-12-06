"use strict";
let points = 0;
let hitClicks = 0;
let numberOfClicks = 0;
let timerDuration = 10;
let maxTimeCounter = timerDuration;
let TimeInterval = 0;
let gameVolume = 0.4;
let darkMode = true;
let accuracyPercentage = 100;
let pointPerSec = 0;
const gameTargets = document.querySelector(".game-targets");
gameTargets?.addEventListener("click", () => {
    numberOfClicks++;
    calculateAccuracy();
    playSounds(2);
    gameTargets.style.cursor = `url("./Imgs/cursor-icons/custom-cursor-white.png"), auto`;
    setTimeout(() => {
        gameTargets.style.cursor = `url("./Imgs/cursor-icons/custom-cursor-black.png"), auto`;
    }, 200);
});
const playSounds = (soundNumber) => {
    const gunLoading = new Audio("./Sounds/gun-loading.aac");
    const gunMiss = new Audio("./Sounds/gun-shot-miss.aac");
    const gunHit = new Audio("./Sounds/gun-shot-hit.aac");
    const bombExplode = new Audio("./Sounds/bomb-explode.aac");
    gunLoading.volume = gameVolume;
    gunMiss.volume = gameVolume;
    gunHit.volume = gameVolume;
    bombExplode.volume = gameVolume;
    switch (soundNumber) {
        case 1:
            gunLoading.play();
            break;
        case 2:
            gunMiss.play();
            break;
        case 3:
            gunHit.play();
            break;
        case 4:
            bombExplode.play();
            break;
        default:
            break;
    }
};
//# sourceMappingURL=index.js.map