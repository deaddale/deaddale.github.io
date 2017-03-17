$(function() {

    // вход курсора в зону слайдера
    $('#look').mouseenter(function () {
        // анимации header и bottom_block
        $('#header').stop(true, false).animate({top: '-6px'}, 150, 'linear');
        $('#bottom_block').stop(true, false).animate({bottom: '-6px'}, 150, 'linear');

        // если у #header класс .height_null, то оставляем блоки скрытыми от пользователя
        elem = $("#header");
        if (elem.hasClass("height_null")) {
            $('#header').stop(true, false).animate({top: '-200px'}, 0, 'linear');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 0, 'linear');
        }

        $('#pano').find('div').find('img').css({'cursor':'pointer'});
    });

    // клик на зоне слайдера
    $('#pano').find('div').find('img').click(function() {
        var positionVerticalBxArrow = (($(document).height())/2);
        var a = ($(document).width());
        var b = ($('.tree-bg').css('left'));
        var c = parseFloat(b);
        var positionHorizontalBxArrow = ((a-c)/5);

        if ($('#header').css('top') === '-6px'){
            $('#header').stop(true, false).animate({top: '-200px'}, 250, 'linear').addClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 250, 'linear').addClass('height_null');
            // зоны стрелок активны
            window.onresize = function(event) {
                var positionVerticalBxArrow = (($(document).height())/2);
                var a = ($(document).width());
                var b = ($('.tree-bg').css('left'));
                var c = parseFloat(b);
                var positionHorizontalBxArrow = ((a-c)/5);
                $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
                $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
                $('.bx-prev div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, left : ((positionHorizontalBxArrow/2)+32)});
                $('.bx-next div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, right : ((positionHorizontalBxArrow/2)+32)});   

            }
            $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
            $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
            $('.bx-prev div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, left : ((positionHorizontalBxArrow/2)+32)});
            $('.bx-next div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, right : ((positionHorizontalBxArrow/2)+32)});
        }
        else if ($('#header').css('top') === '-200px' && ($('.panorama').css('display') === 'none')){
            $('#header').stop(true, false).animate({top: '-6px'}, 300, 'linear').removeClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-6px'}, 300, 'linear').removeClass('height_null');

            $(this).css({'cursor':'pointer'});

            $('.bx-prev').css({'display': 'none'});
            $('.bx-next').css({'display': 'none'});
        }
        else if ($('#modal_window_wrapper').css('display') === 'block'){
            $('#header').stop(true, false).animate({top: '-200px'}, 250, 'linear').addClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 250, 'linear').addClass('height_null');
            // зоны стрелок активны
            window.onresize = function(event) {
                var positionVerticalBxArrow = (($(document).height())/2);
                var a = ($(document).width()+'px');
                var b = ($('.tree-bg').css('left'));
                var positionHorizontalBxArrow = ((a-b)/5);
                $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
                $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
                $('.bx-prev div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, left : ((positionHorizontalBxArrow/2)+32)});
                $('.bx-next div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, right : ((positionHorizontalBxArrow/2)+32)});
            }
            $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
            $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
            $('.bx-prev div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, left : ((positionHorizontalBxArrow2)+32)});
            $('.bx-next div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, right : ((positionHorizontalBxArrow/2)+32)});
        }
        else if ($('.panorama').css('display') === 'block'){
            $('#header').stop(true, false).animate({top: '-200px'}, 250, 'linear').addClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 250, 'linear').addClass('height_null');
            // зоны стрелок активны
            window.onresize = function(event) {
                var positionVerticalBxArrow = (($(document).height())/2);
                var a = ($(document).width()+'px');
                var b = ($('.tree-bg').css('left'));
                var positionHorizontalBxArrow = ((a-b)/5);
                $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
                $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
                $('.bx-prev div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, left : ((positionHorizontalBxArrow/2)+32)});
                $('.bx-next div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, right : ((positionHorizontalBxArrow/2)+32)});
            }
            $('.bx-prev').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
            $('.bx-next').css({'display': 'block', 'backgroundPositionY' : positionVerticalBxArrow, 'width' : positionHorizontalBxArrow});
            $('.bx-prev div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, left : ((positionHorizontalBxArrow/2)+32)});
            $('.bx-next div').css({'width' : positionHorizontalBxArrow/2, 'top' : positionVerticalBxArrow+22, right : ((positionHorizontalBxArrow/2)+32)});
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

$(function() {
    $('.bx-prev').mouseenter(function () {

        if ($('#pano').find('div:first').hasClass("cur_div")) {
            var lastImgAltPrev = $('#pano').find('div:last').find('img').attr('alt');
            $('.bx-prev').find('div').text(lastImgAltPrev);
        }
        else{
            var prevCurDivImgAltPrev = $('.cur_div').prev('div').find('img').attr('alt');
            $('.bx-prev').find('div').text(prevCurDivImgAltPrev);
        }

        var positionVerticalBxArrow = (($(document).height())/2);
        var a = ($(document).width()+'px');
        var b = ($('.tree-bg').css('left'));
        var positionHorizontalBxArrow = ((a-b)/5);
        var descrHeightBxPrev = $('.bx-prev div').height();
        parseFloat(descrHeightBxPrev);
        if (descrHeightBxPrev>12){
            $('.bx-prev div').css({'top' : positionVerticalBxArrow+18});
        }
        else {
            $('.bx-prev div').css({'top' : positionVerticalBxArrow+22});
        }

    });

    $('.bx-next').mouseenter(function () {

        if ($('#pano').find('div:last').hasClass("cur_div")) {
            var lastImgAltNext = $('#pano').find('div:first').find('img').attr('alt');
            $('.bx-next').find('div').text(lastImgAltNext);
        }
        else{
            var prevCurDivImgAltNext = $('.cur_div').next('div').find('img').attr('alt');
            $('.bx-next').find('div').text(prevCurDivImgAltNext);
        }

        var positionVerticalBxArrow = (($(document).height())/2);
        var a = ($(document).width()+'px');
        var b = ($('.tree-bg').css('left'));
        var positionHorizontalBxArrow = ((a-b)/5);
        var descrHeightBxNext = $('.bx-next div').height();
        parseFloat(descrHeightBxNext);
        if (descrHeightBxNext>12){
            $('.bx-next div').css({'top' : positionVerticalBxArrow+18});
        }
        else{
            $('.bx-next div').css({'top' : positionVerticalBxArrow+22});
        }

    });

    $('.bx-prev').click(function () {

        if ($('#pano').find('div:first').hasClass("cur_div")) {
            var lastImgAltPrev = $('#pano').find('div:last').find('img').attr('alt');
            $('.bx-prev').find('div').text(lastImgAltPrev);
        }
        else{
            var prevCurDivImgAltPrev = $('.cur_div').prev('div').find('img').attr('alt');
            $('.bx-prev').find('div').text(prevCurDivImgAltPrev);
        }

        var positionVerticalBxArrow = (($(document).height())/2);
        var a = ($(document).width()+'px');
        var b = ($('.tree-bg').css('left'));
        var positionHorizontalBxArrow = ((a-b)/5);
        var descrHeightBxPrev = $('.bx-prev div').height();
        parseFloat(descrHeightBxPrev);
        if (descrHeightBxPrev>12){
            $('.bx-prev div').css({'top' : positionVerticalBxArrow+18});
        }
        else {
            $('.bx-prev div').css({'top' : positionVerticalBxArrow+22});
        }


    });

    $('.bx-next').click(function () {

        if ($('#pano').find('div:last').hasClass("cur_div")) {
            var lastImgAltNext = $('#pano').find('div:first').find('img').attr('alt');
            $('.bx-next').find('div').text(lastImgAltNext);
        }
        else{
            var prevCurDivImgAltNext = $('.cur_div').next('div').find('img').attr('alt');
            $('.bx-next').find('div').text(prevCurDivImgAltNext);
        }

        var positionVerticalBxArrow = (($(document).height())/2);
        var a = ($(document).width()+'px');
        var b = ($('.tree-bg').css('left'));
        var positionHorizontalBxArrow = ((a-b)/5);
        var descrHeightBxNext = $('.bx-next div').height();
        parseFloat(descrHeightBxNext);
        if (descrHeightBxNext>12){
            $('.bx-next div').css({'top' : positionVerticalBxArrow+18});
        }
        else{
            $('.bx-next div').css({'top' : positionVerticalBxArrow+22});
        }
    });

});