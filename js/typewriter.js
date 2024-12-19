const words = [
    "Imagination.", 
    "Creativity.", 
    "Inspiration.", 
    "Liberty.", 
    "Dreams.", 
    "Awesome."
];

let currentWordIndex = 0;
let textElement = document.getElementById("maquina-escrever");
let typingSpeed = 150;
let deletingSpeed = 75;
let pauseDuration = 1000;

function typeWriter() {
    let currentWord = words[currentWordIndex];
    let currentText = textElement.innerText;

    // Typing effect
    if (currentText.length < currentWord.length) {
        textElement.innerText = currentWord.slice(0, currentText.length + 1);
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Wait before starting to delete
        setTimeout(deleteWriter, pauseDuration);
    }
}

function deleteWriter() {
    let currentText = textElement.innerText;

    // Deleting effect
    if (currentText.length > 0) {
        textElement.innerText = currentText.slice(0, currentText.length - 1);
        setTimeout(deleteWriter, deletingSpeed);
    } else {
        // Move to the next word
        currentWordIndex = (currentWordIndex + 1) % words.length;
        setTimeout(typeWriter, pauseDuration);
    }
}

// Start the typewriter effect when the page loads
if (getCurrentPage() == "index.html") {
    typeWriter();
}