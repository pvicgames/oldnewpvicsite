// Helper function to dynamically load scripts
function loadScript(src) {
    $.getScript(src)
        .done()
        .fail(function (jqxhr, settings, exception) {
            console.error(`Failed to load script: ${src}`);
        });
}

// Carregar scripts.
$(document).ready(function () {
    loadScript("js/misc.js");

    loadScript("js/typewriter.js"); // Máquina de escrever

    // Navbar.
    $("#navbar-mobile").load("parts/navbar_mobile.html");
    loadScript("js/navbar.js");
});