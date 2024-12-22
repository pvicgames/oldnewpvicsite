const memberText  = $('#member-text');
const memberIcon  = $('.member-icon');
const closeButton = $('#close-button');

let text_displaying = false

// Animação flip
$('.member-icon').on('click', function() {
    // Obter o ícone específico e executar animação flip
    const clickedIcon = $(this); 
    clickedIcon
        .addClass('animate__animated animate__flip')
        .one('animationend', function() {
            clickedIcon.removeClass('animate__animated animate__flipInX'); // Resetar animação quando acabar.
        });

    // Fade in do texto.
    if (!text_displaying) { // Fade in da direita
        memberText
        .addClass('animate__animated animate__fadeInRight') 
        .one('animationend', function() {
            memberText.removeClass('animate__animated animate__fadeInRight hidden');
        });

        text_displaying = true

    } else {
        memberText
        .addClass('animate__animated animate__fadeIn') 
        .one('animationend', function() {
            memberText.removeClass('animate__animated animate__fadeIn hidden'); 
        });
    }
})

// Animação de fechar o texto
closeButton.on('click', function () {
    memberText
        .addClass('animate__animated animate__fadeOutRight hidden')
        .one('animationend', function() {
            memberText.removeClass('animate__animated animate__fadeOutRight');
        });

    text_displaying = false
});