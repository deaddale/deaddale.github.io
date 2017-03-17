// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Plugins : begin

$(document).ready(function() {

    // placeholder
    $('input, textarea').placeholder();
    
});
// Plugins : end

// slider main page : begin
(function($) {

    // slide heihgt : begin
    function slideHeight(){

        var standartHeight = 356;                                          // стандартная высота блока ".slide"
        var minWidth       = 320;                                          // минимальная ширина окна
        var standartWidth  = 960;                                          // стандартная ширина окна для стандартной высоты блока ".slide"
        var windowWidth    = $(window).outerWidth();                       // новая ширина окна
        var newHeight      = (windowWidth*standartHeight)/standartWidth;   // новая высота

        // если новая ширина окна "меньше" 960 и больше 320 "И" новая высота слайда больше 356
        if (minWidth < windowWidth < standartWidth && newHeight < 356){

            // перебираем слайды и присваиваем высоту
            $('#slider-main-page .slide').each(function(index, el) {
                $(el).css('height', newHeight + 'px');
            });

        }

    }
    slideHeight();

    $(window).resize(function(event) {
        slideHeight();
    });
    // slide heihgt : end

    // bxslider : begin
    var $slider = $('#slider-main-page .inner-wrapper');

    var slider = $slider.bxSlider({
        mode          : 'fade',
        captions      : true,
        speed         : 200,
        auto          : true,
        pause         : 9000,
        adaptiveHeight: true,

        // когда слайдер загрузился
        onSliderLoad: function() {

            $("#slider-main-page .inner-wrapper > div:not([class='bx-clone'])").eq(0).addClass('active-slide');

        },

        // перед сменой слайда
        onSlideBefore: function() {

            $('#slider-main-page .inner-wrapper > div').removeClass('active-slide');

            current = slider.getCurrentSlide();
            $("#slider-main-page .inner-wrapper > div:not([class='bx-clone'])").eq(current).addClass('active-slide');
        
        }

    });
    // bxslider : end

})(jQuery);
// slider main page : end