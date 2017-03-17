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

(function($) {

    // Прокрутка страницы к блоку с анкетой : начало
    $('
        #banner-page .btn-second-var,
        .test .btn-third-var,
        .answers-the-question .btn-fourth-var,
        .doctor .btn-fifth-var
    ').on('click', function(event) {

        var questionnaire = $('.questionnaire');

        event.preventDefault();
        
        $(window).scrollTo(questionnaire, 1000);

    });
    // Прокрутка страницы к блоку с анкетой : конец

    // Прокрутка страницы к блоку с тестом : начало
    $('#banner-page span i').on('click', function(event) {

        var test = $('.test');

        event.preventDefault();
        
        $(window).scrollTo(test, 1000);

    });
    // Прокрутка страницы к блоку с тестом : конец

    // Форма обратной связи (popup) : начало
    $('.order-call').on('click', function(event) {

        event.preventDefault();
        
        $('#feedback-form').bPopup({
            scrollBar: true,
            modalColor: '#43636e'
        });

    });
    // Форма обратной связи (popup) : конец

    // Маска для input[type="tel"]
    $('input[type="tel"]').mask("+7 (999) 999-9999");

})(jQuery);
