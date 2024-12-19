function getCurrentPage() {
    const currPage = window.location.pathname.split('/').pop() || 'index.html'
    return currPage
}

function addNavButton(icon, text, link) {
    const currentPage = getCurrentPage();

    // NAVBAR DESKTOP
    const $navbarDesktop = $('.navbar-desktop');

    const isActive = (currentPage === link) || (currentPage === '' && link === 'index.html');
    const buttonClass = isActive ? 'nav-button-active' : 'nav-button';

    const $newButton  = $('<div>', { class: buttonClass });
    const $buttonLink = $('<a>', { href: link, text: `${icon} ${text}` });

    $newButton.append($buttonLink);
    $navbarDesktop.append($newButton);

    // Add fade-to-white effect on click
    $buttonLink.on('click', function (e) {
        e.preventDefault(); // Prevent immediate navigation

        const fadeOverlay = $('#fadeOverlay');
        fadeOverlay.show(); // Ensure the overlay is visible
        fadeOverlay.css('opacity', '1'); // Trigger fade-in effect

        // Wait for the fade effect before navigating
        setTimeout(() => {
            window.location.href = link; // Navigate after fade
        }, 500); // Match the CSS transition duration
    });

    // ---------------------------------------------------------------------------------- //

    // NAVBAR MOBILE
    const $navList = $('.navbar-nav'); // Selecionar UL dentro da navbar

    const $navItem = $('<li>', { class: 'nav-item ms-2 animated' }); // Criar LI
    const $navLink = $('<a>', {
        class: `nav-link`,
        href: link,
        html: `${icon} ${text}`
    });

    // Add fade-to-white effect on click
    $navLink.on('click', function (e) {
        e.preventDefault(); // Prevent immediate navigation

        const fadeOverlay = $('#fadeOverlay');
        fadeOverlay.show(); // Ensure the overlay is visible
        fadeOverlay.css('opacity', '1'); // Trigger fade-in effect

        // Wait for the fade effect before navigating
        setTimeout(() => {
            window.location.href = link; // Navigate after fade
        }, 500); // Match the CSS transition duration
    });

    $navItem.append($navLink); // Adicionar o link ao item
    $navList.append($navItem); // Adicionar o item à lista

    // ---------------------------------------------------------------------------------- //
}

// Adicionar links na navbar.
function createLinks() {
    addNavButton('🏠', 'Home',    'index.html');
    addNavButton('🕹️', 'Games',   'games.html');
    addNavButton('🖼️', 'Gallery', 'gallery.html');
    addNavButton('👤', 'Members', 'members.html');
    addNavButton('☎️', 'Contact', 'contact.html');
}