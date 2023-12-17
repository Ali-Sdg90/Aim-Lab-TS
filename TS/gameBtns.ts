const reloadBtn: HTMLElement | null = document.querySelector(".reload-btn");

let rotateDeg: number = 0;

if (reloadBtn) {
    reloadBtn.addEventListener("click", (): void => {
        reloadBtn.style.transform = `rotate(${(rotateDeg += 360)}deg)`;

        setTimeout(() => {
            blackFlash(true);

            setTimeout(() => {
                startGameCounter();
            }, 100);
        }, 500);
    });
}

const settingBtn: HTMLElement | null = document.querySelector(".setting-btn");
const settingPage: HTMLElement | null = document.querySelector(".setting-page");

let settingClicked = 0;

if (settingBtn && settingPage) {
    settingBtn.addEventListener("click", function () {
        if (settingClicked++ % 2 != 0) {
            settingPage.style.display = "grid";

            setTimeout(() => {
                settingPage.style.opacity = "1";
            }, 0);
        } else {
            settingPage.style.opacity = "0";

            setTimeout(() => {
                settingPage.style.display = "none";
            }, 300);
        }
        settingBtn.style.transform = `rotate(${settingClicked * 90}deg)`;
    });
}

const volumeIcon: HTMLElement | null = document.querySelector(
    ".volume-indicator"
) as HTMLElement;
const volumeInput: HTMLInputElement | null = document.querySelector(
    ".volume-input"
) as HTMLInputElement;

volumeInput.addEventListener("input", (): void => {
    const volumeValue = +volumeInput.value;

    // Calculate which volume icon shows
    if (volumeValue) {
        volumeIcon.style.background = `
            url("./Imgs/volume-icons/volume-icon-${
                Math.trunc(volumeValue / (100 / 3)) + 1
            }.png") 
            center no-repeat, rgba(46, 57, 101, 0.8)
        `;
    } else {
        volumeIcon.style.background = `
            url("./Imgs/volume-icons/volume-icon-0.png") 
            center no-repeat, rgba(46, 57, 101, 0.8)
        `;
    }
    volumeIcon.style.backgroundSize = "35px";

    gameVolume = volumeValue / 200;
});

// Sound volume example
volumeIcon.addEventListener("click", () => {
    playSounds(2);
});

const changeThemeBtn: HTMLElement | null =
    document.querySelector(".change-theme-btn");

const gameBackground: null | HTMLHtmlElement =
    document.querySelector(".game-section");

changeThemeBtn?.addEventListener("click", (): void => {
    if (gameBackground) {
        if (darkMode) {
            gameBackground.style.background = `
                url("./Imgs/game-backgrounds/game-background-light.png") 
                    center/cover no-repeat
                `;
        } else {
            gameBackground.style.background = `
                url("./Imgs/game-backgrounds/game-background-dark.png") 
                    center/cover no-repeat
                `;
        }

        changeThemeBtn.classList.toggle("lightToDarkClass"); // present at start
        changeThemeBtn.classList.toggle("darkToLightClass");

        darkMode = !darkMode;

        blackFlash(false);
    }
});

// Toggle "lightToDarkClass" and "darkToLightClass" in changeThemeBtn
changeThemeBtn?.addEventListener("mouseenter", () => {
    if (gameBackground) {
        changeThemeBtn.classList.toggle("lightToDarkClass"); // present at start
        changeThemeBtn.classList.toggle("darkToLightClass");
    }
});

changeThemeBtn?.addEventListener("mouseleave", () => {
    if (gameBackground) {
        changeThemeBtn.classList.toggle("darkToLightClass");
        changeThemeBtn.classList.toggle("lightToDarkClass"); // present at start
    }
});
