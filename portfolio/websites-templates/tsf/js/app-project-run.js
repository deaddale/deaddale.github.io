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
	if ($(window).width() >= 1200) {
		var s = skrollr.init();
	}

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
	if ($(window).width() >= 1100) {
		document.addEventListener('scroll', function (event) {
			fadeIn('.themes__img');
		});
	}

	// scroll to block (sec. nav)
	function scrollToEBlock(element) {
		$(element).on('click', function() {
			var block = $(this).data('href');
			block = '.' + block;

			if (element === '.nav-mobile__item') {
				$('.nav-mobile').toggleClass('nav-mobile_active');
				$('html, body').animate({
					scrollTop: $(block).offset().top
				}, 1750);
			}
			else {
				$('html, body').animate({
					scrollTop: $(block).offset().top
				}, 1750);
			}
		});
	}
	scrollToEBlock('.nav__link-secondary');
	scrollToEBlock('.nav-mobile__item');
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Ly8gbmF2aWdhdGlvblxuXHQkKCcubmF2X19saW5rLXByaW1hcnlfc2VjLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcubmF2X19saXN0LXNlY29uZGFyeScpLnRvZ2dsZUNsYXNzKCduYXZfX2xpc3Qtc2Vjb25kYXJ5X2FjdGl2ZScpO1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ25hdl9fbGluay1wcmltYXJ5X2FjdGl2ZScpO1xuXHR9KTtcblxuXHQkKCcuaGVhZGVyLW1vYmlsZV9fbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcubmF2LW1vYmlsZScpLnRvZ2dsZUNsYXNzKCduYXYtbW9iaWxlX2FjdGl2ZScpO1xuXHR9KTtcblxuXHQkKCcubmF2LW1vYmlsZV9fY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLm5hdi1tb2JpbGUnKS50b2dnbGVDbGFzcygnbmF2LW1vYmlsZV9hY3RpdmUnKTtcblx0fSk7XG5cblx0Ly8gY292ZXIgcGFyYWxsYXhcblx0aWYgKCQod2luZG93KS53aWR0aCgpID49IDEyMDApIHtcblx0XHR2YXIgcyA9IHNrcm9sbHIuaW5pdCgpO1xuXHR9XG5cblx0Ly8gY292ZXIgaGVpZ2h0XG5cdGZ1bmN0aW9uIGdldEhlaWdodChlbCkge1xuXHRcdHJldHVybiBNYXRoLm1heCgkKGVsKS5oZWlnaHQoKSwgJChlbCkub3V0ZXJIZWlnaHQoKSk7XG5cdH1cblxuXHR2YXIgd2luZG93SGVpZ2h0ID0gZ2V0SGVpZ2h0KHdpbmRvdyk7XG5cdHZhciBoZWFkZXJIZWlnaHQgPSBnZXRIZWlnaHQoJy5oZWFkZXInKTtcblx0dmFyIG5ld0hlaWdodCA9IHdpbmRvd0hlaWdodCAtIGhlYWRlckhlaWdodDtcblx0JCgnLmNvdmVyIC5jb3Zlcl9fY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBuZXdIZWlnaHQgKyAncHgnKTtcblxuXHQvLyB0aGVtZXMgaW1hZ2VzIGZhZGVpblxuXHRmdW5jdGlvbiBmYWRlSW4oZWxlbWVudCkge1xuXHRcdCQoZWxlbWVudCkuZWFjaChmdW5jdGlvbiAoaSkge1xuXHRcdFx0dmFyIGJvdHRvbU9mT2JqZWN0ID0gJChlbGVtZW50KS5vZmZzZXQoKS50b3AgKyAkKGVsZW1lbnQpLm91dGVySGVpZ2h0KCk7XG5cdFx0XHR2YXIgYm90dG9tT2ZXaW5kb3cgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKTtcblx0XHRcdHZhciBlbGVtZW50Q2xhc3MgPSBlbGVtZW50ICsgJ19hY3RpdmUnO1xuXHRcdFx0ZWxlbWVudENsYXNzID0gZWxlbWVudENsYXNzLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcblx0XHRcdGlmIChib3R0b21PZldpbmRvdyA+IGJvdHRvbU9mT2JqZWN0KSB7XG5cdFx0XHRcdCQoZWxlbWVudCkuYWRkQ2xhc3MoZWxlbWVudENsYXNzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gMTEwMCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0ZmFkZUluKCcudGhlbWVzX19pbWcnKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIHNjcm9sbCB0byBibG9jayAoc2VjLiBuYXYpXG5cdGZ1bmN0aW9uIHNjcm9sbFRvRUJsb2NrKGVsZW1lbnQpIHtcblx0XHQkKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGJsb2NrID0gJCh0aGlzKS5kYXRhKCdocmVmJyk7XG5cdFx0XHRibG9jayA9ICcuJyArIGJsb2NrO1xuXG5cdFx0XHRpZiAoZWxlbWVudCA9PT0gJy5uYXYtbW9iaWxlX19pdGVtJykge1xuXHRcdFx0XHQkKCcubmF2LW1vYmlsZScpLnRvZ2dsZUNsYXNzKCduYXYtbW9iaWxlX2FjdGl2ZScpO1xuXHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0c2Nyb2xsVG9wOiAkKGJsb2NrKS5vZmZzZXQoKS50b3Bcblx0XHRcdFx0fSwgMTc1MCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdHNjcm9sbFRvcDogJChibG9jaykub2Zmc2V0KCkudG9wXG5cdFx0XHRcdH0sIDE3NTApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHNjcm9sbFRvRUJsb2NrKCcubmF2X19saW5rLXNlY29uZGFyeScpO1xuXHRzY3JvbGxUb0VCbG9jaygnLm5hdi1tb2JpbGVfX2l0ZW0nKTtcbn0pOyJdfQ==
