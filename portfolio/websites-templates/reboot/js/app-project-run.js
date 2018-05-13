(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function animateHeader() {
	$('.header').addClass('header_active');
}

function initSlickSlider() {
	$('.adaptive__slider').slick({
		infinite: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.adaptive__control.adaptive__control_prev').on('click', function () {
		$('.adaptive__slider').slick('slickPrev');
	});

	$('.adaptive__control.adaptive__control_next').on('click', function () {
		$('.adaptive__slider').slick('slickNext');
	});
}

function initSlickSlider2() {
	$('.design__slider').slick({
		infinite: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.design__control.design__control_prev').on('click', function () {
		$('.design__slider').slick('slickPrev');
	});

	$('.design__control.design__control_next').on('click', function () {
		$('.design__slider').slick('slickNext');
	});
}

function animateNav() {
	$('.header__hamburger-menu').on('click', function () {
		$(this).toggleClass('header__hamburger-menu_active');
		$('.nav').toggleClass('nav_active');
		$('body').toggleClass('hidden');
	});
}

function wowInit() {
	new WOW().init({
		mobile: false
	});
}

function skrollrInit() {
	if ($(window).width() >= 1200) {
		skrollr.init({
			forceHeight: false
		});
	}
	else {
		skrollr.init().destroy();
	}
}

function setHeightTypoColor() {
	function calcHeight() {
		if (window.DeviceOrientationEvent) {
			window.addEventListener('orientationchange', function () {
				location.reload();
			}, false);
		}
		var newHeight = $('.typo-color').outerHeight();
		if (768 < $(window).width() < 960) {
			newHeight = newHeight - 390 - 69;
			$('.typo-color').css({'height': newHeight + 'px'});
		}
		else if ($(window).width() >= 960) {
			newHeight = newHeight - 543 - 69;
			$('.typo-color').css({'height': newHeight + 'px'});
		}
	}

	calcHeight();

	window.addEventListener('resize', function (event) {
		calcHeight();
	})
}

if (typeof (window) !== 'undefined') {
	window.addEventListener('load', function () {
		animateHeader();
		initSlickSlider();
		initSlickSlider2();
		animateNav();
		wowInit();
		skrollrInit();
		setHeightTypoColor();
	})
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIGFuaW1hdGVIZWFkZXIoKSB7XG5cdCQoJy5oZWFkZXInKS5hZGRDbGFzcygnaGVhZGVyX2FjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiBpbml0U2xpY2tTbGlkZXIoKSB7XG5cdCQoJy5hZGFwdGl2ZV9fc2xpZGVyJykuc2xpY2soe1xuXHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdGFycm93czogZmFsc2UsXG5cdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxXG5cdH0pO1xuXG5cdCQoJy5hZGFwdGl2ZV9fY29udHJvbC5hZGFwdGl2ZV9fY29udHJvbF9wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5hZGFwdGl2ZV9fc2xpZGVyJykuc2xpY2soJ3NsaWNrUHJldicpO1xuXHR9KTtcblxuXHQkKCcuYWRhcHRpdmVfX2NvbnRyb2wuYWRhcHRpdmVfX2NvbnRyb2xfbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuYWRhcHRpdmVfX3NsaWRlcicpLnNsaWNrKCdzbGlja05leHQnKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGluaXRTbGlja1NsaWRlcjIoKSB7XG5cdCQoJy5kZXNpZ25fX3NsaWRlcicpLnNsaWNrKHtcblx0XHRpbmZpbml0ZTogdHJ1ZSxcblx0XHRhcnJvd3M6IGZhbHNlLFxuXHRcdHNsaWRlc1RvU2hvdzogMSxcblx0XHRzbGlkZXNUb1Njcm9sbDogMVxuXHR9KTtcblxuXHQkKCcuZGVzaWduX19jb250cm9sLmRlc2lnbl9fY29udHJvbF9wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5kZXNpZ25fX3NsaWRlcicpLnNsaWNrKCdzbGlja1ByZXYnKTtcblx0fSk7XG5cblx0JCgnLmRlc2lnbl9fY29udHJvbC5kZXNpZ25fX2NvbnRyb2xfbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuZGVzaWduX19zbGlkZXInKS5zbGljaygnc2xpY2tOZXh0Jyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlTmF2KCkge1xuXHQkKCcuaGVhZGVyX19oYW1idXJnZXItbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2hhbWJ1cmdlci1tZW51X2FjdGl2ZScpO1xuXHRcdCQoJy5uYXYnKS50b2dnbGVDbGFzcygnbmF2X2FjdGl2ZScpO1xuXHRcdCQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGlkZGVuJyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiB3b3dJbml0KCkge1xuXHRuZXcgV09XKCkuaW5pdCh7XG5cdFx0bW9iaWxlOiBmYWxzZVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gc2tyb2xsckluaXQoKSB7XG5cdGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMjAwKSB7XG5cdFx0c2tyb2xsci5pbml0KHtcblx0XHRcdGZvcmNlSGVpZ2h0OiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHNrcm9sbHIuaW5pdCgpLmRlc3Ryb3koKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzZXRIZWlnaHRUeXBvQ29sb3IoKSB7XG5cdGZ1bmN0aW9uIGNhbGNIZWlnaHQoKSB7XG5cdFx0aWYgKHdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50KSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdH1cblx0XHR2YXIgbmV3SGVpZ2h0ID0gJCgnLnR5cG8tY29sb3InKS5vdXRlckhlaWdodCgpO1xuXHRcdGlmICg3NjggPCAkKHdpbmRvdykud2lkdGgoKSA8IDk2MCkge1xuXHRcdFx0bmV3SGVpZ2h0ID0gbmV3SGVpZ2h0IC0gMzkwIC0gNjk7XG5cdFx0XHQkKCcudHlwby1jb2xvcicpLmNzcyh7J2hlaWdodCc6IG5ld0hlaWdodCArICdweCd9KTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gOTYwKSB7XG5cdFx0XHRuZXdIZWlnaHQgPSBuZXdIZWlnaHQgLSA1NDMgLSA2OTtcblx0XHRcdCQoJy50eXBvLWNvbG9yJykuY3NzKHsnaGVpZ2h0JzogbmV3SGVpZ2h0ICsgJ3B4J30pO1xuXHRcdH1cblx0fVxuXG5cdGNhbGNIZWlnaHQoKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0Y2FsY0hlaWdodCgpO1xuXHR9KVxufVxuXG5pZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRhbmltYXRlSGVhZGVyKCk7XG5cdFx0aW5pdFNsaWNrU2xpZGVyKCk7XG5cdFx0aW5pdFNsaWNrU2xpZGVyMigpO1xuXHRcdGFuaW1hdGVOYXYoKTtcblx0XHR3b3dJbml0KCk7XG5cdFx0c2tyb2xsckluaXQoKTtcblx0XHRzZXRIZWlnaHRUeXBvQ29sb3IoKTtcblx0fSlcbn1cbiJdfQ==
