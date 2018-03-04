(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
window.addEventListener('load', function (event) {
	$('#notice-of-insurance-search-input').keyup(function () {
		var value = '';
			value = $(this).val();
			value = value.toString().toUpperCase();

		$('.notice-of-insurance__checkbox').addClass('notice-of-insurance__checkbox_hidden');
		$(".notice-of-insurance__checkbox:contains('" + value + "')").removeClass('notice-of-insurance__checkbox_hidden');

		$('.notice-of-insurance__item').each(function (element) {
			var items = $(this).find('.notice-of-insurance__checkbox').length;
			var itemsHidden = $(this).find('.notice-of-insurance__checkbox_hidden').length;
			if (items === itemsHidden) {
				$(this).addClass('notice-of-insurance__item_hidden');
			}
			else {
				$(this).removeClass('notice-of-insurance__item_hidden');
			}
		});
	});
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCQoJyNub3RpY2Utb2YtaW5zdXJhbmNlLXNlYXJjaC1pbnB1dCcpLmtleXVwKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdmFsdWUgPSAnJztcblx0XHRcdHZhbHVlID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0JCgnLm5vdGljZS1vZi1pbnN1cmFuY2VfX2NoZWNrYm94JykuYWRkQ2xhc3MoJ25vdGljZS1vZi1pbnN1cmFuY2VfX2NoZWNrYm94X2hpZGRlbicpO1xuXHRcdCQoXCIubm90aWNlLW9mLWluc3VyYW5jZV9fY2hlY2tib3g6Y29udGFpbnMoJ1wiICsgdmFsdWUgKyBcIicpXCIpLnJlbW92ZUNsYXNzKCdub3RpY2Utb2YtaW5zdXJhbmNlX19jaGVja2JveF9oaWRkZW4nKTtcblxuXHRcdCQoJy5ub3RpY2Utb2YtaW5zdXJhbmNlX19pdGVtJykuZWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0dmFyIGl0ZW1zID0gJCh0aGlzKS5maW5kKCcubm90aWNlLW9mLWluc3VyYW5jZV9fY2hlY2tib3gnKS5sZW5ndGg7XG5cdFx0XHR2YXIgaXRlbXNIaWRkZW4gPSAkKHRoaXMpLmZpbmQoJy5ub3RpY2Utb2YtaW5zdXJhbmNlX19jaGVja2JveF9oaWRkZW4nKS5sZW5ndGg7XG5cdFx0XHRpZiAoaXRlbXMgPT09IGl0ZW1zSGlkZGVuKSB7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ25vdGljZS1vZi1pbnN1cmFuY2VfX2l0ZW1faGlkZGVuJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnbm90aWNlLW9mLWluc3VyYW5jZV9faXRlbV9oaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59KTsiXX0=
