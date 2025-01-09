// DOM Elements
const gamesPrincipal = $('#games-principal');
const gameLogo = $('#game-logo');
const gameHero = $('#game-hero');
const descSection = $('#desc-section');
const pic1 = $('#pic-1');
const pic2 = $('#pic-2');
const pic3 = $('#pic-3');
const desc = $('#desc');
const steamBadge = $('#steam-badge');
const arrowRight = $('#arrow-right');
const arrowLeft  = $('#arrow-left');

// Variables
let currentGame = 0;
let numberOfGames;
const gamesText = "./parts/games_en.json";
let inTransition = false;

// Animations
const animations = {
    fadeIn: {
        logo: "animate__animated animate__backInDown",
        hero: "animate__animated animate__bounceInLeft hero-anim",
        desc: "animate__animated animate__fadeIn",
    },
    fadeOut: "animate__animated animate__fadeOut",
};

// Helper functions
function loadGameData(jsonText, callback) {
    $.getJSON(jsonText, (data) => {
        numberOfGames = data.length - 1;
        callback(data[currentGame]);
    });
}

function applyGameData(gameData) {
    gameLogo.attr("src", gameData.logo);
    gameHero.attr("src", gameData.hero);
    pic1.css("background-image", `url(${gameData.pic1})`);
    pic2.css("background-image", `url(${gameData.pic2})`);
    pic3.css("background-image", `url(${gameData.pic3})`);
    desc.text(gameData.desc);
}

function toggleArrows() {
    arrowLeft.toggleClass('hidden', currentGame <= 0);
    arrowRight.toggleClass('hidden', currentGame >= numberOfGames);
}

function handleAnimationEnd(elements, callback) {
    let completed = 0;
    const total = elements.length;

    elements.forEach((element) => {
        element.one('animationend', () => {
            element.removeClass(Object.values(animations.fadeIn).join(' '));
            if (++completed === total) callback();
        });
    });
}

// Main functions
function updateGame(jsonText, step) {
    if (inTransition) return;
    inTransition = true;

    gamesPrincipal.addClass(animations.fadeOut);

    gamesPrincipal.one('animationend', () => {
        currentGame += step;

        arrowLeft.addClass('hidden')
        arrowRight.addClass('hidden')
        arrowLeft.removeClass(animations.fadeIn.desc)         
        arrowRight.removeClass(animations.fadeIn.desc)

        gamesPrincipal.addClass('hidden');
        gamesPrincipal.removeClass(animations.fadeOut);

        loadGameData(jsonText, (gameData) => {
            applyGameData(gameData);

            const animatedElements = [
                gameLogo.addClass(animations.fadeIn.logo),
                gameHero.addClass(animations.fadeIn.hero),
                descSection.addClass(animations.fadeIn.desc),
            ];

            gameLogo.one('animationstart', () => {
                gamesPrincipal.removeClass('hidden');
            })
            
            handleAnimationEnd(animatedElements, () => {
                arrowLeft.removeClass('hidden')         
                arrowRight.removeClass('hidden')       

                arrowLeft.addClass(animations.fadeIn.desc)
                arrowRight.addClass(animations.fadeIn.desc)

                toggleArrows();

                arrowLeft.one('animationend', () => {
                    inTransition = false;
                })
            });
        });
    });
}

function fadeInGame(jsonText) {
    if (inTransition) return;
    inTransition = true;

    loadGameData(jsonText, (gameData) => {
        applyGameData(gameData);

        const animatedElements = [
            gameLogo.addClass(animations.fadeIn.logo),
            gameHero.addClass(animations.fadeIn.hero),
            descSection.addClass(animations.fadeIn.desc),
        ];

        toggleArrows();
        handleAnimationEnd(animatedElements, () => {
            inTransition = false;
        });
    });
}

// Event Listeners
arrowRight.on('click', () => {
    if (!inTransition && currentGame < numberOfGames) {
        updateGame(gamesText, 1);
    }
});

arrowLeft.on('click', () => {
    if (!inTransition && currentGame > 0) {
        updateGame(gamesText, -1);
    }
});

window.addEventListener('keydown', (e) => {
    if (inTransition) return;

    if (e.code === "ArrowRight" && currentGame < numberOfGames) {
        updateGame(gamesText, 1);
    } else if (e.code === "ArrowLeft" && currentGame > 0) {
        updateGame(gamesText, -1);
    }
});

// Initialize
fadeInGame(gamesText);
