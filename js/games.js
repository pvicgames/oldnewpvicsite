const gamesPrincipal = $('#games-principal')

const gameLogo = $('#game-logo');
const gameHero = $('#game-hero');

const descSection = $('#desc-section');

const pic1 = $('#pic-1');
const pic2 = $('#pic-2');
const pic3 = $('#pic-3');

const desc = $('#desc');
const steamBadge = $('#steam-badge');

let currentGame = 0
let numberOfGames
let gamesText = "./parts/games_en.json"

let arrowRight = $('#arrow-right')
let arrowLeft = $('#arrow-left')

/* --------------------------------------------------- */

/* Animations */
let inTransition = false;

const animations = {
    fade_in: {
        logo: "animate__animated animate__backInDown",
        hero: "animate__animated animate__bounceInLeft hero-anim",
        desc: "animate__animated animate__fadeIn"
    },
    
    fade_out: "animate__animated animate__fadeOut"
}

function updateGame(jsonText, add) {
    inTransition = true;

    // Iniciar animações.
    gamesPrincipal.addClass(animations.fade_out);    

    gamesPrincipal.one('animationend', function() {
        gamesPrincipal.removeClass(animations.fade_out)
        
        currentGame += add;

        $.getJSON(jsonText, (data, textStatus, jqXHR) => {
            let selectedGame = data[currentGame];
    
            gameLogo.attr("src", selectedGame.logo)
            gameHero.attr("src", selectedGame.hero)
    
            pic1.css("background-image", `url(${selectedGame.pic1})`);
            pic2.css("background-image", `url(${selectedGame.pic2})`);
            pic3.css("background-image", `url(${selectedGame.pic3})`);
    
            desc.text(selectedGame.desc);
        });

        // Iniciar animações.
        gameLogo.addClass(animations.fade_in.logo);
        gameHero.addClass(animations.fade_in.hero);
        descSection.addClass(animations.fade_in.desc);

        arrowLeft.addClass('hidden');
        arrowRight.addClass('hidden');
        
        // Finalizar animações.
        gameHero.one('animationend', function() {
            gameLogo.removeClass(animations.fade_in.logo);
            gameHero.removeClass(animations.fade_in.hero);
            descSection.removeClass(animations.fade_in.desc);

            if (currentGame > 0) {
                arrowLeft.removeClass("hidden")
                arrowLeft.addClass(animations.fade_in.desc)
                arrowLeft.one('animationend', () => {
                    arrowLeft.removeClass(animations.fade_in.desc)
                })
            }

            if (currentGame < numberOfGames) {
                arrowRight.removeClass("hidden")
                arrowRight.addClass(animations.fade_in.desc)
                arrowRight.one('animationend', () => {
                    arrowRight.removeClass(animations.fade_in.desc)
                })
            }
            

            inTransition = false;
        });  
    })
}

function fadeInGame(jsonText) {
    inTransition = true;

    $.getJSON(jsonText, (data, textStatus, jqXHR) => {
        let selectedGame = data[currentGame];
        numberOfGames = data.length - 1;

        gameLogo.attr("src", selectedGame.logo)
        gameHero.attr("src", selectedGame.hero)

        pic1.css("background-image", `url(${selectedGame.pic1})`);
        pic2.css("background-image", `url(${selectedGame.pic2})`);
        pic3.css("background-image", `url(${selectedGame.pic3})`);

    desc.text(selectedGame.desc);
    });

    // Iniciar animações.
    gameLogo.addClass(animations.fade_in.logo);
    gameHero.addClass(animations.fade_in.hero);
    descSection.addClass(animations.fade_in.desc);

    arrowLeft.addClass('hidden');
    arrowRight.addClass('hidden');
    
    // Finalizar animações.
    gameHero.one('animationend', function() {
        gameLogo.removeClass(animations.fade_in.logo);
        gameHero.removeClass(animations.fade_in.hero);
        descSection.removeClass(animations.fade_in.desc);

        if (currentGame > 0) {
            arrowLeft.removeClass("hidden")
            arrowLeft.addClass(animations.fade_in.desc)
            arrowLeft.one('animationend', () => {
                arrowLeft.removeClass(animations.fade_in.desc)
            })
        }

        if (currentGame < numberOfGames) {
            arrowRight.removeClass("hidden")
            arrowRight.addClass(animations.fade_in.desc)
            arrowRight.one('animationend', () => {
                arrowRight.removeClass(animations.fade_in.desc)
            })
        }

        inTransition = false;
    });
}

arrowRight.on('click', () => {
    if (!inTransition) {
        if (currentGame < numberOfGames) {
            updateGame(gamesText, 1);
        }
    }
})

arrowLeft.on('click', () => {
    if (!inTransition) {
        if (currentGame > 0) {
            updateGame(gamesText, -1);
        }
    }
})

window.addEventListener('keydown', (e) => {
    if (!inTransition) {
        switch (e.code) {
            case "ArrowRight":
                if (currentGame < numberOfGames) {
                    updateGame(gamesText, 1);
                }
                break;
            
            case "ArrowLeft":
                if (currentGame > 0) {
                    updateGame(gamesText, -1);
                }
                break;
        
            default:
                break;
        }
    }
})

fadeInGame(gamesText)