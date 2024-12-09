function addNavButton(icon, text, link) {
    currentPage = window.location.pathname.replace(/\//g, '');

    // NAVBAR DESKTOP
    const navbarDesktop = document.querySelector('.navebar-desktop');

    const newButton = document.createElement('div'); // Criar div pro botão
    newButton.classList.add('nav-button');
    currentPage === link && newButton.classList.add('nav-button-active'); // Tornar botão ativo

    const buttonLink = document.createElement('a');  // Criar link
    buttonLink.href = link;
    buttonLink.textContent = `${icon} ${text}`;
    newButton.appendChild(buttonLink);

    navbarDesktop.appendChild(newButton);            // Adicionar botão na navbar desktop

    // ---------------------------------------------------------------------------------- //

    // NAVBAR MOBILE
    const navbarMobile = document.querySelector('.navbar'); // Obter div da navbar
    const navList = document.querySelector('.navbar-nav');  // Obter lista dentro da navbar

    const navItem = document.createElement('li'); // Criar item dentro da lista
    navItem.classList.add('nav-item', 'ms-2');
    navItem.classList.add('animated');

    const navLink = document.createElement('a');  // Criar link
    navLink.classList.add('nav-link'); 
    navLink.href = link;
    navLink.innerHTML = `${icon} ${text}`;
    currentPage === link && navLink.classList.add('active'); // Tornar botão ativo

    navItem.appendChild(navLink); // Adicionar na navbar.
    navList.appendChild(navItem);
}

console.log()

// Adicionar links na navbar.
addNavButton('🏠', 'Home',    'index.html');
addNavButton('🕹️', 'Games',   'games.html');
addNavButton('🖼️', 'Gallery', 'gallery.html');
addNavButton('🫂', 'Members', 'members.html');
addNavButton('☎️', 'Contact', 'contact.html');