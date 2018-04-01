(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

	// select
	$('.js-example-basic-single').select2({
		minimumResultsForSearch: -1,
		placeholder: "Выберите СК из списка",
		allowClear: true,
		width: 'element',
		closeOnSelect: false
	});

	// Information and inquiries hint
	var box = $('.box__links');
	$(box).find('a').on('click', function () {
		$(box).find('p').each(function () {
			$(this).hide();
		});
		$(this).next('p').show();
	});
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCQoJyNub3RpY2Utb2YtaW5zdXJhbmNlLXNlYXJjaC1pbnB1dCcpLmZvY3VzKGZ1bmN0aW9uICgpIHtcblx0XHQkKCcubm90aWNlLW9mLWluc3VyYW5jZV9fcGF5bWVudC1zY2hlZHVsZScpLmhpZGUoKTtcblx0fSk7XG5cblx0JCgnI25vdGljZS1vZi1pbnN1cmFuY2Utc2VhcmNoLWlucHV0Jykua2V5dXAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciB2YWx1ZSA9ICcnO1xuXHRcdFx0dmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0dmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCk7XG5cblx0XHQkKCcubm90aWNlLW9mLWluc3VyYW5jZV9fY2hlY2tib3gnKS5hZGRDbGFzcygnbm90aWNlLW9mLWluc3VyYW5jZV9fY2hlY2tib3hfaGlkZGVuJyk7XG5cdFx0JChcIi5ub3RpY2Utb2YtaW5zdXJhbmNlX19jaGVja2JveDpjb250YWlucygnXCIgKyB2YWx1ZSArIFwiJylcIikucmVtb3ZlQ2xhc3MoJ25vdGljZS1vZi1pbnN1cmFuY2VfX2NoZWNrYm94X2hpZGRlbicpO1xuXG5cdFx0JCgnLm5vdGljZS1vZi1pbnN1cmFuY2VfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHR2YXIgaXRlbXMgPSAkKHRoaXMpLmZpbmQoJy5ub3RpY2Utb2YtaW5zdXJhbmNlX19jaGVja2JveCcpLmxlbmd0aDtcblx0XHRcdHZhciBpdGVtc0hpZGRlbiA9ICQodGhpcykuZmluZCgnLm5vdGljZS1vZi1pbnN1cmFuY2VfX2NoZWNrYm94X2hpZGRlbicpLmxlbmd0aDtcblx0XHRcdGlmIChpdGVtcyA9PT0gaXRlbXNIaWRkZW4pIHtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnbm90aWNlLW9mLWluc3VyYW5jZV9faXRlbV9oaWRkZW4nKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdub3RpY2Utb2YtaW5zdXJhbmNlX19pdGVtX2hpZGRlbicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBzZWxlY3Rcblx0JCgnLmpzLWV4YW1wbGUtYmFzaWMtc2luZ2xlJykuc2VsZWN0Mih7XG5cdFx0bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxuXHRcdHBsYWNlaG9sZGVyOiBcItCS0YvQsdC10YDQuNGC0LUg0KHQmiDQuNC3INGB0L/QuNGB0LrQsFwiLFxuXHRcdGFsbG93Q2xlYXI6IHRydWUsXG5cdFx0d2lkdGg6ICdlbGVtZW50Jyxcblx0XHRjbG9zZU9uU2VsZWN0OiBmYWxzZVxuXHR9KTtcblxuXHQvLyBJbmZvcm1hdGlvbiBhbmQgaW5xdWlyaWVzIGhpbnRcblx0dmFyIGJveCA9ICQoJy5ib3hfX2xpbmtzJyk7XG5cdCQoYm94KS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoYm94KS5maW5kKCdwJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKHRoaXMpLmhpZGUoKTtcblx0XHR9KTtcblx0XHQkKHRoaXMpLm5leHQoJ3AnKS5zaG93KCk7XG5cdH0pO1xufSk7Il19
