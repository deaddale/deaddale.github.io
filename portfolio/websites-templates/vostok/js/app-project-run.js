(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = new Vue({
    el: '#app',
    data: {
		isActivePopupSatelite5: false,
		isActivePopupSputnik9: false,
		isActivePopupVostok1: false,
		isActivePopupSecret: false,
		isActivePopupScientificValue: false,
		isActivePopupInternationalReactionValue: false,
		isActivePopupGagarin: false,
		isActiveSidebarVostok1: false,
		isActiveSidebarVostok11: false,
		isActiveSidebarVostok12: false,
		isActiveSidebarSputnik1: false,
		isActiveSidebarSputnik2: false,
		isActiveSidebarSputnik91: false,
		isActiveSidebarSputnik92: false,
		isActiveSidebarSputnik93: false,
		isActiveSidebarSecret: false,
		isActiveSidebarGagarin: false,
		isActiveSidebarScientificValue: false,
		isActiveSidebarReaction1: false,
		isActiveSidebarReaction2: false,
		isActiveSidebarReaction3: false,
		isActiveSidebarReaction4: false,
		isActiveSidebarSixFlights1: false,
		isActiveSidebarSixFlights2: false,
		isActiveSidebarSixFlights3: false,
		isActiveSidebarSixFlights4: false,
		isActiveSidebarSixFlights5: false,
		isActiveSidebarSixFlights6: false,
		isActiveSidebarTereshkova: false,
		isActivePlaySound: false,
		isActivePlayVideo: false
    },
	computed: {
    	swipeIntroInit: function () {
    		// http://stephen.band/jquery.event.move/
			$(function () {
				$('.intro')
					.on('move', function(e) {
						$(this).addClass('intro_move')
					});
			});
		},
		waitUser: function () {
			idleTimer = null;
			idleState = false;
			idleWait = 300000;

			$('body').bind('mousemove click keydown scroll', function () {
				clearTimeout(idleTimer);
				if (idleState == true) {
					$('.intro').addClass('intro_move');
				}
				idleState = false;
				idleTimer = setTimeout(function () {
					$('.intro').removeClass('intro_move');
					idleState = true;
				}, idleWait);
			});
		},
		swipeInit: function () {
			// Swiper init (http://idangero.us/swiper/)
			$(function () {
				var mySwiper = new Swiper('.swiper-container', {
					speed: 500,
					direction: 'horizontal',
					simulateTouch: true,
					shortSwipes: false,
					parallax: true,
					// откл. на продакшн клавиатуру : начало
					keyboard: true,
					// откл. на продакшн клавиатуру : конец
					on: {
					}
				});
			});
		},
	},
	methods: {
		showPopupSatelite5: function() {
			this.isActivePopupSatelite5 = !this.isActivePopupSatelite5;
		},
		showPopupSputnik9: function() {
			this.isActivePopupSputnik9 = !this.isActivePopupSputnik9;
		},
		showPopupVostok1: function() {
			this.isActivePopupVostok1 = !this.isActivePopupVostok1;
		},
		showPopupSecret: function() {
			this.isActivePopupSecret = !this.isActivePopupSecret;
		},
		showPopupScientificValue: function() {
			this.isActivePopupScientificValue = !this.isActivePopupScientificValue;
		},
		showPopupInternationalReactionValue: function() {
			this.isActivePopupInternationalReactionValue = !this.isActivePopupInternationalReactionValue;
		},
		showPopupGagarin: function() {
			this.isActivePopupGagarin = !this.isActivePopupGagarin;
		},
		showSidebarVostok1: function() {
			this.isActiveSidebarVostok1 = !this.isActiveSidebarVostok1;
		},
		showSidebarVostok11: function() {
			this.isActiveSidebarVostok11 = !this.isActiveSidebarVostok11;
		},
		showSidebarVostok12: function() {
			this.isActiveSidebarVostok12 = !this.isActiveSidebarVostok12;
		},
		showSidebarSputnik1: function() {
			this.isActiveSidebarSputnik1 = !this.isActiveSidebarSputnik1;
		},
		showSidebarSputnik2: function() {
			this.isActiveSidebarSputnik2 = !this.isActiveSidebarSputnik2;
		},
		showSidebarSputnik91: function() {
			this.isActiveSidebarSputnik91 = !this.isActiveSidebarSputnik91;
		},
		showSidebarSputnik92: function() {
			this.isActiveSidebarSputnik92 = !this.isActiveSidebarSputnik92;
		},
		showSidebarSputnik93: function() {
			this.isActiveSidebarSputnik93 = !this.isActiveSidebarSputnik93;
		},
		showSidebarSecret: function() {
			this.isActiveSidebarSecret = !this.isActiveSidebarSecret;
		},
		showSidebarGagarin: function() {
			this.isActiveSidebarGagarin = !this.isActiveSidebarGagarin;
		},
		showSidebarScientificValue: function() {
			this.isActiveSidebarScientificValue = !this.isActiveSidebarScientificValue;
		},
		showSidebarReaction1: function() {
			this.isActiveSidebarReaction1 = !this.isActiveSidebarReaction1;
		},
		showSidebarReaction2: function() {
			this.isActiveSidebarReaction2 = !this.isActiveSidebarReaction2;
		},
		showSidebarReaction3: function() {
			this.isActiveSidebarReaction3 = !this.isActiveSidebarReaction3;
		},
		showSidebarReaction4: function() {
			this.isActiveSidebarReaction4 = !this.isActiveSidebarReaction4;
		},
		showSidebarSixFlights1: function() {
			this.isActiveSidebarSixFlights1 = !this.isActiveSidebarSixFlights1;
		},
		showSidebarSixFlights2: function() {
			this.isActiveSidebarSixFlights2 = !this.isActiveSidebarSixFlights2;
		},
		showSidebarSixFlights3: function() {
			this.isActiveSidebarSixFlights3 = !this.isActiveSidebarSixFlights3;
		},
		showSidebarSixFlights4: function() {
			this.isActiveSidebarSixFlights4 = !this.isActiveSidebarSixFlights4;
		},
		showSidebarSixFlights5: function() {
			this.isActiveSidebarSixFlights5 = !this.isActiveSidebarSixFlights5;
		},
		showSidebarSixFlights6: function() {
			this.isActiveSidebarSixFlights6 = !this.isActiveSidebarSixFlights6;
		},
		showSidebarTereshkova: function() {
			this.isActiveSidebarTereshkova = !this.isActiveSidebarTereshkova;
		},
		playAudioFile: function () {
			this.$refs.audioElm.play();
			this.$refs.audioElm.onended = function() {
				$('.popup-scientific-value__audio-pleer-box').removeClass('popup-scientific-value__audio-pleer-box_active');
			};
			this.isActivePlaySound = !this.isActivePlaySound;
		},
		pauseAudioFile: function () {
			this.$refs.audioElm.pause();
			this.isActivePlaySound = !this.isActivePlaySound;
		},
		playVideoFile: function () {
			var self = this;
			this.isActivePlayVideo = !this.isActivePlayVideo;
			this.$refs.videoElm.play();
			this.$refs.videoElm.onended = function() {
				self.isActivePlayVideo = false;
				$('.popup-film-gagarin__progress-inner').animate({'width': 0}, 1000);
			};
			$(this.$refs.videoElm).on(
				'timeupdate',
				function(event){
					var width = 1134 / 10;
						width = width * this.currentTime;
					$('.popup-film-gagarin__progress-inner').animate({'width': width + 'px'}, 5);
				});
		},
		pauseVideoFile: function () {
			this.$refs.videoElm.pause();
			this.isActivePlayVideo = !this.isActivePlayVideo;
			$('.popup-film-gagarin__progress-inner').stop();
		}
	}
});

// Perfect scrollbar (https://github.com/utatti/perfect-scrollbar)
window.addEventListener('load', function () {
	$('.sidebar__block-with-scroll').each(function () {
		var ps = new PerfectScrollbar(this);
	});
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGRhdGE6IHtcblx0XHRpc0FjdGl2ZVBvcHVwU2F0ZWxpdGU1OiBmYWxzZSxcblx0XHRpc0FjdGl2ZVBvcHVwU3B1dG5pazk6IGZhbHNlLFxuXHRcdGlzQWN0aXZlUG9wdXBWb3N0b2sxOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVBvcHVwU2VjcmV0OiBmYWxzZSxcblx0XHRpc0FjdGl2ZVBvcHVwU2NpZW50aWZpY1ZhbHVlOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVBvcHVwSW50ZXJuYXRpb25hbFJlYWN0aW9uVmFsdWU6IGZhbHNlLFxuXHRcdGlzQWN0aXZlUG9wdXBHYWdhcmluOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJWb3N0b2sxOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJWb3N0b2sxMTogZmFsc2UsXG5cdFx0aXNBY3RpdmVTaWRlYmFyVm9zdG9rMTI6IGZhbHNlLFxuXHRcdGlzQWN0aXZlU2lkZWJhclNwdXRuaWsxOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJTcHV0bmlrMjogZmFsc2UsXG5cdFx0aXNBY3RpdmVTaWRlYmFyU3B1dG5pazkxOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJTcHV0bmlrOTI6IGZhbHNlLFxuXHRcdGlzQWN0aXZlU2lkZWJhclNwdXRuaWs5MzogZmFsc2UsXG5cdFx0aXNBY3RpdmVTaWRlYmFyU2VjcmV0OiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJHYWdhcmluOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJTY2llbnRpZmljVmFsdWU6IGZhbHNlLFxuXHRcdGlzQWN0aXZlU2lkZWJhclJlYWN0aW9uMTogZmFsc2UsXG5cdFx0aXNBY3RpdmVTaWRlYmFyUmVhY3Rpb24yOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJSZWFjdGlvbjM6IGZhbHNlLFxuXHRcdGlzQWN0aXZlU2lkZWJhclJlYWN0aW9uNDogZmFsc2UsXG5cdFx0aXNBY3RpdmVTaWRlYmFyU2l4RmxpZ2h0czE6IGZhbHNlLFxuXHRcdGlzQWN0aXZlU2lkZWJhclNpeEZsaWdodHMyOiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJTaXhGbGlnaHRzMzogZmFsc2UsXG5cdFx0aXNBY3RpdmVTaWRlYmFyU2l4RmxpZ2h0czQ6IGZhbHNlLFxuXHRcdGlzQWN0aXZlU2lkZWJhclNpeEZsaWdodHM1OiBmYWxzZSxcblx0XHRpc0FjdGl2ZVNpZGViYXJTaXhGbGlnaHRzNjogZmFsc2UsXG5cdFx0aXNBY3RpdmVTaWRlYmFyVGVyZXNoa292YTogZmFsc2UsXG5cdFx0aXNBY3RpdmVQbGF5U291bmQ6IGZhbHNlLFxuXHRcdGlzQWN0aXZlUGxheVZpZGVvOiBmYWxzZVxuICAgIH0sXG5cdGNvbXB1dGVkOiB7XG4gICAgXHRzd2lwZUludHJvSW5pdDogZnVuY3Rpb24gKCkge1xuICAgIFx0XHQvLyBodHRwOi8vc3RlcGhlbi5iYW5kL2pxdWVyeS5ldmVudC5tb3ZlL1xuXHRcdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJy5pbnRybycpXG5cdFx0XHRcdFx0Lm9uKCdtb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnaW50cm9fbW92ZScpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHdhaXRVc2VyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZGxlVGltZXIgPSBudWxsO1xuXHRcdFx0aWRsZVN0YXRlID0gZmFsc2U7XG5cdFx0XHRpZGxlV2FpdCA9IDMwMDAwMDtcblxuXHRcdFx0JCgnYm9keScpLmJpbmQoJ21vdXNlbW92ZSBjbGljayBrZXlkb3duIHNjcm9sbCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGlkbGVUaW1lcik7XG5cdFx0XHRcdGlmIChpZGxlU3RhdGUgPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdCQoJy5pbnRybycpLmFkZENsYXNzKCdpbnRyb19tb3ZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWRsZVN0YXRlID0gZmFsc2U7XG5cdFx0XHRcdGlkbGVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQoJy5pbnRybycpLnJlbW92ZUNsYXNzKCdpbnRyb19tb3ZlJyk7XG5cdFx0XHRcdFx0aWRsZVN0YXRlID0gdHJ1ZTtcblx0XHRcdFx0fSwgaWRsZVdhaXQpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRzd2lwZUluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFN3aXBlciBpbml0IChodHRwOi8vaWRhbmdlcm8udXMvc3dpcGVyLylcblx0XHRcdCQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcblx0XHRcdFx0XHRzcGVlZDogNTAwLFxuXHRcdFx0XHRcdGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuXHRcdFx0XHRcdHNpbXVsYXRlVG91Y2g6IHRydWUsXG5cdFx0XHRcdFx0c2hvcnRTd2lwZXM6IGZhbHNlLFxuXHRcdFx0XHRcdHBhcmFsbGF4OiB0cnVlLFxuXHRcdFx0XHRcdC8vINC+0YLQutC7LiDQvdCwINC/0YDQvtC00LDQutGI0L0g0LrQu9Cw0LLQuNCw0YLRg9GA0YMgOiDQvdCw0YfQsNC70L5cblx0XHRcdFx0XHRrZXlib2FyZDogdHJ1ZSxcblx0XHRcdFx0XHQvLyDQvtGC0LrQuy4g0L3QsCDQv9GA0L7QtNCw0LrRiNC9INC60LvQsNCy0LjQsNGC0YPRgNGDIDog0LrQvtC90LXRhlxuXHRcdFx0XHRcdG9uOiB7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdH0sXG5cdG1ldGhvZHM6IHtcblx0XHRzaG93UG9wdXBTYXRlbGl0ZTU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVBvcHVwU2F0ZWxpdGU1ID0gIXRoaXMuaXNBY3RpdmVQb3B1cFNhdGVsaXRlNTtcblx0XHR9LFxuXHRcdHNob3dQb3B1cFNwdXRuaWs5OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaXNBY3RpdmVQb3B1cFNwdXRuaWs5ID0gIXRoaXMuaXNBY3RpdmVQb3B1cFNwdXRuaWs5O1xuXHRcdH0sXG5cdFx0c2hvd1BvcHVwVm9zdG9rMTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlUG9wdXBWb3N0b2sxID0gIXRoaXMuaXNBY3RpdmVQb3B1cFZvc3RvazE7XG5cdFx0fSxcblx0XHRzaG93UG9wdXBTZWNyZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVBvcHVwU2VjcmV0ID0gIXRoaXMuaXNBY3RpdmVQb3B1cFNlY3JldDtcblx0XHR9LFxuXHRcdHNob3dQb3B1cFNjaWVudGlmaWNWYWx1ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlUG9wdXBTY2llbnRpZmljVmFsdWUgPSAhdGhpcy5pc0FjdGl2ZVBvcHVwU2NpZW50aWZpY1ZhbHVlO1xuXHRcdH0sXG5cdFx0c2hvd1BvcHVwSW50ZXJuYXRpb25hbFJlYWN0aW9uVmFsdWU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVBvcHVwSW50ZXJuYXRpb25hbFJlYWN0aW9uVmFsdWUgPSAhdGhpcy5pc0FjdGl2ZVBvcHVwSW50ZXJuYXRpb25hbFJlYWN0aW9uVmFsdWU7XG5cdFx0fSxcblx0XHRzaG93UG9wdXBHYWdhcmluOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaXNBY3RpdmVQb3B1cEdhZ2FyaW4gPSAhdGhpcy5pc0FjdGl2ZVBvcHVwR2FnYXJpbjtcblx0XHR9LFxuXHRcdHNob3dTaWRlYmFyVm9zdG9rMTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclZvc3RvazEgPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJWb3N0b2sxO1xuXHRcdH0sXG5cdFx0c2hvd1NpZGViYXJWb3N0b2sxMTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclZvc3RvazExID0gIXRoaXMuaXNBY3RpdmVTaWRlYmFyVm9zdG9rMTE7XG5cdFx0fSxcblx0XHRzaG93U2lkZWJhclZvc3RvazEyOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaXNBY3RpdmVTaWRlYmFyVm9zdG9rMTIgPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJWb3N0b2sxMjtcblx0XHR9LFxuXHRcdHNob3dTaWRlYmFyU3B1dG5pazE6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVNpZGViYXJTcHV0bmlrMSA9ICF0aGlzLmlzQWN0aXZlU2lkZWJhclNwdXRuaWsxO1xuXHRcdH0sXG5cdFx0c2hvd1NpZGViYXJTcHV0bmlrMjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclNwdXRuaWsyID0gIXRoaXMuaXNBY3RpdmVTaWRlYmFyU3B1dG5pazI7XG5cdFx0fSxcblx0XHRzaG93U2lkZWJhclNwdXRuaWs5MTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclNwdXRuaWs5MSA9ICF0aGlzLmlzQWN0aXZlU2lkZWJhclNwdXRuaWs5MTtcblx0XHR9LFxuXHRcdHNob3dTaWRlYmFyU3B1dG5pazkyOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaXNBY3RpdmVTaWRlYmFyU3B1dG5pazkyID0gIXRoaXMuaXNBY3RpdmVTaWRlYmFyU3B1dG5pazkyO1xuXHRcdH0sXG5cdFx0c2hvd1NpZGViYXJTcHV0bmlrOTM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVNpZGViYXJTcHV0bmlrOTMgPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJTcHV0bmlrOTM7XG5cdFx0fSxcblx0XHRzaG93U2lkZWJhclNlY3JldDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclNlY3JldCA9ICF0aGlzLmlzQWN0aXZlU2lkZWJhclNlY3JldDtcblx0XHR9LFxuXHRcdHNob3dTaWRlYmFyR2FnYXJpbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhckdhZ2FyaW4gPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJHYWdhcmluO1xuXHRcdH0sXG5cdFx0c2hvd1NpZGViYXJTY2llbnRpZmljVmFsdWU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVNpZGViYXJTY2llbnRpZmljVmFsdWUgPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJTY2llbnRpZmljVmFsdWU7XG5cdFx0fSxcblx0XHRzaG93U2lkZWJhclJlYWN0aW9uMTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclJlYWN0aW9uMSA9ICF0aGlzLmlzQWN0aXZlU2lkZWJhclJlYWN0aW9uMTtcblx0XHR9LFxuXHRcdHNob3dTaWRlYmFyUmVhY3Rpb24yOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaXNBY3RpdmVTaWRlYmFyUmVhY3Rpb24yID0gIXRoaXMuaXNBY3RpdmVTaWRlYmFyUmVhY3Rpb24yO1xuXHRcdH0sXG5cdFx0c2hvd1NpZGViYXJSZWFjdGlvbjM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVNpZGViYXJSZWFjdGlvbjMgPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJSZWFjdGlvbjM7XG5cdFx0fSxcblx0XHRzaG93U2lkZWJhclJlYWN0aW9uNDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclJlYWN0aW9uNCA9ICF0aGlzLmlzQWN0aXZlU2lkZWJhclJlYWN0aW9uNDtcblx0XHR9LFxuXHRcdHNob3dTaWRlYmFyU2l4RmxpZ2h0czE6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVNpZGViYXJTaXhGbGlnaHRzMSA9ICF0aGlzLmlzQWN0aXZlU2lkZWJhclNpeEZsaWdodHMxO1xuXHRcdH0sXG5cdFx0c2hvd1NpZGViYXJTaXhGbGlnaHRzMjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclNpeEZsaWdodHMyID0gIXRoaXMuaXNBY3RpdmVTaWRlYmFyU2l4RmxpZ2h0czI7XG5cdFx0fSxcblx0XHRzaG93U2lkZWJhclNpeEZsaWdodHMzOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaXNBY3RpdmVTaWRlYmFyU2l4RmxpZ2h0czMgPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJTaXhGbGlnaHRzMztcblx0XHR9LFxuXHRcdHNob3dTaWRlYmFyU2l4RmxpZ2h0czQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVNpZGViYXJTaXhGbGlnaHRzNCA9ICF0aGlzLmlzQWN0aXZlU2lkZWJhclNpeEZsaWdodHM0O1xuXHRcdH0sXG5cdFx0c2hvd1NpZGViYXJTaXhGbGlnaHRzNTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclNpeEZsaWdodHM1ID0gIXRoaXMuaXNBY3RpdmVTaWRlYmFyU2l4RmxpZ2h0czU7XG5cdFx0fSxcblx0XHRzaG93U2lkZWJhclNpeEZsaWdodHM2OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaXNBY3RpdmVTaWRlYmFyU2l4RmxpZ2h0czYgPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJTaXhGbGlnaHRzNjtcblx0XHR9LFxuXHRcdHNob3dTaWRlYmFyVGVyZXNoa292YTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWN0aXZlU2lkZWJhclRlcmVzaGtvdmEgPSAhdGhpcy5pc0FjdGl2ZVNpZGViYXJUZXJlc2hrb3ZhO1xuXHRcdH0sXG5cdFx0cGxheUF1ZGlvRmlsZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy4kcmVmcy5hdWRpb0VsbS5wbGF5KCk7XG5cdFx0XHR0aGlzLiRyZWZzLmF1ZGlvRWxtLm9uZW5kZWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0JCgnLnBvcHVwLXNjaWVudGlmaWMtdmFsdWVfX2F1ZGlvLXBsZWVyLWJveCcpLnJlbW92ZUNsYXNzKCdwb3B1cC1zY2llbnRpZmljLXZhbHVlX19hdWRpby1wbGVlci1ib3hfYWN0aXZlJyk7XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVBsYXlTb3VuZCA9ICF0aGlzLmlzQWN0aXZlUGxheVNvdW5kO1xuXHRcdH0sXG5cdFx0cGF1c2VBdWRpb0ZpbGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuJHJlZnMuYXVkaW9FbG0ucGF1c2UoKTtcblx0XHRcdHRoaXMuaXNBY3RpdmVQbGF5U291bmQgPSAhdGhpcy5pc0FjdGl2ZVBsYXlTb3VuZDtcblx0XHR9LFxuXHRcdHBsYXlWaWRlb0ZpbGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHRoaXMuaXNBY3RpdmVQbGF5VmlkZW8gPSAhdGhpcy5pc0FjdGl2ZVBsYXlWaWRlbztcblx0XHRcdHRoaXMuJHJlZnMudmlkZW9FbG0ucGxheSgpO1xuXHRcdFx0dGhpcy4kcmVmcy52aWRlb0VsbS5vbmVuZGVkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuaXNBY3RpdmVQbGF5VmlkZW8gPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBvcHVwLWZpbG0tZ2FnYXJpbl9fcHJvZ3Jlc3MtaW5uZXInKS5hbmltYXRlKHsnd2lkdGgnOiAwfSwgMTAwMCk7XG5cdFx0XHR9O1xuXHRcdFx0JCh0aGlzLiRyZWZzLnZpZGVvRWxtKS5vbihcblx0XHRcdFx0J3RpbWV1cGRhdGUnLFxuXHRcdFx0XHRmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdFx0dmFyIHdpZHRoID0gMTEzNCAvIDEwO1xuXHRcdFx0XHRcdFx0d2lkdGggPSB3aWR0aCAqIHRoaXMuY3VycmVudFRpbWU7XG5cdFx0XHRcdFx0JCgnLnBvcHVwLWZpbG0tZ2FnYXJpbl9fcHJvZ3Jlc3MtaW5uZXInKS5hbmltYXRlKHsnd2lkdGgnOiB3aWR0aCArICdweCd9LCA1KTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRwYXVzZVZpZGVvRmlsZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy4kcmVmcy52aWRlb0VsbS5wYXVzZSgpO1xuXHRcdFx0dGhpcy5pc0FjdGl2ZVBsYXlWaWRlbyA9ICF0aGlzLmlzQWN0aXZlUGxheVZpZGVvO1xuXHRcdFx0JCgnLnBvcHVwLWZpbG0tZ2FnYXJpbl9fcHJvZ3Jlc3MtaW5uZXInKS5zdG9wKCk7XG5cdFx0fVxuXHR9XG59KTtcblxuLy8gUGVyZmVjdCBzY3JvbGxiYXIgKGh0dHBzOi8vZ2l0aHViLmNvbS91dGF0dGkvcGVyZmVjdC1zY3JvbGxiYXIpXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0JCgnLnNpZGViYXJfX2Jsb2NrLXdpdGgtc2Nyb2xsJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBzID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIodGhpcyk7XG5cdH0pO1xufSk7Il19
