(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = new Vue({
    el: '#app',
    data: function () {
        return {
		}
    },
	computed: {
    	// Animate spike
		animateSpike: function () {
			// mouse move
			mouseMoveMethod = function (event) {
				var pageYOffset = window.pageYOffset;
				var docWidth = $(window).outerWidth();

				// Если скролл больше 1400
				if (pageYOffset >= 1400) {
					$('.cover__spike').css(
						'transform', 'translateX(0px), translateY(0px);'
					);
					$('.seeds').addClass('seeds_disable-mouse-motion');
				}
				// Если ширина документа меньше
				if (docWidth < 1200) {
					$('.cover__spike').css(
						'transform', 'translateX(0px), translateY(0px)'
					);
					$('.seeds').addClass('seeds_disable-mouse-motion');
				}
				// В остальных случаях
				if (pageYOffset < 1400 && docWidth > 1200) {
					$('.cover__spike').css(
						'transform', 'translateX(' + (event.pageX / 200) + 'px)'
						+ 'translateY(' + ((event.pageY / 200)) + 'px)'
					);
					$('.seeds')
						.removeClass('seeds_disable-mouse-motion')
						.css(
						'transform', 'translateX(' + (event.pageX / 200) + 'px)'
						+ 'translateY(' + ((event.pageY / 200)) + 'px)'
					);
				}
			};
			if ($(window).width() >= 1200) {
				// document.addEventListener('mousemove', mouseMoveMethod);
			}
		},
		// Cut and paste content
		cutAndPasteСontent: function () {
			function move() {
				$('.cover__special-wrapper').appendTo('#app');
				$('.header').prependTo('#app');
				$('.seeds').prependTo('.composition');
			}

			window.addEventListener('load', function (event) {
				if ($(window).width() < 1200) {
					move();
				}
			});
		},
		// Scroll to element
		scrollToEl: function () {
			window.addEventListener('load', function (event) {
				if ($(window).width() < 1200) {
					function fadeIn(element) {
						$(element).each(function (i) {
							var bottomOfObject = $(element).offset().top + $(element).outerHeight();
							var bottomOfWindow = $(window).scrollTop() + $(window).outerHeight();
							var elementClass = element + '_active';
							elementClass = elementClass.replace(/\./g, "");
							if (bottomOfWindow > bottomOfObject) {
								$(element).addClass(elementClass);
							}
						});
					}

					document.addEventListener('scroll', function (event) {
						fadeIn('.composition__title');
						fadeIn('.composition__list');
						fadeIn('.composition__vitamins');
						fadeIn('.bottle__title');
						fadeIn('.bottle__text');
						fadeIn('.bottle__list');
						fadeIn('.product-first__text-wrapper');
						fadeIn('.product-second__text-wrapper');
						fadeIn('.product-third__text-wrapper');
						fadeIn('.product-fourth__text-wrapper');
						fadeIn('.seeds__seed_1');
						fadeIn('.seeds__seed_2');
						fadeIn('.seeds__seed_3');
						fadeIn('.seeds__seed_4');
						fadeIn('.seeds__seed_5');
						fadeIn('.seeds__seed_6');
						fadeIn('.seeds__seed_7');
						fadeIn('.seeds__seed_8');
					});
					setTimeout(fadeIn('.cover__text-wrapper'), 3400);
				}
			});
		},
		// Show first slide
		showFirstSlide: function (event) {
			// show ANIMATE : begin
			// * cover
			function showCover() {
				$('.cover__background').fadeIn(500);
			}
			// * header
			function showHeader() {
				$('.header').animate({
					top: '0',
					opacity: '1'
				}, 500);
			}
			// * spike
			function showSpike() {
				$('.cover__spike').fadeIn(300);
			}
			// * show text
			function showText(element) {
				// Расстояние от скролла до верха страницы
				var valueToTopDoc = $(document).scrollTop();
				var el = $('.cover__text.cover__text_first');
				// Событие загрузки страницы (показываем первый текстовый блок)
				$(el).addClass('cover__text_first_active');
				// Событие скролла документа
				document.addEventListener('scroll', function (event) {
					var valueTop = $(window).scrollTop();
					// Если проскроллли меньше 800 от верха документа
					if (valueTop < 200) {
						$(el).addClass('cover__text_first_active');
					}
					// Если проскроллли больше 800
					else {
						$(el).removeClass('cover__text_first_active');
					}
				});
			}
			// * call animate function
			window.addEventListener('load', function (event) {
				setTimeout(showCover, 2300);
				setTimeout(showHeader, 2800);
				setTimeout(showSpike, 3100);
				if ($(window).width() >= 1200) {
					setTimeout(showText, 3400);
				}
			});
			// show ANIMATE : end
		}
	}
});

// skrollr init : начало
$(function () {
	if ($(window).width() >= 1200) {
		skrollr.init();
	}
	else {
		skrollr.init().destroy();
	}
});
// skrollr init : конец

// прелоадер : начало
(function () {
	$('.preloader__number-value').animate({ num: 100 - 3 }, {
		duration: 1800,
		step: function (num) {
			this.innerHTML = (num + 3).toFixed(0)
		}
	});

	function fadeOutPreloader() {
		$('body').addClass('body_active');
		$('.preloader').fadeOut(550);
	}

	// function detectLandscape() {
	// 	function getWidth(el) {
	// 		return Math.max($(el).width(), $(el).outerWidth());
	// 	}
	// 	function changeClass() {
	// 		if (window.innerWidth > window.innerHeight) {
	// 			var docWidth = getWidth(window);
	// 			var block = $('.alert');
	// 			if (docWidth < 768) {
	// 				$(block).addClass('alert_active');
	// 			}
	// 			else {
	// 				$(block).removeClass('alert_active');
	// 			}
	// 		}
	// 	}
	// 	window.addEventListener("orientationchange", function() {
	// 		changeClass();
	// 	}, false);
	// 	window.addEventListener('load', changeClass());
	// }
	// detectLandscape();

	TweenMax.to('.mask-rect', 1.8, {
		attr:{height: 0},
		yoyo: true,
		repeat: 0,
		ease: Power2.easeInOut
	});

	window.addEventListener('load', function (event) {
		setTimeout(fadeOutPreloader, 1800)
	});
})();
// прелоадер : конец
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcblx0XHR9XG4gICAgfSxcblx0Y29tcHV0ZWQ6IHtcbiAgICBcdC8vIEFuaW1hdGUgc3Bpa2Vcblx0XHRhbmltYXRlU3Bpa2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIG1vdXNlIG1vdmVcblx0XHRcdG1vdXNlTW92ZU1ldGhvZCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHR2YXIgcGFnZVlPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdFx0XHRcdHZhciBkb2NXaWR0aCA9ICQod2luZG93KS5vdXRlcldpZHRoKCk7XG5cblx0XHRcdFx0Ly8g0JXRgdC70Lgg0YHQutGA0L7Qu9C7INCx0L7Qu9GM0YjQtSAxNDAwXG5cdFx0XHRcdGlmIChwYWdlWU9mZnNldCA+PSAxNDAwKSB7XG5cdFx0XHRcdFx0JCgnLmNvdmVyX19zcGlrZScpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwcHgpLCB0cmFuc2xhdGVZKDBweCk7J1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0JCgnLnNlZWRzJykuYWRkQ2xhc3MoJ3NlZWRzX2Rpc2FibGUtbW91c2UtbW90aW9uJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8g0JXRgdC70Lgg0YjQuNGA0LjQvdCwINC00L7QutGD0LzQtdC90YLQsCDQvNC10L3RjNGI0LVcblx0XHRcdFx0aWYgKGRvY1dpZHRoIDwgMTIwMCkge1xuXHRcdFx0XHRcdCQoJy5jb3Zlcl9fc3Bpa2UnKS5jc3MoXG5cdFx0XHRcdFx0XHQndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMHB4KSwgdHJhbnNsYXRlWSgwcHgpJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0JCgnLnNlZWRzJykuYWRkQ2xhc3MoJ3NlZWRzX2Rpc2FibGUtbW91c2UtbW90aW9uJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8g0JIg0L7RgdGC0LDQu9GM0L3Ri9GFINGB0LvRg9GH0LDRj9GFXG5cdFx0XHRcdGlmIChwYWdlWU9mZnNldCA8IDE0MDAgJiYgZG9jV2lkdGggPiAxMjAwKSB7XG5cdFx0XHRcdFx0JCgnLmNvdmVyX19zcGlrZScpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgKGV2ZW50LnBhZ2VYIC8gMjAwKSArICdweCknXG5cdFx0XHRcdFx0XHQrICd0cmFuc2xhdGVZKCcgKyAoKGV2ZW50LnBhZ2VZIC8gMjAwKSkgKyAncHgpJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0JCgnLnNlZWRzJylcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnc2VlZHNfZGlzYWJsZS1tb3VzZS1tb3Rpb24nKVxuXHRcdFx0XHRcdFx0LmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgKGV2ZW50LnBhZ2VYIC8gMjAwKSArICdweCknXG5cdFx0XHRcdFx0XHQrICd0cmFuc2xhdGVZKCcgKyAoKGV2ZW50LnBhZ2VZIC8gMjAwKSkgKyAncHgpJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gMTIwMCkge1xuXHRcdFx0XHQvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmVNZXRob2QpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Ly8gQ3V0IGFuZCBwYXN0ZSBjb250ZW50XG5cdFx0Y3V0QW5kUGFzdGXQoW9udGVudDogZnVuY3Rpb24gKCkge1xuXHRcdFx0ZnVuY3Rpb24gbW92ZSgpIHtcblx0XHRcdFx0JCgnLmNvdmVyX19zcGVjaWFsLXdyYXBwZXInKS5hcHBlbmRUbygnI2FwcCcpO1xuXHRcdFx0XHQkKCcuaGVhZGVyJykucHJlcGVuZFRvKCcjYXBwJyk7XG5cdFx0XHRcdCQoJy5zZWVkcycpLnByZXBlbmRUbygnLmNvbXBvc2l0aW9uJyk7XG5cdFx0XHR9XG5cblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDEyMDApIHtcblx0XHRcdFx0XHRtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0Ly8gU2Nyb2xsIHRvIGVsZW1lbnRcblx0XHRzY3JvbGxUb0VsOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCAxMjAwKSB7XG5cdFx0XHRcdFx0ZnVuY3Rpb24gZmFkZUluKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdCQoZWxlbWVudCkuZWFjaChmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgYm90dG9tT2ZPYmplY3QgPSAkKGVsZW1lbnQpLm9mZnNldCgpLnRvcCArICQoZWxlbWVudCkub3V0ZXJIZWlnaHQoKTtcblx0XHRcdFx0XHRcdFx0dmFyIGJvdHRvbU9mV2luZG93ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLm91dGVySGVpZ2h0KCk7XG5cdFx0XHRcdFx0XHRcdHZhciBlbGVtZW50Q2xhc3MgPSBlbGVtZW50ICsgJ19hY3RpdmUnO1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50Q2xhc3MgPSBlbGVtZW50Q2xhc3MucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRpZiAoYm90dG9tT2ZXaW5kb3cgPiBib3R0b21PZk9iamVjdCkge1xuXHRcdFx0XHRcdFx0XHRcdCQoZWxlbWVudCkuYWRkQ2xhc3MoZWxlbWVudENsYXNzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5jb21wb3NpdGlvbl9fdGl0bGUnKTtcblx0XHRcdFx0XHRcdGZhZGVJbignLmNvbXBvc2l0aW9uX19saXN0Jyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5jb21wb3NpdGlvbl9fdml0YW1pbnMnKTtcblx0XHRcdFx0XHRcdGZhZGVJbignLmJvdHRsZV9fdGl0bGUnKTtcblx0XHRcdFx0XHRcdGZhZGVJbignLmJvdHRsZV9fdGV4dCcpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuYm90dGxlX19saXN0Jyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5wcm9kdWN0LWZpcnN0X190ZXh0LXdyYXBwZXInKTtcblx0XHRcdFx0XHRcdGZhZGVJbignLnByb2R1Y3Qtc2Vjb25kX190ZXh0LXdyYXBwZXInKTtcblx0XHRcdFx0XHRcdGZhZGVJbignLnByb2R1Y3QtdGhpcmRfX3RleHQtd3JhcHBlcicpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcucHJvZHVjdC1mb3VydGhfX3RleHQtd3JhcHBlcicpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuc2VlZHNfX3NlZWRfMScpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuc2VlZHNfX3NlZWRfMicpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuc2VlZHNfX3NlZWRfMycpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuc2VlZHNfX3NlZWRfNCcpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuc2VlZHNfX3NlZWRfNScpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuc2VlZHNfX3NlZWRfNicpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuc2VlZHNfX3NlZWRfNycpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuc2VlZHNfX3NlZWRfOCcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZmFkZUluKCcuY292ZXJfX3RleHQtd3JhcHBlcicpLCAzNDAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHQvLyBTaG93IGZpcnN0IHNsaWRlXG5cdFx0c2hvd0ZpcnN0U2xpZGU6IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0Ly8gc2hvdyBBTklNQVRFIDogYmVnaW5cblx0XHRcdC8vICogY292ZXJcblx0XHRcdGZ1bmN0aW9uIHNob3dDb3ZlcigpIHtcblx0XHRcdFx0JCgnLmNvdmVyX19iYWNrZ3JvdW5kJykuZmFkZUluKDUwMCk7XG5cdFx0XHR9XG5cdFx0XHQvLyAqIGhlYWRlclxuXHRcdFx0ZnVuY3Rpb24gc2hvd0hlYWRlcigpIHtcblx0XHRcdFx0JCgnLmhlYWRlcicpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdHRvcDogJzAnLFxuXHRcdFx0XHRcdG9wYWNpdHk6ICcxJ1xuXHRcdFx0XHR9LCA1MDApO1xuXHRcdFx0fVxuXHRcdFx0Ly8gKiBzcGlrZVxuXHRcdFx0ZnVuY3Rpb24gc2hvd1NwaWtlKCkge1xuXHRcdFx0XHQkKCcuY292ZXJfX3NwaWtlJykuZmFkZUluKDMwMCk7XG5cdFx0XHR9XG5cdFx0XHQvLyAqIHNob3cgdGV4dFxuXHRcdFx0ZnVuY3Rpb24gc2hvd1RleHQoZWxlbWVudCkge1xuXHRcdFx0XHQvLyDQoNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINGB0LrRgNC+0LvQu9CwINC00L4g0LLQtdGA0YXQsCDRgdGC0YDQsNC90LjRhtGLXG5cdFx0XHRcdHZhciB2YWx1ZVRvVG9wRG9jID0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCk7XG5cdFx0XHRcdHZhciBlbCA9ICQoJy5jb3Zlcl9fdGV4dC5jb3Zlcl9fdGV4dF9maXJzdCcpO1xuXHRcdFx0XHQvLyDQodC+0LHRi9GC0LjQtSDQt9Cw0LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YsgKNC/0L7QutCw0LfRi9Cy0LDQtdC8INC/0LXRgNCy0YvQuSDRgtC10LrRgdGC0L7QstGL0Lkg0LHQu9C+0LopXG5cdFx0XHRcdCQoZWwpLmFkZENsYXNzKCdjb3Zlcl9fdGV4dF9maXJzdF9hY3RpdmUnKTtcblx0XHRcdFx0Ly8g0KHQvtCx0YvRgtC40LUg0YHQutGA0L7Qu9C70LAg0LTQvtC60YPQvNC10L3RgtCwXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdHZhciB2YWx1ZVRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblx0XHRcdFx0XHQvLyDQldGB0LvQuCDQv9GA0L7RgdC60YDQvtC70LvQu9C4INC80LXQvdGM0YjQtSA4MDAg0L7RgiDQstC10YDRhdCwINC00L7QutGD0LzQtdC90YLQsFxuXHRcdFx0XHRcdGlmICh2YWx1ZVRvcCA8IDIwMCkge1xuXHRcdFx0XHRcdFx0JChlbCkuYWRkQ2xhc3MoJ2NvdmVyX190ZXh0X2ZpcnN0X2FjdGl2ZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyDQldGB0LvQuCDQv9GA0L7RgdC60YDQvtC70LvQu9C4INCx0L7Qu9GM0YjQtSA4MDBcblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCQoZWwpLnJlbW92ZUNsYXNzKCdjb3Zlcl9fdGV4dF9maXJzdF9hY3RpdmUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0Ly8gKiBjYWxsIGFuaW1hdGUgZnVuY3Rpb25cblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoc2hvd0NvdmVyLCAyMzAwKTtcblx0XHRcdFx0c2V0VGltZW91dChzaG93SGVhZGVyLCAyODAwKTtcblx0XHRcdFx0c2V0VGltZW91dChzaG93U3Bpa2UsIDMxMDApO1xuXHRcdFx0XHRpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gMTIwMCkge1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoc2hvd1RleHQsIDM0MDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdC8vIHNob3cgQU5JTUFURSA6IGVuZFxuXHRcdH1cblx0fVxufSk7XG5cbi8vIHNrcm9sbHIgaW5pdCA6INC90LDRh9Cw0LvQvlxuJChmdW5jdGlvbiAoKSB7XG5cdGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMjAwKSB7XG5cdFx0c2tyb2xsci5pbml0KCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0c2tyb2xsci5pbml0KCkuZGVzdHJveSgpO1xuXHR9XG59KTtcbi8vIHNrcm9sbHIgaW5pdCA6INC60L7QvdC10YZcblxuLy8g0L/RgNC10LvQvtCw0LTQtdGAIDog0L3QsNGH0LDQu9C+XG4oZnVuY3Rpb24gKCkge1xuXHQkKCcucHJlbG9hZGVyX19udW1iZXItdmFsdWUnKS5hbmltYXRlKHsgbnVtOiAxMDAgLSAzIH0sIHtcblx0XHRkdXJhdGlvbjogMTgwMCxcblx0XHRzdGVwOiBmdW5jdGlvbiAobnVtKSB7XG5cdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApXG5cdFx0fVxuXHR9KTtcblxuXHRmdW5jdGlvbiBmYWRlT3V0UHJlbG9hZGVyKCkge1xuXHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnYm9keV9hY3RpdmUnKTtcblx0XHQkKCcucHJlbG9hZGVyJykuZmFkZU91dCg1NTApO1xuXHR9XG5cblx0Ly8gZnVuY3Rpb24gZGV0ZWN0TGFuZHNjYXBlKCkge1xuXHQvLyBcdGZ1bmN0aW9uIGdldFdpZHRoKGVsKSB7XG5cdC8vIFx0XHRyZXR1cm4gTWF0aC5tYXgoJChlbCkud2lkdGgoKSwgJChlbCkub3V0ZXJXaWR0aCgpKTtcblx0Ly8gXHR9XG5cdC8vIFx0ZnVuY3Rpb24gY2hhbmdlQ2xhc3MoKSB7XG5cdC8vIFx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcblx0Ly8gXHRcdFx0dmFyIGRvY1dpZHRoID0gZ2V0V2lkdGgod2luZG93KTtcblx0Ly8gXHRcdFx0dmFyIGJsb2NrID0gJCgnLmFsZXJ0Jyk7XG5cdC8vIFx0XHRcdGlmIChkb2NXaWR0aCA8IDc2OCkge1xuXHQvLyBcdFx0XHRcdCQoYmxvY2spLmFkZENsYXNzKCdhbGVydF9hY3RpdmUnKTtcblx0Ly8gXHRcdFx0fVxuXHQvLyBcdFx0XHRlbHNlIHtcblx0Ly8gXHRcdFx0XHQkKGJsb2NrKS5yZW1vdmVDbGFzcygnYWxlcnRfYWN0aXZlJyk7XG5cdC8vIFx0XHRcdH1cblx0Ly8gXHRcdH1cblx0Ly8gXHR9XG5cdC8vIFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBmdW5jdGlvbigpIHtcblx0Ly8gXHRcdGNoYW5nZUNsYXNzKCk7XG5cdC8vIFx0fSwgZmFsc2UpO1xuXHQvLyBcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2hhbmdlQ2xhc3MoKSk7XG5cdC8vIH1cblx0Ly8gZGV0ZWN0TGFuZHNjYXBlKCk7XG5cblx0VHdlZW5NYXgudG8oJy5tYXNrLXJlY3QnLCAxLjgsIHtcblx0XHRhdHRyOntoZWlnaHQ6IDB9LFxuXHRcdHlveW86IHRydWUsXG5cdFx0cmVwZWF0OiAwLFxuXHRcdGVhc2U6IFBvd2VyMi5lYXNlSW5PdXRcblx0fSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRzZXRUaW1lb3V0KGZhZGVPdXRQcmVsb2FkZXIsIDE4MDApXG5cdH0pO1xufSkoKTtcbi8vINC/0YDQtdC70L7QsNC00LXRgCA6INC60L7QvdC10YYiXX0=
