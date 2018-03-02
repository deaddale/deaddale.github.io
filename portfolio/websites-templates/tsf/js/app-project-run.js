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

	// ie 10 nav
	if(navigator.appVersion.indexOf("MSIE")!=-1){
		alert("You use IE. That´s no good.");
	}
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHQvLyBuYXZpZ2F0aW9uXG5cdCQoJy5uYXZfX2xpbmstcHJpbWFyeV9zZWMtbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5uYXZfX2xpc3Qtc2Vjb25kYXJ5JykudG9nZ2xlQ2xhc3MoJ25hdl9fbGlzdC1zZWNvbmRhcnlfYWN0aXZlJyk7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnbmF2X19saW5rLXByaW1hcnlfYWN0aXZlJyk7XG5cdH0pO1xuXG5cdCQoJy5oZWFkZXItbW9iaWxlX19tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5uYXYtbW9iaWxlJykudG9nZ2xlQ2xhc3MoJ25hdi1tb2JpbGVfYWN0aXZlJyk7XG5cdH0pO1xuXG5cdCQoJy5uYXYtbW9iaWxlX19jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcubmF2LW1vYmlsZScpLnRvZ2dsZUNsYXNzKCduYXYtbW9iaWxlX2FjdGl2ZScpO1xuXHR9KTtcblxuXHQvLyBjb3ZlciBwYXJhbGxheFxuXHR2YXIgcyA9IHNrcm9sbHIuaW5pdCgpO1xuXG5cdC8vIGNvdmVyIGhlaWdodFxuXHRmdW5jdGlvbiBnZXRIZWlnaHQoZWwpIHtcblx0XHRyZXR1cm4gTWF0aC5tYXgoJChlbCkuaGVpZ2h0KCksICQoZWwpLm91dGVySGVpZ2h0KCkpO1xuXHR9XG5cdHZhciB3aW5kb3dIZWlnaHQgPSBnZXRIZWlnaHQod2luZG93KTtcblx0dmFyIGhlYWRlckhlaWdodCA9IGdldEhlaWdodCgnLmhlYWRlcicpO1xuXHR2YXIgbmV3SGVpZ2h0ID0gd2luZG93SGVpZ2h0IC0gaGVhZGVySGVpZ2h0O1xuXHQkKCcuY292ZXIgLmNvdmVyX19jb250YWluZXInKS5jc3MoJ2hlaWdodCcsIG5ld0hlaWdodCArICdweCcpO1xuXG5cdC8vIHRoZW1lcyBpbWFnZXMgZmFkZWluXG5cdGZ1bmN0aW9uIGZhZGVJbihlbGVtZW50KSB7XG5cdFx0JChlbGVtZW50KS5lYWNoKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHR2YXIgYm90dG9tT2ZPYmplY3QgPSAkKGVsZW1lbnQpLm9mZnNldCgpLnRvcCArICQoZWxlbWVudCkub3V0ZXJIZWlnaHQoKTtcblx0XHRcdHZhciBib3R0b21PZldpbmRvdyA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5vdXRlckhlaWdodCgpO1xuXHRcdFx0dmFyIGVsZW1lbnRDbGFzcyA9IGVsZW1lbnQgKyAnX2FjdGl2ZSc7XG5cdFx0XHRlbGVtZW50Q2xhc3MgPSBlbGVtZW50Q2xhc3MucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xuXHRcdFx0aWYgKGJvdHRvbU9mV2luZG93ID4gYm90dG9tT2ZPYmplY3QpIHtcblx0XHRcdFx0JChlbGVtZW50KS5hZGRDbGFzcyhlbGVtZW50Q2xhc3MpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ZmFkZUluKCcudGhlbWVzX19pbWcnKTtcblx0fSk7XG5cdHNldFRpbWVvdXQoZmFkZUluKCcuY292ZXJfX3RleHQtd3JhcHBlcicpLCAzNDAwKTtcblxuXHQvLyBpZSAxMCBuYXZcblx0aWYobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1TSUVcIikhPS0xKXtcblx0XHRhbGVydChcIllvdSB1c2UgSUUuIFRoYXTCtHMgbm8gZ29vZC5cIik7XG5cdH1cbn0pOyJdfQ==
