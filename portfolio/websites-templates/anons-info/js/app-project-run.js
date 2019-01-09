(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(document).ready(function () {
	// mobile nav show/hide : begin
	$(".header__burger-btn").click(function () {
		$(".header__nav-panel").addClass("header__nav-panel_active");
		$("body").addClass("body_hidden");
	});
	$(".header__nav-panel-overlay").click(function () {
		$(".header__nav-panel").removeClass("header__nav-panel_active");
		$("body").removeClass("body_hidden");
	});
	// mobile nav show/hide : end

	// mobile filter show/hide : begin
	$(".header__filter-btn").click(function () {
		$(".header__filter-panel").addClass("header__filter-panel_active");
	});
	$(".header__filter-panel-header-btn").click(function () {
		$(".header__filter-panel").removeClass("header__filter-panel_active");
	});
	// mobile filter show/hide : end

	// mobile filter location show/hide : begin
	$(".header__filter-panel-text").click(function () {
		$(".header__region").addClass("header__region_active");
	});
	$(".header__region-header-btn").click(function () {
		$(".header__region").removeClass("header__region_active");
	});
	// mobile filter location show/hide : end

	// card : begin
	$(".card__slider-for").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: ".card__slider-nav"
	});
	$(".card__slider-nav").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: ".card__slider-for",
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		vertical: true
	});
	// mobile
	$(".card-mobile__slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
	});
	// card : end

	// scroll to top : begin
	$("a[href='#scroll-to-top']").click(function () {
		$("html, body").animate(
			{
				scrollTop: 0
			},
			"slow"
		);
		return false;
	});
	// scroll to top : end

	// show/hide categories and location : begin
	$(".search__select_categories, .search__select_location").click(function () {
		var dataWindow = $(this).data("window");
		var smallWindow = $(
			'.search__select-list[data-window="' + dataWindow + '"]'
		);
		$(this).toggleClass("search__select_active");
		$(smallWindow).toggleClass("search__select-list_active");
	});
	// show/hide categories and location : end

	// show/hide year of release : begin
	$(".search__select_year-of-release").click(function () {
		var dataWindow = $(this).data("window");
		var smallWindow = $(
			'.search__range-of-year-wrapper[data-window="' + dataWindow + '"]'
		);
		$(this).toggleClass("search__select_active");
		$(smallWindow).toggleClass("search__range-of-year-wrapper_active");
	});
	// show/hide year of release : end

	// show/hide range of price : begin
	$(".search__select_range-of-price").click(function () {
		var dataWindow = $(this).data("window");
		var smallWindow = $(
			'.search__range-of-price-wrapper[data-window="' + dataWindow + '"]'
		);
		$(this).toggleClass("search__select_active");
		var smallWindow = $(
			'.search__range-of-price-wrapper[data-window="' + dataWindow + '"]'
		);
		$(smallWindow).toggleClass("search__range-of-price-wrapper_active");
	});
	// show/hide range of price : end

	// type of product wrapper : begin
	$(".search__select_type-of-product").click(function () {
		var dataWindow = $(this).data("window");
		var smallWindow = $(
			'.search__range-of-price-wrapper[data-window="' + dataWindow + '"]'
		);
		$(this).toggleClass("search__select_active");
		var smallWindow = $(
			'.search__type-of-product-wrapper[data-window="' + dataWindow + '"]'
		);
		$(smallWindow).toggleClass("search__type-of-product-wrapper_active");
	});
	// type of product wrapper : end

	// metro show/hide : begin
	$(".search__select_metro").click(function () {
		$(this).toggleClass('search__select_active')
		$(".metro-moscow").toggleClass('metro-moscow_active')
	});
	// metro show/hide : begin

	// select2 init : begin
	$('.search__select2, .personal-data__select2').select2({
		dropdownCssClass: 'no-search',
		width: 'resolve'
	});
	// select2 init : end

	// input file. get img, convert to base64 and set bg. remove bg : begin
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('.personal-data__avatar-ctrls').css('background-image', 'url("' + e.target.result + '")');
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	$('.personal-data__avatar-ctrl-file').change(function () {
		readURL(this);
	});

	$('.personal-data__avatar-ctrl_cancel, .personal-data__avatar-ctrl_delete').click(function () {
		$(this).closest('.personal-data__avatar-ctrls').css('background-image', 'none');
	});
	// input file. get img, convert to base64 and set bg. remove bg : end

	// range of year slider : begin
	$(".search__range-of-year-slider").slider({
		range: true,
		min: 1900,
		max: 2018,
		values: [1985, 2018],
		slide: function (event, ui) {
			$(".search__range-of-year-amount")
				.find(".search__range-of-year-amount-item_first")
				.text(ui.values[0]);
			$(".search__range-of-year-amount")
				.find(".search__range-of-year-amount-item_second")
				.text(ui.values[1]);
		}
	});
	$(".search__range-of-year-amount")
		.find(".search__range-of-year-amount-item_first")
		.text($(".search__range-of-year-slider").slider("values", 0));
	$(".search__range-of-year-amount")
		.find(".search__range-of-year-amount-item_second")
		.text($(".search__range-of-year-slider").slider("values", 1));
	// range of year slider : end

	// prohibition to enter any characters except numbers : begin
	$.fn.forceNumbericOnly = function () {
		return this.each(function () {
			$(this).keydown(function (e) {
				var key = e.charCode || e.keyCode || 0;
				// Разрешаем backspace, tab, delete, стрелки, обычные цифры и цифры на дополнительной клавиатуре
				return (
					key == 8 ||
					key == 9 ||
					key == 46 ||
					(key >= 37 && key <= 40) ||
					(key >= 48 && key <= 57) ||
					(key >= 96 && key <= 105)
				);
			});
		});
	};
	$(
		".search__range-of-price-input-item, .header__filter-price-input-item"
	).forceNumbericOnly();
	// prohibition to enter any characters except numbers : end

	// slider price for mobile filter : begin
	$(function () {
		var text = $(".header__filter-panel-text-of-distance-number");
		$(".header__filter-slider-of-distance").slider({
			min: 1,
			max: 200,
			value: 50,
			create: function () {
				text.text($(this).slider("value"));
			},
			slide: function (event, ui) {
				text.text(ui.value);
			}
		});
	});
	// slider price for mobile filter : end

	// type of product scrollbar init : begin
	var ps = new PerfectScrollbar(".search__type-of-product-wrapper-inner");
	// type of product scrollbar init : end

	// type of product scrollbar item show/hide : begin
	$(".search__type-of-product-item-arrow").click(function () {
		$(".search__type-of-product-item").toggleClass(
			"search__type-of-product-item_active"
		);
		ps.update();
	});
	// type of product scrollbar item show/hide : end
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0Ly8gbW9iaWxlIG5hdiBzaG93L2hpZGUgOiBiZWdpblxuXHQkKFwiLmhlYWRlcl9fYnVyZ2VyLWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0JChcIi5oZWFkZXJfX25hdi1wYW5lbFwiKS5hZGRDbGFzcyhcImhlYWRlcl9fbmF2LXBhbmVsX2FjdGl2ZVwiKTtcblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcImJvZHlfaGlkZGVuXCIpO1xuXHR9KTtcblx0JChcIi5oZWFkZXJfX25hdi1wYW5lbC1vdmVybGF5XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmhlYWRlcl9fbmF2LXBhbmVsXCIpLnJlbW92ZUNsYXNzKFwiaGVhZGVyX19uYXYtcGFuZWxfYWN0aXZlXCIpO1xuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYm9keV9oaWRkZW5cIik7XG5cdH0pO1xuXHQvLyBtb2JpbGUgbmF2IHNob3cvaGlkZSA6IGVuZFxuXG5cdC8vIG1vYmlsZSBmaWx0ZXIgc2hvdy9oaWRlIDogYmVnaW5cblx0JChcIi5oZWFkZXJfX2ZpbHRlci1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdCQoXCIuaGVhZGVyX19maWx0ZXItcGFuZWxcIikuYWRkQ2xhc3MoXCJoZWFkZXJfX2ZpbHRlci1wYW5lbF9hY3RpdmVcIik7XG5cdH0pO1xuXHQkKFwiLmhlYWRlcl9fZmlsdGVyLXBhbmVsLWhlYWRlci1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdCQoXCIuaGVhZGVyX19maWx0ZXItcGFuZWxcIikucmVtb3ZlQ2xhc3MoXCJoZWFkZXJfX2ZpbHRlci1wYW5lbF9hY3RpdmVcIik7XG5cdH0pO1xuXHQvLyBtb2JpbGUgZmlsdGVyIHNob3cvaGlkZSA6IGVuZFxuXG5cdC8vIG1vYmlsZSBmaWx0ZXIgbG9jYXRpb24gc2hvdy9oaWRlIDogYmVnaW5cblx0JChcIi5oZWFkZXJfX2ZpbHRlci1wYW5lbC10ZXh0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmhlYWRlcl9fcmVnaW9uXCIpLmFkZENsYXNzKFwiaGVhZGVyX19yZWdpb25fYWN0aXZlXCIpO1xuXHR9KTtcblx0JChcIi5oZWFkZXJfX3JlZ2lvbi1oZWFkZXItYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmhlYWRlcl9fcmVnaW9uXCIpLnJlbW92ZUNsYXNzKFwiaGVhZGVyX19yZWdpb25fYWN0aXZlXCIpO1xuXHR9KTtcblx0Ly8gbW9iaWxlIGZpbHRlciBsb2NhdGlvbiBzaG93L2hpZGUgOiBlbmRcblxuXHQvLyBjYXJkIDogYmVnaW5cblx0JChcIi5jYXJkX19zbGlkZXItZm9yXCIpLnNsaWNrKHtcblx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0YXJyb3dzOiBmYWxzZSxcblx0XHRmYWRlOiB0cnVlLFxuXHRcdGFzTmF2Rm9yOiBcIi5jYXJkX19zbGlkZXItbmF2XCJcblx0fSk7XG5cdCQoXCIuY2FyZF9fc2xpZGVyLW5hdlwiKS5zbGljayh7XG5cdFx0c2xpZGVzVG9TaG93OiA0LFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdGFzTmF2Rm9yOiBcIi5jYXJkX19zbGlkZXItZm9yXCIsXG5cdFx0ZG90czogZmFsc2UsXG5cdFx0Y2VudGVyTW9kZTogZmFsc2UsXG5cdFx0Zm9jdXNPblNlbGVjdDogdHJ1ZSxcblx0XHR2ZXJ0aWNhbDogdHJ1ZVxuXHR9KTtcblx0Ly8gbW9iaWxlXG5cdCQoXCIuY2FyZC1tb2JpbGVfX3NsaWRlclwiKS5zbGljayh7XG5cdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdGFycm93czogZmFsc2Vcblx0fSk7XG5cdC8vIGNhcmQgOiBlbmRcblxuXHQvLyBzY3JvbGwgdG8gdG9wIDogYmVnaW5cblx0JChcImFbaHJlZj0nI3Njcm9sbC10by10b3AnXVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0JChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcblx0XHRcdHtcblx0XHRcdFx0c2Nyb2xsVG9wOiAwXG5cdFx0XHR9LFxuXHRcdFx0XCJzbG93XCJcblx0XHQpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSk7XG5cdC8vIHNjcm9sbCB0byB0b3AgOiBlbmRcblxuXHQvLyBzaG93L2hpZGUgY2F0ZWdvcmllcyBhbmQgbG9jYXRpb24gOiBiZWdpblxuXHQkKFwiLnNlYXJjaF9fc2VsZWN0X2NhdGVnb3JpZXMsIC5zZWFyY2hfX3NlbGVjdF9sb2NhdGlvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGRhdGFXaW5kb3cgPSAkKHRoaXMpLmRhdGEoXCJ3aW5kb3dcIik7XG5cdFx0dmFyIHNtYWxsV2luZG93ID0gJChcblx0XHRcdCcuc2VhcmNoX19zZWxlY3QtbGlzdFtkYXRhLXdpbmRvdz1cIicgKyBkYXRhV2luZG93ICsgJ1wiXSdcblx0XHQpO1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoXCJzZWFyY2hfX3NlbGVjdF9hY3RpdmVcIik7XG5cdFx0JChzbWFsbFdpbmRvdykudG9nZ2xlQ2xhc3MoXCJzZWFyY2hfX3NlbGVjdC1saXN0X2FjdGl2ZVwiKTtcblx0fSk7XG5cdC8vIHNob3cvaGlkZSBjYXRlZ29yaWVzIGFuZCBsb2NhdGlvbiA6IGVuZFxuXG5cdC8vIHNob3cvaGlkZSB5ZWFyIG9mIHJlbGVhc2UgOiBiZWdpblxuXHQkKFwiLnNlYXJjaF9fc2VsZWN0X3llYXItb2YtcmVsZWFzZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGRhdGFXaW5kb3cgPSAkKHRoaXMpLmRhdGEoXCJ3aW5kb3dcIik7XG5cdFx0dmFyIHNtYWxsV2luZG93ID0gJChcblx0XHRcdCcuc2VhcmNoX19yYW5nZS1vZi15ZWFyLXdyYXBwZXJbZGF0YS13aW5kb3c9XCInICsgZGF0YVdpbmRvdyArICdcIl0nXG5cdFx0KTtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKFwic2VhcmNoX19zZWxlY3RfYWN0aXZlXCIpO1xuXHRcdCQoc21hbGxXaW5kb3cpLnRvZ2dsZUNsYXNzKFwic2VhcmNoX19yYW5nZS1vZi15ZWFyLXdyYXBwZXJfYWN0aXZlXCIpO1xuXHR9KTtcblx0Ly8gc2hvdy9oaWRlIHllYXIgb2YgcmVsZWFzZSA6IGVuZFxuXG5cdC8vIHNob3cvaGlkZSByYW5nZSBvZiBwcmljZSA6IGJlZ2luXG5cdCQoXCIuc2VhcmNoX19zZWxlY3RfcmFuZ2Utb2YtcHJpY2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdHZhciBkYXRhV2luZG93ID0gJCh0aGlzKS5kYXRhKFwid2luZG93XCIpO1xuXHRcdHZhciBzbWFsbFdpbmRvdyA9ICQoXG5cdFx0XHQnLnNlYXJjaF9fcmFuZ2Utb2YtcHJpY2Utd3JhcHBlcltkYXRhLXdpbmRvdz1cIicgKyBkYXRhV2luZG93ICsgJ1wiXSdcblx0XHQpO1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoXCJzZWFyY2hfX3NlbGVjdF9hY3RpdmVcIik7XG5cdFx0dmFyIHNtYWxsV2luZG93ID0gJChcblx0XHRcdCcuc2VhcmNoX19yYW5nZS1vZi1wcmljZS13cmFwcGVyW2RhdGEtd2luZG93PVwiJyArIGRhdGFXaW5kb3cgKyAnXCJdJ1xuXHRcdCk7XG5cdFx0JChzbWFsbFdpbmRvdykudG9nZ2xlQ2xhc3MoXCJzZWFyY2hfX3JhbmdlLW9mLXByaWNlLXdyYXBwZXJfYWN0aXZlXCIpO1xuXHR9KTtcblx0Ly8gc2hvdy9oaWRlIHJhbmdlIG9mIHByaWNlIDogZW5kXG5cblx0Ly8gdHlwZSBvZiBwcm9kdWN0IHdyYXBwZXIgOiBiZWdpblxuXHQkKFwiLnNlYXJjaF9fc2VsZWN0X3R5cGUtb2YtcHJvZHVjdFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGRhdGFXaW5kb3cgPSAkKHRoaXMpLmRhdGEoXCJ3aW5kb3dcIik7XG5cdFx0dmFyIHNtYWxsV2luZG93ID0gJChcblx0XHRcdCcuc2VhcmNoX19yYW5nZS1vZi1wcmljZS13cmFwcGVyW2RhdGEtd2luZG93PVwiJyArIGRhdGFXaW5kb3cgKyAnXCJdJ1xuXHRcdCk7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcyhcInNlYXJjaF9fc2VsZWN0X2FjdGl2ZVwiKTtcblx0XHR2YXIgc21hbGxXaW5kb3cgPSAkKFxuXHRcdFx0Jy5zZWFyY2hfX3R5cGUtb2YtcHJvZHVjdC13cmFwcGVyW2RhdGEtd2luZG93PVwiJyArIGRhdGFXaW5kb3cgKyAnXCJdJ1xuXHRcdCk7XG5cdFx0JChzbWFsbFdpbmRvdykudG9nZ2xlQ2xhc3MoXCJzZWFyY2hfX3R5cGUtb2YtcHJvZHVjdC13cmFwcGVyX2FjdGl2ZVwiKTtcblx0fSk7XG5cdC8vIHR5cGUgb2YgcHJvZHVjdCB3cmFwcGVyIDogZW5kXG5cblx0Ly8gbWV0cm8gc2hvdy9oaWRlIDogYmVnaW5cblx0JChcIi5zZWFyY2hfX3NlbGVjdF9tZXRyb1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnc2VhcmNoX19zZWxlY3RfYWN0aXZlJylcblx0XHQkKFwiLm1ldHJvLW1vc2Nvd1wiKS50b2dnbGVDbGFzcygnbWV0cm8tbW9zY293X2FjdGl2ZScpXG5cdH0pO1xuXHQvLyBtZXRybyBzaG93L2hpZGUgOiBiZWdpblxuXG5cdC8vIHNlbGVjdDIgaW5pdCA6IGJlZ2luXG5cdCQoJy5zZWFyY2hfX3NlbGVjdDIsIC5wZXJzb25hbC1kYXRhX19zZWxlY3QyJykuc2VsZWN0Mih7XG5cdFx0ZHJvcGRvd25Dc3NDbGFzczogJ25vLXNlYXJjaCcsXG5cdFx0d2lkdGg6ICdyZXNvbHZlJ1xuXHR9KTtcblx0Ly8gc2VsZWN0MiBpbml0IDogZW5kXG5cblx0Ly8gaW5wdXQgZmlsZS4gZ2V0IGltZywgY29udmVydCB0byBiYXNlNjQgYW5kIHNldCBiZy4gcmVtb3ZlIGJnIDogYmVnaW5cblx0ZnVuY3Rpb24gcmVhZFVSTChpbnB1dCkge1xuXHRcdGlmIChpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlc1swXSkge1xuXHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cblx0XHRcdHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkKCcucGVyc29uYWwtZGF0YV9fYXZhdGFyLWN0cmxzJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybChcIicgKyBlLnRhcmdldC5yZXN1bHQgKyAnXCIpJyk7XG5cdFx0XHR9XG5cblx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGlucHV0LmZpbGVzWzBdKTtcblx0XHR9XG5cdH1cblxuXHQkKCcucGVyc29uYWwtZGF0YV9fYXZhdGFyLWN0cmwtZmlsZScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG5cdFx0cmVhZFVSTCh0aGlzKTtcblx0fSk7XG5cblx0JCgnLnBlcnNvbmFsLWRhdGFfX2F2YXRhci1jdHJsX2NhbmNlbCwgLnBlcnNvbmFsLWRhdGFfX2F2YXRhci1jdHJsX2RlbGV0ZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5wZXJzb25hbC1kYXRhX19hdmF0YXItY3RybHMnKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnbm9uZScpO1xuXHR9KTtcblx0Ly8gaW5wdXQgZmlsZS4gZ2V0IGltZywgY29udmVydCB0byBiYXNlNjQgYW5kIHNldCBiZy4gcmVtb3ZlIGJnIDogZW5kXG5cblx0Ly8gcmFuZ2Ugb2YgeWVhciBzbGlkZXIgOiBiZWdpblxuXHQkKFwiLnNlYXJjaF9fcmFuZ2Utb2YteWVhci1zbGlkZXJcIikuc2xpZGVyKHtcblx0XHRyYW5nZTogdHJ1ZSxcblx0XHRtaW46IDE5MDAsXG5cdFx0bWF4OiAyMDE4LFxuXHRcdHZhbHVlczogWzE5ODUsIDIwMThdLFxuXHRcdHNsaWRlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cdFx0XHQkKFwiLnNlYXJjaF9fcmFuZ2Utb2YteWVhci1hbW91bnRcIilcblx0XHRcdFx0LmZpbmQoXCIuc2VhcmNoX19yYW5nZS1vZi15ZWFyLWFtb3VudC1pdGVtX2ZpcnN0XCIpXG5cdFx0XHRcdC50ZXh0KHVpLnZhbHVlc1swXSk7XG5cdFx0XHQkKFwiLnNlYXJjaF9fcmFuZ2Utb2YteWVhci1hbW91bnRcIilcblx0XHRcdFx0LmZpbmQoXCIuc2VhcmNoX19yYW5nZS1vZi15ZWFyLWFtb3VudC1pdGVtX3NlY29uZFwiKVxuXHRcdFx0XHQudGV4dCh1aS52YWx1ZXNbMV0pO1xuXHRcdH1cblx0fSk7XG5cdCQoXCIuc2VhcmNoX19yYW5nZS1vZi15ZWFyLWFtb3VudFwiKVxuXHRcdC5maW5kKFwiLnNlYXJjaF9fcmFuZ2Utb2YteWVhci1hbW91bnQtaXRlbV9maXJzdFwiKVxuXHRcdC50ZXh0KCQoXCIuc2VhcmNoX19yYW5nZS1vZi15ZWFyLXNsaWRlclwiKS5zbGlkZXIoXCJ2YWx1ZXNcIiwgMCkpO1xuXHQkKFwiLnNlYXJjaF9fcmFuZ2Utb2YteWVhci1hbW91bnRcIilcblx0XHQuZmluZChcIi5zZWFyY2hfX3JhbmdlLW9mLXllYXItYW1vdW50LWl0ZW1fc2Vjb25kXCIpXG5cdFx0LnRleHQoJChcIi5zZWFyY2hfX3JhbmdlLW9mLXllYXItc2xpZGVyXCIpLnNsaWRlcihcInZhbHVlc1wiLCAxKSk7XG5cdC8vIHJhbmdlIG9mIHllYXIgc2xpZGVyIDogZW5kXG5cblx0Ly8gcHJvaGliaXRpb24gdG8gZW50ZXIgYW55IGNoYXJhY3RlcnMgZXhjZXB0IG51bWJlcnMgOiBiZWdpblxuXHQkLmZuLmZvcmNlTnVtYmVyaWNPbmx5ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0JCh0aGlzKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZSB8fCAwO1xuXHRcdFx0XHQvLyDQoNCw0LfRgNC10YjQsNC10LwgYmFja3NwYWNlLCB0YWIsIGRlbGV0ZSwg0YHRgtGA0LXQu9C60LgsINC+0LHRi9GH0L3Ri9C1INGG0LjRhNGA0Ysg0Lgg0YbQuNGE0YDRiyDQvdCwINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdC+0Lkg0LrQu9Cw0LLQuNCw0YLRg9GA0LVcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRrZXkgPT0gOCB8fFxuXHRcdFx0XHRcdGtleSA9PSA5IHx8XG5cdFx0XHRcdFx0a2V5ID09IDQ2IHx8XG5cdFx0XHRcdFx0KGtleSA+PSAzNyAmJiBrZXkgPD0gNDApIHx8XG5cdFx0XHRcdFx0KGtleSA+PSA0OCAmJiBrZXkgPD0gNTcpIHx8XG5cdFx0XHRcdFx0KGtleSA+PSA5NiAmJiBrZXkgPD0gMTA1KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cdCQoXG5cdFx0XCIuc2VhcmNoX19yYW5nZS1vZi1wcmljZS1pbnB1dC1pdGVtLCAuaGVhZGVyX19maWx0ZXItcHJpY2UtaW5wdXQtaXRlbVwiXG5cdCkuZm9yY2VOdW1iZXJpY09ubHkoKTtcblx0Ly8gcHJvaGliaXRpb24gdG8gZW50ZXIgYW55IGNoYXJhY3RlcnMgZXhjZXB0IG51bWJlcnMgOiBlbmRcblxuXHQvLyBzbGlkZXIgcHJpY2UgZm9yIG1vYmlsZSBmaWx0ZXIgOiBiZWdpblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGV4dCA9ICQoXCIuaGVhZGVyX19maWx0ZXItcGFuZWwtdGV4dC1vZi1kaXN0YW5jZS1udW1iZXJcIik7XG5cdFx0JChcIi5oZWFkZXJfX2ZpbHRlci1zbGlkZXItb2YtZGlzdGFuY2VcIikuc2xpZGVyKHtcblx0XHRcdG1pbjogMSxcblx0XHRcdG1heDogMjAwLFxuXHRcdFx0dmFsdWU6IDUwLFxuXHRcdFx0Y3JlYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRleHQudGV4dCgkKHRoaXMpLnNsaWRlcihcInZhbHVlXCIpKTtcblx0XHRcdH0sXG5cdFx0XHRzbGlkZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXHRcdFx0XHR0ZXh0LnRleHQodWkudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblx0Ly8gc2xpZGVyIHByaWNlIGZvciBtb2JpbGUgZmlsdGVyIDogZW5kXG5cblx0Ly8gdHlwZSBvZiBwcm9kdWN0IHNjcm9sbGJhciBpbml0IDogYmVnaW5cblx0dmFyIHBzID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIoXCIuc2VhcmNoX190eXBlLW9mLXByb2R1Y3Qtd3JhcHBlci1pbm5lclwiKTtcblx0Ly8gdHlwZSBvZiBwcm9kdWN0IHNjcm9sbGJhciBpbml0IDogZW5kXG5cblx0Ly8gdHlwZSBvZiBwcm9kdWN0IHNjcm9sbGJhciBpdGVtIHNob3cvaGlkZSA6IGJlZ2luXG5cdCQoXCIuc2VhcmNoX190eXBlLW9mLXByb2R1Y3QtaXRlbS1hcnJvd1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0JChcIi5zZWFyY2hfX3R5cGUtb2YtcHJvZHVjdC1pdGVtXCIpLnRvZ2dsZUNsYXNzKFxuXHRcdFx0XCJzZWFyY2hfX3R5cGUtb2YtcHJvZHVjdC1pdGVtX2FjdGl2ZVwiXG5cdFx0KTtcblx0XHRwcy51cGRhdGUoKTtcblx0fSk7XG5cdC8vIHR5cGUgb2YgcHJvZHVjdCBzY3JvbGxiYXIgaXRlbSBzaG93L2hpZGUgOiBlbmRcbn0pO1xuIl19
