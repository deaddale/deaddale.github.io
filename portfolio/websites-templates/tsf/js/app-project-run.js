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

	document.addEventListener('scroll', function (event) {
		fadeIn('.themes__img');
	});
	setTimeout(fadeIn('.cover__text-wrapper'), 3400);
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdC8vIG5hdmlnYXRpb25cblx0JCgnLm5hdl9fbGluay1wcmltYXJ5X3NlYy1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLm5hdl9fbGlzdC1zZWNvbmRhcnknKS50b2dnbGVDbGFzcygnbmF2X19saXN0LXNlY29uZGFyeV9hY3RpdmUnKTtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCduYXZfX2xpbmstcHJpbWFyeV9hY3RpdmUnKTtcblx0fSk7XG5cblx0JCgnLmhlYWRlci1tb2JpbGVfX21lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLm5hdi1tb2JpbGUnKS50b2dnbGVDbGFzcygnbmF2LW1vYmlsZV9hY3RpdmUnKTtcblx0fSk7XG5cblx0JCgnLm5hdi1tb2JpbGVfX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5uYXYtbW9iaWxlJykudG9nZ2xlQ2xhc3MoJ25hdi1tb2JpbGVfYWN0aXZlJyk7XG5cdH0pO1xuXG5cdC8vIGNvdmVyIHBhcmFsbGF4XG5cdGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMjAwKSB7XG5cdFx0dmFyIHMgPSBza3JvbGxyLmluaXQoKTtcblx0fVxuXG5cdC8vIGNvdmVyIGhlaWdodFxuXHRmdW5jdGlvbiBnZXRIZWlnaHQoZWwpIHtcblx0XHRyZXR1cm4gTWF0aC5tYXgoJChlbCkuaGVpZ2h0KCksICQoZWwpLm91dGVySGVpZ2h0KCkpO1xuXHR9XG5cblx0dmFyIHdpbmRvd0hlaWdodCA9IGdldEhlaWdodCh3aW5kb3cpO1xuXHR2YXIgaGVhZGVySGVpZ2h0ID0gZ2V0SGVpZ2h0KCcuaGVhZGVyJyk7XG5cdHZhciBuZXdIZWlnaHQgPSB3aW5kb3dIZWlnaHQgLSBoZWFkZXJIZWlnaHQ7XG5cdCQoJy5jb3ZlciAuY292ZXJfX2NvbnRhaW5lcicpLmNzcygnaGVpZ2h0JywgbmV3SGVpZ2h0ICsgJ3B4Jyk7XG5cblx0Ly8gdGhlbWVzIGltYWdlcyBmYWRlaW5cblx0ZnVuY3Rpb24gZmFkZUluKGVsZW1lbnQpIHtcblx0XHQkKGVsZW1lbnQpLmVhY2goZnVuY3Rpb24gKGkpIHtcblx0XHRcdHZhciBib3R0b21PZk9iamVjdCA9ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wICsgJChlbGVtZW50KS5vdXRlckhlaWdodCgpO1xuXHRcdFx0dmFyIGJvdHRvbU9mV2luZG93ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLm91dGVySGVpZ2h0KCk7XG5cdFx0XHR2YXIgZWxlbWVudENsYXNzID0gZWxlbWVudCArICdfYWN0aXZlJztcblx0XHRcdGVsZW1lbnRDbGFzcyA9IGVsZW1lbnRDbGFzcy5yZXBsYWNlKC9cXC4vZywgXCJcIik7XG5cdFx0XHRpZiAoYm90dG9tT2ZXaW5kb3cgPiBib3R0b21PZk9iamVjdCkge1xuXHRcdFx0XHQkKGVsZW1lbnQpLmFkZENsYXNzKGVsZW1lbnRDbGFzcyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRmYWRlSW4oJy50aGVtZXNfX2ltZycpO1xuXHR9KTtcblx0c2V0VGltZW91dChmYWRlSW4oJy5jb3Zlcl9fdGV4dC13cmFwcGVyJyksIDM0MDApO1xufSk7Il19
