const memberIcon = $('.member-icon')


// Animação flip
$('.member-icon').on('click', function() {
    const clickedIcon = $(this); // Obter o ícone específico
    clickedIcon
        .addClass('animate__animated animate__flip')
        .one('animationend', function() {
            clickedIcon.removeClass('animate__animated animate__bounceOutLeft'); // Resetar animação quando acabar.
        });
});