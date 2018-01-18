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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI2FwcCcsXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuXHRcdH1cbiAgICB9LFxuXHRjb21wdXRlZDoge1xuICAgIFx0Ly8gQW5pbWF0ZSBzcGlrZVxuXHRcdGFuaW1hdGVTcGlrZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gbW91c2UgbW92ZVxuXHRcdFx0bW91c2VNb3ZlTWV0aG9kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZhciBwYWdlWU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHRcdFx0dmFyIGRvY1dpZHRoID0gJCh3aW5kb3cpLm91dGVyV2lkdGgoKTtcblxuXHRcdFx0XHQvLyDQldGB0LvQuCDRgdC60YDQvtC70Lsg0LHQvtC70YzRiNC1IDE0MDBcblx0XHRcdFx0aWYgKHBhZ2VZT2Zmc2V0ID49IDE0MDApIHtcblx0XHRcdFx0XHQkKCcuY292ZXJfX3NwaWtlJykuY3NzKFxuXHRcdFx0XHRcdFx0J3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDBweCksIHRyYW5zbGF0ZVkoMHB4KTsnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHQkKCcuc2VlZHMnKS5hZGRDbGFzcygnc2VlZHNfZGlzYWJsZS1tb3VzZS1tb3Rpb24nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyDQldGB0LvQuCDRiNC40YDQuNC90LAg0LTQvtC60YPQvNC10L3RgtCwINC80LXQvdGM0YjQtVxuXHRcdFx0XHRpZiAoZG9jV2lkdGggPCAxMjAwKSB7XG5cdFx0XHRcdFx0JCgnLmNvdmVyX19zcGlrZScpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwcHgpLCB0cmFuc2xhdGVZKDBweCknXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHQkKCcuc2VlZHMnKS5hZGRDbGFzcygnc2VlZHNfZGlzYWJsZS1tb3VzZS1tb3Rpb24nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyDQkiDQvtGB0YLQsNC70YzQvdGL0YUg0YHQu9GD0YfQsNGP0YVcblx0XHRcdFx0aWYgKHBhZ2VZT2Zmc2V0IDwgMTQwMCAmJiBkb2NXaWR0aCA+IDEyMDApIHtcblx0XHRcdFx0XHQkKCcuY292ZXJfX3NwaWtlJykuY3NzKFxuXHRcdFx0XHRcdFx0J3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKCcgKyAoZXZlbnQucGFnZVggLyAyMDApICsgJ3B4KSdcblx0XHRcdFx0XHRcdCsgJ3RyYW5zbGF0ZVkoJyArICgoZXZlbnQucGFnZVkgLyAyMDApKSArICdweCknXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHQkKCcuc2VlZHMnKVxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdzZWVkc19kaXNhYmxlLW1vdXNlLW1vdGlvbicpXG5cdFx0XHRcdFx0XHQuY3NzKFxuXHRcdFx0XHRcdFx0J3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKCcgKyAoZXZlbnQucGFnZVggLyAyMDApICsgJ3B4KSdcblx0XHRcdFx0XHRcdCsgJ3RyYW5zbGF0ZVkoJyArICgoZXZlbnQucGFnZVkgLyAyMDApKSArICdweCknXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMjAwKSB7XG5cdFx0XHRcdC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZU1ldGhvZCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBDdXQgYW5kIHBhc3RlIGNvbnRlbnRcblx0XHRjdXRBbmRQYXN0ZdChb250ZW50OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmdW5jdGlvbiBtb3ZlKCkge1xuXHRcdFx0XHQkKCcuY292ZXJfX3NwZWNpYWwtd3JhcHBlcicpLmFwcGVuZFRvKCcjYXBwJyk7XG5cdFx0XHRcdCQoJy5oZWFkZXInKS5wcmVwZW5kVG8oJyNhcHAnKTtcblx0XHRcdFx0JCgnLnNlZWRzJykucHJlcGVuZFRvKCcuY29tcG9zaXRpb24nKTtcblx0XHRcdH1cblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKCQod2luZG93KS53aWR0aCgpIDwgMTIwMCkge1xuXHRcdFx0XHRcdG1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHQvLyBTY3JvbGwgdG8gZWxlbWVudFxuXHRcdHNjcm9sbFRvRWw6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDEyMDApIHtcblx0XHRcdFx0XHRmdW5jdGlvbiBmYWRlSW4oZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0JChlbGVtZW50KS5lYWNoKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBib3R0b21PZk9iamVjdCA9ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wICsgJChlbGVtZW50KS5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHRcdFx0XHR2YXIgYm90dG9tT2ZXaW5kb3cgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKTtcblx0XHRcdFx0XHRcdFx0dmFyIGVsZW1lbnRDbGFzcyA9IGVsZW1lbnQgKyAnX2FjdGl2ZSc7XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnRDbGFzcyA9IGVsZW1lbnRDbGFzcy5yZXBsYWNlKC9cXC4vZywgXCJcIik7XG5cdFx0XHRcdFx0XHRcdGlmIChib3R0b21PZldpbmRvdyA+IGJvdHRvbU9mT2JqZWN0KSB7XG5cdFx0XHRcdFx0XHRcdFx0JChlbGVtZW50KS5hZGRDbGFzcyhlbGVtZW50Q2xhc3MpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRcdGZhZGVJbignLmNvbXBvc2l0aW9uX190aXRsZScpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuY29tcG9zaXRpb25fX2xpc3QnKTtcblx0XHRcdFx0XHRcdGZhZGVJbignLmNvbXBvc2l0aW9uX192aXRhbWlucycpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuYm90dGxlX190aXRsZScpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcuYm90dGxlX190ZXh0Jyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5ib3R0bGVfX2xpc3QnKTtcblx0XHRcdFx0XHRcdGZhZGVJbignLnByb2R1Y3QtZmlyc3RfX3RleHQtd3JhcHBlcicpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcucHJvZHVjdC1zZWNvbmRfX3RleHQtd3JhcHBlcicpO1xuXHRcdFx0XHRcdFx0ZmFkZUluKCcucHJvZHVjdC10aGlyZF9fdGV4dC13cmFwcGVyJyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5wcm9kdWN0LWZvdXJ0aF9fdGV4dC13cmFwcGVyJyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5zZWVkc19fc2VlZF8xJyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5zZWVkc19fc2VlZF8yJyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5zZWVkc19fc2VlZF8zJyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5zZWVkc19fc2VlZF80Jyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5zZWVkc19fc2VlZF81Jyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5zZWVkc19fc2VlZF82Jyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5zZWVkc19fc2VlZF83Jyk7XG5cdFx0XHRcdFx0XHRmYWRlSW4oJy5zZWVkc19fc2VlZF84Jyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0VGltZW91dChmYWRlSW4oJy5jb3Zlcl9fdGV4dC13cmFwcGVyJyksIDM0MDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdC8vIFNob3cgZmlyc3Qgc2xpZGVcblx0XHRzaG93Rmlyc3RTbGlkZTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHQvLyBzaG93IEFOSU1BVEUgOiBiZWdpblxuXHRcdFx0Ly8gKiBjb3ZlclxuXHRcdFx0ZnVuY3Rpb24gc2hvd0NvdmVyKCkge1xuXHRcdFx0XHQkKCcuY292ZXJfX2JhY2tncm91bmQnKS5mYWRlSW4oNTAwKTtcblx0XHRcdH1cblx0XHRcdC8vICogaGVhZGVyXG5cdFx0XHRmdW5jdGlvbiBzaG93SGVhZGVyKCkge1xuXHRcdFx0XHQkKCcuaGVhZGVyJykuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0dG9wOiAnMCcsXG5cdFx0XHRcdFx0b3BhY2l0eTogJzEnXG5cdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHR9XG5cdFx0XHQvLyAqIHNwaWtlXG5cdFx0XHRmdW5jdGlvbiBzaG93U3Bpa2UoKSB7XG5cdFx0XHRcdCQoJy5jb3Zlcl9fc3Bpa2UnKS5mYWRlSW4oMzAwKTtcblx0XHRcdH1cblx0XHRcdC8vICogc2hvdyB0ZXh0XG5cdFx0XHRmdW5jdGlvbiBzaG93VGV4dChlbGVtZW50KSB7XG5cdFx0XHRcdC8vINCg0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0YHQutGA0L7Qu9C70LAg0LTQviDQstC10YDRhdCwINGB0YLRgNCw0L3QuNGG0Ytcblx0XHRcdFx0dmFyIHZhbHVlVG9Ub3BEb2MgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcblx0XHRcdFx0dmFyIGVsID0gJCgnLmNvdmVyX190ZXh0LmNvdmVyX190ZXh0X2ZpcnN0Jyk7XG5cdFx0XHRcdC8vINCh0L7QsdGL0YLQuNC1INC30LDQs9GA0YPQt9C60Lgg0YHRgtGA0LDQvdC40YbRiyAo0L/QvtC60LDQt9GL0LLQsNC10Lwg0L/QtdGA0LLRi9C5INGC0LXQutGB0YLQvtCy0YvQuSDQsdC70L7Quilcblx0XHRcdFx0JChlbCkuYWRkQ2xhc3MoJ2NvdmVyX190ZXh0X2ZpcnN0X2FjdGl2ZScpO1xuXHRcdFx0XHQvLyDQodC+0LHRi9GC0LjQtSDRgdC60YDQvtC70LvQsCDQtNC+0LrRg9C80LXQvdGC0LBcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXHRcdFx0XHRcdC8vINCV0YHQu9C4INC/0YDQvtGB0LrRgNC+0LvQu9C70Lgg0LzQtdC90YzRiNC1IDgwMCDQvtGCINCy0LXRgNGF0LAg0LTQvtC60YPQvNC10L3RgtCwXG5cdFx0XHRcdFx0aWYgKHZhbHVlVG9wIDwgMjAwKSB7XG5cdFx0XHRcdFx0XHQkKGVsKS5hZGRDbGFzcygnY292ZXJfX3RleHRfZmlyc3RfYWN0aXZlJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vINCV0YHQu9C4INC/0YDQvtGB0LrRgNC+0LvQu9C70Lgg0LHQvtC70YzRiNC1IDgwMFxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0JChlbCkucmVtb3ZlQ2xhc3MoJ2NvdmVyX190ZXh0X2ZpcnN0X2FjdGl2ZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHQvLyAqIGNhbGwgYW5pbWF0ZSBmdW5jdGlvblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0c2V0VGltZW91dChzaG93Q292ZXIsIDIzMDApO1xuXHRcdFx0XHRzZXRUaW1lb3V0KHNob3dIZWFkZXIsIDI4MDApO1xuXHRcdFx0XHRzZXRUaW1lb3V0KHNob3dTcGlrZSwgMzEwMCk7XG5cdFx0XHRcdGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMjAwKSB7XG5cdFx0XHRcdFx0c2V0VGltZW91dChzaG93VGV4dCwgMzQwMCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0Ly8gc2hvdyBBTklNQVRFIDogZW5kXG5cdFx0fVxuXHR9XG59KTtcblxuLy8gc2tyb2xsciBpbml0IDog0L3QsNGH0LDQu9C+XG4kKGZ1bmN0aW9uICgpIHtcblx0aWYgKCQod2luZG93KS53aWR0aCgpID49IDEyMDApIHtcblx0XHRza3JvbGxyLmluaXQoKTtcblx0fVxuXHRlbHNlIHtcblx0XHRza3JvbGxyLmluaXQoKS5kZXN0cm95KCk7XG5cdH1cbn0pO1xuLy8gc2tyb2xsciBpbml0IDog0LrQvtC90LXRhlxuXG4vLyDQv9GA0LXQu9C+0LDQtNC10YAgOiDQvdCw0YfQsNC70L5cbihmdW5jdGlvbiAoKSB7XG5cdCQoJy5wcmVsb2FkZXJfX251bWJlci12YWx1ZScpLmFuaW1hdGUoeyBudW06IDEwMCAtIDMgfSwge1xuXHRcdGR1cmF0aW9uOiAxODAwLFxuXHRcdHN0ZXA6IGZ1bmN0aW9uIChudW0pIHtcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKG51bSArIDMpLnRvRml4ZWQoMClcblx0XHR9XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGZhZGVPdXRQcmVsb2FkZXIoKSB7XG5cdFx0JCgnYm9keScpLmFkZENsYXNzKCdib2R5X2FjdGl2ZScpO1xuXHRcdCQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KDU1MCk7XG5cdH1cblxuXHRUd2Vlbk1heC50bygnLm1hc2stcmVjdCcsIDEuOCwge1xuXHRcdGF0dHI6e2hlaWdodDogMH0sXG5cdFx0eW95bzogdHJ1ZSxcblx0XHRyZXBlYXQ6IDAsXG5cdFx0ZWFzZTogUG93ZXIyLmVhc2VJbk91dFxuXHR9KTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdHNldFRpbWVvdXQoZmFkZU91dFByZWxvYWRlciwgMTgwMClcblx0fSk7XG59KSgpO1xuLy8g0L/RgNC10LvQvtCw0LTQtdGAIDog0LrQvtC90LXRhiJdfQ==
