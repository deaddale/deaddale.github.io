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

	// Get IE or Edge browser version
	var version = detectIE();

	if (version === false) {
		document.getElementById('result').innerHTML = '<s>IE/Edge</s>';
	} else if (version >= 12) {
		document.getElementById('result').innerHTML = 'Edge ' + version;
	} else {
		document.getElementById('result').innerHTML = 'IE ' + version;
	}

	// add details to debug result
	document.getElementById('details').innerHTML = window.navigator.userAgent;

	/**
	 * detect IE
	 * returns version of IE or false, if browser is not Internet Explorer
	 */
	function detectIE() {
		var ua = window.navigator.userAgent;

		// Test values; Uncomment to check result …

		// IE 10
		// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

		// IE 11
		// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

		// Edge 12 (Spartan)
		// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

		// Edge 13
		// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
	alert('version');
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdC8vIG5hdmlnYXRpb25cblx0JCgnLm5hdl9fbGluay1wcmltYXJ5X3NlYy1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLm5hdl9fbGlzdC1zZWNvbmRhcnknKS50b2dnbGVDbGFzcygnbmF2X19saXN0LXNlY29uZGFyeV9hY3RpdmUnKTtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCduYXZfX2xpbmstcHJpbWFyeV9hY3RpdmUnKTtcblx0fSk7XG5cblx0JCgnLmhlYWRlci1tb2JpbGVfX21lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLm5hdi1tb2JpbGUnKS50b2dnbGVDbGFzcygnbmF2LW1vYmlsZV9hY3RpdmUnKTtcblx0fSk7XG5cblx0JCgnLm5hdi1tb2JpbGVfX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5uYXYtbW9iaWxlJykudG9nZ2xlQ2xhc3MoJ25hdi1tb2JpbGVfYWN0aXZlJyk7XG5cdH0pO1xuXG5cdC8vIGNvdmVyIHBhcmFsbGF4XG5cdHZhciBzID0gc2tyb2xsci5pbml0KCk7XG5cblx0Ly8gY292ZXIgaGVpZ2h0XG5cdGZ1bmN0aW9uIGdldEhlaWdodChlbCkge1xuXHRcdHJldHVybiBNYXRoLm1heCgkKGVsKS5oZWlnaHQoKSwgJChlbCkub3V0ZXJIZWlnaHQoKSk7XG5cdH1cblxuXHR2YXIgd2luZG93SGVpZ2h0ID0gZ2V0SGVpZ2h0KHdpbmRvdyk7XG5cdHZhciBoZWFkZXJIZWlnaHQgPSBnZXRIZWlnaHQoJy5oZWFkZXInKTtcblx0dmFyIG5ld0hlaWdodCA9IHdpbmRvd0hlaWdodCAtIGhlYWRlckhlaWdodDtcblx0JCgnLmNvdmVyIC5jb3Zlcl9fY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBuZXdIZWlnaHQgKyAncHgnKTtcblxuXHQvLyB0aGVtZXMgaW1hZ2VzIGZhZGVpblxuXHRmdW5jdGlvbiBmYWRlSW4oZWxlbWVudCkge1xuXHRcdCQoZWxlbWVudCkuZWFjaChmdW5jdGlvbiAoaSkge1xuXHRcdFx0dmFyIGJvdHRvbU9mT2JqZWN0ID0gJChlbGVtZW50KS5vZmZzZXQoKS50b3AgKyAkKGVsZW1lbnQpLm91dGVySGVpZ2h0KCk7XG5cdFx0XHR2YXIgYm90dG9tT2ZXaW5kb3cgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKTtcblx0XHRcdHZhciBlbGVtZW50Q2xhc3MgPSBlbGVtZW50ICsgJ19hY3RpdmUnO1xuXHRcdFx0ZWxlbWVudENsYXNzID0gZWxlbWVudENsYXNzLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcblx0XHRcdGlmIChib3R0b21PZldpbmRvdyA+IGJvdHRvbU9mT2JqZWN0KSB7XG5cdFx0XHRcdCQoZWxlbWVudCkuYWRkQ2xhc3MoZWxlbWVudENsYXNzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGZhZGVJbignLnRoZW1lc19faW1nJyk7XG5cdH0pO1xuXHRzZXRUaW1lb3V0KGZhZGVJbignLmNvdmVyX190ZXh0LXdyYXBwZXInKSwgMzQwMCk7XG5cblx0Ly8gR2V0IElFIG9yIEVkZ2UgYnJvd3NlciB2ZXJzaW9uXG5cdHZhciB2ZXJzaW9uID0gZGV0ZWN0SUUoKTtcblxuXHRpZiAodmVyc2lvbiA9PT0gZmFsc2UpIHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0JykuaW5uZXJIVE1MID0gJzxzPklFL0VkZ2U8L3M+Jztcblx0fSBlbHNlIGlmICh2ZXJzaW9uID49IDEyKSB7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpLmlubmVySFRNTCA9ICdFZGdlICcgKyB2ZXJzaW9uO1xuXHR9IGVsc2Uge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKS5pbm5lckhUTUwgPSAnSUUgJyArIHZlcnNpb247XG5cdH1cblxuXHQvLyBhZGQgZGV0YWlscyB0byBkZWJ1ZyByZXN1bHRcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RldGFpbHMnKS5pbm5lckhUTUwgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuXHQvKipcblx0ICogZGV0ZWN0IElFXG5cdCAqIHJldHVybnMgdmVyc2lvbiBvZiBJRSBvciBmYWxzZSwgaWYgYnJvd3NlciBpcyBub3QgSW50ZXJuZXQgRXhwbG9yZXJcblx0ICovXG5cdGZ1bmN0aW9uIGRldGVjdElFKCkge1xuXHRcdHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXG5cdFx0Ly8gVGVzdCB2YWx1ZXM7IFVuY29tbWVudCB0byBjaGVjayByZXN1bHQg4oCmXG5cblx0XHQvLyBJRSAxMFxuXHRcdC8vIHVhID0gJ01vemlsbGEvNS4wIChjb21wYXRpYmxlOyBNU0lFIDEwLjA7IFdpbmRvd3MgTlQgNi4yOyBUcmlkZW50LzYuMCknO1xuXG5cdFx0Ly8gSUUgMTFcblx0XHQvLyB1YSA9ICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjM7IFRyaWRlbnQvNy4wOyBydjoxMS4wKSBsaWtlIEdlY2tvJztcblxuXHRcdC8vIEVkZ2UgMTIgKFNwYXJ0YW4pXG5cdFx0Ly8gdWEgPSAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV09XNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8zOS4wLjIxNzEuNzEgU2FmYXJpLzUzNy4zNiBFZGdlLzEyLjAnO1xuXG5cdFx0Ly8gRWRnZSAxM1xuXHRcdC8vIHVhID0gJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS80Ni4wLjI0ODYuMCBTYWZhcmkvNTM3LjM2IEVkZ2UvMTMuMTA1ODYnO1xuXG5cdFx0dmFyIG1zaWUgPSB1YS5pbmRleE9mKCdNU0lFICcpO1xuXHRcdGlmIChtc2llID4gMCkge1xuXHRcdFx0Ly8gSUUgMTAgb3Igb2xkZXIgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKG1zaWUgKyA1LCB1YS5pbmRleE9mKCcuJywgbXNpZSkpLCAxMCk7XG5cdFx0fVxuXG5cdFx0dmFyIHRyaWRlbnQgPSB1YS5pbmRleE9mKCdUcmlkZW50LycpO1xuXHRcdGlmICh0cmlkZW50ID4gMCkge1xuXHRcdFx0Ly8gSUUgMTEgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG5cdFx0XHR2YXIgcnYgPSB1YS5pbmRleE9mKCdydjonKTtcblx0XHRcdHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcocnYgKyAzLCB1YS5pbmRleE9mKCcuJywgcnYpKSwgMTApO1xuXHRcdH1cblxuXHRcdHZhciBlZGdlID0gdWEuaW5kZXhPZignRWRnZS8nKTtcblx0XHRpZiAoZWRnZSA+IDApIHtcblx0XHRcdC8vIEVkZ2UgKElFIDEyKykgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKGVkZ2UgKyA1LCB1YS5pbmRleE9mKCcuJywgZWRnZSkpLCAxMCk7XG5cdFx0fVxuXG5cdFx0Ly8gb3RoZXIgYnJvd3NlclxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRhbGVydCgndmVyc2lvbicpO1xufSk7Il19
