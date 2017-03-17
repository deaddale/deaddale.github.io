$(function() {

    // вход курсора в зону слайдера
    $('#look').mouseenter(function () {
        // анимации header и bottom_block
        $('#header').stop(true, false).animate({top: '-6px'}, 100, 'linear');
        $('#bottom_block').stop(true, false).animate({bottom: '-6px'}, 100, 'linear');

        // если у #header класс .height_null, то оставляем блоки скрытыми от пользователя
        elem = $("#header");
        if (elem.hasClass("height_null")) {
            $('#header').stop(true, false).animate({top: '-200px'}, 0, 'linear');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 0, 'linear');
        }
    });

    // клик на зоне слайдера
    $('#pano').find('div').find('img').click(function() {
        if ($('#header').css('top') === '-6px'){
            $('#header').stop(true, false).animate({top: '-200px'}, 200, 'linear').addClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 200, 'linear').addClass('height_null');
            // зоны стрелок активны
            window.onresize = function(event) {
                positionBxPrev = (($(document).height())/2);
                $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
                $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
            }
            positionBxPrev = (($(document).height())/2);
            $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
            $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
        }
        else if ($('#header').css('top') === '-200px' && ($('.panorama').css('display') === 'none')){
            $('#header').stop(true, false).animate({top: '-6px'}, 400, 'linear').removeClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-6px'}, 400, 'linear').removeClass('height_null');

            $('.bx-prev').css({'display': 'none'});
            $('.bx-next').css({'display': 'none'});
        }
        else if ($('#modal_window_wrapper').css('display') === 'block'){
            $('#header').stop(true, false).animate({top: '-200px'}, 200, 'linear').addClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 200, 'linear').addClass('height_null');
            // зоны стрелок активны
            window.onresize = function(event) {
                positionBxPrev = (($(document).height())/2);
                $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
                $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
            }
            positionBxPrev = (($(document).height())/2);
            $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
            $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
        }
        else if ($('.panorama').css('display') === 'block'){
            $('#header').stop(true, false).animate({top: '-200px'}, 200, 'linear').addClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 200, 'linear').addClass('height_null');
            // зоны стрелок активны
            window.onresize = function(event) {
                positionBxPrev = (($(document).height())/2);
                $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
                $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
            }
            positionBxPrev = (($(document).height())/2);
            $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
            $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionBxPrev});
        }
    });

    // выход курсора из зоны слайдера
    $('#look').mouseleave(function (){

        if ($('#header').css('top') !== '-200px') {
            $('#header').stop().animate({top: '0'}, 210, 'linear');
            $('#bottom_block').stop().animate({bottom: '0'}, 210, 'linear');
        }

        // $('#cursor').hide();
        // return false;
    });

    // клик на иконке "i"
    $(".info_img_icon").click(function() {
        // показываем блок
        $('#modal_window_wrapper').show();

        // уменьшаем блок с текстом по высоте (чтобы был отступ снизу)
        heightWindow = $(document).height();
        $('#media_content').css({'height' : heightWindow - 150});
        // запуск скрипта генерирующего скролл
        $('#media_content').jScrollPane();
    });

    // клик на 360
    $(".panorama_img_icon").click(function() {
        // показываем блок
        $('.panorama').show();
        // запуск скрипта генерирующего панораму
        $(function(){
            $('.panorama-view').panorama360();
        });
        // меням активную кнопку на панели навигации
        $('.normal_view_img_icon_active').addClass('normal_view_img_icon').removeClass('normal_view_img_icon_active');
        $('.panorama_img_icon').addClass('panorama_img_icon_active').removeClass('panorama_img_icon');
    });

    // клик на иконке закрытия шторок
    $('.close_portfolio_icon').click(function() {
        $('#header').stop(true, false).animate({top: '-6px'}, 400, 'linear').removeClass('height_null');
        $('#bottom_block').stop(true, false).animate({bottom: '-6px'}, 400, 'linear').removeClass('height_null');

        // $('#cursor').removeClass('close_cursor').addClass('plus_cursor');

        $('.bx-prev').css({
            'display': 'none'
        });
        $('.bx-next').css({
            'display': 'none'
        });

        // показать курсор
        // $('#cursor').show();
        // return false;

        if ($('.panorama_img_icon_active').hasClass("panorama_img_icon_active")) {
            $('.panorama_img_icon_active').addClass('panorama_img_icon').removeClass('panorama_img_icon_active');
            $(".normal_view_img_icon").addClass('normal_view_img_icon_active').removeClass('normal_view_img_icon');
        }

        $('.panorama').hide();
    });

    // клик на иконке закрытия окна (модальное окно с медиа-контентом)
    $("#modal_window_close_icon").click(function() {
        $('#modal_window_wrapper').hide();
        $('#header').stop(true, false).animate({top: '-200px'}, 200, 'linear').addClass('height_null');
        $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 200, 'linear').addClass('height_null');
    });

    // клик на иконке нормального режима просмотра галереи
    $('.normal_view_img_icon_active').click(function() {
        $('.bx-wrapper').css({'z-index' : '199'});
        $(".panorama_img_icon_active").addClass('panorama_img_icon').removeClass('panorama_img_icon_active');
        $(".normal_view_img_icon").addClass('normal_view_img_icon_active').removeClass('normal_view_img_icon');
        $('.panorama').css({'display' : 'none'});
    }); 

});