// Função helper para carregar scripts de forma dinâmica
function loadScript(src) {
    return new Promise((resolve, reject) => {
        $.getScript(src)
            .done(() => resolve())
            .fail((jqxhr, settings, exception) => reject(exception));
    });
}

/* https://medium.com/@nohanabil/building-a-multilingual-static-website-a-step-by-step-guide-7af238cc8505 */
// Helper function to get a nested property from an object using a dot-separated path
function getNestedProperty(obj, keyPath) {
    return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedProperty(langData, key);
        if (translation) {
            element.innerHTML = translation;
        } else {
            console.warn(`Translation not found for key: ${key}`);
        }
    });
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`parts/lang_${lang}.json`);
    return await response.json();
}

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

const userPreferredLanguage = localStorage.getItem('language') || 'en';

// Função principal.
$(document).ready(async () => {
    // Importar Navbar mobile.
    $("#navbar-mobile").load("parts/navbar_mobile.html", function(){ createLinks() });

    // Ensure the fadeOverlay fades out on page load
    const fadeOverlay = $('#fadeOverlay');
    fadeOverlay.css('opacity', '0'  ); // Fade out the overlay
    setTimeout(() => fadeOverlay.hide(), 500); // Hide it after the animation ends

    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});



