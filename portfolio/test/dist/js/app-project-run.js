(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = new Vue({
    el: '#app',
    data: function () {
        return {
		}
    },
	computed: {
    	// Animate spike
		animateSpike: function () {
			// mouse move
			mouseMoveMethod = function (event) {
				var pageYOffset = window.pageYOffset;
				// console.log(pageYOffset);
				if (pageYOffset >= 2000) {
					$('.cover__spike').css(
						'transform', 'translateX(0px), translateY(0px)'
					);
					$('.seeds').css(
						'transform', 'translateX(0px), translateY(0px)'
					);
				}
				else {
					$('.cover__spike').css(
						'transform', 'translateX(' + (event.pageX / 22) + 'px)'
						+ 'translateY(' + ((event.pageY / 22) - 132) + 'px)'
					);
					$('.seeds').css(
						'transform', 'translateX(' + (event.pageX / 22) + 'px)'
						+ 'translateY(' + ((event.pageY / 22) - 132) + 'px)'
					);
				}
			};
			document.addEventListener('mousemove', mouseMoveMethod);
			// scroll document
			// scrollDocMethod = function () {
			// 	window.onscroll = function() {
			// 		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
			// 		// else {
			// 		// 	$('.cover__spike').css(
			// 		// 		'transform', 'translateX(-50%)'
			// 		// 		+ 'translateY(132px)'
			// 		// 	)
			// 		// }
			// 	};
			// };
			// scrollDocMethod();
		}
	},
	methods: {}
});

var s = skrollr.init();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0gbmV3IFZ1ZSh7XG4gICAgZWw6ICcjYXBwJyxcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG5cdFx0fVxuICAgIH0sXG5cdGNvbXB1dGVkOiB7XG4gICAgXHQvLyBBbmltYXRlIHNwaWtlXG5cdFx0YW5pbWF0ZVNwaWtlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBtb3VzZSBtb3ZlXG5cdFx0XHRtb3VzZU1vdmVNZXRob2QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0dmFyIHBhZ2VZT2Zmc2V0ID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhwYWdlWU9mZnNldCk7XG5cdFx0XHRcdGlmIChwYWdlWU9mZnNldCA+PSAyMDAwKSB7XG5cdFx0XHRcdFx0JCgnLmNvdmVyX19zcGlrZScpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwcHgpLCB0cmFuc2xhdGVZKDBweCknXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHQkKCcuc2VlZHMnKS5jc3MoXG5cdFx0XHRcdFx0XHQndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMHB4KSwgdHJhbnNsYXRlWSgwcHgpJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0JCgnLmNvdmVyX19zcGlrZScpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgKGV2ZW50LnBhZ2VYIC8gMjIpICsgJ3B4KSdcblx0XHRcdFx0XHRcdCsgJ3RyYW5zbGF0ZVkoJyArICgoZXZlbnQucGFnZVkgLyAyMikgLSAxMzIpICsgJ3B4KSdcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdCQoJy5zZWVkcycpLmNzcyhcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgKGV2ZW50LnBhZ2VYIC8gMjIpICsgJ3B4KSdcblx0XHRcdFx0XHRcdCsgJ3RyYW5zbGF0ZVkoJyArICgoZXZlbnQucGFnZVkgLyAyMikgLSAxMzIpICsgJ3B4KSdcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlTWV0aG9kKTtcblx0XHRcdC8vIHNjcm9sbCBkb2N1bWVudFxuXHRcdFx0Ly8gc2Nyb2xsRG9jTWV0aG9kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHR3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbigpIHtcblx0XHRcdC8vIFx0XHR2YXIgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHRcdC8vIFx0XHQvLyBlbHNlIHtcblx0XHRcdC8vIFx0XHQvLyBcdCQoJy5jb3Zlcl9fc3Bpa2UnKS5jc3MoXG5cdFx0XHQvLyBcdFx0Ly8gXHRcdCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgtNTAlKSdcblx0XHRcdC8vIFx0XHQvLyBcdFx0KyAndHJhbnNsYXRlWSgxMzJweCknXG5cdFx0XHQvLyBcdFx0Ly8gXHQpXG5cdFx0XHQvLyBcdFx0Ly8gfVxuXHRcdFx0Ly8gXHR9O1xuXHRcdFx0Ly8gfTtcblx0XHRcdC8vIHNjcm9sbERvY01ldGhvZCgpO1xuXHRcdH1cblx0fSxcblx0bWV0aG9kczoge31cbn0pO1xuXG52YXIgcyA9IHNrcm9sbHIuaW5pdCgpOyJdfQ==
