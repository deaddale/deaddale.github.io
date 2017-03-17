(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(
    function () {
        // Заводим новый блок (calc, так как есть блок calc)
        var packTableBlock = {};

        // Регистрация
        WindCore.blockRegister(
            // Новый блок объединяется с существующим "WindBlock" (почитать подробнее про extend)
            $.extend(
                packTableBlock,
                WindBlock, {
                    // Устанавливаем родительский блок
                    getSelector: function () {
                        return '.js-content';
                    },
                    // Возвращает массив объектов с которыми работаем
                    getBindings: function () {
                        // Сохраняем текущий контекст
                        var self = this;

                        return [
                            // Следующий слайд (с первого)
                            [
                                'click',
                                '.js-scroll-to-next-slide',
                                function (event) {
                                    event.preventDefault();
                                    // Действие
                                    $('#fp-nav ul li:nth-child(2) a span').click();
                                    console.log('9')
                                }
                            ],
                            // Предыдущий слайд (с последнего)
                            [
                                'click',
                                '.js-scroll-to-top-slide',
                                function (event) {
                                    event.preventDefault();
                                    // Действие
                                    $('#fp-nav ul li:nth-child(1) a span').click();
                                }
                            ]
                        ];
                    },
                    // Вызывается при загрузке странице
                    // $target - получаем в getSelector
                    initialize: function ($target) {
                        // full page plugin : begin
                        $target.fullpage({
                            navigation: true,
                            slidesNavigation: false,
                            normalScrollElements: '.b-preloader',
                            css3: true,
                            controlArrows: true,
                            verticalCentered: true,
                            onLeave: function (index, nextIndex, direction) {
                                var navLink = $('#fp-nav');
                                var socIcon = $('.b-soc-networks');

                                if (nextIndex !== 1 || nextIndex !== 7) {
                                    $(navLink).addClass('black');
                                    $(socIcon).addClass('black');
                                }
                                else {
                                    $(navLink).removeClass('black');
                                    $(socIcon).removeClass('black');
                                }

                                $(this).next('.section').find('.b-advantages').find('img').addClass('animated fadeInDown');
                                $(this).next('.section').find('.b-advantages').find('a:last-child').addClass('animated fadeInDown');
                            }
                        });
                        // full page plugin : end

                        // animate page : begin
                        // Social icons and navigation
                        $('.b-soc-networks').addClass('animated fadeInLeft');
                        $('#fp-nav').addClass('animated fadeInRight');

                        // section first
                        var sectionFirst = $('.section.first');
                        sectionFirst.find('h1').addClass('animated slideInDown');
                        sectionFirst.find('.b-scroll-to.-next-slide').addClass('animated slideInUp');
                        // animate page : end
                    }
                }
            )
        );
    }()
);
},{}],2:[function(require,module,exports){
(
	function () {
		// Заводим новый блок (calc, так как есть блок calc)
		var packTableBlock = {};

		// Регистрация
		WindCore.blockRegister(
			// Новый блок объединяется с существующим "WindBlock" (почитать подробнее про extend)
			$.extend(
				packTableBlock,
				WindBlock, {
					// Устанавливаем родительский блок
					getSelector: function () {
						return '.js-parent';
					},
					// Возвращает массив объектов с которыми работаем
					getBindings: function () {
						// Сохраняем текущий контекст
						var self = this;

						return [
							// Клик на дочерний блок
							[
								'click',
								'.js-child',
								function (event) {
									event.preventDefault();
									// Действие
								}
							]
						];
					},
					// Вызывается при загрузке странице
					// $target - получаем в getSelector
					initialize: function ($target) {
						// У Кира еще раз уточнить что это за фигня
						this.$table = $target;
					},
					// Добавить новую упаковку в таблицу
					addPackToTable: function () {
						var self = this;
					}
				}
			)
		);
	}()
);
},{}],3:[function(require,module,exports){
// preloader : begin
$(window).on('load', function () {
    var body = $('body');
    var preloader = $('.b-preloader');
    var fpNav = $('#fp-nav');

    function preloaderAnim() {
        $(preloader).fadeOut('slow');
    }
    setTimeout(preloaderAnim(), 500);
});
// preloader : end
},{}],4:[function(require,module,exports){
(function() {
    WindCore.blocksRun(WindCore.$body);
})();
},{}]},{},[1,2,3,4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYmxvY2tzL2Rldi9jb250ZW50L2pzL2pzLWNvbnRlbnQuanMiLCJwdWJsaWMvYmxvY2tzL2dsb2JhbC9qcy9qcy1nbG9iYWwuanMiLCJwdWJsaWMvYmxvY2tzL3ByZWxvYWRlci9qcy9qcy1wcmVsb2FkZXIuanMiLCJwdWJsaWMvcG9ydGZvbGlvLXByb2plY3QuYnVuZGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vINCX0LDQstC+0LTQuNC8INC90L7QstGL0Lkg0LHQu9C+0LogKGNhbGMsINGC0LDQuiDQutCw0Log0LXRgdGC0Ywg0LHQu9C+0LogY2FsYylcbiAgICAgICAgdmFyIHBhY2tUYWJsZUJsb2NrID0ge307XG5cbiAgICAgICAgLy8g0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1xuICAgICAgICBXaW5kQ29yZS5ibG9ja1JlZ2lzdGVyKFxuICAgICAgICAgICAgLy8g0J3QvtCy0YvQuSDQsdC70L7QuiDQvtCx0YrQtdC00LjQvdGP0LXRgtGB0Y8g0YEg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC8IFwiV2luZEJsb2NrXCIgKNC/0L7Rh9C40YLQsNGC0Ywg0L/QvtC00YDQvtCx0L3QtdC1INC/0YDQviBleHRlbmQpXG4gICAgICAgICAgICAkLmV4dGVuZChcbiAgICAgICAgICAgICAgICBwYWNrVGFibGVCbG9jayxcbiAgICAgICAgICAgICAgICBXaW5kQmxvY2ssIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INCx0LvQvtC6XG4gICAgICAgICAgICAgICAgICAgIGdldFNlbGVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJy5qcy1jb250ZW50JztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8g0JLQvtC30LLRgNCw0YnQsNC10YIg0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LIg0YEg0LrQvtGC0L7RgNGL0LzQuCDRgNCw0LHQvtGC0LDQtdC8XG4gICAgICAgICAgICAgICAgICAgIGdldEJpbmRpbmdzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQodC+0YXRgNCw0L3Rj9C10Lwg0YLQtdC60YPRidC40Lkg0LrQvtC90YLQtdC60YHRglxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINCh0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0ICjRgSDQv9C10YDQstC+0LPQvilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuanMtc2Nyb2xsLXRvLW5leHQtc2xpZGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQlNC10LnRgdGC0LLQuNC1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZnAtbmF2IHVsIGxpOm50aC1jaGlsZCgyKSBhIHNwYW4nKS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzknKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0ICjRgSDQv9C+0YHQu9C10LTQvdC10LPQvilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuanMtc2Nyb2xsLXRvLXRvcC1zbGlkZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINCU0LXQudGB0YLQstC40LVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNmcC1uYXYgdWwgbGk6bnRoLWNoaWxkKDEpIGEgc3BhbicpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvLyDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtC1XG4gICAgICAgICAgICAgICAgICAgIC8vICR0YXJnZXQgLSDQv9C+0LvRg9GH0LDQtdC8INCyIGdldFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmdWxsIHBhZ2UgcGx1Z2luIDogYmVnaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0YXJnZXQuZnVsbHBhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsU2Nyb2xsRWxlbWVudHM6ICcuYi1wcmVsb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbEFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbENlbnRlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTGVhdmU6IGZ1bmN0aW9uIChpbmRleCwgbmV4dEluZGV4LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hdkxpbmsgPSAkKCcjZnAtbmF2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzb2NJY29uID0gJCgnLmItc29jLW5ldHdvcmtzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRJbmRleCAhPT0gMSB8fCBuZXh0SW5kZXggIT09IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobmF2TGluaykuYWRkQ2xhc3MoJ2JsYWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNvY0ljb24pLmFkZENsYXNzKCdibGFjaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChuYXZMaW5rKS5yZW1vdmVDbGFzcygnYmxhY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc29jSWNvbikucmVtb3ZlQ2xhc3MoJ2JsYWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm5leHQoJy5zZWN0aW9uJykuZmluZCgnLmItYWR2YW50YWdlcycpLmZpbmQoJ2ltZycpLmFkZENsYXNzKCdhbmltYXRlZCBmYWRlSW5Eb3duJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykubmV4dCgnLnNlY3Rpb24nKS5maW5kKCcuYi1hZHZhbnRhZ2VzJykuZmluZCgnYTpsYXN0LWNoaWxkJykuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJbkRvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZ1bGwgcGFnZSBwbHVnaW4gOiBlbmRcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5pbWF0ZSBwYWdlIDogYmVnaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNvY2lhbCBpY29ucyBhbmQgbmF2aWdhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmItc29jLW5ldHdvcmtzJykuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJbkxlZnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNmcC1uYXYnKS5hZGRDbGFzcygnYW5pbWF0ZWQgZmFkZUluUmlnaHQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VjdGlvbiBmaXJzdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlY3Rpb25GaXJzdCA9ICQoJy5zZWN0aW9uLmZpcnN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uRmlyc3QuZmluZCgnaDEnKS5hZGRDbGFzcygnYW5pbWF0ZWQgc2xpZGVJbkRvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25GaXJzdC5maW5kKCcuYi1zY3JvbGwtdG8uLW5leHQtc2xpZGUnKS5hZGRDbGFzcygnYW5pbWF0ZWQgc2xpZGVJblVwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmltYXRlIHBhZ2UgOiBlbmRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9KClcbik7IiwiKFxuXHRmdW5jdGlvbiAoKSB7XG5cdFx0Ly8g0JfQsNCy0L7QtNC40Lwg0L3QvtCy0YvQuSDQsdC70L7QuiAoY2FsYywg0YLQsNC6INC60LDQuiDQtdGB0YLRjCDQsdC70L7QuiBjYWxjKVxuXHRcdHZhciBwYWNrVGFibGVCbG9jayA9IHt9O1xuXG5cdFx0Ly8g0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1xuXHRcdFdpbmRDb3JlLmJsb2NrUmVnaXN0ZXIoXG5cdFx0XHQvLyDQndC+0LLRi9C5INCx0LvQvtC6INC+0LHRitC10LTQuNC90Y/QtdGC0YHRjyDRgSDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LwgXCJXaW5kQmxvY2tcIiAo0L/QvtGH0LjRgtCw0YLRjCDQv9C+0LTRgNC+0LHQvdC10LUg0L/RgNC+IGV4dGVuZClcblx0XHRcdCQuZXh0ZW5kKFxuXHRcdFx0XHRwYWNrVGFibGVCbG9jayxcblx0XHRcdFx0V2luZEJsb2NrLCB7XG5cdFx0XHRcdFx0Ly8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INCx0LvQvtC6XG5cdFx0XHRcdFx0Z2V0U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnLmpzLXBhcmVudCc7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQktC+0LfQstGA0LDRidCw0LXRgiDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QsiDRgSDQutC+0YLQvtGA0YvQvNC4INGA0LDQsdC+0YLQsNC10Lxcblx0XHRcdFx0XHRnZXRCaW5kaW5nczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0Ly8g0KHQvtGF0YDQsNC90Y/QtdC8INGC0LXQutGD0YnQuNC5INC60L7QvdGC0LXQutGB0YJcblx0XHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHRcdFx0Ly8g0JrQu9C40Log0L3QsCDQtNC+0YfQtdGA0L3QuNC5INCx0LvQvtC6XG5cdFx0XHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFx0XHQnY2xpY2snLFxuXHRcdFx0XHRcdFx0XHRcdCcuanMtY2hpbGQnLFxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vINCU0LXQudGB0YLQstC40LVcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdF07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtC1XG5cdFx0XHRcdFx0Ly8gJHRhcmdldCAtINC/0L7Qu9GD0YfQsNC10Lwg0LIgZ2V0U2VsZWN0b3Jcblx0XHRcdFx0XHRpbml0aWFsaXplOiBmdW5jdGlvbiAoJHRhcmdldCkge1xuXHRcdFx0XHRcdFx0Ly8g0KMg0JrQuNGA0LAg0LXRidC1INGA0LDQtyDRg9GC0L7Rh9C90LjRgtGMINGH0YLQviDRjdGC0L4g0LfQsCDRhNC40LPQvdGPXG5cdFx0XHRcdFx0XHR0aGlzLiR0YWJsZSA9ICR0YXJnZXQ7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQlNC+0LHQsNCy0LjRgtGMINC90L7QstGD0Y4g0YPQv9Cw0LrQvtCy0LrRgyDQsiDRgtCw0LHQu9C40YbRg1xuXHRcdFx0XHRcdGFkZFBhY2tUb1RhYmxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpXG5cdFx0KTtcblx0fSgpXG4pOyIsIi8vIHByZWxvYWRlciA6IGJlZ2luXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgdmFyIHByZWxvYWRlciA9ICQoJy5iLXByZWxvYWRlcicpO1xuICAgIHZhciBmcE5hdiA9ICQoJyNmcC1uYXYnKTtcblxuICAgIGZ1bmN0aW9uIHByZWxvYWRlckFuaW0oKSB7XG4gICAgICAgICQocHJlbG9hZGVyKS5mYWRlT3V0KCdzbG93Jyk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQocHJlbG9hZGVyQW5pbSgpLCA1MDApO1xufSk7XG4vLyBwcmVsb2FkZXIgOiBlbmQiLCIoZnVuY3Rpb24oKSB7XG4gICAgV2luZENvcmUuYmxvY2tzUnVuKFdpbmRDb3JlLiRib2R5KTtcbn0pKCk7Il19
