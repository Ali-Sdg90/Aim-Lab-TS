"use strict";
const reloadBtn = document.querySelector(".reload-btn");
let rotateDeg = 0;
if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
        reloadBtn.style.transform = `rotate(${(rotateDeg += 360)}deg)`;
        setTimeout(() => {
            blackFlash(true);
            setTimeout(() => {
                startGameCounter();
            }, 100);
        }, 500);
    });
}
const settingBtn = document.querySelector(".setting-btn");
const settingPage = document.querySelector(".setting-page");
let settingClicked = 0;
if (settingBtn && settingPage) {
    settingBtn.addEventListener("click", function () {
        if (settingClicked++ % 2 != 0) {
            settingPage.style.display = "grid";
            setTimeout(() => {
                settingPage.style.opacity = "1";
            }, 0);
        }
        else {
            settingPage.style.opacity = "0";
            setTimeout(() => {
                settingPage.style.display = "none";
            }, 300);
        }
        settingBtn.style.transform = `rotate(${settingClicked * 90}deg)`;
    });
}
const volumeIcon = document.querySelector(".volume-indicator");
const volumeInput = document.querySelector(".volume-input");
volumeInput.addEventListener("input", () => {
    const volumeValue = +volumeInput.value;
    if (volumeValue) {
        volumeIcon.style.background = `
            url("./Imgs/volume-icons/volume-icon-${Math.trunc(volumeValue / (100 / 3)) + 1}.png") 
            center no-repeat, rgba(46, 57, 101, 0.8)
        `;
    }
    else {
        volumeIcon.style.background = `
            url("./Imgs/volume-icons/volume-icon-0.png") 
            center no-repeat, rgba(46, 57, 101, 0.8)
        `;
    }
    volumeIcon.style.backgroundSize = "35px";
    gameVolume = volumeValue / 200;
});
volumeIcon.addEventListener("click", () => {
    playSounds(2);
});
const changeThemeBtn = document.querySelector(".change-theme-btn");
const gameBackground = document.querySelector(".game-section");
changeThemeBtn?.addEventListener("click", () => {
    if (gameBackground) {
        if (darkMode) {
            gameBackground.style.background = `
                url("./Imgs/game-backgrounds/game-background-light.png") 
                    center/cover no-repeat
                `;
        }
        else {
            gameBackground.style.background = `
                url("./Imgs/game-backgrounds/game-background-dark.png") 
                    center/cover no-repeat
                `;
        }
        changeThemeBtn.classList.toggle("lightToDarkClass");
        changeThemeBtn.classList.toggle("darkToLightClass");
        darkMode = !darkMode;
        blackFlash(false);
    }
});
changeThemeBtn?.addEventListener("mouseenter", () => {
    if (gameBackground) {
        changeThemeBtn.classList.toggle("lightToDarkClass");
        changeThemeBtn.classList.toggle("darkToLightClass");
    }
});
changeThemeBtn?.addEventListener("mouseleave", () => {
    if (gameBackground) {
        changeThemeBtn.classList.toggle("darkToLightClass");
        changeThemeBtn.classList.toggle("lightToDarkClass");
    }
});
//# sourceMappingURL=gameBtns.js.map