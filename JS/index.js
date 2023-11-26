"use strict";
let points;
let hitClicks;
let numberOfClicks;
let timerDuration = 20;
let maxTimeCounter = timerDuration;
let TimeInterval = 0;
let gameVolume = 0.4;
let darkMode = true;
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
//# sourceMappingURL=index.js.map