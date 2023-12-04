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
            console.log("End of the timer");
            clearInterval(TimeInterval);
            showEndScreen();
            addChartJS();
        }
    }
};

const calculateAccuracy = () => {
    accuracyPercentage = +((hitClicks / numberOfClicks) * 100).toFixed(0);
    if (accuracyValue && targetsClickMode) {
        accuracyValue.textContent = accuracyPercentage.toString();
    }
};

const updatePointValue = (addToPoints: boolean): void => {
    addToPoints ? points++ : (points -= 5);

    if (pointValue) {
        pointValue.textContent = String(points);
    }
};
