let points: number = 0;
let hitClicks: number = 0;
let numberOfClicks: number = 0;
let timerDuration: number = 10; // Default is 10
let maxTimeCounter: number = timerDuration;
let TimeInterval: number | undefined = 0;
let gameVolume: number = 0.4;
let darkMode: boolean = true;
let accuracyPercentage: number = 100;
let pointPerSec: number = 0;

const gameTargets: HTMLElement | null = document.querySelector(".game-targets");

gameTargets?.addEventListener("click", (): void => {
    numberOfClicks++;
    calculateAccuracy();
    playSounds(2);

    gameTargets.style.cursor = `url("./Imgs/cursor-icons/custom-cursor-white.png"), auto`;

    setTimeout(() => {
        gameTargets.style.cursor = `url("./Imgs/cursor-icons/custom-cursor-black.png"), auto`;
    }, 200);
});

const playSounds = (soundNumber: number) => {
    const gunLoading = new Audio("./Sounds/gun-loading.aac");
    const gunMiss = new Audio("./Sounds/gun-shot-miss.aac");
    const gunHit = new Audio("./Sounds/gun-shot-hit.aac");
    const bombExplode = new Audio("./Sounds/bomb-explode.aac");
    const endScreen = new Audio("./Sounds/end-screen.aac");

    gunLoading.volume = gameVolume;
    gunMiss.volume = gameVolume;
    gunHit.volume = gameVolume;
    bombExplode.volume = gameVolume;
    endScreen.volume = gameVolume;

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
        case 5:
            endScreen.play();
            break;
        default:
            break;
    }
};
