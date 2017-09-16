(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBRoifjJp1QPSzR0lysyZW7w_GjE_TqxOc'
    }
});

var app = new Vue({
    el: '#app',
    data: {
        isActiveNav: false,
        scrolled: false,
        isActiveOrderHouse: false,
        isActiveOrderCall: false,
        isActiveCatalogOrder: false,
        isActiveBecomeDealer: false,
        isActivePopupSliderHouseProjects00: false,
        isActivePopupSliderHouseProjects01: false,
        isActivePopupSliderHouseProjects02: false,
        isActivePopupSliderHouseProjects10: false,
        isActivePopupSliderHouseProjects11: false,
        isActivePopupSliderHouseProjects12: false,
        isActivePopupSliderHouseProjects20: false,
        isActivePopupSliderHouseProjects21: false,
        isActivePopupSliderHouseProjects22: false,
        isActivePopupSliderHouseProjects30: false,
        isActivePopupSliderHouseProjects31: false,
        isActivePopupSliderHouseProjects32: false,
        isActivePopupSliderHouseProjects40: false,
        isActivePopupSliderHouseProjects41: false,
        isActivePopupSliderHouseProjects42: false,
        isActivePopupSliderSecond: false,
        isActivePopupSliderThird: false,
        isActivePopupSliderFourth: false
    },
    methods: {
        handleScroll () {
            this.scrolled = window.scrollY > 0;
        },
        changeSlide () {
            var dataCategory = $(event.currentTarget).data('category');
            var dataSlider = $('.b-house-projects__area-item.b-house-projects__area-item_active').data('slider');
            var $title = $('.b-house-projects__area-title');
            var $control = $('.b-house-projects__control-item');
            var dataSlide = $(event.currentTarget).data('slide');
            // Меняем заголовок : начало
            $title.each(function (index, element) {
                var thisData = $(element).data('category');
                if (thisData == dataCategory) {
                    $(element)
                        .addClass('b-house-projects__area-title_active')
                        .siblings()
                        .removeClass('b-house-projects__area-title_active');
                }
            });
            // Меняем заголовок : конец
            // Меняем контрол : начало
            if ($(event.currentTarget).hasClass('b-house-projects__control-item_prev')) {
                $('.b-house-projects__control-item_invisible').addClass('b-house-projects__control-item_prev');
            }
            if ($(event.currentTarget).hasClass('b-house-projects__control-item_next')) {
                $('.b-house-projects__control-item_invisible').addClass('b-house-projects__control-item_next');
            }
            $control.each(function (index, element) {
                $(element).removeClass('b-house-projects__control-item_invisible');
                $(event.currentTarget)
                    .removeAttr('class')
                    .addClass('b-house-projects__control-item b-house-projects__control-item_invisible');
            });
            // Меняем контрол : конец
            // Меняем кнопку "Подробнее" : начало
            $(".b-house-projects__area-btn[data-slider='" + dataSlider + "'][data-category='" + dataCategory + "']")
                .addClass('b-house-projects__area-btn_active')
                .siblings()
                .removeClass('b-house-projects__area-btn_active');
            // Меняем кнопку "Подробнее" : конец
            // Переход к нужному слайду
            $('.b-house-projects__slider_active').slick('slickGoTo', dataCategory);
        },
        changeCategory () {
            var $areaTitle = $('.b-house-projects__area-title');
            var rightCol = $('.b-house-projects__right-col');
            var dataCategory = $(event.currentTarget).data('slider');
            var textCategory = $(event.currentTarget).find('.b-house-projects__area-item-number').text();
            $('.b-house-projects__area-current-number').text(textCategory);
            $(event.currentTarget)
                .addClass('b-house-projects__area-item_active')
                .siblings()
                .removeClass('b-house-projects__area-item_active');
            $('.b-house-projects__slider[data-slider="' + dataCategory + '"]')
                .addClass('b-house-projects__slider_active')
                .siblings()
                .removeClass('b-house-projects__slider_active');
            $areaTitle
                .first()
                .addClass('b-house-projects__area-title_active')
                .siblings()
                .removeClass('b-house-projects__area-title_active');
            $(".b-house-projects__area-btn[data-slider='" + dataCategory + "'][data-category='" + 0 + "']")
                .addClass('b-house-projects__area-btn_active')
                .siblings()
                .removeClass('b-house-projects__area-btn_active');
        },
        sliderModularConstractionsPrev () {
            $('.b-modular-constructions__slider').slick('slickPrev');
        },
        sliderModularConstractionsNext () {
            $('.b-modular-constructions__slider').slick('slickNext');
        },
        sliderSpanStructuresPrev () {
            $('.b-span-structures__slider').slick('slickPrev');
        },
        sliderSpanStructuresNext () {
            $('.b-span-structures__slider').slick('slickNext');
        },
        sliderRealizedProjectRightSlide() {
            $('.b-realized-projects__slider').slick('slickPrev');
        },
        sliderPopupRightSlide() {
            $('.b-popup-slider__slider').slick('slickPrev');
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    mounted() {
        function sliderCoverInit(slider) {
            var $slider = $(slider);
            var $progressBar = $('.b-nav__progress-bar');
            var slickOptions = {
                dots: true,
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                speed: 1000,
                pauseOnHover: false,
                draggable: false
            };
            $(slider).slick(slickOptions);
            // built-in feature, for more info check the [doc](https://kenwheeler.github.io/slick/)
            $(slider).on('swipe', function(event, slick, direction) {
                reinitSlick();
            });
            $('.slick-dots').on('click', function() {
                reinitSlick();
                $progressBar.fadeOut();
            });
            var reinitSlick = function() {
                $slider.slick(
                    "slickSetOption",
                    {
                        autoplay: false
                    },
                    false
                );
            };
            $slider.on('init', function (event, slick, currentSlide, nextSlide) {
                $('.b-nav__item_1')
                    .addClass('b-nav__item_active')
            });
            function addAndRemoveClass(element) {
                $(element)
                    .addClass('b-nav__item_active')
                    .siblings()
                    .removeClass('b-nav__item_active');
            }
            $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                if (nextSlide == 0) {
                    addAndRemoveClass('.b-nav__item_1');
                    $progressBar
                        .removeAttr('class')
                        .addClass('b-nav__progress-bar b-nav__progress-bar_first');
                }
                if (nextSlide == 1) {
                    addAndRemoveClass('.b-nav__item_2');
                    $progressBar
                        .removeAttr('class')
                        .addClass('b-nav__progress-bar b-nav__progress-bar_second');
                }
                if (nextSlide == 2) {
                    addAndRemoveClass('.b-nav__item_3');
                    $progressBar
                        .removeAttr('class')
                        .addClass('b-nav__progress-bar b-nav__progress-bar_third');
                }
                if (nextSlide == 3) {
                    addAndRemoveClass('.b-nav__item_4');
                    $progressBar
                        .removeAttr('class')
                        .addClass('b-nav__progress-bar b-nav__progress-bar_fourth');
                }
            });
        }
        function sliderHouseProjectInit(slider) {
            $(slider).each(function (indx, element) {
                $(element).slick({
                    dots: false,
                    arrows: false,
                    autoplay: false,
                    speed: 1200,
                    centerPadding: '-30px'
                });
            });
        }
        function sliderRealizedProjectsInit(slider) {
            var $slider = $(slider);
            $slider.slick({
                dots: false,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                speed: 1500,
                variableWidth: true,
                centerPadding: '0px',
                variableHeight: true,
                adaptiveHeight: true
            });
        }
        function sliderPublicBuildingsInit(slider) {
            var $slider = $(slider);
            $slider.slick({
                dots: false,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 1000,
                variableHeight: true,
                adaptiveHeight: true
            });
        }
        function sliderModularConstractionsInit(slider) {
            var $slider = $(slider);
            $slider.each(function (indx, element) {
                $(element).slick({
                    dots: false,
                    arrows: false,
                    speed: 1200
                });
            });
            $('.b-modular-constructions__slider-item').on('click', function () {
                var dataSlide = $(event.currentTarget).data('slick-index');
                $('.b-popup-slider__slider').slick('slickGoTo', dataSlide);
            });
        }
        function sliderSpanStructuresInit (slider) {
            var $slider = $(slider);
            $slider.each(function (indx, element) {
                $(element).slick({
                    dots: false,
                    arrows: false,
                    speed: 1200
                });
            });
            $('.b-span-structures__slider-item').on('click', function () {
                var dataSlide = $(event.currentTarget).data('slick-index');
                $('.b-popup-slider__slider').slick('slickGoTo', dataSlide);
            });
        }
        function getHeight(el) {
            return Math.max($(el).height(), $(el).outerHeight());
        }
        function getWidth(el) {
            return Math.max($(el).width(), $(el).outerWidth());
        }
        function navResize() {
            $(window).on('scroll', function () {
                let nav = $('.b-nav');
                let navScrolled = $('.b-nav__list-scrolled');
                let navList = $('.b-nav__list');
                let navListWrapper = $('.b-nav__list-wrapper');
                let navListItem = $('.b-nav__list').find('.b-nav__item');
                let navListTopFirst = $(navList).offset().top;
                let navListTopCurrent = $(navList).offset().top - $(window).scrollTop();
                let windowWidth = getWidth(window);
                let screenTop = $(document).scrollTop();
                let headerHeight = getHeight('.b-nav');
                // let diff = navListTopFirst - headerHeight;

                // console.log('navListTopFirst: ' + navListTopFirst);
                // console.log('navListTopCurrent: ' + navListTopCurrent);
                // console.log('screenTop: ' + screenTop);
                // console.log('headerHeight: ' + headerHeight);
                // console.log('diff: ' + diff);
                // console.log('------- ------- -------');

                let calcWidth = 765 + (windowWidth - 765) * navListTopCurrent / navListTopFirst;
                if (calcWidth <= 765) {
                    calcWidth = 765;
                }
                let calcFontSize = 16 + (18 - 16) * navListTopCurrent / navListTopFirst;
                if (calcFontSize <= 16) {
                    calcFontSize = 16;
                }
                let calcLineHeight = 1.125 + (1.1666 - 1.125) * navListTopCurrent / navListTopFirst;
                if (calcLineHeight <= 1.125) {
                    calcLineHeight = 1.125;
                }
                let calcHeight = 100 + (140 - 100) * navListTopCurrent / navListTopFirst;
                if (calcHeight <= 100) {
                    calcHeight = 100;
                }
                $(navListWrapper).css({
                    'width': calcWidth + 'px'
                });
                $(navListItem).css({
                    'font-size': calcFontSize + 'px',
                    'line-height': calcLineHeight,
                    'height': calcHeight + 'px',
                });
                if (headerHeight >= navListTopCurrent) {
                    $(navScrolled).addClass('b-nav__list-scrolled_active');
                    $(navList).addClass('b-nav__list_active');
                    $(nav).addClass('b-nav_bg-color');
                    if (windowWidth < 1085) {
                        $(navList).css('display', 'none');
                    }
                    else {
                        $(navList).css('display', 'block');
                    }
                }
                if (screenTop <= 0) {
                    $(navScrolled).removeClass('b-nav__list-scrolled_active');
                    $(navList).removeClass('b-nav__list_active');
                    $(nav).removeClass('b-nav_bg-color');
                    if (windowWidth < 1085) {
                        $(navList).css('display', 'block');
                    }
                    $(navListWrapper).css({
                        'width': 100 + '%'
                    });
                    $(navListItem).css({
                        'font-size': '18px',
                        'line-height': 1.1666,
                        'height': '140px'
                    });
                }
            });
        }
        function navScrolledClicked () {
            var navScrolledItem = $('.b-nav__list-scrolled-item');
            $(navScrolledItem).on('click', function () {
                $(this)
                    .addClass('b-nav__list-scrolled-item_active')
                    .siblings()
                    .removeClass('b-nav__list-scrolled-item_active')
            });
        }
        function sliderPopupInit(slider) {
            $(slider).each(function (indx, element) {
                $(element).slick({
                    dots: false,
                    arrows: true,
                    autoplay: false,
                    speed: 1200,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: false
                });
            });
        }
        function googleMap () {
            $('.b-contacts__map')
                .click(function(){
                    $(this).find('.vue-map').addClass('clicked')
                })
                .mouseleave(function(){
                    $(this).find('.vue-map').removeClass('clicked')
                });
        }
        sliderCoverInit('.b-cover__slider');
        sliderHouseProjectInit('.b-house-projects__slider');
        sliderRealizedProjectsInit('.b-realized-projects__slider');
        sliderModularConstractionsInit('.b-modular-constructions__slider');
        sliderSpanStructuresInit('.b-span-structures__slider');
        sliderPublicBuildingsInit('.b-public-buildings__slider');
        sliderPopupInit('.b-popup-slider__slider');
        navResize();
        googleMap();
        navScrolledClicked();
    }
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYWxwYmF1LXByb2plY3QuYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJWdWUudXNlKFZ1ZUdvb2dsZU1hcHMsIHtcbiAgICBsb2FkOiB7XG4gICAgICAgIGtleTogJ0FJemFTeUJSb2lmakpwMVFQU3pSMGx5c3laVzd3X0dqRV9UcXhPYydcbiAgICB9XG59KTtcblxudmFyIGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI2FwcCcsXG4gICAgZGF0YToge1xuICAgICAgICBpc0FjdGl2ZU5hdjogZmFsc2UsXG4gICAgICAgIHNjcm9sbGVkOiBmYWxzZSxcbiAgICAgICAgaXNBY3RpdmVPcmRlckhvdXNlOiBmYWxzZSxcbiAgICAgICAgaXNBY3RpdmVPcmRlckNhbGw6IGZhbHNlLFxuICAgICAgICBpc0FjdGl2ZUNhdGFsb2dPcmRlcjogZmFsc2UsXG4gICAgICAgIGlzQWN0aXZlQmVjb21lRGVhbGVyOiBmYWxzZSxcbiAgICAgICAgaXNBY3RpdmVQb3B1cFNsaWRlckhvdXNlUHJvamVjdHMwMDogZmFsc2UsXG4gICAgICAgIGlzQWN0aXZlUG9wdXBTbGlkZXJIb3VzZVByb2plY3RzMDE6IGZhbHNlLFxuICAgICAgICBpc0FjdGl2ZVBvcHVwU2xpZGVySG91c2VQcm9qZWN0czAyOiBmYWxzZSxcbiAgICAgICAgaXNBY3RpdmVQb3B1cFNsaWRlckhvdXNlUHJvamVjdHMxMDogZmFsc2UsXG4gICAgICAgIGlzQWN0aXZlUG9wdXBTbGlkZXJIb3VzZVByb2plY3RzMTE6IGZhbHNlLFxuICAgICAgICBpc0FjdGl2ZVBvcHVwU2xpZGVySG91c2VQcm9qZWN0czEyOiBmYWxzZSxcbiAgICAgICAgaXNBY3RpdmVQb3B1cFNsaWRlckhvdXNlUHJvamVjdHMyMDogZmFsc2UsXG4gICAgICAgIGlzQWN0aXZlUG9wdXBTbGlkZXJIb3VzZVByb2plY3RzMjE6IGZhbHNlLFxuICAgICAgICBpc0FjdGl2ZVBvcHVwU2xpZGVySG91c2VQcm9qZWN0czIyOiBmYWxzZSxcbiAgICAgICAgaXNBY3RpdmVQb3B1cFNsaWRlckhvdXNlUHJvamVjdHMzMDogZmFsc2UsXG4gICAgICAgIGlzQWN0aXZlUG9wdXBTbGlkZXJIb3VzZVByb2plY3RzMzE6IGZhbHNlLFxuICAgICAgICBpc0FjdGl2ZVBvcHVwU2xpZGVySG91c2VQcm9qZWN0czMyOiBmYWxzZSxcbiAgICAgICAgaXNBY3RpdmVQb3B1cFNsaWRlckhvdXNlUHJvamVjdHM0MDogZmFsc2UsXG4gICAgICAgIGlzQWN0aXZlUG9wdXBTbGlkZXJIb3VzZVByb2plY3RzNDE6IGZhbHNlLFxuICAgICAgICBpc0FjdGl2ZVBvcHVwU2xpZGVySG91c2VQcm9qZWN0czQyOiBmYWxzZSxcbiAgICAgICAgaXNBY3RpdmVQb3B1cFNsaWRlclNlY29uZDogZmFsc2UsXG4gICAgICAgIGlzQWN0aXZlUG9wdXBTbGlkZXJUaGlyZDogZmFsc2UsXG4gICAgICAgIGlzQWN0aXZlUG9wdXBTbGlkZXJGb3VydGg6IGZhbHNlXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGhhbmRsZVNjcm9sbCAoKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVkID0gd2luZG93LnNjcm9sbFkgPiAwO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VTbGlkZSAoKSB7XG4gICAgICAgICAgICB2YXIgZGF0YUNhdGVnb3J5ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjYXRlZ29yeScpO1xuICAgICAgICAgICAgdmFyIGRhdGFTbGlkZXIgPSAkKCcuYi1ob3VzZS1wcm9qZWN0c19fYXJlYS1pdGVtLmItaG91c2UtcHJvamVjdHNfX2FyZWEtaXRlbV9hY3RpdmUnKS5kYXRhKCdzbGlkZXInKTtcbiAgICAgICAgICAgIHZhciAkdGl0bGUgPSAkKCcuYi1ob3VzZS1wcm9qZWN0c19fYXJlYS10aXRsZScpO1xuICAgICAgICAgICAgdmFyICRjb250cm9sID0gJCgnLmItaG91c2UtcHJvamVjdHNfX2NvbnRyb2wtaXRlbScpO1xuICAgICAgICAgICAgdmFyIGRhdGFTbGlkZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnc2xpZGUnKTtcbiAgICAgICAgICAgIC8vINCc0LXQvdGP0LXQvCDQt9Cw0LPQvtC70L7QstC+0LogOiDQvdCw0YfQsNC70L5cbiAgICAgICAgICAgICR0aXRsZS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzRGF0YSA9ICQoZWxlbWVudCkuZGF0YSgnY2F0ZWdvcnknKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpc0RhdGEgPT0gZGF0YUNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fYXJlYS10aXRsZV9hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fYXJlYS10aXRsZV9hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vINCc0LXQvdGP0LXQvCDQt9Cw0LPQvtC70L7QstC+0LogOiDQutC+0L3QtdGGXG4gICAgICAgICAgICAvLyDQnNC10L3Rj9C10Lwg0LrQvtC90YLRgNC+0LsgOiDQvdCw0YfQsNC70L5cbiAgICAgICAgICAgIGlmICgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdiLWhvdXNlLXByb2plY3RzX19jb250cm9sLWl0ZW1fcHJldicpKSB7XG4gICAgICAgICAgICAgICAgJCgnLmItaG91c2UtcHJvamVjdHNfX2NvbnRyb2wtaXRlbV9pbnZpc2libGUnKS5hZGRDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fY29udHJvbC1pdGVtX3ByZXYnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdiLWhvdXNlLXByb2plY3RzX19jb250cm9sLWl0ZW1fbmV4dCcpKSB7XG4gICAgICAgICAgICAgICAgJCgnLmItaG91c2UtcHJvamVjdHNfX2NvbnRyb2wtaXRlbV9pbnZpc2libGUnKS5hZGRDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fY29udHJvbC1pdGVtX25leHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRjb250cm9sLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fY29udHJvbC1pdGVtX2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2NsYXNzJylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiLWhvdXNlLXByb2plY3RzX19jb250cm9sLWl0ZW0gYi1ob3VzZS1wcm9qZWN0c19fY29udHJvbC1pdGVtX2ludmlzaWJsZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyDQnNC10L3Rj9C10Lwg0LrQvtC90YLRgNC+0LsgOiDQutC+0L3QtdGGXG4gICAgICAgICAgICAvLyDQnNC10L3Rj9C10Lwg0LrQvdC+0L/QutGDIFwi0J/QvtC00YDQvtCx0L3QtdC1XCIgOiDQvdCw0YfQsNC70L5cbiAgICAgICAgICAgICQoXCIuYi1ob3VzZS1wcm9qZWN0c19fYXJlYS1idG5bZGF0YS1zbGlkZXI9J1wiICsgZGF0YVNsaWRlciArIFwiJ11bZGF0YS1jYXRlZ29yeT0nXCIgKyBkYXRhQ2F0ZWdvcnkgKyBcIiddXCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiLWhvdXNlLXByb2plY3RzX19hcmVhLWJ0bl9hY3RpdmUnKVxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdiLWhvdXNlLXByb2plY3RzX19hcmVhLWJ0bl9hY3RpdmUnKTtcbiAgICAgICAgICAgIC8vINCc0LXQvdGP0LXQvCDQutC90L7Qv9C60YMgXCLQn9C+0LTRgNC+0LHQvdC10LVcIiA6INC60L7QvdC10YZcbiAgICAgICAgICAgIC8vINCf0LXRgNC10YXQvtC0INC6INC90YPQttC90L7QvNGDINGB0LvQsNC50LTRg1xuICAgICAgICAgICAgJCgnLmItaG91c2UtcHJvamVjdHNfX3NsaWRlcl9hY3RpdmUnKS5zbGljaygnc2xpY2tHb1RvJywgZGF0YUNhdGVnb3J5KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hhbmdlQ2F0ZWdvcnkgKCkge1xuICAgICAgICAgICAgdmFyICRhcmVhVGl0bGUgPSAkKCcuYi1ob3VzZS1wcm9qZWN0c19fYXJlYS10aXRsZScpO1xuICAgICAgICAgICAgdmFyIHJpZ2h0Q29sID0gJCgnLmItaG91c2UtcHJvamVjdHNfX3JpZ2h0LWNvbCcpO1xuICAgICAgICAgICAgdmFyIGRhdGFDYXRlZ29yeSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnc2xpZGVyJyk7XG4gICAgICAgICAgICB2YXIgdGV4dENhdGVnb3J5ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5maW5kKCcuYi1ob3VzZS1wcm9qZWN0c19fYXJlYS1pdGVtLW51bWJlcicpLnRleHQoKTtcbiAgICAgICAgICAgICQoJy5iLWhvdXNlLXByb2plY3RzX19hcmVhLWN1cnJlbnQtbnVtYmVyJykudGV4dCh0ZXh0Q2F0ZWdvcnkpO1xuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fYXJlYS1pdGVtX2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ItaG91c2UtcHJvamVjdHNfX2FyZWEtaXRlbV9hY3RpdmUnKTtcbiAgICAgICAgICAgICQoJy5iLWhvdXNlLXByb2plY3RzX19zbGlkZXJbZGF0YS1zbGlkZXI9XCInICsgZGF0YUNhdGVnb3J5ICsgJ1wiXScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiLWhvdXNlLXByb2plY3RzX19zbGlkZXJfYWN0aXZlJylcbiAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fc2xpZGVyX2FjdGl2ZScpO1xuICAgICAgICAgICAgJGFyZWFUaXRsZVxuICAgICAgICAgICAgICAgIC5maXJzdCgpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiLWhvdXNlLXByb2plY3RzX19hcmVhLXRpdGxlX2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ItaG91c2UtcHJvamVjdHNfX2FyZWEtdGl0bGVfYWN0aXZlJyk7XG4gICAgICAgICAgICAkKFwiLmItaG91c2UtcHJvamVjdHNfX2FyZWEtYnRuW2RhdGEtc2xpZGVyPSdcIiArIGRhdGFDYXRlZ29yeSArIFwiJ11bZGF0YS1jYXRlZ29yeT0nXCIgKyAwICsgXCInXVwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fYXJlYS1idG5fYWN0aXZlJylcbiAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYi1ob3VzZS1wcm9qZWN0c19fYXJlYS1idG5fYWN0aXZlJyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNsaWRlck1vZHVsYXJDb25zdHJhY3Rpb25zUHJldiAoKSB7XG4gICAgICAgICAgICAkKCcuYi1tb2R1bGFyLWNvbnN0cnVjdGlvbnNfX3NsaWRlcicpLnNsaWNrKCdzbGlja1ByZXYnKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2xpZGVyTW9kdWxhckNvbnN0cmFjdGlvbnNOZXh0ICgpIHtcbiAgICAgICAgICAgICQoJy5iLW1vZHVsYXItY29uc3RydWN0aW9uc19fc2xpZGVyJykuc2xpY2soJ3NsaWNrTmV4dCcpO1xuICAgICAgICB9LFxuICAgICAgICBzbGlkZXJTcGFuU3RydWN0dXJlc1ByZXYgKCkge1xuICAgICAgICAgICAgJCgnLmItc3Bhbi1zdHJ1Y3R1cmVzX19zbGlkZXInKS5zbGljaygnc2xpY2tQcmV2Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNsaWRlclNwYW5TdHJ1Y3R1cmVzTmV4dCAoKSB7XG4gICAgICAgICAgICAkKCcuYi1zcGFuLXN0cnVjdHVyZXNfX3NsaWRlcicpLnNsaWNrKCdzbGlja05leHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2xpZGVyUmVhbGl6ZWRQcm9qZWN0UmlnaHRTbGlkZSgpIHtcbiAgICAgICAgICAgICQoJy5iLXJlYWxpemVkLXByb2plY3RzX19zbGlkZXInKS5zbGljaygnc2xpY2tQcmV2Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNsaWRlclBvcHVwUmlnaHRTbGlkZSgpIHtcbiAgICAgICAgICAgICQoJy5iLXBvcHVwLXNsaWRlcl9fc2xpZGVyJykuc2xpY2soJ3NsaWNrUHJldicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVkICgpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlckNvdmVySW5pdChzbGlkZXIpIHtcbiAgICAgICAgICAgIHZhciAkc2xpZGVyID0gJChzbGlkZXIpO1xuICAgICAgICAgICAgdmFyICRwcm9ncmVzc0JhciA9ICQoJy5iLW5hdl9fcHJvZ3Jlc3MtYmFyJyk7XG4gICAgICAgICAgICB2YXIgc2xpY2tPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcbiAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICBwYXVzZU9uSG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkKHNsaWRlcikuc2xpY2soc2xpY2tPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIGJ1aWx0LWluIGZlYXR1cmUsIGZvciBtb3JlIGluZm8gY2hlY2sgdGhlIFtkb2NdKGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svKVxuICAgICAgICAgICAgJChzbGlkZXIpLm9uKCdzd2lwZScsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaywgZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmVpbml0U2xpY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLnNsaWNrLWRvdHMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZWluaXRTbGljaygpO1xuICAgICAgICAgICAgICAgICRwcm9ncmVzc0Jhci5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciByZWluaXRTbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzbGlkZXIuc2xpY2soXG4gICAgICAgICAgICAgICAgICAgIFwic2xpY2tTZXRPcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2xpZGVyLm9uKCdpbml0JywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpIHtcbiAgICAgICAgICAgICAgICAkKCcuYi1uYXZfX2l0ZW1fMScpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYi1uYXZfX2l0ZW1fYWN0aXZlJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnVuY3Rpb24gYWRkQW5kUmVtb3ZlQ2xhc3MoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiLW5hdl9faXRlbV9hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ItbmF2X19pdGVtX2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNsaWRlci5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0U2xpZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRBbmRSZW1vdmVDbGFzcygnLmItbmF2X19pdGVtXzEnKTtcbiAgICAgICAgICAgICAgICAgICAgJHByb2dyZXNzQmFyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2xhc3MnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiLW5hdl9fcHJvZ3Jlc3MtYmFyIGItbmF2X19wcm9ncmVzcy1iYXJfZmlyc3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzKCcuYi1uYXZfX2l0ZW1fMicpO1xuICAgICAgICAgICAgICAgICAgICAkcHJvZ3Jlc3NCYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjbGFzcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ItbmF2X19wcm9ncmVzcy1iYXIgYi1uYXZfX3Byb2dyZXNzLWJhcl9zZWNvbmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzKCcuYi1uYXZfX2l0ZW1fMycpO1xuICAgICAgICAgICAgICAgICAgICAkcHJvZ3Jlc3NCYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjbGFzcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ItbmF2X19wcm9ncmVzcy1iYXIgYi1uYXZfX3Byb2dyZXNzLWJhcl90aGlyZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV4dFNsaWRlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3MoJy5iLW5hdl9faXRlbV80Jyk7XG4gICAgICAgICAgICAgICAgICAgICRwcm9ncmVzc0JhclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2NsYXNzJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYi1uYXZfX3Byb2dyZXNzLWJhciBiLW5hdl9fcHJvZ3Jlc3MtYmFyX2ZvdXJ0aCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlckhvdXNlUHJvamVjdEluaXQoc2xpZGVyKSB7XG4gICAgICAgICAgICAkKHNsaWRlcikuZWFjaChmdW5jdGlvbiAoaW5keCwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTIwMCxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJy0zMHB4J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2xpZGVyUmVhbGl6ZWRQcm9qZWN0c0luaXQoc2xpZGVyKSB7XG4gICAgICAgICAgICB2YXIgJHNsaWRlciA9ICQoc2xpZGVyKTtcbiAgICAgICAgICAgICRzbGlkZXIuc2xpY2soe1xuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzcGVlZDogMTUwMCxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcwcHgnLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzbGlkZXJQdWJsaWNCdWlsZGluZ3NJbml0KHNsaWRlcikge1xuICAgICAgICAgICAgdmFyICRzbGlkZXIgPSAkKHNsaWRlcik7XG4gICAgICAgICAgICAkc2xpZGVyLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzbGlkZXJNb2R1bGFyQ29uc3RyYWN0aW9uc0luaXQoc2xpZGVyKSB7XG4gICAgICAgICAgICB2YXIgJHNsaWRlciA9ICQoc2xpZGVyKTtcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbiAoaW5keCwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEyMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLmItbW9kdWxhci1jb25zdHJ1Y3Rpb25zX19zbGlkZXItaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YVNsaWRlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdzbGljay1pbmRleCcpO1xuICAgICAgICAgICAgICAgICQoJy5iLXBvcHVwLXNsaWRlcl9fc2xpZGVyJykuc2xpY2soJ3NsaWNrR29UbycsIGRhdGFTbGlkZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzbGlkZXJTcGFuU3RydWN0dXJlc0luaXQgKHNsaWRlcikge1xuICAgICAgICAgICAgdmFyICRzbGlkZXIgPSAkKHNsaWRlcik7XG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24gKGluZHgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMjAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5iLXNwYW4tc3RydWN0dXJlc19fc2xpZGVyLWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFTbGlkZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnc2xpY2staW5kZXgnKTtcbiAgICAgICAgICAgICAgICAkKCcuYi1wb3B1cC1zbGlkZXJfX3NsaWRlcicpLnNsaWNrKCdzbGlja0dvVG8nLCBkYXRhU2xpZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0SGVpZ2h0KGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoJChlbCkuaGVpZ2h0KCksICQoZWwpLm91dGVySGVpZ2h0KCkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFdpZHRoKGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoJChlbCkud2lkdGgoKSwgJChlbCkub3V0ZXJXaWR0aCgpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuYXZSZXNpemUoKSB7XG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmF2ID0gJCgnLmItbmF2Jyk7XG4gICAgICAgICAgICAgICAgbGV0IG5hdlNjcm9sbGVkID0gJCgnLmItbmF2X19saXN0LXNjcm9sbGVkJyk7XG4gICAgICAgICAgICAgICAgbGV0IG5hdkxpc3QgPSAkKCcuYi1uYXZfX2xpc3QnKTtcbiAgICAgICAgICAgICAgICBsZXQgbmF2TGlzdFdyYXBwZXIgPSAkKCcuYi1uYXZfX2xpc3Qtd3JhcHBlcicpO1xuICAgICAgICAgICAgICAgIGxldCBuYXZMaXN0SXRlbSA9ICQoJy5iLW5hdl9fbGlzdCcpLmZpbmQoJy5iLW5hdl9faXRlbScpO1xuICAgICAgICAgICAgICAgIGxldCBuYXZMaXN0VG9wRmlyc3QgPSAkKG5hdkxpc3QpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICBsZXQgbmF2TGlzdFRvcEN1cnJlbnQgPSAkKG5hdkxpc3QpLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICAgICBsZXQgd2luZG93V2lkdGggPSBnZXRXaWR0aCh3aW5kb3cpO1xuICAgICAgICAgICAgICAgIGxldCBzY3JlZW5Ub3AgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVySGVpZ2h0ID0gZ2V0SGVpZ2h0KCcuYi1uYXYnKTtcbiAgICAgICAgICAgICAgICAvLyBsZXQgZGlmZiA9IG5hdkxpc3RUb3BGaXJzdCAtIGhlYWRlckhlaWdodDtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCduYXZMaXN0VG9wRmlyc3Q6ICcgKyBuYXZMaXN0VG9wRmlyc3QpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCduYXZMaXN0VG9wQ3VycmVudDogJyArIG5hdkxpc3RUb3BDdXJyZW50KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NyZWVuVG9wOiAnICsgc2NyZWVuVG9wKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGVhZGVySGVpZ2h0OiAnICsgaGVhZGVySGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGlmZjogJyArIGRpZmYpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0tLS0tIC0tLS0tLS0gLS0tLS0tLScpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNhbGNXaWR0aCA9IDc2NSArICh3aW5kb3dXaWR0aCAtIDc2NSkgKiBuYXZMaXN0VG9wQ3VycmVudCAvIG5hdkxpc3RUb3BGaXJzdDtcbiAgICAgICAgICAgICAgICBpZiAoY2FsY1dpZHRoIDw9IDc2NSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjV2lkdGggPSA3NjU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjYWxjRm9udFNpemUgPSAxNiArICgxOCAtIDE2KSAqIG5hdkxpc3RUb3BDdXJyZW50IC8gbmF2TGlzdFRvcEZpcnN0O1xuICAgICAgICAgICAgICAgIGlmIChjYWxjRm9udFNpemUgPD0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsY0ZvbnRTaXplID0gMTY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjYWxjTGluZUhlaWdodCA9IDEuMTI1ICsgKDEuMTY2NiAtIDEuMTI1KSAqIG5hdkxpc3RUb3BDdXJyZW50IC8gbmF2TGlzdFRvcEZpcnN0O1xuICAgICAgICAgICAgICAgIGlmIChjYWxjTGluZUhlaWdodCA8PSAxLjEyNSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjTGluZUhlaWdodCA9IDEuMTI1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY2FsY0hlaWdodCA9IDEwMCArICgxNDAgLSAxMDApICogbmF2TGlzdFRvcEN1cnJlbnQgLyBuYXZMaXN0VG9wRmlyc3Q7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGNIZWlnaHQgPD0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGNIZWlnaHQgPSAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQobmF2TGlzdFdyYXBwZXIpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGNhbGNXaWR0aCArICdweCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKG5hdkxpc3RJdGVtKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogY2FsY0ZvbnRTaXplICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogY2FsY0xpbmVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnOiBjYWxjSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaGVhZGVySGVpZ2h0ID49IG5hdkxpc3RUb3BDdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICQobmF2U2Nyb2xsZWQpLmFkZENsYXNzKCdiLW5hdl9fbGlzdC1zY3JvbGxlZF9hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJChuYXZMaXN0KS5hZGRDbGFzcygnYi1uYXZfX2xpc3RfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICQobmF2KS5hZGRDbGFzcygnYi1uYXZfYmctY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvd1dpZHRoIDwgMTA4NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChuYXZMaXN0KS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChuYXZMaXN0KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2NyZWVuVG9wIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJChuYXZTY3JvbGxlZCkucmVtb3ZlQ2xhc3MoJ2ItbmF2X19saXN0LXNjcm9sbGVkX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkKG5hdkxpc3QpLnJlbW92ZUNsYXNzKCdiLW5hdl9fbGlzdF9hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJChuYXYpLnJlbW92ZUNsYXNzKCdiLW5hdl9iZy1jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93V2lkdGggPCAxMDg1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG5hdkxpc3QpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQobmF2TGlzdFdyYXBwZXIpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiAxMDAgKyAnJSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICQobmF2TGlzdEl0ZW0pLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzE4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogMS4xNjY2LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6ICcxNDBweCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmF2U2Nyb2xsZWRDbGlja2VkICgpIHtcbiAgICAgICAgICAgIHZhciBuYXZTY3JvbGxlZEl0ZW0gPSAkKCcuYi1uYXZfX2xpc3Qtc2Nyb2xsZWQtaXRlbScpO1xuICAgICAgICAgICAgJChuYXZTY3JvbGxlZEl0ZW0pLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYi1uYXZfX2xpc3Qtc2Nyb2xsZWQtaXRlbV9hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ItbmF2X19saXN0LXNjcm9sbGVkLWl0ZW1fYWN0aXZlJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlclBvcHVwSW5pdChzbGlkZXIpIHtcbiAgICAgICAgICAgICQoc2xpZGVyKS5lYWNoKGZ1bmN0aW9uIChpbmR4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEyMDAsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ29vZ2xlTWFwICgpIHtcbiAgICAgICAgICAgICQoJy5iLWNvbnRhY3RzX19tYXAnKVxuICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy52dWUtbWFwJykuYWRkQ2xhc3MoJ2NsaWNrZWQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcudnVlLW1hcCcpLnJlbW92ZUNsYXNzKCdjbGlja2VkJylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzbGlkZXJDb3ZlckluaXQoJy5iLWNvdmVyX19zbGlkZXInKTtcbiAgICAgICAgc2xpZGVySG91c2VQcm9qZWN0SW5pdCgnLmItaG91c2UtcHJvamVjdHNfX3NsaWRlcicpO1xuICAgICAgICBzbGlkZXJSZWFsaXplZFByb2plY3RzSW5pdCgnLmItcmVhbGl6ZWQtcHJvamVjdHNfX3NsaWRlcicpO1xuICAgICAgICBzbGlkZXJNb2R1bGFyQ29uc3RyYWN0aW9uc0luaXQoJy5iLW1vZHVsYXItY29uc3RydWN0aW9uc19fc2xpZGVyJyk7XG4gICAgICAgIHNsaWRlclNwYW5TdHJ1Y3R1cmVzSW5pdCgnLmItc3Bhbi1zdHJ1Y3R1cmVzX19zbGlkZXInKTtcbiAgICAgICAgc2xpZGVyUHVibGljQnVpbGRpbmdzSW5pdCgnLmItcHVibGljLWJ1aWxkaW5nc19fc2xpZGVyJyk7XG4gICAgICAgIHNsaWRlclBvcHVwSW5pdCgnLmItcG9wdXAtc2xpZGVyX19zbGlkZXInKTtcbiAgICAgICAgbmF2UmVzaXplKCk7XG4gICAgICAgIGdvb2dsZU1hcCgpO1xuICAgICAgICBuYXZTY3JvbGxlZENsaWNrZWQoKTtcbiAgICB9XG59KTsiXX0=
