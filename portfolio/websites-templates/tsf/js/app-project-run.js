(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
$(document).ready(function () {
	$('.nav__link-primary_sec-nav').on('click', function () {
		$('.nav__list-secondary').toggleClass('nav__list-secondary_active');
	});

	var s = skrollr.init();

	function getHeight(el) {
		return Math.max($(el).height(), $(el).outerHeight());
	}

	var windowHeight = getHeight(window);
	var headerHeight = getHeight('.header');
	var newHeight = windowHeight - headerHeight;
	$('.cover .cover__container').css('height', newHeight + 'px');
	console.log(newHeight);
	// console.log(newHeight);
	// alert(windowHeight);
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHQkKCcubmF2X19saW5rLXByaW1hcnlfc2VjLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcubmF2X19saXN0LXNlY29uZGFyeScpLnRvZ2dsZUNsYXNzKCduYXZfX2xpc3Qtc2Vjb25kYXJ5X2FjdGl2ZScpO1xuXHR9KTtcblxuXHR2YXIgcyA9IHNrcm9sbHIuaW5pdCgpO1xuXG5cdGZ1bmN0aW9uIGdldEhlaWdodChlbCkge1xuXHRcdHJldHVybiBNYXRoLm1heCgkKGVsKS5oZWlnaHQoKSwgJChlbCkub3V0ZXJIZWlnaHQoKSk7XG5cdH1cblxuXHR2YXIgd2luZG93SGVpZ2h0ID0gZ2V0SGVpZ2h0KHdpbmRvdyk7XG5cdHZhciBoZWFkZXJIZWlnaHQgPSBnZXRIZWlnaHQoJy5oZWFkZXInKTtcblx0dmFyIG5ld0hlaWdodCA9IHdpbmRvd0hlaWdodCAtIGhlYWRlckhlaWdodDtcblx0JCgnLmNvdmVyIC5jb3Zlcl9fY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBuZXdIZWlnaHQgKyAncHgnKTtcblx0Y29uc29sZS5sb2cobmV3SGVpZ2h0KTtcblx0Ly8gY29uc29sZS5sb2cobmV3SGVpZ2h0KTtcblx0Ly8gYWxlcnQod2luZG93SGVpZ2h0KTtcbn0pOyJdfQ==
