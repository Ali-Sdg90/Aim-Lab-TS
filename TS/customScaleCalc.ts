/**
 * Interface for scaling calculations.
 */
interface IScaleCalculator {
    calculateScale(pageWidth: number, pageHeight: number): number;
}

/**
 * Class for scaling calculations.
 */
class ScaleCalculator implements IScaleCalculator {
    calculateScale(pageWidth: number, pageHeight: number): number {
        return 1 - ((pageHeight / pageWidth) * 0.5) / (900 / 477);
    }
}

/**
 * Function to apply custom scaling to the page.
 * @param customScaleDiv - The element to apply scaling to.
 * @param scaleWarning - The element to display scale warnings.
 */
const applyCustomScale = (
    customScaleDiv: HTMLElement,
    scaleWarning: HTMLElement
): void => {
    const pageWidth = customScaleDiv.scrollWidth;
    const pageHeight = customScaleDiv.scrollHeight;

    if (pageHeight > pageWidth) {
        console.log(">>", pageHeight);
        customScaleDiv.classList.add("custom-scale-calc");

        const scaleCalculator = new ScaleCalculator();
        const scale = scaleCalculator.calculateScale(pageWidth, pageHeight);

        if (pageHeight > 685) {
            console.log("Mobile View");
            customScaleDiv.style.transform = `scale(${scale}) rotate(90deg) translate(-50%, -53%)`;
        } else {
            console.log("Small Mobile View");
            customScaleDiv.style.height = "183vw";
            customScaleDiv.style.transform = `scale(${scale}) rotate(90deg) translate(-50%, -50%)`;
            scaleWarning.textContent =
                "Your device is too small (height less than 685px), and my custom scale may not adjust itself properly to your device size. You may experience some inconsistencies in the UI.";
        }
    }
};

// Select the custom scale div and scale warning elements
const customScaleDiv = document.querySelector(
    ".custom-scale-div"
) as HTMLElement;
const scaleWarning = document.querySelector(".scale-warning") as HTMLElement;

// Apply custom scaling to the page
applyCustomScale(customScaleDiv, scaleWarning);
