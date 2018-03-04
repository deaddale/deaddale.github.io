(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
window.addEventListener('load', function (event) {
	$('#notice-of-insurance-search-input').focus(function () {
		$('.notice-of-insurance__payment-schedule').hide();
	});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0JCgnI25vdGljZS1vZi1pbnN1cmFuY2Utc2VhcmNoLWlucHV0JykuZm9jdXMoZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5ub3RpY2Utb2YtaW5zdXJhbmNlX19wYXltZW50LXNjaGVkdWxlJykuaGlkZSgpO1xuXHR9KTtcblxuXHQkKCcjbm90aWNlLW9mLWluc3VyYW5jZS1zZWFyY2gtaW5wdXQnKS5rZXl1cChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHZhbHVlID0gJyc7XG5cdFx0XHR2YWx1ZSA9ICQodGhpcykudmFsKCk7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKTtcblxuXHRcdCQoJy5ub3RpY2Utb2YtaW5zdXJhbmNlX19jaGVja2JveCcpLmFkZENsYXNzKCdub3RpY2Utb2YtaW5zdXJhbmNlX19jaGVja2JveF9oaWRkZW4nKTtcblx0XHQkKFwiLm5vdGljZS1vZi1pbnN1cmFuY2VfX2NoZWNrYm94OmNvbnRhaW5zKCdcIiArIHZhbHVlICsgXCInKVwiKS5yZW1vdmVDbGFzcygnbm90aWNlLW9mLWluc3VyYW5jZV9fY2hlY2tib3hfaGlkZGVuJyk7XG5cblx0XHQkKCcubm90aWNlLW9mLWluc3VyYW5jZV9faXRlbScpLmVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdHZhciBpdGVtcyA9ICQodGhpcykuZmluZCgnLm5vdGljZS1vZi1pbnN1cmFuY2VfX2NoZWNrYm94JykubGVuZ3RoO1xuXHRcdFx0dmFyIGl0ZW1zSGlkZGVuID0gJCh0aGlzKS5maW5kKCcubm90aWNlLW9mLWluc3VyYW5jZV9fY2hlY2tib3hfaGlkZGVuJykubGVuZ3RoO1xuXHRcdFx0aWYgKGl0ZW1zID09PSBpdGVtc0hpZGRlbikge1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdub3RpY2Utb2YtaW5zdXJhbmNlX19pdGVtX2hpZGRlbicpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ25vdGljZS1vZi1pbnN1cmFuY2VfX2l0ZW1faGlkZGVuJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufSk7Il19
