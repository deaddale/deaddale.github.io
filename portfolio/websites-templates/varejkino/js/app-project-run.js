(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var app = new Vue({
	el: '#app',
	data: {},
	computed: {},
	methods: {
		initFullPage: function () {
			$('#fullpage').fullpage({
				anchors: ['cover', 'donation', 'about', 'gallery', 'news', 'contacts'],
				afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
					var loadedSlide = $(this);
				},
				onLeave: function (index, nextIndex, direction) {
					if (nextIndex === 1) {
						$('.header').removeClass('header_bg-img');
						$('.icon-scroll').removeClass('icon-scroll_black');
					}
					if (nextIndex === 2) {
						$('.nav').addClass('nav_gray');
						$('.header__sum').addClass('header__sum_hidden');
						$('.header').removeClass('header_bg-img');
					}
					else if (nextIndex !== 2) {
						$('.nav').removeClass('nav_gray');
						$('.header__sum').removeClass('header__sum_hidden');
					}
					if (nextIndex > 2) {
						$('.header').addClass('header_bg-img');
					}
					if (nextIndex !== 1) {
						$('.icon-scroll').addClass('icon-scroll_black');
					}
					$('.nav__link').each(function (index, element) {
						$(element).removeClass('nav__link_active');
					});

					$('.nav__list')
						.find('.nav__link:eq(' + (nextIndex - 1) + ')')
						.addClass('nav__link_active');
				}
			});
			// go to slide : begin
			$('.nav__link').on('click', function () {
				var anchor = $(this).data('anchor');
				$.fn.fullpage.moveTo(anchor);
				$('.nav__link').each(function (index, element) {
					$(element).removeClass('nav__link_active');
				});
				$(this).addClass('nav__link_active');
			});
			$('.header__sum-link').on('click', function () {
				$.fn.fullpage.moveTo('donation');
				$('.nav__link').each(function (index, element) {
					$(element).removeClass('nav__link_active');
				});
				$('.nav__link[data-anchor="donation"]').addClass('nav__link_active');
			});
			// go to slide : end
		},
		initPerfectScrollGallery: function () {
			const ps = new PerfectScrollbar('.gallery__list', {
				suppressScrollY: true,
				wheelSpeed: 2,
				wheelPropagation: true
			});

			const psVFirst = new PerfectScrollbar('.popup__tabs-item-row_first', {
				suppressScrollX: true,
				wheelSpeed: 2,
				wheelPropagation: true
			});
		},
		initSlick: function () {
			var newsList = $('.news__list');
			$(newsList).on('init', function (event, slick) {
				$('ul.slick-dots').insertAfter('.news__controls > .news__arrow.news__arrow_left');
				$('.news__arrow_left').on('click', function () {
					$(newsList).slick('slickPrev');
				});
				$('.news__arrow_right').on('click', function () {
					$(newsList).slick('slickNext');
				});
			});
			$(newsList).slick({
				slidesToShow: 5,
				slidesToScroll: 5,
				arrows: false,
				dots: true,
				nextArrow: '<i class="news__arrow news__arrow_left"></i>',
				prevArrow: '<i class="news__arrow news__arrow_right"></i>'
			});
		},
		enableOnlyNumberEnter: function () {
			// запрет ввода любых символов, кроме цифр : начало
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
							(key >= 96 && key <= 105));
					});
				});
			};
			$('.donation__payment-service-sum').forceNumbericOnly();
			// запрет ввода любых символов, кроме цифр : начало
		},
		popupAnimate: function (element, popup) {
			function popupOpen(element, popup) {
				$(element).on('click', function () {
					$(popup).addClass('popup_active');
					$.fn.fullpage.setMouseWheelScrolling(false);
					$.fn.fullpage.setAllowScrolling(false);
				});
			}

			$('.popup__close').on('click', function () {
				$(this).closest('.popup').removeClass('popup_active');
				$.fn.fullpage.setMouseWheelScrolling(true);
				$.fn.fullpage.setAllowScrolling(true);
			});

			popupOpen('.donation__popup-link', '.popup_donate');
			popupOpen('.contacts__btn', '.popup_contacts');
		},
		tabsAnimate: function () {
			function changeTab(popup) {
				$(popup).on('click', '.popup__link-to-tab', function () {
					var index = $(this).data('tab');
					$(popup).find('.popup__tabs-item').each(function () {
						$(this).removeClass('popup__tabs-item_active');
					});

					$('.popup__tabs-item[data-tab="' + index + '"]').addClass('popup__tabs-item_active');

					if (index === 2) {
						const psVSecond = new PerfectScrollbar('.popup__tabs-item-row_second', {
							suppressScrollX: true,
							wheelSpeed: 2,
							wheelPropagation: true
						});
					}
				});
			}

			changeTab('.popup_donate');
		},
		initFancy: function () {
			$('.gallery__link').fancybox({
				infobar: false,
				toolbar: true,
				loop: true,
				afterShow: function (instance, slide) {
					$('#app').css({
						'filter': 'blur(10px)'
					});
				},
				beforeClose: function (instance, slide) {
					$('#app').css({
						'filter': 'blur(0px)'
					});
				}
			});
		},
		initMap: function () {
			$('.about__map-link').fancybox({
				type: 'iframe'
				// href: '',
				// iframe: {
				// 	scrolling: 'auto',
				// 	preload: true
				// },
				// width: '30%',
				// height: '70%'
			});
		}
	},
	mounted() {
		this.initFullPage();
		this.initPerfectScrollGallery();
		this.initSlick();
		this.enableOnlyNumberEnter();
		this.popupAnimate();
		this.tabsAnimate();
		this.initFancy();
		this.initMap();
	}
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgYXBwID0gbmV3IFZ1ZSh7XG5cdGVsOiAnI2FwcCcsXG5cdGRhdGE6IHt9LFxuXHRjb21wdXRlZDoge30sXG5cdG1ldGhvZHM6IHtcblx0XHRpbml0RnVsbFBhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJyNmdWxscGFnZScpLmZ1bGxwYWdlKHtcblx0XHRcdFx0YW5jaG9yczogWydjb3ZlcicsICdkb25hdGlvbicsICdhYm91dCcsICdnYWxsZXJ5JywgJ25ld3MnLCAnY29udGFjdHMnXSxcblx0XHRcdFx0YWZ0ZXJTbGlkZUxvYWQ6IGZ1bmN0aW9uIChhbmNob3JMaW5rLCBpbmRleCwgc2xpZGVBbmNob3IsIHNsaWRlSW5kZXgpIHtcblx0XHRcdFx0XHR2YXIgbG9hZGVkU2xpZGUgPSAkKHRoaXMpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkxlYXZlOiBmdW5jdGlvbiAoaW5kZXgsIG5leHRJbmRleCwgZGlyZWN0aW9uKSB7XG5cdFx0XHRcdFx0aWYgKG5leHRJbmRleCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0JCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdoZWFkZXJfYmctaW1nJyk7XG5cdFx0XHRcdFx0XHQkKCcuaWNvbi1zY3JvbGwnKS5yZW1vdmVDbGFzcygnaWNvbi1zY3JvbGxfYmxhY2snKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG5leHRJbmRleCA9PT0gMikge1xuXHRcdFx0XHRcdFx0JCgnLm5hdicpLmFkZENsYXNzKCduYXZfZ3JheScpO1xuXHRcdFx0XHRcdFx0JCgnLmhlYWRlcl9fc3VtJykuYWRkQ2xhc3MoJ2hlYWRlcl9fc3VtX2hpZGRlbicpO1xuXHRcdFx0XHRcdFx0JCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdoZWFkZXJfYmctaW1nJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKG5leHRJbmRleCAhPT0gMikge1xuXHRcdFx0XHRcdFx0JCgnLm5hdicpLnJlbW92ZUNsYXNzKCduYXZfZ3JheScpO1xuXHRcdFx0XHRcdFx0JCgnLmhlYWRlcl9fc3VtJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fc3VtX2hpZGRlbicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobmV4dEluZGV4ID4gMikge1xuXHRcdFx0XHRcdFx0JCgnLmhlYWRlcicpLmFkZENsYXNzKCdoZWFkZXJfYmctaW1nJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChuZXh0SW5kZXggIT09IDEpIHtcblx0XHRcdFx0XHRcdCQoJy5pY29uLXNjcm9sbCcpLmFkZENsYXNzKCdpY29uLXNjcm9sbF9ibGFjaycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkKCcubmF2X19saW5rJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdCQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ25hdl9fbGlua19hY3RpdmUnKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdCQoJy5uYXZfX2xpc3QnKVxuXHRcdFx0XHRcdFx0LmZpbmQoJy5uYXZfX2xpbms6ZXEoJyArIChuZXh0SW5kZXggLSAxKSArICcpJylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnbmF2X19saW5rX2FjdGl2ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdC8vIGdvIHRvIHNsaWRlIDogYmVnaW5cblx0XHRcdCQoJy5uYXZfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBhbmNob3IgPSAkKHRoaXMpLmRhdGEoJ2FuY2hvcicpO1xuXHRcdFx0XHQkLmZuLmZ1bGxwYWdlLm1vdmVUbyhhbmNob3IpO1xuXHRcdFx0XHQkKCcubmF2X19saW5rJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcblx0XHRcdFx0XHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCduYXZfX2xpbmtfYWN0aXZlJyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCduYXZfX2xpbmtfYWN0aXZlJyk7XG5cdFx0XHR9KTtcblx0XHRcdCQoJy5oZWFkZXJfX3N1bS1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkLmZuLmZ1bGxwYWdlLm1vdmVUbygnZG9uYXRpb24nKTtcblx0XHRcdFx0JCgnLm5hdl9fbGluaycpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG5cdFx0XHRcdFx0JChlbGVtZW50KS5yZW1vdmVDbGFzcygnbmF2X19saW5rX2FjdGl2ZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0JCgnLm5hdl9fbGlua1tkYXRhLWFuY2hvcj1cImRvbmF0aW9uXCJdJykuYWRkQ2xhc3MoJ25hdl9fbGlua19hY3RpdmUnKTtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gZ28gdG8gc2xpZGUgOiBlbmRcblx0XHR9LFxuXHRcdGluaXRQZXJmZWN0U2Nyb2xsR2FsbGVyeTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3QgcHMgPSBuZXcgUGVyZmVjdFNjcm9sbGJhcignLmdhbGxlcnlfX2xpc3QnLCB7XG5cdFx0XHRcdHN1cHByZXNzU2Nyb2xsWTogdHJ1ZSxcblx0XHRcdFx0d2hlZWxTcGVlZDogMixcblx0XHRcdFx0d2hlZWxQcm9wYWdhdGlvbjogdHJ1ZVxuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IHBzVkZpcnN0ID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIoJy5wb3B1cF9fdGFicy1pdGVtLXJvd19maXJzdCcsIHtcblx0XHRcdFx0c3VwcHJlc3NTY3JvbGxYOiB0cnVlLFxuXHRcdFx0XHR3aGVlbFNwZWVkOiAyLFxuXHRcdFx0XHR3aGVlbFByb3BhZ2F0aW9uOiB0cnVlXG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGluaXRTbGljazogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIG5ld3NMaXN0ID0gJCgnLm5ld3NfX2xpc3QnKTtcblx0XHRcdCQobmV3c0xpc3QpLm9uKCdpbml0JywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaykge1xuXHRcdFx0XHQkKCd1bC5zbGljay1kb3RzJykuaW5zZXJ0QWZ0ZXIoJy5uZXdzX19jb250cm9scyA+IC5uZXdzX19hcnJvdy5uZXdzX19hcnJvd19sZWZ0Jyk7XG5cdFx0XHRcdCQoJy5uZXdzX19hcnJvd19sZWZ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQobmV3c0xpc3QpLnNsaWNrKCdzbGlja1ByZXYnKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCQoJy5uZXdzX19hcnJvd19yaWdodCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKG5ld3NMaXN0KS5zbGljaygnc2xpY2tOZXh0Jyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHQkKG5ld3NMaXN0KS5zbGljayh7XG5cdFx0XHRcdHNsaWRlc1RvU2hvdzogNSxcblx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDUsXG5cdFx0XHRcdGFycm93czogZmFsc2UsXG5cdFx0XHRcdGRvdHM6IHRydWUsXG5cdFx0XHRcdG5leHRBcnJvdzogJzxpIGNsYXNzPVwibmV3c19fYXJyb3cgbmV3c19fYXJyb3dfbGVmdFwiPjwvaT4nLFxuXHRcdFx0XHRwcmV2QXJyb3c6ICc8aSBjbGFzcz1cIm5ld3NfX2Fycm93IG5ld3NfX2Fycm93X3JpZ2h0XCI+PC9pPidcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0ZW5hYmxlT25seU51bWJlckVudGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyDQt9Cw0L/RgNC10YIg0LLQstC+0LTQsCDQu9GO0LHRi9GFINGB0LjQvNCy0L7Qu9C+0LIsINC60YDQvtC80LUg0YbQuNGE0YAgOiDQvdCw0YfQsNC70L5cblx0XHRcdCQuZm4uZm9yY2VOdW1iZXJpY09ubHkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQodGhpcykua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0dmFyIGtleSA9IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlIHx8IDA7XG5cdFx0XHRcdFx0XHQvLyDQoNCw0LfRgNC10YjQsNC10LwgYmFja3NwYWNlLCB0YWIsIGRlbGV0ZSwg0YHRgtGA0LXQu9C60LgsINC+0LHRi9GH0L3Ri9C1INGG0LjRhNGA0Ysg0Lgg0YbQuNGE0YDRiyDQvdCwINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdC+0Lkg0LrQu9Cw0LLQuNCw0YLRg9GA0LVcblx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdGtleSA9PSA4IHx8XG5cdFx0XHRcdFx0XHRcdGtleSA9PSA5IHx8XG5cdFx0XHRcdFx0XHRcdGtleSA9PSA0NiB8fFxuXHRcdFx0XHRcdFx0XHQoa2V5ID49IDM3ICYmIGtleSA8PSA0MCkgfHxcblx0XHRcdFx0XHRcdFx0KGtleSA+PSA0OCAmJiBrZXkgPD0gNTcpIHx8XG5cdFx0XHRcdFx0XHRcdChrZXkgPj0gOTYgJiYga2V5IDw9IDEwNSkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0XHQkKCcuZG9uYXRpb25fX3BheW1lbnQtc2VydmljZS1zdW0nKS5mb3JjZU51bWJlcmljT25seSgpO1xuXHRcdFx0Ly8g0LfQsNC/0YDQtdGCINCy0LLQvtC00LAg0LvRjtCx0YvRhSDRgdC40LzQstC+0LvQvtCyLCDQutGA0L7QvNC1INGG0LjRhNGAIDog0L3QsNGH0LDQu9C+XG5cdFx0fSxcblx0XHRwb3B1cEFuaW1hdGU6IGZ1bmN0aW9uIChlbGVtZW50LCBwb3B1cCkge1xuXHRcdFx0ZnVuY3Rpb24gcG9wdXBPcGVuKGVsZW1lbnQsIHBvcHVwKSB7XG5cdFx0XHRcdCQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQocG9wdXApLmFkZENsYXNzKCdwb3B1cF9hY3RpdmUnKTtcblx0XHRcdFx0XHQkLmZuLmZ1bGxwYWdlLnNldE1vdXNlV2hlZWxTY3JvbGxpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdCQuZm4uZnVsbHBhZ2Uuc2V0QWxsb3dTY3JvbGxpbmcoZmFsc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0JCgnLnBvcHVwX19jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcucG9wdXAnKS5yZW1vdmVDbGFzcygncG9wdXBfYWN0aXZlJyk7XG5cdFx0XHRcdCQuZm4uZnVsbHBhZ2Uuc2V0TW91c2VXaGVlbFNjcm9sbGluZyh0cnVlKTtcblx0XHRcdFx0JC5mbi5mdWxscGFnZS5zZXRBbGxvd1Njcm9sbGluZyh0cnVlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwb3B1cE9wZW4oJy5kb25hdGlvbl9fcG9wdXAtbGluaycsICcucG9wdXBfZG9uYXRlJyk7XG5cdFx0XHRwb3B1cE9wZW4oJy5jb250YWN0c19fYnRuJywgJy5wb3B1cF9jb250YWN0cycpO1xuXHRcdH0sXG5cdFx0dGFic0FuaW1hdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZ1bmN0aW9uIGNoYW5nZVRhYihwb3B1cCkge1xuXHRcdFx0XHQkKHBvcHVwKS5vbignY2xpY2snLCAnLnBvcHVwX19saW5rLXRvLXRhYicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmRhdGEoJ3RhYicpO1xuXHRcdFx0XHRcdCQocG9wdXApLmZpbmQoJy5wb3B1cF9fdGFicy1pdGVtJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdwb3B1cF9fdGFicy1pdGVtX2FjdGl2ZScpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnLnBvcHVwX190YWJzLWl0ZW1bZGF0YS10YWI9XCInICsgaW5kZXggKyAnXCJdJykuYWRkQ2xhc3MoJ3BvcHVwX190YWJzLWl0ZW1fYWN0aXZlJyk7XG5cblx0XHRcdFx0XHRpZiAoaW5kZXggPT09IDIpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHBzVlNlY29uZCA9IG5ldyBQZXJmZWN0U2Nyb2xsYmFyKCcucG9wdXBfX3RhYnMtaXRlbS1yb3dfc2Vjb25kJywge1xuXHRcdFx0XHRcdFx0XHRzdXBwcmVzc1Njcm9sbFg6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHdoZWVsU3BlZWQ6IDIsXG5cdFx0XHRcdFx0XHRcdHdoZWVsUHJvcGFnYXRpb246IHRydWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGNoYW5nZVRhYignLnBvcHVwX2RvbmF0ZScpO1xuXHRcdH0sXG5cdFx0aW5pdEZhbmN5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCcuZ2FsbGVyeV9fbGluaycpLmZhbmN5Ym94KHtcblx0XHRcdFx0aW5mb2JhcjogZmFsc2UsXG5cdFx0XHRcdHRvb2xiYXI6IHRydWUsXG5cdFx0XHRcdGxvb3A6IHRydWUsXG5cdFx0XHRcdGFmdGVyU2hvdzogZnVuY3Rpb24gKGluc3RhbmNlLCBzbGlkZSkge1xuXHRcdFx0XHRcdCQoJyNhcHAnKS5jc3Moe1xuXHRcdFx0XHRcdFx0J2ZpbHRlcic6ICdibHVyKDEwcHgpJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRiZWZvcmVDbG9zZTogZnVuY3Rpb24gKGluc3RhbmNlLCBzbGlkZSkge1xuXHRcdFx0XHRcdCQoJyNhcHAnKS5jc3Moe1xuXHRcdFx0XHRcdFx0J2ZpbHRlcic6ICdibHVyKDBweCknXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0aW5pdE1hcDogZnVuY3Rpb24gKCkge1xuXHRcdFx0JCgnLmFib3V0X19tYXAtbGluaycpLmZhbmN5Ym94KHtcblx0XHRcdFx0dHlwZTogJ2lmcmFtZSdcblx0XHRcdFx0Ly8gaHJlZjogJycsXG5cdFx0XHRcdC8vIGlmcmFtZToge1xuXHRcdFx0XHQvLyBcdHNjcm9sbGluZzogJ2F1dG8nLFxuXHRcdFx0XHQvLyBcdHByZWxvYWQ6IHRydWVcblx0XHRcdFx0Ly8gfSxcblx0XHRcdFx0Ly8gd2lkdGg6ICczMCUnLFxuXHRcdFx0XHQvLyBoZWlnaHQ6ICc3MCUnXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cdG1vdW50ZWQoKSB7XG5cdFx0dGhpcy5pbml0RnVsbFBhZ2UoKTtcblx0XHR0aGlzLmluaXRQZXJmZWN0U2Nyb2xsR2FsbGVyeSgpO1xuXHRcdHRoaXMuaW5pdFNsaWNrKCk7XG5cdFx0dGhpcy5lbmFibGVPbmx5TnVtYmVyRW50ZXIoKTtcblx0XHR0aGlzLnBvcHVwQW5pbWF0ZSgpO1xuXHRcdHRoaXMudGFic0FuaW1hdGUoKTtcblx0XHR0aGlzLmluaXRGYW5jeSgpO1xuXHRcdHRoaXMuaW5pdE1hcCgpO1xuXHR9XG59KTsiXX0=
