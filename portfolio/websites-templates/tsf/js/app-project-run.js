(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
window.addEventListener('load', function (event) {
	// navigation
	$('.nav__link-primary_sec-nav').on('click', function () {
		$('.nav__list-secondary').toggleClass('nav__list-secondary_active');
		$(this).toggleClass('nav__link-primary_active');
	});

	$('.header-mobile__menu').on('click', function () {
		$('.nav-mobile').toggleClass('nav-mobile_active');
	});

	$('.nav-mobile__close').on('click', function () {
		$('.nav-mobile').toggleClass('nav-mobile_active');
	});

	// cover parallax
	var s = skrollr.init();

	// cover height
	function getHeight(el) {
		return Math.max($(el).height(), $(el).outerHeight());
	}

	var windowHeight = getHeight(window);
	var headerHeight = getHeight('.header');
	var newHeight = windowHeight - headerHeight;
	$('.cover .cover__container').css('height', newHeight + 'px');

	// themes images fadein
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
		fadeIn('.themes__img');
	});
	setTimeout(fadeIn('.cover__text-wrapper'), 3400);
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Ly8gbmF2aWdhdGlvblxuXHQkKCcubmF2X19saW5rLXByaW1hcnlfc2VjLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcubmF2X19saXN0LXNlY29uZGFyeScpLnRvZ2dsZUNsYXNzKCduYXZfX2xpc3Qtc2Vjb25kYXJ5X2FjdGl2ZScpO1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ25hdl9fbGluay1wcmltYXJ5X2FjdGl2ZScpO1xuXHR9KTtcblxuXHQkKCcuaGVhZGVyLW1vYmlsZV9fbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcubmF2LW1vYmlsZScpLnRvZ2dsZUNsYXNzKCduYXYtbW9iaWxlX2FjdGl2ZScpO1xuXHR9KTtcblxuXHQkKCcubmF2LW1vYmlsZV9fY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLm5hdi1tb2JpbGUnKS50b2dnbGVDbGFzcygnbmF2LW1vYmlsZV9hY3RpdmUnKTtcblx0fSk7XG5cblx0Ly8gY292ZXIgcGFyYWxsYXhcblx0dmFyIHMgPSBza3JvbGxyLmluaXQoKTtcblxuXHQvLyBjb3ZlciBoZWlnaHRcblx0ZnVuY3Rpb24gZ2V0SGVpZ2h0KGVsKSB7XG5cdFx0cmV0dXJuIE1hdGgubWF4KCQoZWwpLmhlaWdodCgpLCAkKGVsKS5vdXRlckhlaWdodCgpKTtcblx0fVxuXG5cdHZhciB3aW5kb3dIZWlnaHQgPSBnZXRIZWlnaHQod2luZG93KTtcblx0dmFyIGhlYWRlckhlaWdodCA9IGdldEhlaWdodCgnLmhlYWRlcicpO1xuXHR2YXIgbmV3SGVpZ2h0ID0gd2luZG93SGVpZ2h0IC0gaGVhZGVySGVpZ2h0O1xuXHQkKCcuY292ZXIgLmNvdmVyX19jb250YWluZXInKS5jc3MoJ2hlaWdodCcsIG5ld0hlaWdodCArICdweCcpO1xuXG5cdC8vIHRoZW1lcyBpbWFnZXMgZmFkZWluXG5cdGZ1bmN0aW9uIGZhZGVJbihlbGVtZW50KSB7XG5cdFx0JChlbGVtZW50KS5lYWNoKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHR2YXIgYm90dG9tT2ZPYmplY3QgPSAkKGVsZW1lbnQpLm9mZnNldCgpLnRvcCArICQoZWxlbWVudCkub3V0ZXJIZWlnaHQoKTtcblx0XHRcdHZhciBib3R0b21PZldpbmRvdyA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5vdXRlckhlaWdodCgpO1xuXHRcdFx0dmFyIGVsZW1lbnRDbGFzcyA9IGVsZW1lbnQgKyAnX2FjdGl2ZSc7XG5cdFx0XHRlbGVtZW50Q2xhc3MgPSBlbGVtZW50Q2xhc3MucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xuXHRcdFx0aWYgKGJvdHRvbU9mV2luZG93ID4gYm90dG9tT2ZPYmplY3QpIHtcblx0XHRcdFx0JChlbGVtZW50KS5hZGRDbGFzcyhlbGVtZW50Q2xhc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ZmFkZUluKCcudGhlbWVzX19pbWcnKTtcblx0fSk7XG5cdHNldFRpbWVvdXQoZmFkZUluKCcuY292ZXJfX3RleHQtd3JhcHBlcicpLCAzNDAwKTtcbn0pOyJdfQ==
