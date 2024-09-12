/**
 * Updates the timer display and handles the end of the timer.
 */
const updateTimer = (): void => {
    if (timer) {
        const minValue: string = formatTime(maxTimeCounter / 60, " ");
        const secValue: string = formatTime(maxTimeCounter % 60, "0");
        timer.textContent = `${minValue}:${secValue}`;

        if (!maxTimeCounter--) {
            clearInterval(TimeInterval);
            showEndScreen();
            playSounds(5); // Super Ominous Sound! I love it!!!

            setTimeout(() => {
                addChartJS();
            }, 650);
        }
    }
};

/**
 * Formats a time value with a filler character.
 * @param timeNumber - The time value to format.
 * @param fillerChar - The character to use as filler.
 * @returns The formatted time value.
 */
const formatTime = (timeNumber: number, fillerChar: string): string => {
    return String(Math.trunc(timeNumber)).padStart(2, fillerChar);
};

/**
 * Calculates the accuracy percentage and updates the display.
 */
const calculateAccuracy = () => {
    accuracyPercentage = +((hitClicks / numberOfClicks) * 100).toFixed(0);
    if (!targetsClickMode) {
        // hover mode for targets
        accuracyPercentage = +(accuracyPercentage / 2).toFixed(0);
    }
    if (accuracyValue) {
        accuracyValue.textContent = accuracyPercentage.toString();
    }
};

/**
 * Updates the point value and updates the display.
 * @param addToPoints - Whether to add to the points or subtract.
 */
const updatePointValue = (addToPoints: boolean): void => {
    addToPoints ? points++ : (points -= 5);

    if (pointValue) {
        pointValue.textContent = String(points);
    }
};

// Select the point value element
const pointValue: HTMLElement | null = document.querySelector(".point-value");

// Select the accuracy value element
const accuracyValue: HTMLElement | null =
    document.querySelector(".accuracy-value");

// Select the timer element
const timer: HTMLElement | null = document.querySelector(".timer-section");
