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
				if (pageYOffset >= 2000) {
					$('.cover__spike').css(
						'transform', 'translateX(0px), translateY(0px)'
					);
					$('.seeds').css(
						'transform', 'translateX(0px), translateY(0px)'
					);
				}
				else {
					$('.cover__spike').css(
						'transform', 'translateX(' + (event.pageX / 22) + 'px)'
						+ 'translateY(' + ((event.pageY / 22)) + 'px)'
					);
					$('.seeds').css(
						'transform', 'translateX(' + (event.pageX / 22) + 'px)'
						+ 'translateY(' + ((event.pageY / 22)) + 'px)'
					);
				}
			};
			document.addEventListener('mousemove', mouseMoveMethod);
		},
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
					// Если проскроллли меньше 1000 от верха документа
					if (valueTop < 1000) {
						$(el).addClass('cover__text_first_active');
					}
					// Если проскроллли больше 1000px
					else {
						$(el).removeClass('cover__text_first_active');
					}
				});
			}
			// * call animate function
			window.addEventListener('load', function (event) {
				setTimeout(showCover, 500);
				setTimeout(showHeader, 1000);
				setTimeout(showSpike, 1300);
				setTimeout(showText, 1600);
			});
			// show ANIMATE : end
		}
	}
});

var s = skrollr.init();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcblx0XHR9XG4gICAgfSxcblx0Y29tcHV0ZWQ6IHtcbiAgICBcdC8vIEFuaW1hdGUgc3Bpa2Vcblx0XHRhbmltYXRlU3Bpa2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIG1vdXNlIG1vdmVcblx0XHRcdG1vdXNlTW92ZU1ldGhvZCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHR2YXIgcGFnZVlPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdFx0XHRcdGlmIChwYWdlWU9mZnNldCA+PSAyMDAwKSB7XG5cdFx0XHRcdFx0JCgnLmNvdmVyX19zcGlrZScpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwcHgpLCB0cmFuc2xhdGVZKDBweCknXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHQkKCcuc2VlZHMnKS5jc3MoXG5cdFx0XHRcdFx0XHQndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMHB4KSwgdHJhbnNsYXRlWSgwcHgpJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0JCgnLmNvdmVyX19zcGlrZScpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgKGV2ZW50LnBhZ2VYIC8gMjIpICsgJ3B4KSdcblx0XHRcdFx0XHRcdCsgJ3RyYW5zbGF0ZVkoJyArICgoZXZlbnQucGFnZVkgLyAyMikpICsgJ3B4KSdcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdCQoJy5zZWVkcycpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgKGV2ZW50LnBhZ2VYIC8gMjIpICsgJ3B4KSdcblx0XHRcdFx0XHRcdCsgJ3RyYW5zbGF0ZVkoJyArICgoZXZlbnQucGFnZVkgLyAyMikpICsgJ3B4KSdcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlTWV0aG9kKTtcblx0XHR9LFxuXHRcdHNob3dGaXJzdFNsaWRlOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdC8vIHNob3cgQU5JTUFURSA6IGJlZ2luXG5cdFx0XHQvLyAqIGNvdmVyXG5cdFx0XHRmdW5jdGlvbiBzaG93Q292ZXIoKSB7XG5cdFx0XHRcdCQoJy5jb3Zlcl9fYmFja2dyb3VuZCcpLmZhZGVJbig1MDApO1xuXHRcdFx0fVxuXHRcdFx0Ly8gKiBoZWFkZXJcblx0XHRcdGZ1bmN0aW9uIHNob3dIZWFkZXIoKSB7XG5cdFx0XHRcdCQoJy5oZWFkZXInKS5hbmltYXRlKHtcblx0XHRcdFx0XHR0b3A6ICcwJyxcblx0XHRcdFx0XHRvcGFjaXR5OiAnMSdcblx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdH1cblx0XHRcdC8vICogc3Bpa2Vcblx0XHRcdGZ1bmN0aW9uIHNob3dTcGlrZSgpIHtcblx0XHRcdFx0JCgnLmNvdmVyX19zcGlrZScpLmZhZGVJbigzMDApO1xuXHRcdFx0fVxuXHRcdFx0Ly8gKiBzaG93IHRleHRcblx0XHRcdGZ1bmN0aW9uIHNob3dUZXh0KGVsZW1lbnQpIHtcblx0XHRcdFx0Ly8g0KDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDRgdC60YDQvtC70LvQsCDQtNC+INCy0LXRgNGF0LAg0YHRgtGA0LDQvdC40YbRi1xuXHRcdFx0XHR2YXIgdmFsdWVUb1RvcERvYyA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xuXHRcdFx0XHR2YXIgZWwgPSAkKCcuY292ZXJfX3RleHQuY292ZXJfX3RleHRfZmlyc3QnKTtcblx0XHRcdFx0Ly8g0KHQvtCx0YvRgtC40LUg0LfQsNCz0YDRg9C30LrQuCDRgdGC0YDQsNC90LjRhtGLICjQv9C+0LrQsNC30YvQstCw0LXQvCDQv9C10YDQstGL0Lkg0YLQtdC60YHRgtC+0LLRi9C5INCx0LvQvtC6KVxuXHRcdFx0XHQkKGVsKS5hZGRDbGFzcygnY292ZXJfX3RleHRfZmlyc3RfYWN0aXZlJyk7XG5cdFx0XHRcdC8vINCh0L7QsdGL0YLQuNC1INGB0LrRgNC+0LvQu9CwINC00L7QutGD0LzQtdC90YLQsFxuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHR2YXIgdmFsdWVUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cdFx0XHRcdFx0Ly8g0JXRgdC70Lgg0L/RgNC+0YHQutGA0L7Qu9C70LvQuCDQvNC10L3RjNGI0LUgMTAwMCDQvtGCINCy0LXRgNGF0LAg0LTQvtC60YPQvNC10L3RgtCwXG5cdFx0XHRcdFx0aWYgKHZhbHVlVG9wIDwgMTAwMCkge1xuXHRcdFx0XHRcdFx0JChlbCkuYWRkQ2xhc3MoJ2NvdmVyX190ZXh0X2ZpcnN0X2FjdGl2ZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyDQldGB0LvQuCDQv9GA0L7RgdC60YDQvtC70LvQu9C4INCx0L7Qu9GM0YjQtSAxMDAwcHhcblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCQoZWwpLnJlbW92ZUNsYXNzKCdjb3Zlcl9fdGV4dF9maXJzdF9hY3RpdmUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0Ly8gKiBjYWxsIGFuaW1hdGUgZnVuY3Rpb25cblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoc2hvd0NvdmVyLCA1MDApO1xuXHRcdFx0XHRzZXRUaW1lb3V0KHNob3dIZWFkZXIsIDEwMDApO1xuXHRcdFx0XHRzZXRUaW1lb3V0KHNob3dTcGlrZSwgMTMwMCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoc2hvd1RleHQsIDE2MDApO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyBzaG93IEFOSU1BVEUgOiBlbmRcblx0XHR9XG5cdH1cbn0pO1xuXG52YXIgcyA9IHNrcm9sbHIuaW5pdCgpOyJdfQ==
