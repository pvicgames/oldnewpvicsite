const memberText  = $('#member-text');
const memberIcon  = $('.member-icon');
const closeButton = $('#close-button');

const textName = $('#text-name');
const textRole = $('#text-role');
const textDesc = $('#text-desc');
const pic1 = $('#pic1');
const pic2 = $('#pic2');
const pic3 = $('#pic3');

let text_displaying = false

const members_en_text = "./parts/members_en.json";
let current_members_text = members_en_text;

// Animação flip
memberIcon.on('click', function() {
    // Obter o ícone específico e executar animação flip
    const clickedIcon = $(this); 

    // Checar se não está clicando em espaço vazio.
    if (!clickedIcon.hasClass("no-anim")) {

        clickedIcon // Tocar animação de flip.
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

        } else { // Fade in quando já aberto
            memberText
            .addClass('animate__animated animate__fadeIn') 
            .one('animationend', function() {
                memberText.removeClass('animate__animated animate__fadeIn hidden'); 
            });
        }

        /* Definir descrição dos membros.
        switch (true) {
            // Casanova.
            case memberIcon.hasClass("casanova-icon"):
                $.getJSON(current_members_text, function (data, textStatus, jqXHR) {
                    let path = data.casanova;

                    pic1.css("background-image", `url(${path.pic1})`);
                    pic2.css("background-image", `url(${path.pic2})`);
                    pic3.css("background-image", `url(${path.pic3})`);
                    textName.text(path.name);
                    textRole.text(path.role);
                    textDesc.html(path.desc.replace(/\n/g, '<br>')); // Replace \n with <br> for line breaks
                });
                break;
        
            default:
                break;
        }*/

        $.getJSON(current_members_text, function (data, textStatus, jqXHR) {
            let path
            
            if (memberIcon.hasClass("casanova-icon")) {
                path = data.casanova;
            }

            pic1.css("background-image", `url(${path.pic1})`);
            pic2.css("background-image", `url(${path.pic2})`);
            pic3.css("background-image", `url(${path.pic3})`);
            textName.text(path.name);
            textRole.text(path.role);
            textDesc.html(path.desc.replace(/\n/g, '<br>')); // Replace \n with <br> for line breaks
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