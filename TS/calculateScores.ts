const pointValue: HTMLElement | null = document.querySelector(".point-value");
const accuracyValue: HTMLElement | null =
    document.querySelector(".accuracy-value");

const timer: HTMLElement | null = document.querySelector(".timer-section");

const timerNumHelper = (timeNumber: number, fillerChar: string): string => {
    return String(Math.trunc(timeNumber)).padStart(2, fillerChar);
};

const updateTimer = (): void => {
    if (timer) {
        const minValue: string = timerNumHelper(maxTimeCounter / 60, " ");
        const secValue: string = timerNumHelper(maxTimeCounter % 60, "0");
        timer.textContent = `${minValue}:${secValue}`;

        if (!maxTimeCounter--) {
            clearInterval(TimeInterval);
            showEndScreen();
            playSounds(5); // Super Ominous Sound! i love it!!!

            setTimeout(() => {
                addChartJS();
            }, 650);
        }
    }
};

const calculateAccuracy = () => {
    accuracyPercentage = +((hitClicks / numberOfClicks) * 100).toFixed(0);
    if (!targetsClickMode) {
        accuracyPercentage = +(accuracyPercentage / 2).toFixed(0);
    }
    if (accuracyValue) {
        accuracyValue.textContent = accuracyPercentage.toString();
    }
};

const updatePointValue = (addToPoints: boolean): void => {
    addToPoints ? points++ : (points -= 5);

    if (pointValue) {
        pointValue.textContent = String(points);
    }
};
