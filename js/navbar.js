function addNavButton(icon, text, link) {
    //const currentPage = window.location.pathname.replace(/\//g, '');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'

    // NAVBAR DESKTOP
    const $navbarDesktop = $('.navbar-desktop');

    const isActive = (currentPage === link) || (currentPage === '' && link === 'index.html');
    const buttonClass = isActive ? 'nav-button-active' : 'nav-button';

    const $newButton  = $('<div>', { class: buttonClass });
    const $buttonLink = $('<a>', { href: link, text: `${icon} ${text}` });

    $newButton.append($buttonLink);
    $navbarDesktop.append($newButton);

    // ---------------------------------------------------------------------------------- //

    // NAVBAR MOBILE
    const $navList = $('.navbar-nav'); // Selecionar UL dentro da navbar

    const $navItem = $('<li>', { class: 'nav-item ms-2 animated' }); // Criar LI
    const $navLink = $('<a>', {
        class: `nav-link`,
        href: link,
        html: `${icon} ${text}`
    });

    $navItem.append($navLink); // Adicionar o link ao item
    $navList.append($navItem); // Adicionar o item à lista
}

// Adicionar links na navbar.
addNavButton('🏠', 'Home',    'index.html');
addNavButton('🕹️', 'Games',   'games.html');
addNavButton('🖼️', 'Gallery', 'gallery.html');
addNavButton('👤', 'Members', 'members.html');
addNavButton('☎️', 'Contact', 'contact.html');