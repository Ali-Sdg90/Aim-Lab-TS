const customScaleDiv = document.querySelector(
    ".custom-scale-div"
) as HTMLElement;
const scaleWarning = document.querySelector(".scale-warning") as HTMLElement;

const pageWidth = customScaleDiv.scrollWidth;
const pageHeight = customScaleDiv.scrollHeight;

if (pageHeight > pageWidth) {
    console.log(">>", pageHeight);
    customScaleDiv.classList.add("custom-scale-calc");

    let scale = 0;
    scale = 1 - ((pageHeight / pageWidth) * 0.5) / (900 / 477);
    // console.log(scale);

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
