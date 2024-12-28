const memberText  = $('#member-text');
const memberIcon  = $('.member-icon');
const closeButton = $('#close-button');

const textName = $('#text-name');
const textRole = $('#text-role');
const textDesc = $('#text-desc');
const pic1 = $('#pic1');
const pic2 = $('#pic2');
const pic3 = $('#pic3');
const link1 = $('#link1');
const link2 = $('#link2');
const link3 = $('#link3');

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
        if (!text_displaying) { 
            // Checar se esta no mobile
            if ($(window).width() < 1200) { 
                memberText                  // fade in tradicional
                .addClass('animate__animated animate__fadeIn') 
                .one('animationend', function() {
                    memberText.removeClass('animate__animated animate__fadeIn hidden'); 
                });

                window.location.href = '#member-text'

            } else {
                memberText // Fade in da direita
                .addClass('animate__animated animate__fadeInRight') 
                .one('animationend', function() {
                    memberText.removeClass('animate__animated animate__fadeInRight hidden');
                });
            }
            
            text_displaying = true

        } else { // Fade in quando já aberto
            memberText
                .addClass('animate__animated animate__fadeIn') 
                .one('animationend', function() {
                    memberText.removeClass('animate__animated animate__fadeIn hidden'); 
                });

            window.location.href = '#member-text'
        }

        // Mudar texto.
        $.getJSON(current_members_text, function (data, textStatus, jqXHR) {
            let path
            
            switch (true) {
                case clickedIcon.hasClass("casanova-icon"):
                    path = data.casanova;
                    break;
                case clickedIcon.hasClass("shin-icon"):
                    path = data.shin;
                    break;
                case clickedIcon.hasClass("bitto-icon"):
                    path = data.bitto;
                    break;
                case clickedIcon.hasClass("prancha-icon"):
                    path = data.prancha;
                    break;
                case clickedIcon.hasClass("pedro-icon"):
                    path = data.pedro;
                    break;
                case clickedIcon.hasClass("glace-icon"):
                    path = data.glace;
                    break;
                case clickedIcon.hasClass("speed-icon"):
                    path = data.speed;
                    break;
            
                default:
                    path = data.default;
                    break;
            }

            // Definir atributos.
            pic1.css("background-image", `url(${path.pic1})`);
            pic2.css("background-image", `url(${path.pic2})`);
            pic3.css("background-image", `url(${path.pic3})`);

            link1.text(path.link1_name);
            link2.text(path.link2_name);
            link3.text(path.link3_name);
            link1.attr("href", `${path.link1}`);
            link2.attr("href", `${path.link2}`);
            link3.attr("href", `${path.link3}`);
            
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

    // Checar se esta no mobile
    if ($(window).width() < 1200) { 
        window.location.href = '#icones'
    }

    text_displaying = false
});