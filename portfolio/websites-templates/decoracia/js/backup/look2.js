

// Предзагрузчик изображений
jQuery.preloadImages = function () {
    if (typeof arguments[arguments.length - 1] == 'function') {
        var callback = arguments[arguments.length - 1];
    } else {
        var callback = false;
    }
    if (typeof arguments[0] == 'object') {
        var images = arguments[0];
        var n = images.length;
    } else {
        var images = arguments;
        var n = images.length - 1;
    }
    var not_loaded = n;
    for (var i = 0; i < n; i++) {
        jQuery(new Image()).attr('src', images[i]).load(function () {
            if (--not_loaded < 1 && typeof callback == 'function') {
                callback();
            }
        });
    }
}

// Объявляем переменные
var train_height = 0;
var train_timer;
var velocity;
var max_shift = 0;
var x = 0;
var flag = 0;

var train_img = 0;

// Предзагрузчик изображений
$.preloadImages(["images/content/img_2.jpg"], function () {
    $("#pano").css({
        "visibility": "visible"
    });
    train_img = $("#pano img").height();
    $("#pano").css({
        "height": train_img
    });
});



// Сдвигаем поезд при каждом обновлении кадра
function move_train() {
    if (max_shift > 0) {


        x = x + velocity;

        if (x > 0) x = 0;
        if (x < (-1 * (max_shift))) x = -1 * (max_shift);

        $("#pano").css({
            "top": x + "px",
            "height": train_img
        });

        if (velocity > 0) {

            $("#prev_img").show();
            $("#next_img").hide();
        }

        if (velocity == 0) {
            $("#next_img").hide();
            $("#prev_img").hide();
        }

        if (velocity < 0) {
            $("#next_img").show();
            $("#prev_img").hide();
        }

        if (x == 0) {
            $("#prev_img").hide();
        }
        if (x == "-" + max_shift) {
            $("#next_img").hide();
        }

    }
}

// Функция находит позицию курсора мыши внутри элемента
function rPosition(element, mouseX, mouseY) {
    var offset = $(element).offset();
    var x = mouseX - offset.top;
    var y = mouseY - offset.top;

    return {
        'x': y,
        'y': x
    };
}

$(function () {

    $("#next_img").hide();
    $("#prev_img").hide();

    // Считаем длину поезда, для этого складываем длины всех вагонов 
    train_height = train_height + $("#pano").height();
    train_img = $("#pano img").height();

    var controller_height = $("#look").height();

    x = -1 * train_height / 2 + controller_height / 2;

    // alert(train_height);
    $("#pano").css({
        "top": x + "px",
        "height": train_img
    });

    // Запускаем цикл анимации если курсор мыши над поездом
    $("#look").mouseover(function () {
        //alert("");
        train_timer = window.setInterval("move_train();", 10);
    });

    // Останавливаем цикл анимации если курсор мыши ушел с поезда
    $("#look").mouseout(function () {
        window.clearInterval(train_timer);
        $("#next_img").hide();
        $("#prev_img").hide();
    });

    $(window).resize(function () {
        velocity = 0;
        max_shift = train_height - $("#look").height();
        train_img = $("#pano img").height();
        move_train();
    });

    // вход курсора в зону слайдера
    $('#look').mouseenter(function () {
        // анимации header и bottom_block
        $('#header').stop(true, false).animate({top: '-6px'}, 210, 'linear');
        $('#bottom_block').stop(true, false).animate({bottom: '-6px'}, 210, 'linear');

        elem = $("#header");
        if (elem.hasClass ("height_null")) {
            $('#header').stop(true, false).animate({top: '-200px'}, 0, 'linear');
            $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 0, 'linear');
        }

        // замена текста у курсора
        active = $(".cur_div");
        alt_attr = $(active).find('img').attr("alt");
        $('#cursor p').text(alt_attr);

        // показываем курсор
        $('#cursor').show();
        return false;
    });

    //Рассчитываем текущую скорость, которая зависит от координаты мышки на поезде
    $("#look").mousemove(function (e) {

        // отслеживание перемещения нестандартного курсора в пределах слайдера
        var Cur = $('#cursor');
        Cur.css({
            'left': parseInt(e.pageX - 0) + 'px',
            'top': parseInt(e.pageY - 80) + 'px',
            'opacity': 1.0,
        });

        train_height = 0;
        train_height = train_height + $("#pano").height();
        //Считаем полудлину поезда, чтобы посчитать скорость, которая с разным знаком в разных половинах поезда
        var half_height = Math.round($(this).height() / 2);

        var elementCoords = rPosition(this, e.pageX, e.pageY);
        //Пересчитали максимум, на который можно сдвигать поезд, он зависит от размеров окна
        max_shift = train_height - $(this).height();

        var sign = velocity;

        //Рассчитываем скорость. Делим на 100, чтобы было плавнее. Скорость будет в пределах от 0 до 9
        velocity = Math.round((half_height - elementCoords.x) / 100);
    });

    // клик на зоне слайдера
    $("#look").click(function() {
        $('#header').stop(true, false).animate({top: '-200px'}, 500, 'linear').addClass('height_null');
        $('#bottom_block').stop(true, false).animate({bottom: '-220px'}, 500, 'linear').addClass('height_null');

        // курсор изменился
        $('#cursor').removeClass('plus_cursor').addClass('close_cursor');

        // зоны стрелок активны
        $('.bx-prev').css({'display': 'block'});
        $('.bx-next').css({'display': 'block'});

        if ($('#header').css('top') === '-200px') { 
            $('#header').stop(true, false).animate({top: '-6px'}, 400, 'linear').removeClass('height_null');
            $('#bottom_block').stop(true, false).animate({bottom: '-6px'}, 400, 'linear').removeClass('height_null');

            $('#cursor').removeClass('close_cursor').addClass('plus_cursor');

            $('.bx-prev').css({
                'display': 'none'
            });
            $('.bx-next').css({
                'display': 'none'
            });
            
            // показать курсор
            $('#cursor').show();
            return false;
        }
    });
    
    // выход курсора из зоны слайдера
    $('#look').mouseleave(function (){

        if ($('#header').css('top') !== '-200px') {
            $('#header').stop().animate({top: '0'}, 210, 'linear');
            $('#bottom_block').stop().animate({bottom: '0'}, 210, 'linear');
        }

        //$('#header').stop().animate({top: '0'}, 210, 'linear');
        //$('#bottom_block').stop().animate({bottom: '0'}, 210, 'linear');
        $('#cursor').hide();
        return false;
    });

});
