(function() {
    $(document).ready(function(){
        // $('.b-articles-list > div .articles-wrapper .one-article').matchHeight();
    });
})();
(function() {
	$(document).ready(function(){

        $('.b-header').find('.b-button.call').click(function () {
            $('html, body').animate({
                scrollTop: $('.b-make-an-appointment.big').offset().top
            }, 1500);
        });
	});
})();
(function() {
	$(document).ready(function(){
        // Parallax
        function parallax (){
            var windowWidth = getWidth(window);

            if (windowWidth > 960){
                $('[data-type="background"]').each(function(){

                    // Создаем объект
                    var $bgobj = $(this);
                    $(window).scroll(function() {
                        // Вычисляем коэффициент
                        var yPos = -($(window).scrollTop() / $bgobj.data('speed'));

                        // Присваиваем значение background-position
                        var coords = 'center '+ yPos + 'px';

                        // Создаем эффект Parallax Scrolling
                        $bgobj.css({ backgroundPosition: coords });
                    });
                });
            }
        }

        // Вычисление математического максимума ширины элемента
        function getWidth(el) {
            return Math.max($(el).width(), $(el).outerWidth());
        }

        // Вызов основной функции для параллакс-эффекта
        parallax();
	});
})();
// Global JS file
(function() {
	$(document).ready(function(){
		$('.b-faq').find('.title').click(function () {
           $(this).next('.content').slideToggle();
        });
	});
})();
(function() {
	$(document).ready(function(){});
})();
// Global JS file
(function() {
	$(document).ready(function(){});
})();
(function() {
	$(document).ready(function(){
		$('.b-header').find('.burger').click(function () {
			$('.b-nav.primary').addClass('active');
			$('.b-nav.overlay').addClass('active');
		});

		$('.b-nav.primary').find('.icon-close').click(function () {
			$('.b-nav.primary').removeClass('active');
			$('.b-nav.overlay').removeClass('active');
		});

		$('.b-nav.overlay').click(function () {
			$('.b-nav.primary').removeClass('active');
			$('.b-nav.overlay').removeClass('active');
		});
	});
})();
(function() {
    $(document).ready(function(){
        // carousel
        $(".b-reviews.columns .owl-carousel").owlCarousel({
            nav: true,
            loop: true,
            dots: false,
            smartSpeed: 700,
            margin: 35,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items: 1
                },
                // breakpoint from 480 up
                480 : {
                    items: 2
                },
                // breakpoint from 768 up
                768 : {
                    items: 3
                },
                // breakpoint from 768 up
                960 : {
                    items: 3
                },
                // breakpoint from 768 up
                980 : {
                    items: 4
                }
            }
        });
    });
})();
(function() {
    $(document).ready(function(){
        // carousel
        $(".b-slider .owl-carousel").owlCarousel({
            items: 1,
            nav: true,
            loop: true,
            dots: false,
            smartSpeed: 900
        });
    });
 })();





(function() {
    $(document).ready(function(){

        var owl = $(".b-your-doctors .owl-carousel");

        // carousel
        owl.owlCarousel({
            nav: false,
            loop: true,
            dots: false,
            smartSpeed: 700,
            margin: 20,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items: 1
                },
                // breakpoint from 480 up
                480 : {
                    items: 2
                },
                // breakpoint from 768 up
                768 : {
                    items: 3
                },
                // breakpoint from 768 up
                960 : {
                    items: 3
                },
                // breakpoint from 768 up
                980 : {
                    items: 4
                }
            },
            onInitialized: callback
        });
        function callback(event) {
            $(".b-your-doctors .owl-carousel .one-doctor > div:last-child").matchHeight();
        }

        // Go to the next item
        $('.b-your-doctors .owl-nav .owl-next').click(function() {
            owl.trigger('next.owl.carousel');
        })
        
        // Go to the previous item
        $('.b-your-doctors .owl-nav .owl-prev').click(function() {
            owl.trigger('prev.owl.carousel');
        })
    });
})();