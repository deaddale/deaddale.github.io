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

	$('.adaptive__slider-mnml').slick({
		infinite: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true
	});

	$('.adaptive__slider-mnml-control.adaptive__slider-mnml-control_prev').on('click', function () {
		$('.adaptive__slider-mnml').slick('slickPrev');
	});

	$('.adaptive__slider-mnml-control.adaptive__slider-mnml-control_next').on('click', function () {
		$('.adaptive__slider-mnml').slick('slickNext');
	});
}

function initSlickSlider2() {
	$('.guideline__slider').slick({
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		arrows: false,
		speed: 400,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}]
	});

	$('.guideline__control.guideline__control_prev').on('click', function () {
		$('.guideline__slider').slick('slickPrev');
	});

	$('.guideline__control.guideline__control_next').on('click', function () {
		$('.guideline__slider').slick('slickNext');
	});
}

function initSlickSlider3() {
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
		// initSlickSlider3();
		animateNav();
		wowInit();
		skrollrInit();
		setHeightTypoColor();
	})
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gYW5pbWF0ZUhlYWRlcigpIHtcblx0JCgnLmhlYWRlcicpLmFkZENsYXNzKCdoZWFkZXJfYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGluaXRTbGlja1NsaWRlcigpIHtcblx0JCgnLmFkYXB0aXZlX19zbGlkZXInKS5zbGljayh7XG5cdFx0aW5maW5pdGU6IHRydWUsXG5cdFx0YXJyb3dzOiBmYWxzZSxcblx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDFcblx0fSk7XG5cblx0JCgnLmFkYXB0aXZlX19jb250cm9sLmFkYXB0aXZlX19jb250cm9sX3ByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmFkYXB0aXZlX19zbGlkZXInKS5zbGljaygnc2xpY2tQcmV2Jyk7XG5cdH0pO1xuXG5cdCQoJy5hZGFwdGl2ZV9fY29udHJvbC5hZGFwdGl2ZV9fY29udHJvbF9uZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5hZGFwdGl2ZV9fc2xpZGVyJykuc2xpY2soJ3NsaWNrTmV4dCcpO1xuXHR9KTtcblxuXHQkKCcuYWRhcHRpdmVfX3NsaWRlci1tbm1sJykuc2xpY2soe1xuXHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdGFycm93czogZmFsc2UsXG5cdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdGNlbnRlck1vZGU6IHRydWVcblx0fSk7XG5cblx0JCgnLmFkYXB0aXZlX19zbGlkZXItbW5tbC1jb250cm9sLmFkYXB0aXZlX19zbGlkZXItbW5tbC1jb250cm9sX3ByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmFkYXB0aXZlX19zbGlkZXItbW5tbCcpLnNsaWNrKCdzbGlja1ByZXYnKTtcblx0fSk7XG5cblx0JCgnLmFkYXB0aXZlX19zbGlkZXItbW5tbC1jb250cm9sLmFkYXB0aXZlX19zbGlkZXItbW5tbC1jb250cm9sX25leHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmFkYXB0aXZlX19zbGlkZXItbW5tbCcpLnNsaWNrKCdzbGlja05leHQnKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGluaXRTbGlja1NsaWRlcjIoKSB7XG5cdCQoJy5ndWlkZWxpbmVfX3NsaWRlcicpLnNsaWNrKHtcblx0XHRjZW50ZXJNb2RlOiB0cnVlLFxuXHRcdGNlbnRlclBhZGRpbmc6ICcwcHgnLFxuXHRcdHNsaWRlc1RvU2hvdzogMyxcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcblx0XHRpbmZpbml0ZTogdHJ1ZSxcblx0XHRhcnJvd3M6IGZhbHNlLFxuXHRcdHNwZWVkOiA0MDAsXG5cdFx0cmVzcG9uc2l2ZTogW3tcblx0XHRcdGJyZWFrcG9pbnQ6IDc2OCxcblx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdHNsaWRlc1RvU2hvdzogMVxuXHRcdFx0fVxuXHRcdH1dXG5cdH0pO1xuXG5cdCQoJy5ndWlkZWxpbmVfX2NvbnRyb2wuZ3VpZGVsaW5lX19jb250cm9sX3ByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmd1aWRlbGluZV9fc2xpZGVyJykuc2xpY2soJ3NsaWNrUHJldicpO1xuXHR9KTtcblxuXHQkKCcuZ3VpZGVsaW5lX19jb250cm9sLmd1aWRlbGluZV9fY29udHJvbF9uZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5ndWlkZWxpbmVfX3NsaWRlcicpLnNsaWNrKCdzbGlja05leHQnKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGluaXRTbGlja1NsaWRlcjMoKSB7XG5cdCQoJy5kZXNpZ25fX3NsaWRlcicpLnNsaWNrKHtcblx0XHRpbmZpbml0ZTogdHJ1ZSxcblx0XHRhcnJvd3M6IGZhbHNlLFxuXHRcdHNsaWRlc1RvU2hvdzogMSxcblx0XHRzbGlkZXNUb1Njcm9sbDogMVxuXHR9KTtcblxuXHQkKCcuZGVzaWduX19jb250cm9sLmRlc2lnbl9fY29udHJvbF9wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5kZXNpZ25fX3NsaWRlcicpLnNsaWNrKCdzbGlja1ByZXYnKTtcblx0fSk7XG5cblx0JCgnLmRlc2lnbl9fY29udHJvbC5kZXNpZ25fX2NvbnRyb2xfbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuZGVzaWduX19zbGlkZXInKS5zbGljaygnc2xpY2tOZXh0Jyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlTmF2KCkge1xuXHQkKCcuaGVhZGVyX19oYW1idXJnZXItbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2hhbWJ1cmdlci1tZW51X2FjdGl2ZScpO1xuXHRcdCQoJy5uYXYnKS50b2dnbGVDbGFzcygnbmF2X2FjdGl2ZScpO1xuXHRcdCQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGlkZGVuJyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiB3b3dJbml0KCkge1xuXHRuZXcgV09XKCkuaW5pdCh7XG5cdFx0bW9iaWxlOiBmYWxzZVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gc2tyb2xsckluaXQoKSB7XG5cdGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMjAwKSB7XG5cdFx0c2tyb2xsci5pbml0KHtcblx0XHRcdGZvcmNlSGVpZ2h0OiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHNrcm9sbHIuaW5pdCgpLmRlc3Ryb3koKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzZXRIZWlnaHRUeXBvQ29sb3IoKSB7XG5cdGZ1bmN0aW9uIGNhbGNIZWlnaHQoKSB7XG5cdFx0aWYgKHdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50KSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdH1cblx0XHR2YXIgbmV3SGVpZ2h0ID0gJCgnLnR5cG8tY29sb3InKS5vdXRlckhlaWdodCgpO1xuXHRcdGlmICg3NjggPCAkKHdpbmRvdykud2lkdGgoKSA8IDk2MCkge1xuXHRcdFx0bmV3SGVpZ2h0ID0gbmV3SGVpZ2h0IC0gMzkwIC0gNjk7XG5cdFx0XHQkKCcudHlwby1jb2xvcicpLmNzcyh7J2hlaWdodCc6IG5ld0hlaWdodCArICdweCd9KTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gOTYwKSB7XG5cdFx0XHRuZXdIZWlnaHQgPSBuZXdIZWlnaHQgLSA1NDMgLSA2OTtcblx0XHRcdCQoJy50eXBvLWNvbG9yJykuY3NzKHsnaGVpZ2h0JzogbmV3SGVpZ2h0ICsgJ3B4J30pO1xuXHRcdH1cblx0fVxuXG5cdGNhbGNIZWlnaHQoKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0Y2FsY0hlaWdodCgpO1xuXHR9KVxufVxuXG5pZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRhbmltYXRlSGVhZGVyKCk7XG5cdFx0aW5pdFNsaWNrU2xpZGVyKCk7XG5cdFx0aW5pdFNsaWNrU2xpZGVyMigpO1xuXHRcdC8vIGluaXRTbGlja1NsaWRlcjMoKTtcblx0XHRhbmltYXRlTmF2KCk7XG5cdFx0d293SW5pdCgpO1xuXHRcdHNrcm9sbHJJbml0KCk7XG5cdFx0c2V0SGVpZ2h0VHlwb0NvbG9yKCk7XG5cdH0pXG59XG4iXX0=
