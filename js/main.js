// Função helper para carregar scripts de forma dinâmica
function loadScript(src) {
    return new Promise((resolve, reject) => {
        $.getScript(src)
            .done(() => resolve())
            .fail((jqxhr, settings, exception) => reject(exception));
    });
}

// Função principal.
$(document).ready(function () {
    // Importar Navbar mobile.
    $("#navbar-mobile").load("parts/navbar_mobile.html", function(){ createLinks() });

    // Ensure the fadeOverlay fades out on page load
    const fadeOverlay = $('#fadeOverlay');
    fadeOverlay.css('opacity', '0'); // Fade out the overlay
    setTimeout(() => fadeOverlay.hide(), 500); // Hide it after the animation ends
});