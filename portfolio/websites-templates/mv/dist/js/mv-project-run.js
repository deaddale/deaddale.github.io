(function() {
    $(document).ready(function(){
        $('.b-discount__one-coupon').find('.b-button').hover(function () {
            $(this).closest('.b-discount__one-coupon').find('.bottom').toggleClass('hover');
        })
    });
})();
(
    function () {
        $(document).ready(function(){
            
            $('.js-gallery').find('a').fancybox({
                openSpeed: 500,
                closeSpeed: 500,
                openEffect: 'fade',
                closeEffect: 'fade',
                tpl: {
                    next : '<a title="Следующее" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev : '<a title="Предыдущее" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                }
            });
            
        });
    }()
);
(
    function () {
        $(document).ready(function(){

            $('.js-main-slider').owlCarousel({
                items: 1,
                loop: false,
                nav: true,
                dots: false,
                smartSpeed: 300,
                navText: []
            });

        });
    }()
);
(
    function () {
        $(document).ready(function () {
            // fancybox
            $('.b-mv-tv__one-video-preview').find('a').fancybox({
                openSpeed: 500,
                closeSpeed: 500,
                tpl: {
                    next: '<a title="Следующее" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Предыдущее" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                },
                helpers : {
                    media : {}
                }
            });
        });
    }()
);
(function() {
	$(document).ready(function(){
        $('.b-nav__button').click(function () {
            $('.b-header .b-nav').find('ul').toggleClass('active');
        });
	});
})();
(
    function () {
        $(document).ready(function () {

            var jsTipsAndIdeasSlider = $('.js-tips-and-ideas-slider');

            $(jsTipsAndIdeasSlider).owlCarousel({
                items: 4,
                loop: true,
                nav: true,
                dots: false,
                smartSpeed: 300,
                navText: [],
                margin: 10,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 3,
                        nav: false
                    },
                    1070: {
                        nav: true
                    }
                }
            });

            $(jsTipsAndIdeasSlider).find('.img-and-title').matchHeight();

        });
    }()
);
(
    function () {
        $(document).ready(function () {

            // prof slider
            $('.b-vertical-sliders.-normal').find('.js-prof-slider').bxSlider({
                mode: 'vertical',
                speed: 600,
                pager: false,
                slideMargin: 20,
                minSlides: 3,
                easing: 'ease-in',
                preloadImages: 'all',
                infiniteLoop: false,
                hideControlOnEnd: true
            });

            $('.b-vertical-sliders.-normal').find('.js-tv-slider').bxSlider({
                mode: 'vertical',
                speed: 600,
                pager: false,
                slideMargin: 36,
                minSlides: 2,
                easing: 'ease-in',
                preloadImages: 'all',
                infiniteLoop: false,
                hideControlOnEnd: true
            });

            // prof slider
            $('.b-vertical-sliders.-mobile').find('.js-prof-slider').bxSlider({
                mode: 'horizontal',
                speed: 600,
                pager: false,
                slideMargin: 20,
                minSlides: 3,
                preloadImages: 'all',
                infiniteLoop: false,
                hideControlOnEnd: true
            });

            $('.b-vertical-sliders.-mobile').find('.js-tv-slider').bxSlider({
                mode: 'horizontal',
                speed: 600,
                pager: false,
                slideMargin: 36,
                minSlides: 2,
                preloadImages: 'all',
                infiniteLoop: false,
                hideControlOnEnd: true
            });

            // fancybox
            $('.b-vertical-sliders.-normal').find('.js-tv-slider').find('a').fancybox({
                openSpeed: 500,
                closeSpeed: 500,
                tpl: {
                    next: '<a title="Следующее" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Предыдущее" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                },
                helpers : {
                    media : {}
                }
            });

            $('.b-vertical-sliders.-mobile').find('.js-tv-slider').find('a').fancybox({
                openSpeed: 500,
                closeSpeed: 500,
                tpl: {
                    next: '<a title="Следующее" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Предыдущее" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                },
                helpers : {
                    media : {}
                }
            });
        });
    }()
);