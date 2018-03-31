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

	$('.js-example-basic-single').select2({
		minimumResultsForSearch: -1,
		placeholder: "Выберите СК из списка",
		allowClear: true,
		width: 'element',
		closeOnSelect: false
	});
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHQkKCcjbm90aWNlLW9mLWluc3VyYW5jZS1zZWFyY2gtaW5wdXQnKS5mb2N1cyhmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLm5vdGljZS1vZi1pbnN1cmFuY2VfX3BheW1lbnQtc2NoZWR1bGUnKS5oaWRlKCk7XG5cdH0pO1xuXG5cdCQoJyNub3RpY2Utb2YtaW5zdXJhbmNlLXNlYXJjaC1pbnB1dCcpLmtleXVwKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdmFsdWUgPSAnJztcblx0XHRcdHZhbHVlID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0JCgnLm5vdGljZS1vZi1pbnN1cmFuY2VfX2NoZWNrYm94JykuYWRkQ2xhc3MoJ25vdGljZS1vZi1pbnN1cmFuY2VfX2NoZWNrYm94X2hpZGRlbicpO1xuXHRcdCQoXCIubm90aWNlLW9mLWluc3VyYW5jZV9fY2hlY2tib3g6Y29udGFpbnMoJ1wiICsgdmFsdWUgKyBcIicpXCIpLnJlbW92ZUNsYXNzKCdub3RpY2Utb2YtaW5zdXJhbmNlX19jaGVja2JveF9oaWRkZW4nKTtcblxuXHRcdCQoJy5ub3RpY2Utb2YtaW5zdXJhbmNlX19pdGVtJykuZWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0dmFyIGl0ZW1zID0gJCh0aGlzKS5maW5kKCcubm90aWNlLW9mLWluc3VyYW5jZV9fY2hlY2tib3gnKS5sZW5ndGg7XG5cdFx0XHR2YXIgaXRlbXNIaWRkZW4gPSAkKHRoaXMpLmZpbmQoJy5ub3RpY2Utb2YtaW5zdXJhbmNlX19jaGVja2JveF9oaWRkZW4nKS5sZW5ndGg7XG5cdFx0XHRpZiAoaXRlbXMgPT09IGl0ZW1zSGlkZGVuKSB7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ25vdGljZS1vZi1pbnN1cmFuY2VfX2l0ZW1faGlkZGVuJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnbm90aWNlLW9mLWluc3VyYW5jZV9faXRlbV9oaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0JCgnLmpzLWV4YW1wbGUtYmFzaWMtc2luZ2xlJykuc2VsZWN0Mih7XG5cdFx0bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxuXHRcdHBsYWNlaG9sZGVyOiBcItCS0YvQsdC10YDQuNGC0LUg0KHQmiDQuNC3INGB0L/QuNGB0LrQsFwiLFxuXHRcdGFsbG93Q2xlYXI6IHRydWUsXG5cdFx0d2lkdGg6ICdlbGVtZW50Jyxcblx0XHRjbG9zZU9uU2VsZWN0OiBmYWxzZVxuXHR9KTtcbn0pOyJdfQ==
