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
	$('body').removeClass('hidden');
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
		initSlickSlider3();
		animateNav();
		wowInit();
		skrollrInit();
		setHeightTypoColor();
	})
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBhbmltYXRlSGVhZGVyKCkge1xuXHQkKCcuaGVhZGVyJykuYWRkQ2xhc3MoJ2hlYWRlcl9hY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gaW5pdFNsaWNrU2xpZGVyKCkge1xuXHQkKCcuYWRhcHRpdmVfX3NsaWRlcicpLnNsaWNrKHtcblx0XHRpbmZpbml0ZTogdHJ1ZSxcblx0XHRhcnJvd3M6IGZhbHNlLFxuXHRcdHNsaWRlc1RvU2hvdzogMSxcblx0XHRzbGlkZXNUb1Njcm9sbDogMVxuXHR9KTtcblxuXHQkKCcuYWRhcHRpdmVfX2NvbnRyb2wuYWRhcHRpdmVfX2NvbnRyb2xfcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuYWRhcHRpdmVfX3NsaWRlcicpLnNsaWNrKCdzbGlja1ByZXYnKTtcblx0fSk7XG5cblx0JCgnLmFkYXB0aXZlX19jb250cm9sLmFkYXB0aXZlX19jb250cm9sX25leHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmFkYXB0aXZlX19zbGlkZXInKS5zbGljaygnc2xpY2tOZXh0Jyk7XG5cdH0pO1xuXG5cdCQoJy5hZGFwdGl2ZV9fc2xpZGVyLW1ubWwnKS5zbGljayh7XG5cdFx0aW5maW5pdGU6IHRydWUsXG5cdFx0YXJyb3dzOiBmYWxzZSxcblx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0Y2VudGVyTW9kZTogdHJ1ZVxuXHR9KTtcblxuXHQkKCcuYWRhcHRpdmVfX3NsaWRlci1tbm1sLWNvbnRyb2wuYWRhcHRpdmVfX3NsaWRlci1tbm1sLWNvbnRyb2xfcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuYWRhcHRpdmVfX3NsaWRlci1tbm1sJykuc2xpY2soJ3NsaWNrUHJldicpO1xuXHR9KTtcblxuXHQkKCcuYWRhcHRpdmVfX3NsaWRlci1tbm1sLWNvbnRyb2wuYWRhcHRpdmVfX3NsaWRlci1tbm1sLWNvbnRyb2xfbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuYWRhcHRpdmVfX3NsaWRlci1tbm1sJykuc2xpY2soJ3NsaWNrTmV4dCcpO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaW5pdFNsaWNrU2xpZGVyMigpIHtcblx0JCgnLmd1aWRlbGluZV9fc2xpZGVyJykuc2xpY2soe1xuXHRcdGNlbnRlck1vZGU6IHRydWUsXG5cdFx0Y2VudGVyUGFkZGluZzogJzBweCcsXG5cdFx0c2xpZGVzVG9TaG93OiAzLFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdGFycm93czogZmFsc2UsXG5cdFx0c3BlZWQ6IDQwMCxcblx0XHRyZXNwb25zaXZlOiBbe1xuXHRcdFx0YnJlYWtwb2ludDogNzY4LFxuXHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0c2xpZGVzVG9TaG93OiAxXG5cdFx0XHR9XG5cdFx0fV1cblx0fSk7XG5cblx0JCgnLmd1aWRlbGluZV9fY29udHJvbC5ndWlkZWxpbmVfX2NvbnRyb2xfcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuZ3VpZGVsaW5lX19zbGlkZXInKS5zbGljaygnc2xpY2tQcmV2Jyk7XG5cdH0pO1xuXG5cdCQoJy5ndWlkZWxpbmVfX2NvbnRyb2wuZ3VpZGVsaW5lX19jb250cm9sX25leHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmd1aWRlbGluZV9fc2xpZGVyJykuc2xpY2soJ3NsaWNrTmV4dCcpO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaW5pdFNsaWNrU2xpZGVyMygpIHtcblx0JCgnLmRlc2lnbl9fc2xpZGVyJykuc2xpY2soe1xuXHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdGFycm93czogZmFsc2UsXG5cdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxXG5cdH0pO1xuXG5cdCQoJy5kZXNpZ25fX2NvbnRyb2wuZGVzaWduX19jb250cm9sX3ByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmRlc2lnbl9fc2xpZGVyJykuc2xpY2soJ3NsaWNrUHJldicpO1xuXHR9KTtcblxuXHQkKCcuZGVzaWduX19jb250cm9sLmRlc2lnbl9fY29udHJvbF9uZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5kZXNpZ25fX3NsaWRlcicpLnNsaWNrKCdzbGlja05leHQnKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVOYXYoKSB7XG5cdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cdCQoJy5oZWFkZXJfX2hhbWJ1cmdlci1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGFtYnVyZ2VyLW1lbnVfYWN0aXZlJyk7XG5cdFx0JCgnLm5hdicpLnRvZ2dsZUNsYXNzKCduYXZfYWN0aXZlJyk7XG5cdFx0JCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIHdvd0luaXQoKSB7XG5cdG5ldyBXT1coKS5pbml0KHtcblx0XHRtb2JpbGU6IGZhbHNlXG5cdH0pO1xufVxuXG5mdW5jdGlvbiBza3JvbGxySW5pdCgpIHtcblx0aWYgKCQod2luZG93KS53aWR0aCgpID49IDEyMDApIHtcblx0XHRza3JvbGxyLmluaXQoe1xuXHRcdFx0Zm9yY2VIZWlnaHQ6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0c2tyb2xsci5pbml0KCkuZGVzdHJveSgpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNldEhlaWdodFR5cG9Db2xvcigpIHtcblx0ZnVuY3Rpb24gY2FsY0hlaWdodCgpIHtcblx0XHRpZiAod2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fVxuXHRcdHZhciBuZXdIZWlnaHQgPSAkKCcudHlwby1jb2xvcicpLm91dGVySGVpZ2h0KCk7XG5cdFx0aWYgKDc2OCA8ICQod2luZG93KS53aWR0aCgpIDwgOTYwKSB7XG5cdFx0XHRuZXdIZWlnaHQgPSBuZXdIZWlnaHQgLSAzOTAgLSA2OTtcblx0XHRcdCQoJy50eXBvLWNvbG9yJykuY3NzKHsnaGVpZ2h0JzogbmV3SGVpZ2h0ICsgJ3B4J30pO1xuXHRcdH1cblx0XHRlbHNlIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA5NjApIHtcblx0XHRcdG5ld0hlaWdodCA9IG5ld0hlaWdodCAtIDU0MyAtIDY5O1xuXHRcdFx0JCgnLnR5cG8tY29sb3InKS5jc3MoeydoZWlnaHQnOiBuZXdIZWlnaHQgKyAncHgnfSk7XG5cdFx0fVxuXHR9XG5cblx0Y2FsY0hlaWdodCgpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRjYWxjSGVpZ2h0KCk7XG5cdH0pXG59XG5cbmlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnKSB7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuXHRcdGFuaW1hdGVIZWFkZXIoKTtcblx0XHRpbml0U2xpY2tTbGlkZXIoKTtcblx0XHRpbml0U2xpY2tTbGlkZXIyKCk7XG5cdFx0aW5pdFNsaWNrU2xpZGVyMygpO1xuXHRcdGFuaW1hdGVOYXYoKTtcblx0XHR3b3dJbml0KCk7XG5cdFx0c2tyb2xsckluaXQoKTtcblx0XHRzZXRIZWlnaHRUeXBvQ29sb3IoKTtcblx0fSlcbn1cbiJdfQ==
