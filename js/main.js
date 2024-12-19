// Função helper para carregar scripts de forma dinâmica
function loadScript(src) {
    return new Promise((resolve, reject) => {
        $.getScript(src)
            .done(() => resolve())
            .fail((jqxhr, settings, exception) => reject(exception));
    });
}

// Carregar scripts.
async function loadScripts() {
    try {
        await loadScript("js/misc.js");     
        await loadScript("js/navbar.js"); 
        await loadScript("js/typewriter.js");
        console.log("All scripts loaded successfully!");
    } catch (err) {
        console.error("Error loading scripts:", err);
    }
}

// Função principal.
$(document).ready(function () {
    loadScripts();

    // Importar Navbar mobile.
    $("#navbar-mobile").load("parts/navbar_mobile.html");

     // Ensure the fadeOverlay fades out on page load
     const fadeOverlay = $('#fadeOverlay');
     fadeOverlay.css('opacity', '0'); // Fade out the overlay
     setTimeout(() => fadeOverlay.hide(), 500); // Hide it after the animation ends
});