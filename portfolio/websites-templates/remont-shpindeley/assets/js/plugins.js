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

// CALLS PLUGINS : begin
$(function () {

    // MAIN PAGE : begin
    // first slider : begin
    $.fn.firstSlider = function(options) {
        var windowWidth = $(window).outerWidth();

        if (windowWidth < 956){
            var swiperFirst = new Swiper('#slider-main-page .swiper-container', {
                paginationClickable: false,
                nextButton: '#slider-main-page .swiper-button-next',
                prevButton: '#slider-main-page .swiper-button-prev',
                spaceBetween: 0,
                loop: true
            });
        }
        else{
            var swiperFirst = new Swiper('#slider-main-page .swiper-container', {
                pagination: '#slider-main-page .swiper-pagination',
                paginationClickable: true,
                nextButton: '#slider-main-page .swiper-button-next',
                prevButton: '#slider-main-page .swiper-button-prev',
                spaceBetween: 0,
                loop: true
            });
        }

        $(window).resize(function(event) {

            var windowWidth = $(window).outerWidth();

            if (windowWidth < 956){
                var swiperFirst = new Swiper('#slider-main-page .swiper-container', {
                    paginationClickable: false,
                    nextButton: '#slider-main-page .swiper-button-next',
                    prevButton: '#slider-main-page .swiper-button-prev',
                    spaceBetween: 0,
                    loop: true
                });
            }
            else{
                var swiperFirst = new Swiper('#slider-main-page .swiper-container', {
                    pagination: '#slider-main-page .swiper-pagination',
                    paginationClickable: true,
                    nextButton: '#slider-main-page .swiper-button-next',
                    prevButton: '#slider-main-page .swiper-button-prev',
                    spaceBetween: 0,
                    loop: true
                });
            }
        });
    };
    $.fn.firstSlider(); 
    // first slider : end

    // second slider (us recommend) : begin
    $.fn.secondSlider = function(options) {
        var windowWidth = $(window).outerWidth();

        if (windowWidth < 480){
            var swiperSecond = new Swiper('#content-page .us-recommend.main .swiper-container', {
                pagination: '#content-page .us-recommend.main .swiper-pagination',
                paginationClickable: false,
                slidesPerView: 1,
                nextButton: '#content-page .us-recommend.main .swiper-button-next',
                prevButton: '#content-page .us-recommend.main .swiper-button-prev',
                loop: true
            });
        }
        else if (windowWidth < 956){
            var swiperSecond = new Swiper('#content-page .us-recommend.main .swiper-container', {
                pagination: '#content-page .us-recommend.main .swiper-pagination',
                paginationClickable: false,
                slidesPerView: 3,
                nextButton: '#content-page .us-recommend.main .swiper-button-next',
                prevButton: '#content-page .us-recommend.main .swiper-button-prev',
                spaceBetween: 41,
                loop: true
            });
        }
        else{
            var swiperSecond = new Swiper('#content-page .us-recommend.main .swiper-container', {
                pagination: '#content-page .us-recommend.main .swiper-pagination',
                paginationClickable: false,
                slidesPerView: 5,
                nextButton: '#content-page .us-recommend.main .swiper-button-next',
                prevButton: '#content-page .us-recommend.main .swiper-button-prev',
                spaceBetween: 41,
                loop: true
            });
        }

        $(window).resize(function(event) {

            var windowWidth = $(window).outerWidth();

            if (windowWidth < 480){
                var swiperSecond = new Swiper('#content-page .us-recommend.main .swiper-container', {
                    pagination: '#content-page .us-recommend.main .swiper-pagination',
                    paginationClickable: false,
                    slidesPerView: 1,
                    nextButton: '#content-page .us-recommend.main .swiper-button-next',
                    prevButton: '#content-page .us-recommend.main .swiper-button-prev',
                    loop: true
                });
            }
            else if (windowWidth < 956){
                var swiperSecond = new Swiper('#content-page .us-recommend.main .swiper-container', {
                    pagination: '#content-page .us-recommend.main .swiper-pagination',
                    paginationClickable: false,
                    slidesPerView: 3,
                    nextButton: '#content-page .us-recommend.main .swiper-button-next',
                    prevButton: '#content-page .us-recommend.main .swiper-button-prev',
                    spaceBetween: 41,
                    loop: true
                });
            }
            else{
                // swiperSecond.destroy();
                var swiperSecond = new Swiper('#content-page .us-recommend.main .swiper-container', {
                    pagination: '#content-page .us-recommend.main .swiper-pagination',
                    paginationClickable: false,
                    slidesPerView: 5,
                    nextButton: '#content-page .us-recommend.main .swiper-button-next',
                    prevButton: '#content-page .us-recommend.main .swiper-button-prev',
                    spaceBetween: 41,
                    loop: true
                });
            }
        });
    };
    $.fn.secondSlider();
    // second slider (us recommend) : end

    // third slider (news) : begin
    $.fn.thirdSlider = function(options) {
        var windowWidth = $(window).outerWidth();

        if (windowWidth < 956){
            var swiperThird = new Swiper('#content-page .news .swiper-container', {
                pagination: '#content-page .news    .swiper-pagination',
                paginationClickable: false,
                slidesPerView: 1,
                nextButton: '#content-page .news    .swiper-button-next',
                prevButton: '#content-page .news    .swiper-button-prev',
                spaceBetween: 0,
                loop: true
            });
        }
        else{
            var swiperThird = new Swiper('#content-page .news .swiper-container', {
                pagination: '#content-page .news    .swiper-pagination',
                paginationClickable: false,
                slidesPerView: 2,
                nextButton: '#content-page .news    .swiper-button-next',
                prevButton: '#content-page .news    .swiper-button-prev',
                spaceBetween: 0,
                loop: true
            });
        }

        $(window).resize(function(event) {

            var windowWidth = $(window).outerWidth();

            if (windowWidth < 956){
                var swiperThird = new Swiper('#content-page .news .swiper-container', {
                    pagination: '#content-page .news    .swiper-pagination',
                    paginationClickable: false,
                    slidesPerView: 1,
                    nextButton: '#content-page .news    .swiper-button-next',
                    prevButton: '#content-page .news    .swiper-button-prev',
                    spaceBetween: 0,
                    loop: true
                });
            }
            else{
                var swiperThird = new Swiper('#content-page .news .swiper-container', {
                    pagination: '#content-page .news    .swiper-pagination',
                    paginationClickable: false,
                    slidesPerView: 2,
                    nextButton: '#content-page .news    .swiper-button-next',
                    prevButton: '#content-page .news    .swiper-button-prev',
                    spaceBetween: 0,
                    loop: true
                });
            }
        });
    };
    $.fn.thirdSlider();
    // third slider (news) : end

    // lightbox options : begin
    lightbox.option({
        'showImageNumberLabel':false
    })
    // lightbox options : end
    // MAIN PAGE : end

    // SERVICES : begin
    // slider (us recommend) : begin
    $.fn.servicesSlider = function(options) {
        var windowWidth = $(window).outerWidth();

        if (windowWidth < 480){
            var swiperSecond = new Swiper('#content-page .services .us-recommend .swiper-container', {
                pagination: '#content-page .services .us-recommend .swiper-pagination',
                paginationClickable: false,
                slidesPerView: 1,
                nextButton: '#content-page .services .us-recommend .swiper-button-next',
                prevButton: '#content-page .services .us-recommend .swiper-button-prev',
                loop: true
            });
        }
        else if (windowWidth < 956){
            var swiperSecond = new Swiper('#content-page .services .us-recommend .swiper-container', {
                pagination: '#content-page .services .us-recommend .swiper-pagination',
                paginationClickable: false,
                slidesPerView: 2,
                nextButton: '#content-page .services .us-recommend .swiper-button-next',
                prevButton: '#content-page .services .us-recommend .swiper-button-prev',
                spaceBetween: 41,
                loop: true
            });
        }
        else{
            var swiperSecond = new Swiper('#content-page .services .us-recommend .swiper-container', {
                pagination: '#content-page .services .us-recommend .swiper-pagination',
                paginationClickable: false,
                slidesPerView: 3,
                nextButton: '#content-page .services .us-recommend .swiper-button-next',
                prevButton: '#content-page .services .us-recommend .swiper-button-prev',
                spaceBetween: 41,
                loop: true
            });
        }

        $(window).resize(function(event) {

            var windowWidth = $(window).outerWidth();

            if (windowWidth < 480){
                var swiperSecond = new Swiper('#content-page .services .us-recommend .swiper-container', {
                    pagination: '#content-page .services .us-recommend .swiper-pagination',
                    paginationClickable: false,
                    slidesPerView: 1,
                    nextButton: '#content-page .services .us-recommend .swiper-button-next',
                    prevButton: '#content-page .services .us-recommend .swiper-button-prev',
                    loop: true
                });
            }
            else if (windowWidth < 956){
                var swiperSecond = new Swiper('#content-page .services .us-recommend .swiper-container', {
                    pagination: '#content-page .services .us-recommend .swiper-pagination',
                    paginationClickable: false,
                    slidesPerView: 2,
                    nextButton: '#content-page .services .us-recommend .swiper-button-next',
                    prevButton: '#content-page .services .us-recommend .swiper-button-prev',
                    spaceBetween: 41,
                    loop: true
                });
            }
            else{
                // swiperSecond.destroy();
                var swiperSecond = new Swiper('#content-page .services .us-recommend .swiper-container', {
                    pagination: '#content-page .services .us-recommend .swiper-pagination',
                    paginationClickable: false,
                    slidesPerView: 3,
                    nextButton: '#content-page .services .us-recommend .swiper-button-next',
                    prevButton: '#content-page .services .us-recommend .swiper-button-prev',
                    spaceBetween: 41,
                    loop: true
                });
            }
        });
    };
    $.fn.servicesSlider();
    // slider (us recommend) : end
    // SERVICES : end

});
// CALLS PLUGINS : end
