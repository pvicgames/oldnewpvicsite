let navText
if (userPreferredLanguage == 'en') {
    navText = "./parts/lang_en.json";
} else if (userPreferredLanguage == 'pt') {
    navText = "./parts/lang_pt.json";
}

function getCurrentPage() {
    const currPage = window.location.pathname.split('/').pop() || 'index.html'
    return currPage
}

// NAVBAR DESKTOP
const $navbarDesktop = $('.navbar-desktop');

function addNavButton(icon, text, link, target_type) {
    const currentPage = getCurrentPage();

    $.getJSON(navText, (data, textStatus, jqXHR) => {
        const isActive = (currentPage === link) || (currentPage === '' && link === 'index.html');
        const buttonClass = isActive ? 'nav-button-active' : 'nav-button';

        const $newButton = $('<div>', { class: buttonClass });
        const $buttonLink = $('<a>', { href: link, text: `${icon} ${data.navbar[text]}` });

        $newButton.append($buttonLink);
        $navbarDesktop.append($newButton);

        // Add fade-to-white effect on click
        $buttonLink.on('click', function (e) {
            e.preventDefault(); // Prevent default navigation in all cases

            const fadeOverlay = $('#fadeOverlay');
            fadeOverlay.show(); // Ensure the overlay is visible
            fadeOverlay.css('opacity', '1'); // Trigger fade-in effect

            if (target_type === '_blank') {
                // Open in a new tab immediately
                window.open(link, '_blank');

                // After the fade effect completes, navigate in the current tab
                setTimeout(() => {
                    window.location.href = ''; // Clear the current tab (optional, just to be safe)
                }, 500); // Match the CSS transition duration
            } else {
                // For same-tab navigation, just wait for the fade effect before navigating
                setTimeout(() => {
                    window.location.href = link; // Navigate in the same tab
                }, 500); // Match the CSS transition duration
            }
        });
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
        e.preventDefault(); // Prevent default navigation in all cases

        const fadeOverlay = $('#fadeOverlay');
        fadeOverlay.show(); // Ensure the overlay is visible
        fadeOverlay.css('opacity', '1'); // Trigger fade-in effect

        if (target_type === '_blank') {
            // Open in a new tab immediately
            window.open(link, '_blank');

            // After the fade effect completes, navigate in the current tab
            setTimeout(() => {
                window.location.href = ''; // Clear the current tab (optional, just to be safe)
            }, 500); // Match the CSS transition duration
        } else {
            // For same-tab navigation, just wait for the fade effect before navigating
            setTimeout(() => {
                window.location.href = link; // Navigate in the same tab
            }, 500); // Match the CSS transition duration
        }
    });

    $navItem.append($navLink); // Adicionar o link ao item
    $navList.append($navItem); // Adicionar o item à lista

    // ---------------------------------------------------------------------------------- //
}

function createLanguageSelector() {
    const $languageSelector = $('<div>', { class: 'order-3 p-2 d-flex align-items-end ms-auto' })
        .append(
            $('<a>', {
                href: '#',
                text: '[english]',
                click: function () { changeLanguage('en'); }
            }),
            ' / ',
            $('<a>', {
                href: '#',
                text: '[portuguese]',
                click: function () { changeLanguage('pt'); }
            })
        );

    $navbarDesktop.append($languageSelector);
}

createLanguageSelector()

// Adicionar links na navbar.
function createLinks() {
    const buttons = [
        { icon: '🏠', label: 'home',    href: 'index.html', target: '' },
        //{ icon: '🕹️', label: 'games',   href: 'games.html', target: '' },
        //{ icon: '🖼️', label: 'gallery', href: 'https://www.instagram.com/pvicvg/', target: '_blank' },
        { icon: '💭', label: 'about',   href: 'about.html', target: '' },
        { icon: '☎️', label: 'contact', href: 'contact.html', target: '' }
    ];

    buttons.forEach(button => {
        addNavButton(button.icon, button.label, button.href, button.target);
    });
}