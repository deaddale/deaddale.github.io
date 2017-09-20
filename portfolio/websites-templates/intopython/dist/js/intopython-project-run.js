(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = new Vue({
    el: '#app',
    data: {
        popupRegIsActive: false,
        popupLoginIsActive: false,
        mobileNavIsActive: false
    },
    methods: {
        hightlightCode: function () {
			$('pre code').each(function(i, block) {
				hljs.highlightBlock(block);
			});
        },
		getWindowWidth: function () {
			var windowWidth = $(window).outerWidth();
			function actionNavbar() {
				windowWidth = $(window).outerWidth();
				if (windowWidth <= 1199) {
					$('.b-navbar').addClass('b-navbar_mobile');
				}
				else {
					$('.b-navbar').removeClass('b-navbar_mobile');
				}
			}
			actionNavbar();
			window.addEventListener('resize', function() {
				actionNavbar();
			});
		}
    }
});
app.hightlightCode();
app.getWindowWidth();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvaW50b3B5dGhvbi1wcm9qZWN0LmFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0gbmV3IFZ1ZSh7XG4gICAgZWw6ICcjYXBwJyxcbiAgICBkYXRhOiB7XG4gICAgICAgIHBvcHVwUmVnSXNBY3RpdmU6IGZhbHNlLFxuICAgICAgICBwb3B1cExvZ2luSXNBY3RpdmU6IGZhbHNlLFxuICAgICAgICBtb2JpbGVOYXZJc0FjdGl2ZTogZmFsc2VcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaGlnaHRsaWdodENvZGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJ3ByZSBjb2RlJykuZWFjaChmdW5jdGlvbihpLCBibG9jaykge1xuXHRcdFx0XHRobGpzLmhpZ2hsaWdodEJsb2NrKGJsb2NrKTtcblx0XHRcdH0pO1xuICAgICAgICB9LFxuXHRcdGdldFdpbmRvd1dpZHRoOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgd2luZG93V2lkdGggPSAkKHdpbmRvdykub3V0ZXJXaWR0aCgpO1xuXHRcdFx0ZnVuY3Rpb24gYWN0aW9uTmF2YmFyKCkge1xuXHRcdFx0XHR3aW5kb3dXaWR0aCA9ICQod2luZG93KS5vdXRlcldpZHRoKCk7XG5cdFx0XHRcdGlmICh3aW5kb3dXaWR0aCA8PSAxMTk5KSB7XG5cdFx0XHRcdFx0JCgnLmItbmF2YmFyJykuYWRkQ2xhc3MoJ2ItbmF2YmFyX21vYmlsZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCQoJy5iLW5hdmJhcicpLnJlbW92ZUNsYXNzKCdiLW5hdmJhcl9tb2JpbGUnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YWN0aW9uTmF2YmFyKCk7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFjdGlvbk5hdmJhcigpO1xuXHRcdFx0fSk7XG5cdFx0fVxuICAgIH1cbn0pO1xuYXBwLmhpZ2h0bGlnaHRDb2RlKCk7XG5hcHAuZ2V0V2luZG93V2lkdGgoKTsiXX0=
