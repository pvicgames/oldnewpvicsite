// Função principal.
$(document).ready(function () {
    // Importar Navbar mobile.
    $("#navbar-mobile").load("parts/navbar_mobile.html");

    const fadeOverlay = $('#fadeOverlay');
    setTimeout(() => {
        fadeOverlay.css('opacity', '0'); // Start fading out after delay
        setTimeout(() => fadeOverlay.hide(), 500); // Hide after fade-out completes
    }, 200); // Add a slight delay
});