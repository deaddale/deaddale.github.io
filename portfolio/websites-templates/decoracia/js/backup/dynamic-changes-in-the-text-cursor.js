jQuery(document).ready(function($) {
    
    // вход курсора в зону правой стрелки
    $('.bx-next').mouseenter(function(){
        $('#cursor').removeClass('close_cursor').addClass('arrow_right');

        // измение текста курсора
        active = $(".cur_div");
        alt_attr = $(active).next('div').find('img').attr("alt");
        $('#cursor p').text(alt_attr);

        // условие для последней картинки
        if ($('#pano div:last').is('.cur_div')) {
            active = $(".cur_div").parent('div').find('div:first');
            alt_attr = $(active).find('img').attr("alt");
            $('#cursor p').text(alt_attr);
        }

        // показать курсор
        $('#cursor').show();
        return false;
    });

    // выход курсора из зоны правой стрелки
    $('.bx-next').mouseleave(function(){
        $('#cursor').removeClass('arrow_right').addClass('close_cursor');

        // измение текста курсора
        active = $(".cur_div");
        alt_attr = $(active).find('img').attr("alt");
        $('#cursor p').text(alt_attr);

        // показать курсор
        $('#cursor').show();
        return false;
    });

    // вход курсора в зону левой стрелки
    $('.bx-prev').mouseenter(function(){
        $('#cursor').removeClass('close_cursor').addClass('arrow_left');

        // измение текста курсора
        active = $(".cur_div");
        alt_attr = $(active).prev('div').find('img').attr("alt");
        $('#cursor p').text(alt_attr);

        if ($("#pano div").css('z-index') == '99') {
            alt_attr = $("#pano div:last").find('img').attr("alt");
            $('#cursor p').text(alt_attr);
        }

        // показать курсор
        $('#cursor').show();
        return false;
    });

    // выход курсора из зоны левой стрелки
    $('.bx-prev').mouseleave(function(){
        //$('#pano').find('img').stop().animate({left:'0'}, 500);
        $('#cursor').removeClass('arrow_left').addClass('close_cursor');

        // измение текста курсора
        active = $(".cur_div");
        alt_attr = $(active).find('img').attr("alt");
        $('#cursor p').text(alt_attr);

        if ($("#pano div").css('z-index') == '99') {
            alt_attr = $("#pano div").find('img').attr("alt");
            $('#cursor p').text(alt_attr);
            // C1
            if($('.cur_div').is(":first-child")){
                alt_attr = $("#pano div:last").find('img').attr("alt");
                $('#cursor p').text(alt_attr);
            }
        }

        // показать курсор
        $('#cursor').show();
        return false;
    });

    // смена текста курсора при клике на .bx-prev и .bx-next
    $('.bx-next').click(function(){
        // измение текста курсора
        active = $(".cur_div");
        alt_attr = $(active).find('img').attr("alt");
        $('#cursor p').text(alt_attr);

        // A
        if ($(this).hover){
            active = $(".cur_div").next('div');
            alt_attr = $(active).find('img').attr("alt");
            $('#cursor p').text(alt_attr);
            // C2
            if($('.cur_div').is(":last-child")){
                alt_attr = $("#pano div:first").find('img').attr("alt");
                $('#cursor p').text(alt_attr);
            }
        }
    });

    $('.bx-prev').click(function(){
        // измение текста курсора
        active = $(".cur_div");
        alt_attr = $(active).find('img').attr("alt");
        $('#cursor p').text(alt_attr);

        // B
        if ($(this).hover){
            active = $(".cur_div").prev('div');
            alt_attr = $(active).find('img').attr("alt");
            $('#cursor p').text(alt_attr);
        }
    });

});