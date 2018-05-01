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

function initPreloader() {
	var morphTimer = setTimeout(function () {
		$("#morphing").show();
		var morphing = anime({
			targets: "#morphing .polymorph",
			points: [{value: "99.9538462 0 51.916023 48.0600047 0 100 48.8084383 100 87.1461538 100 99.9538462 87.1538462"}, {value: "46.7294118 0 0 46.3511017 26.6682353 73 73.3341176 73 120 26.5646108 93.3035294 0"}, {value: "58.3056916 0 33.6897628 24.4868696 0 58 43.9106141 57.9566968 81.7164218 57.9194139 140 0"}, {value: "119.522892 0 54.4987952 0 0 54.59975 76.1638554 54.578 76.1638554 87 119.522892 43.558"}, {value: "82.9209524 0 38.5171673 44.9601903 0 83.96 0 119.966667 53.3242063 119.973333 82.9209524 89.96"}, {value: "46.0948276 0 0 45.5517241 0 99.3275862 76.8189655 99.3275862 99.8706897 76.2758621 99.8706897 0.00862068966"}],
			fill: [{value: "#e32313"}, {value: "#008e9c"}, {value: "#ee7d00"}, {value: "#D30073"}, {value: "#2aab6e"}, {value: "#62358c"}],
			easing: "easeOutQuad",
			duration: 8e3,
			loop: true
		})
	}, 400);
}

if (typeof (window) !== 'undefined') {
	window.addEventListener('load', function () {
		animateHeader();
		initSlickSlider();
		animateNav();
		wowInit();
		skrollrInit();
		setHeightTypoColor();
		initPreloader();
	})
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIGFuaW1hdGVIZWFkZXIoKSB7XG5cdCQoJy5oZWFkZXInKS5hZGRDbGFzcygnaGVhZGVyX2FjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiBpbml0U2xpY2tTbGlkZXIoKSB7XG5cdCQoJy5hZGFwdGl2ZV9fc2xpZGVyJykuc2xpY2soe1xuXHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdGFycm93czogZmFsc2UsXG5cdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxXG5cdH0pO1xuXG5cdCQoJy5hZGFwdGl2ZV9fY29udHJvbC5hZGFwdGl2ZV9fY29udHJvbF9wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5hZGFwdGl2ZV9fc2xpZGVyJykuc2xpY2soJ3NsaWNrUHJldicpO1xuXHR9KTtcblxuXHQkKCcuYWRhcHRpdmVfX2NvbnRyb2wuYWRhcHRpdmVfX2NvbnRyb2xfbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuYWRhcHRpdmVfX3NsaWRlcicpLnNsaWNrKCdzbGlja05leHQnKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVOYXYoKSB7XG5cdCQoJy5oZWFkZXJfX2hhbWJ1cmdlci1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGFtYnVyZ2VyLW1lbnVfYWN0aXZlJyk7XG5cdFx0JCgnLm5hdicpLnRvZ2dsZUNsYXNzKCduYXZfYWN0aXZlJyk7XG5cdFx0JCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIHdvd0luaXQoKSB7XG5cdG5ldyBXT1coKS5pbml0KHtcblx0XHRtb2JpbGU6IGZhbHNlXG5cdH0pO1xufVxuXG5mdW5jdGlvbiBza3JvbGxySW5pdCgpIHtcblx0aWYgKCQod2luZG93KS53aWR0aCgpID49IDEyMDApIHtcblx0XHRza3JvbGxyLmluaXQoe1xuXHRcdFx0Zm9yY2VIZWlnaHQ6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0c2tyb2xsci5pbml0KCkuZGVzdHJveSgpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNldEhlaWdodFR5cG9Db2xvcigpIHtcblx0ZnVuY3Rpb24gY2FsY0hlaWdodCgpIHtcblx0XHRpZiAod2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fVxuXHRcdHZhciBuZXdIZWlnaHQgPSAkKCcudHlwby1jb2xvcicpLm91dGVySGVpZ2h0KCk7XG5cdFx0aWYgKDc2OCA8ICQod2luZG93KS53aWR0aCgpIDwgOTYwKSB7XG5cdFx0XHRuZXdIZWlnaHQgPSBuZXdIZWlnaHQgLSAzOTAgLSA2OTtcblx0XHRcdCQoJy50eXBvLWNvbG9yJykuY3NzKHsnaGVpZ2h0JzogbmV3SGVpZ2h0ICsgJ3B4J30pO1xuXHRcdH1cblx0XHRlbHNlIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA5NjApIHtcblx0XHRcdG5ld0hlaWdodCA9IG5ld0hlaWdodCAtIDU0MyAtIDY5O1xuXHRcdFx0JCgnLnR5cG8tY29sb3InKS5jc3MoeydoZWlnaHQnOiBuZXdIZWlnaHQgKyAncHgnfSk7XG5cdFx0fVxuXHR9XG5cblx0Y2FsY0hlaWdodCgpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRjYWxjSGVpZ2h0KCk7XG5cdH0pXG59XG5cbmZ1bmN0aW9uIGluaXRQcmVsb2FkZXIoKSB7XG5cdHZhciBtb3JwaFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0JChcIiNtb3JwaGluZ1wiKS5zaG93KCk7XG5cdFx0dmFyIG1vcnBoaW5nID0gYW5pbWUoe1xuXHRcdFx0dGFyZ2V0czogXCIjbW9ycGhpbmcgLnBvbHltb3JwaFwiLFxuXHRcdFx0cG9pbnRzOiBbe3ZhbHVlOiBcIjk5Ljk1Mzg0NjIgMCA1MS45MTYwMjMgNDguMDYwMDA0NyAwIDEwMCA0OC44MDg0MzgzIDEwMCA4Ny4xNDYxNTM4IDEwMCA5OS45NTM4NDYyIDg3LjE1Mzg0NjJcIn0sIHt2YWx1ZTogXCI0Ni43Mjk0MTE4IDAgMCA0Ni4zNTExMDE3IDI2LjY2ODIzNTMgNzMgNzMuMzM0MTE3NiA3MyAxMjAgMjYuNTY0NjEwOCA5My4zMDM1Mjk0IDBcIn0sIHt2YWx1ZTogXCI1OC4zMDU2OTE2IDAgMzMuNjg5NzYyOCAyNC40ODY4Njk2IDAgNTggNDMuOTEwNjE0MSA1Ny45NTY2OTY4IDgxLjcxNjQyMTggNTcuOTE5NDEzOSAxNDAgMFwifSwge3ZhbHVlOiBcIjExOS41MjI4OTIgMCA1NC40OTg3OTUyIDAgMCA1NC41OTk3NSA3Ni4xNjM4NTU0IDU0LjU3OCA3Ni4xNjM4NTU0IDg3IDExOS41MjI4OTIgNDMuNTU4XCJ9LCB7dmFsdWU6IFwiODIuOTIwOTUyNCAwIDM4LjUxNzE2NzMgNDQuOTYwMTkwMyAwIDgzLjk2IDAgMTE5Ljk2NjY2NyA1My4zMjQyMDYzIDExOS45NzMzMzMgODIuOTIwOTUyNCA4OS45NlwifSwge3ZhbHVlOiBcIjQ2LjA5NDgyNzYgMCAwIDQ1LjU1MTcyNDEgMCA5OS4zMjc1ODYyIDc2LjgxODk2NTUgOTkuMzI3NTg2MiA5OS44NzA2ODk3IDc2LjI3NTg2MjEgOTkuODcwNjg5NyAwLjAwODYyMDY4OTY2XCJ9XSxcblx0XHRcdGZpbGw6IFt7dmFsdWU6IFwiI2UzMjMxM1wifSwge3ZhbHVlOiBcIiMwMDhlOWNcIn0sIHt2YWx1ZTogXCIjZWU3ZDAwXCJ9LCB7dmFsdWU6IFwiI0QzMDA3M1wifSwge3ZhbHVlOiBcIiMyYWFiNmVcIn0sIHt2YWx1ZTogXCIjNjIzNThjXCJ9XSxcblx0XHRcdGVhc2luZzogXCJlYXNlT3V0UXVhZFwiLFxuXHRcdFx0ZHVyYXRpb246IDhlMyxcblx0XHRcdGxvb3A6IHRydWVcblx0XHR9KVxuXHR9LCA0MDApO1xufVxuXG5pZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRhbmltYXRlSGVhZGVyKCk7XG5cdFx0aW5pdFNsaWNrU2xpZGVyKCk7XG5cdFx0YW5pbWF0ZU5hdigpO1xuXHRcdHdvd0luaXQoKTtcblx0XHRza3JvbGxySW5pdCgpO1xuXHRcdHNldEhlaWdodFR5cG9Db2xvcigpO1xuXHRcdGluaXRQcmVsb2FkZXIoKTtcblx0fSlcbn1cbiJdfQ==
