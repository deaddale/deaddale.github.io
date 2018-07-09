(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var app = new Vue({
	el: '#app',
	data: {},
	computed: {},
	methods: {
		initFullPage: function () {
			// https://github.com/alvarotrigo/fullPage.js/tree/master/lang/russian#fullpagejs
			function fullpageCall() {
				$('#fullpage').fullpage({
					anchors: ['cover', 'donation', 'about', 'news', 'gallery', 'contacts'],
					lockAnchors: false,
					// fitToSection: false,
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
			}

			// disable for $mobile
			var fullpageActive = false;

			function getWidth(el) {
				return Math.max($(el).width(), $(el).outerWidth());
			}

			function windowSize() {
				var windowWidth = getWidth(window);
				if (windowWidth >= 1024 && !fullpageActive) {
					fullpageCall();
					fullpageActive = true;
				}
				else if (windowWidth < 1024 && fullpageActive) {
					$.fn.fullpage.destroy('all');
					$.fn.fullpage.setMouseWheelScrolling(false);
					$.fn.fullpage.setKeyboardScrolling(false);
					fullpageActive = false;
				}
			}

			$(window).on('load resize', windowSize);
		},
		initPerfectScrollGallery: function () {
			if ($('.gallery__list').length) {
				// https://github.com/utatti/perfect-scrollbar
				const ps = new PerfectScrollbar('.gallery__list', {
					suppressScrollY: true,
					wheelSpeed: 2,
					wheelPropagation: true
				});
			}

			if ($('.popup__tabs-item-row_first').length) {
				// https://github.com/utatti/perfect-scrollbar
				const psVFirst = new PerfectScrollbar('.popup__tabs-item-row_first', {
					suppressScrollX: true,
					wheelSpeed: 2,
					wheelPropagation: true
				});
			}
		},
		// https://github.com/kenwheeler/slick
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
			// prohibit the input of any characters except digits
			$.fn.forceNumbericOnly = function () {
				return this.each(function () {
					$(this).keydown(function (e) {
						var key = e.charCode || e.keyCode || 0;
						// We allow backspace, tab, delete, arrows, ordinary numbers and numbers on the additional keyboard
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
			$('.mob-donate__payment-service-sum').forceNumbericOnly();
		},
		popupAnimate: function (element, popup) {
			function popupOpen(element, popup) {
				$(element).on('click', function () {
					$(popup).addClass('popup_active');
					$('body').addClass('hidden');
					// https://github.com/alvarotrigo/fullPage.js/tree/master/lang/russian#fullpagejs
					$.fn.fullpage.setMouseWheelScrolling(false);
					$.fn.fullpage.setAllowScrolling(false);
				});
			}

			$('.popup__close, .popup__message-link').on('click', function () {
				$(this).closest('.popup').removeClass('popup_active');
				$(this).closest('.popup_contacts').find('.popup__message').removeClass('popup__message_active');
				$('body').removeClass('hidden');
				$.fn.fullpage.setMouseWheelScrolling(true);
				$.fn.fullpage.setAllowScrolling(true);
			});

			popupOpen('.donation__popup-link', '.popup_donate');
			popupOpen('.contacts__btn', '.popup_contacts');
		},
		popupAnimateMob: function (element, popup) {
			function popupOpen(element, popup) {
				$(element).on('click', function () {
					$(popup).addClass('popup_active');
					$('body').addClass('hidden');
					// https://github.com/alvarotrigo/fullPage.js/tree/master/lang/russian#fullpagejs
				});
			}

			$('.popup__close, .popup__message-link').on('click', function () {
				$(this).closest('.popup').removeClass('popup_active');
				$(this).closest('.popup_contacts').find('.popup__message').removeClass('popup__message_active');
				$('body').removeClass('hidden');
			});

			popupOpen('.mob-donate__popup-link', '.popup_donate');
			popupOpen('.mob-contacts__btn-form', '.popup_contacts');
		},
		tabsAnimate: function () {
			function changeTab(popup) {
				$(popup).on('click', '.popup__link-to-tab', function () {
					var index = $(this).data('tab');
					$(popup).find('.popup__tabs-item').each(function () {
						$(this).removeClass('popup__tabs-item_active');
					});

					$('.popup__tabs-item[data-tab="' + index + '"]').addClass('popup__tabs-item_active');

					// https://github.com/utatti/perfect-scrollbar
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
			// https://fancyapps.com/fancybox/3/docs/
			$('.gallery__link, .mob-gallery__link, a.gallery__link-mobile').fancybox({
				infobar: false,
				toolbar: false,
				loop: true,
				animationEffect: 'zoom',
				touch: false,
				beforeShow: function (instance, slide) {
					$('#app').addClass('blur');
				},
				afterShow: function () {
					$('.fancybox-slide--current')
						.find('.fancybox-content')
						.prepend('<div class="fancybox__close-btn-custom"></div>');
					$(document).on('click', '.fancybox__close-btn-custom', function (event) {
						$.fancybox.close();
					});
					$('body').addClass('hidden');
				},
				beforeClose: function (instance, slide) {
					$('#app').removeClass('blur');
					$('.fancybox__close-btn-custom').remove();
					$('body').removeClass('hidden');
				}
			});

			var $containter = $('.mob-gallery').find('.grid');
			$containter.imagesLoaded(function () {
				$containter.masonry({
					itemSelector: '.mob-gallery__grid-item',
					isFitWidth: true,
					gutter: 20
				});
			});
		},
		initMap: function () {
			// https://fancyapps.com/fancybox/3/docs/
			$('.about__map-link, .contacts__map-link, .mob-about-pans__map-link, .mob-contacts__map-link').fancybox({
				type: 'iframe',
				infobar: false,
				toolbar: false,
				loop: true,
				animationEffect: 'zoom',
				touch: false,
				mobile: {
					clickContent: 'close',
					clickSlide: 'close'
				},
				beforeShow: function (instance, slide) {
					$('#app').addClass('blur');
				},
				afterShow: function () {
					$('.fancybox-slide--current')
						.find('.fancybox-content')
						.prepend('<div class="fancybox__overlay-mnml"></div>');
					$('.fancybox-slide--current')
						.find('.fancybox-content')
						.prepend('<div class="fancybox__close-btn-custom"></div>');
					$('.fancybox-slide--current')
						.find('.fancybox-content')
						.prepend('<div class="fancybox__burger"></div>');
					$('.nav').clone().appendTo('.fancybox-slide--current .fancybox-content');
					$('.fancybox__burger').on('click', function () {
						$('.nav').toggleClass('nav_active');
					});
					$(document).on('click', '.fancybox__close-btn-custom', function () {
						$.fancybox.close();
					});
					$(document).on('click', '.nav__close', function () {
						$('.nav').removeClass('nav_active');
					});
					$('body').addClass('hidden');
				},
				beforeClose: function (instance, slide) {
					$('.fancybox__close-btn-custom').remove();
					$('#app').removeClass('blur');
					$('body').removeClass('hidden');
				}
			});
		},
		initVideo: function () {
			$('.about-usad__video').fancybox({
				width: '100px',
				infobar: false,
				toolbar: false,
				loop: true,
				animationEffect: 'zoom',
				touch: false,
				mobile: {
					clickContent: "close",
					clickSlide: "close"
				},
				beforeShow: function (instance, slide) {
					$('#app').addClass('blur');
				},
				afterShow: function () {
					$('.fancybox-slide--current')
						.find('.fancybox-content')
						.prepend('<div class="fancybox__close-btn-custom"></div>');
					$(document).on('click', '.fancybox__close-btn-custom', function () {
						$.fancybox.close();
					});
					$('body').addClass('hidden');
				},
				beforeClose: function (instance, slide) {
					$('#app').removeClass('blur');
					$('.fancybox__close-btn-custom').remove();
					$('body').removeClass('hidden');
				}
			});
		},
		initInputMask: function () {
			// https://github.com/digitalBush/jquery.maskedinput
			$('input[type="tel"]').mask('+7 (999) 999-99-99');
		},
		animateMobileNav: function () {
			$('.header__burger').on('click', function () {
				$('.nav').addClass('nav_active');
			});
			$('.nav__close').on('click', function () {
				$('.nav').removeClass('nav_active');
			});
		},
		initScrollToBlock: function () {
			function clickLink() {
				$('.nav__link').on('click', function () {
					var anchor = $(this).data('anchor');
					$('html, body').animate({
						scrollTop: $('.' + anchor).offset().top
					}, 1700);

					$('.nav__link').each(function (index, element) {
						$(element).removeClass('nav__link_active');
					});
					$(this).addClass('nav__link_active');
					$('.nav').removeClass('nav_active');
				});
			}

			// donation
			var target = $('.donation').offset().top;

			$(window).scroll(function () {
				if ($(window).scrollTop() >= target) {
					$('.header__burger').addClass('header__burger_black');
				}
				else {
					$('.header__burger').removeClass('header__burger_black');
				}
			});

			function getWidth(el) {
				return Math.max($(el).width(), $(el).outerWidth());
			}

			function windowSize() {
				var windowWidth = getWidth(window);
				if (windowWidth >= 1024) {
					return false;
				}
				else if (windowWidth < 1024) {
					clickLink();
				}
			}

			$(window).on('load resize', windowSize);
		}
	},
	mounted() {
		this.animateMobileNav();
		this.initFullPage();
		this.initPerfectScrollGallery();
		this.initSlick();
		this.enableOnlyNumberEnter();
		this.popupAnimate();
		this.popupAnimateMob();
		this.tabsAnimate();
		this.initFancy();
		this.initMap();
		this.initInputMask();
		this.initScrollToBlock();
	}
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBhcHAgPSBuZXcgVnVlKHtcblx0ZWw6ICcjYXBwJyxcblx0ZGF0YToge30sXG5cdGNvbXB1dGVkOiB7fSxcblx0bWV0aG9kczoge1xuXHRcdGluaXRGdWxsUGFnZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2FsdmFyb3RyaWdvL2Z1bGxQYWdlLmpzL3RyZWUvbWFzdGVyL2xhbmcvcnVzc2lhbiNmdWxscGFnZWpzXG5cdFx0XHRmdW5jdGlvbiBmdWxscGFnZUNhbGwoKSB7XG5cdFx0XHRcdCQoJyNmdWxscGFnZScpLmZ1bGxwYWdlKHtcblx0XHRcdFx0XHRhbmNob3JzOiBbJ2NvdmVyJywgJ2RvbmF0aW9uJywgJ2Fib3V0JywgJ25ld3MnLCAnZ2FsbGVyeScsICdjb250YWN0cyddLFxuXHRcdFx0XHRcdGxvY2tBbmNob3JzOiBmYWxzZSxcblx0XHRcdFx0XHQvLyBmaXRUb1NlY3Rpb246IGZhbHNlLFxuXHRcdFx0XHRcdGFmdGVyU2xpZGVMb2FkOiBmdW5jdGlvbiAoYW5jaG9yTGluaywgaW5kZXgsIHNsaWRlQW5jaG9yLCBzbGlkZUluZGV4KSB7XG5cdFx0XHRcdFx0XHR2YXIgbG9hZGVkU2xpZGUgPSAkKHRoaXMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0b25MZWF2ZTogZnVuY3Rpb24gKGluZGV4LCBuZXh0SW5kZXgsIGRpcmVjdGlvbikge1xuXHRcdFx0XHRcdFx0aWYgKG5leHRJbmRleCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0XHQkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9iZy1pbWcnKTtcblx0XHRcdFx0XHRcdFx0JCgnLmljb24tc2Nyb2xsJykucmVtb3ZlQ2xhc3MoJ2ljb24tc2Nyb2xsX2JsYWNrJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAobmV4dEluZGV4ID09PSAyKSB7XG5cdFx0XHRcdFx0XHRcdCQoJy5uYXYnKS5hZGRDbGFzcygnbmF2X2dyYXknKTtcblx0XHRcdFx0XHRcdFx0JCgnLmhlYWRlcl9fc3VtJykuYWRkQ2xhc3MoJ2hlYWRlcl9fc3VtX2hpZGRlbicpO1xuXHRcdFx0XHRcdFx0XHQkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9iZy1pbWcnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKG5leHRJbmRleCAhPT0gMikge1xuXHRcdFx0XHRcdFx0XHQkKCcubmF2JykucmVtb3ZlQ2xhc3MoJ25hdl9ncmF5Jyk7XG5cdFx0XHRcdFx0XHRcdCQoJy5oZWFkZXJfX3N1bScpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX3N1bV9oaWRkZW4nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChuZXh0SW5kZXggPiAyKSB7XG5cdFx0XHRcdFx0XHRcdCQoJy5oZWFkZXInKS5hZGRDbGFzcygnaGVhZGVyX2JnLWltZycpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKG5leHRJbmRleCAhPT0gMSkge1xuXHRcdFx0XHRcdFx0XHQkKCcuaWNvbi1zY3JvbGwnKS5hZGRDbGFzcygnaWNvbi1zY3JvbGxfYmxhY2snKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCQoJy5uYXZfX2xpbmsnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCduYXZfX2xpbmtfYWN0aXZlJyk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0JCgnLm5hdl9fbGlzdCcpXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcubmF2X19saW5rOmVxKCcgKyAobmV4dEluZGV4IC0gMSkgKyAnKScpXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnbmF2X19saW5rX2FjdGl2ZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gZ28gdG8gc2xpZGUgOiBiZWdpblxuXHRcdFx0XHQkKCcubmF2X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBhbmNob3IgPSAkKHRoaXMpLmRhdGEoJ2FuY2hvcicpO1xuXHRcdFx0XHRcdCQuZm4uZnVsbHBhZ2UubW92ZVRvKGFuY2hvcik7XG5cdFx0XHRcdFx0JCgnLm5hdl9fbGluaycpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCduYXZfX2xpbmtfYWN0aXZlJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnbmF2X19saW5rX2FjdGl2ZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0JCgnLmhlYWRlcl9fc3VtLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JC5mbi5mdWxscGFnZS5tb3ZlVG8oJ2RvbmF0aW9uJyk7XG5cdFx0XHRcdFx0JCgnLm5hdl9fbGluaycpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCduYXZfX2xpbmtfYWN0aXZlJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0JCgnLm5hdl9fbGlua1tkYXRhLWFuY2hvcj1cImRvbmF0aW9uXCJdJykuYWRkQ2xhc3MoJ25hdl9fbGlua19hY3RpdmUnKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdC8vIGdvIHRvIHNsaWRlIDogZW5kXG5cdFx0XHR9XG5cblx0XHRcdC8vIGRpc2FibGUgZm9yICRtb2JpbGVcblx0XHRcdHZhciBmdWxscGFnZUFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRmdW5jdGlvbiBnZXRXaWR0aChlbCkge1xuXHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoJChlbCkud2lkdGgoKSwgJChlbCkub3V0ZXJXaWR0aCgpKTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gd2luZG93U2l6ZSgpIHtcblx0XHRcdFx0dmFyIHdpbmRvd1dpZHRoID0gZ2V0V2lkdGgod2luZG93KTtcblx0XHRcdFx0aWYgKHdpbmRvd1dpZHRoID49IDEwMjQgJiYgIWZ1bGxwYWdlQWN0aXZlKSB7XG5cdFx0XHRcdFx0ZnVsbHBhZ2VDYWxsKCk7XG5cdFx0XHRcdFx0ZnVsbHBhZ2VBY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHdpbmRvd1dpZHRoIDwgMTAyNCAmJiBmdWxscGFnZUFjdGl2ZSkge1xuXHRcdFx0XHRcdCQuZm4uZnVsbHBhZ2UuZGVzdHJveSgnYWxsJyk7XG5cdFx0XHRcdFx0JC5mbi5mdWxscGFnZS5zZXRNb3VzZVdoZWVsU2Nyb2xsaW5nKGZhbHNlKTtcblx0XHRcdFx0XHQkLmZuLmZ1bGxwYWdlLnNldEtleWJvYXJkU2Nyb2xsaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRmdWxscGFnZUFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCQod2luZG93KS5vbignbG9hZCByZXNpemUnLCB3aW5kb3dTaXplKTtcblx0XHR9LFxuXHRcdGluaXRQZXJmZWN0U2Nyb2xsR2FsbGVyeTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCQoJy5nYWxsZXJ5X19saXN0JykubGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS91dGF0dGkvcGVyZmVjdC1zY3JvbGxiYXJcblx0XHRcdFx0Y29uc3QgcHMgPSBuZXcgUGVyZmVjdFNjcm9sbGJhcignLmdhbGxlcnlfX2xpc3QnLCB7XG5cdFx0XHRcdFx0c3VwcHJlc3NTY3JvbGxZOiB0cnVlLFxuXHRcdFx0XHRcdHdoZWVsU3BlZWQ6IDIsXG5cdFx0XHRcdFx0d2hlZWxQcm9wYWdhdGlvbjogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCQoJy5wb3B1cF9fdGFicy1pdGVtLXJvd19maXJzdCcpLmxlbmd0aCkge1xuXHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vdXRhdHRpL3BlcmZlY3Qtc2Nyb2xsYmFyXG5cdFx0XHRcdGNvbnN0IHBzVkZpcnN0ID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIoJy5wb3B1cF9fdGFicy1pdGVtLXJvd19maXJzdCcsIHtcblx0XHRcdFx0XHRzdXBwcmVzc1Njcm9sbFg6IHRydWUsXG5cdFx0XHRcdFx0d2hlZWxTcGVlZDogMixcblx0XHRcdFx0XHR3aGVlbFByb3BhZ2F0aW9uOiB0cnVlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvc2xpY2tcblx0XHRpbml0U2xpY2s6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBuZXdzTGlzdCA9ICQoJy5uZXdzX19saXN0Jyk7XG5cdFx0XHQkKG5ld3NMaXN0KS5vbignaW5pdCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2spIHtcblx0XHRcdFx0JCgndWwuc2xpY2stZG90cycpLmluc2VydEFmdGVyKCcubmV3c19fY29udHJvbHMgPiAubmV3c19fYXJyb3cubmV3c19fYXJyb3dfbGVmdCcpO1xuXHRcdFx0XHQkKCcubmV3c19fYXJyb3dfbGVmdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKG5ld3NMaXN0KS5zbGljaygnc2xpY2tQcmV2Jyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQkKCcubmV3c19fYXJyb3dfcmlnaHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JChuZXdzTGlzdCkuc2xpY2soJ3NsaWNrTmV4dCcpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0JChuZXdzTGlzdCkuc2xpY2soe1xuXHRcdFx0XHRzbGlkZXNUb1Nob3c6IDUsXG5cdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiA1LFxuXHRcdFx0XHRhcnJvd3M6IGZhbHNlLFxuXHRcdFx0XHRkb3RzOiB0cnVlLFxuXHRcdFx0XHRuZXh0QXJyb3c6ICc8aSBjbGFzcz1cIm5ld3NfX2Fycm93IG5ld3NfX2Fycm93X2xlZnRcIj48L2k+Jyxcblx0XHRcdFx0cHJldkFycm93OiAnPGkgY2xhc3M9XCJuZXdzX19hcnJvdyBuZXdzX19hcnJvd19yaWdodFwiPjwvaT4nXG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGVuYWJsZU9ubHlOdW1iZXJFbnRlcjogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gcHJvaGliaXQgdGhlIGlucHV0IG9mIGFueSBjaGFyYWN0ZXJzIGV4Y2VwdCBkaWdpdHNcblx0XHRcdCQuZm4uZm9yY2VOdW1iZXJpY09ubHkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQodGhpcykua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0dmFyIGtleSA9IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlIHx8IDA7XG5cdFx0XHRcdFx0XHQvLyBXZSBhbGxvdyBiYWNrc3BhY2UsIHRhYiwgZGVsZXRlLCBhcnJvd3MsIG9yZGluYXJ5IG51bWJlcnMgYW5kIG51bWJlcnMgb24gdGhlIGFkZGl0aW9uYWwga2V5Ym9hcmRcblx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdGtleSA9PSA4IHx8XG5cdFx0XHRcdFx0XHRcdGtleSA9PSA5IHx8XG5cdFx0XHRcdFx0XHRcdGtleSA9PSA0NiB8fFxuXHRcdFx0XHRcdFx0XHQoa2V5ID49IDM3ICYmIGtleSA8PSA0MCkgfHxcblx0XHRcdFx0XHRcdFx0KGtleSA+PSA0OCAmJiBrZXkgPD0gNTcpIHx8XG5cdFx0XHRcdFx0XHRcdChrZXkgPj0gOTYgJiYga2V5IDw9IDEwNSkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0XHQkKCcuZG9uYXRpb25fX3BheW1lbnQtc2VydmljZS1zdW0nKS5mb3JjZU51bWJlcmljT25seSgpO1xuXHRcdFx0JCgnLm1vYi1kb25hdGVfX3BheW1lbnQtc2VydmljZS1zdW0nKS5mb3JjZU51bWJlcmljT25seSgpO1xuXHRcdH0sXG5cdFx0cG9wdXBBbmltYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgcG9wdXApIHtcblx0XHRcdGZ1bmN0aW9uIHBvcHVwT3BlbihlbGVtZW50LCBwb3B1cCkge1xuXHRcdFx0XHQkKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKHBvcHVwKS5hZGRDbGFzcygncG9wdXBfYWN0aXZlJyk7XG5cdFx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdoaWRkZW4nKTtcblx0XHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vYWx2YXJvdHJpZ28vZnVsbFBhZ2UuanMvdHJlZS9tYXN0ZXIvbGFuZy9ydXNzaWFuI2Z1bGxwYWdlanNcblx0XHRcdFx0XHQkLmZuLmZ1bGxwYWdlLnNldE1vdXNlV2hlZWxTY3JvbGxpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdCQuZm4uZnVsbHBhZ2Uuc2V0QWxsb3dTY3JvbGxpbmcoZmFsc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0JCgnLnBvcHVwX19jbG9zZSwgLnBvcHVwX19tZXNzYWdlLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQodGhpcykuY2xvc2VzdCgnLnBvcHVwJykucmVtb3ZlQ2xhc3MoJ3BvcHVwX2FjdGl2ZScpO1xuXHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5wb3B1cF9jb250YWN0cycpLmZpbmQoJy5wb3B1cF9fbWVzc2FnZScpLnJlbW92ZUNsYXNzKCdwb3B1cF9fbWVzc2FnZV9hY3RpdmUnKTtcblx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblx0XHRcdFx0JC5mbi5mdWxscGFnZS5zZXRNb3VzZVdoZWVsU2Nyb2xsaW5nKHRydWUpO1xuXHRcdFx0XHQkLmZuLmZ1bGxwYWdlLnNldEFsbG93U2Nyb2xsaW5nKHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHBvcHVwT3BlbignLmRvbmF0aW9uX19wb3B1cC1saW5rJywgJy5wb3B1cF9kb25hdGUnKTtcblx0XHRcdHBvcHVwT3BlbignLmNvbnRhY3RzX19idG4nLCAnLnBvcHVwX2NvbnRhY3RzJyk7XG5cdFx0fSxcblx0XHRwb3B1cEFuaW1hdGVNb2I6IGZ1bmN0aW9uIChlbGVtZW50LCBwb3B1cCkge1xuXHRcdFx0ZnVuY3Rpb24gcG9wdXBPcGVuKGVsZW1lbnQsIHBvcHVwKSB7XG5cdFx0XHRcdCQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQocG9wdXApLmFkZENsYXNzKCdwb3B1cF9hY3RpdmUnKTtcblx0XHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHZhcm90cmlnby9mdWxsUGFnZS5qcy90cmVlL21hc3Rlci9sYW5nL3J1c3NpYW4jZnVsbHBhZ2Vqc1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0JCgnLnBvcHVwX19jbG9zZSwgLnBvcHVwX19tZXNzYWdlLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQodGhpcykuY2xvc2VzdCgnLnBvcHVwJykucmVtb3ZlQ2xhc3MoJ3BvcHVwX2FjdGl2ZScpO1xuXHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5wb3B1cF9jb250YWN0cycpLmZpbmQoJy5wb3B1cF9fbWVzc2FnZScpLnJlbW92ZUNsYXNzKCdwb3B1cF9fbWVzc2FnZV9hY3RpdmUnKTtcblx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwb3B1cE9wZW4oJy5tb2ItZG9uYXRlX19wb3B1cC1saW5rJywgJy5wb3B1cF9kb25hdGUnKTtcblx0XHRcdHBvcHVwT3BlbignLm1vYi1jb250YWN0c19fYnRuLWZvcm0nLCAnLnBvcHVwX2NvbnRhY3RzJyk7XG5cdFx0fSxcblx0XHR0YWJzQW5pbWF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0ZnVuY3Rpb24gY2hhbmdlVGFiKHBvcHVwKSB7XG5cdFx0XHRcdCQocG9wdXApLm9uKCdjbGljaycsICcucG9wdXBfX2xpbmstdG8tdGFiJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuZGF0YSgndGFiJyk7XG5cdFx0XHRcdFx0JChwb3B1cCkuZmluZCgnLnBvcHVwX190YWJzLWl0ZW0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ3BvcHVwX190YWJzLWl0ZW1fYWN0aXZlJyk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcucG9wdXBfX3RhYnMtaXRlbVtkYXRhLXRhYj1cIicgKyBpbmRleCArICdcIl0nKS5hZGRDbGFzcygncG9wdXBfX3RhYnMtaXRlbV9hY3RpdmUnKTtcblxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS91dGF0dGkvcGVyZmVjdC1zY3JvbGxiYXJcblx0XHRcdFx0XHRpZiAoaW5kZXggPT09IDIpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHBzVlNlY29uZCA9IG5ldyBQZXJmZWN0U2Nyb2xsYmFyKCcucG9wdXBfX3RhYnMtaXRlbS1yb3dfc2Vjb25kJywge1xuXHRcdFx0XHRcdFx0XHRzdXBwcmVzc1Njcm9sbFg6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHdoZWVsU3BlZWQ6IDIsXG5cdFx0XHRcdFx0XHRcdHdoZWVsUHJvcGFnYXRpb246IHRydWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGNoYW5nZVRhYignLnBvcHVwX2RvbmF0ZScpO1xuXHRcdH0sXG5cdFx0aW5pdEZhbmN5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9kb2NzL1xuXHRcdFx0JCgnLmdhbGxlcnlfX2xpbmssIC5tb2ItZ2FsbGVyeV9fbGluaywgYS5nYWxsZXJ5X19saW5rLW1vYmlsZScpLmZhbmN5Ym94KHtcblx0XHRcdFx0aW5mb2JhcjogZmFsc2UsXG5cdFx0XHRcdHRvb2xiYXI6IGZhbHNlLFxuXHRcdFx0XHRsb29wOiB0cnVlLFxuXHRcdFx0XHRhbmltYXRpb25FZmZlY3Q6ICd6b29tJyxcblx0XHRcdFx0dG91Y2g6IGZhbHNlLFxuXHRcdFx0XHRiZWZvcmVTaG93OiBmdW5jdGlvbiAoaW5zdGFuY2UsIHNsaWRlKSB7XG5cdFx0XHRcdFx0JCgnI2FwcCcpLmFkZENsYXNzKCdibHVyJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFmdGVyU2hvdzogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQoJy5mYW5jeWJveC1zbGlkZS0tY3VycmVudCcpXG5cdFx0XHRcdFx0XHQuZmluZCgnLmZhbmN5Ym94LWNvbnRlbnQnKVxuXHRcdFx0XHRcdFx0LnByZXBlbmQoJzxkaXYgY2xhc3M9XCJmYW5jeWJveF9fY2xvc2UtYnRuLWN1c3RvbVwiPjwvZGl2PicpO1xuXHRcdFx0XHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZmFuY3lib3hfX2Nsb3NlLWJ0bi1jdXN0b20nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRcdCQuZmFuY3lib3guY2xvc2UoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRiZWZvcmVDbG9zZTogZnVuY3Rpb24gKGluc3RhbmNlLCBzbGlkZSkge1xuXHRcdFx0XHRcdCQoJyNhcHAnKS5yZW1vdmVDbGFzcygnYmx1cicpO1xuXHRcdFx0XHRcdCQoJy5mYW5jeWJveF9fY2xvc2UtYnRuLWN1c3RvbScpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgJGNvbnRhaW50ZXIgPSAkKCcubW9iLWdhbGxlcnknKS5maW5kKCcuZ3JpZCcpO1xuXHRcdFx0JGNvbnRhaW50ZXIuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JGNvbnRhaW50ZXIubWFzb25yeSh7XG5cdFx0XHRcdFx0aXRlbVNlbGVjdG9yOiAnLm1vYi1nYWxsZXJ5X19ncmlkLWl0ZW0nLFxuXHRcdFx0XHRcdGlzRml0V2lkdGg6IHRydWUsXG5cdFx0XHRcdFx0Z3V0dGVyOiAyMFxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0aW5pdE1hcDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gaHR0cHM6Ly9mYW5jeWFwcHMuY29tL2ZhbmN5Ym94LzMvZG9jcy9cblx0XHRcdCQoJy5hYm91dF9fbWFwLWxpbmssIC5jb250YWN0c19fbWFwLWxpbmssIC5tb2ItYWJvdXQtcGFuc19fbWFwLWxpbmssIC5tb2ItY29udGFjdHNfX21hcC1saW5rJykuZmFuY3lib3goe1xuXHRcdFx0XHR0eXBlOiAnaWZyYW1lJyxcblx0XHRcdFx0aW5mb2JhcjogZmFsc2UsXG5cdFx0XHRcdHRvb2xiYXI6IGZhbHNlLFxuXHRcdFx0XHRsb29wOiB0cnVlLFxuXHRcdFx0XHRhbmltYXRpb25FZmZlY3Q6ICd6b29tJyxcblx0XHRcdFx0dG91Y2g6IGZhbHNlLFxuXHRcdFx0XHRtb2JpbGU6IHtcblx0XHRcdFx0XHRjbGlja0NvbnRlbnQ6ICdjbG9zZScsXG5cdFx0XHRcdFx0Y2xpY2tTbGlkZTogJ2Nsb3NlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRiZWZvcmVTaG93OiBmdW5jdGlvbiAoaW5zdGFuY2UsIHNsaWRlKSB7XG5cdFx0XHRcdFx0JCgnI2FwcCcpLmFkZENsYXNzKCdibHVyJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFmdGVyU2hvdzogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQoJy5mYW5jeWJveC1zbGlkZS0tY3VycmVudCcpXG5cdFx0XHRcdFx0XHQuZmluZCgnLmZhbmN5Ym94LWNvbnRlbnQnKVxuXHRcdFx0XHRcdFx0LnByZXBlbmQoJzxkaXYgY2xhc3M9XCJmYW5jeWJveF9fb3ZlcmxheS1tbm1sXCI+PC9kaXY+Jyk7XG5cdFx0XHRcdFx0JCgnLmZhbmN5Ym94LXNsaWRlLS1jdXJyZW50Jylcblx0XHRcdFx0XHRcdC5maW5kKCcuZmFuY3lib3gtY29udGVudCcpXG5cdFx0XHRcdFx0XHQucHJlcGVuZCgnPGRpdiBjbGFzcz1cImZhbmN5Ym94X19jbG9zZS1idG4tY3VzdG9tXCI+PC9kaXY+Jyk7XG5cdFx0XHRcdFx0JCgnLmZhbmN5Ym94LXNsaWRlLS1jdXJyZW50Jylcblx0XHRcdFx0XHRcdC5maW5kKCcuZmFuY3lib3gtY29udGVudCcpXG5cdFx0XHRcdFx0XHQucHJlcGVuZCgnPGRpdiBjbGFzcz1cImZhbmN5Ym94X19idXJnZXJcIj48L2Rpdj4nKTtcblx0XHRcdFx0XHQkKCcubmF2JykuY2xvbmUoKS5hcHBlbmRUbygnLmZhbmN5Ym94LXNsaWRlLS1jdXJyZW50IC5mYW5jeWJveC1jb250ZW50Jyk7XG5cdFx0XHRcdFx0JCgnLmZhbmN5Ym94X19idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQkKCcubmF2JykudG9nZ2xlQ2xhc3MoJ25hdl9hY3RpdmUnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZhbmN5Ym94X19jbG9zZS1idG4tY3VzdG9tJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JC5mYW5jeWJveC5jbG9zZSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcubmF2X19jbG9zZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQoJy5uYXYnKS5yZW1vdmVDbGFzcygnbmF2X2FjdGl2ZScpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnaGlkZGVuJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJlZm9yZUNsb3NlOiBmdW5jdGlvbiAoaW5zdGFuY2UsIHNsaWRlKSB7XG5cdFx0XHRcdFx0JCgnLmZhbmN5Ym94X19jbG9zZS1idG4tY3VzdG9tJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0JCgnI2FwcCcpLnJlbW92ZUNsYXNzKCdibHVyJyk7XG5cdFx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRpbml0VmlkZW86IGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJy5hYm91dC11c2FkX192aWRlbycpLmZhbmN5Ym94KHtcblx0XHRcdFx0d2lkdGg6ICcxMDBweCcsXG5cdFx0XHRcdGluZm9iYXI6IGZhbHNlLFxuXHRcdFx0XHR0b29sYmFyOiBmYWxzZSxcblx0XHRcdFx0bG9vcDogdHJ1ZSxcblx0XHRcdFx0YW5pbWF0aW9uRWZmZWN0OiAnem9vbScsXG5cdFx0XHRcdHRvdWNoOiBmYWxzZSxcblx0XHRcdFx0bW9iaWxlOiB7XG5cdFx0XHRcdFx0Y2xpY2tDb250ZW50OiBcImNsb3NlXCIsXG5cdFx0XHRcdFx0Y2xpY2tTbGlkZTogXCJjbG9zZVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJlZm9yZVNob3c6IGZ1bmN0aW9uIChpbnN0YW5jZSwgc2xpZGUpIHtcblx0XHRcdFx0XHQkKCcjYXBwJykuYWRkQ2xhc3MoJ2JsdXInKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YWZ0ZXJTaG93OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JCgnLmZhbmN5Ym94LXNsaWRlLS1jdXJyZW50Jylcblx0XHRcdFx0XHRcdC5maW5kKCcuZmFuY3lib3gtY29udGVudCcpXG5cdFx0XHRcdFx0XHQucHJlcGVuZCgnPGRpdiBjbGFzcz1cImZhbmN5Ym94X19jbG9zZS1idG4tY3VzdG9tXCI+PC9kaXY+Jyk7XG5cdFx0XHRcdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5mYW5jeWJveF9fY2xvc2UtYnRuLWN1c3RvbScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQuZmFuY3lib3guY2xvc2UoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRiZWZvcmVDbG9zZTogZnVuY3Rpb24gKGluc3RhbmNlLCBzbGlkZSkge1xuXHRcdFx0XHRcdCQoJyNhcHAnKS5yZW1vdmVDbGFzcygnYmx1cicpO1xuXHRcdFx0XHRcdCQoJy5mYW5jeWJveF9fY2xvc2UtYnRuLWN1c3RvbScpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0aW5pdElucHV0TWFzazogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2RpZ2l0YWxCdXNoL2pxdWVyeS5tYXNrZWRpbnB1dFxuXHRcdFx0JCgnaW5wdXRbdHlwZT1cInRlbFwiXScpLm1hc2soJys3ICg5OTkpIDk5OS05OS05OScpO1xuXHRcdH0sXG5cdFx0YW5pbWF0ZU1vYmlsZU5hdjogZnVuY3Rpb24gKCkge1xuXHRcdFx0JCgnLmhlYWRlcl9fYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcubmF2JykuYWRkQ2xhc3MoJ25hdl9hY3RpdmUnKTtcblx0XHRcdH0pO1xuXHRcdFx0JCgnLm5hdl9fY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJy5uYXYnKS5yZW1vdmVDbGFzcygnbmF2X2FjdGl2ZScpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRpbml0U2Nyb2xsVG9CbG9jazogZnVuY3Rpb24gKCkge1xuXHRcdFx0ZnVuY3Rpb24gY2xpY2tMaW5rKCkge1xuXHRcdFx0XHQkKCcubmF2X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBhbmNob3IgPSAkKHRoaXMpLmRhdGEoJ2FuY2hvcicpO1xuXHRcdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0XHRcdHNjcm9sbFRvcDogJCgnLicgKyBhbmNob3IpLm9mZnNldCgpLnRvcFxuXHRcdFx0XHRcdH0sIDE3MDApO1xuXG5cdFx0XHRcdFx0JCgnLm5hdl9fbGluaycpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCduYXZfX2xpbmtfYWN0aXZlJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnbmF2X19saW5rX2FjdGl2ZScpO1xuXHRcdFx0XHRcdCQoJy5uYXYnKS5yZW1vdmVDbGFzcygnbmF2X2FjdGl2ZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZG9uYXRpb25cblx0XHRcdHZhciB0YXJnZXQgPSAkKCcuZG9uYXRpb24nKS5vZmZzZXQoKS50b3A7XG5cblx0XHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID49IHRhcmdldCkge1xuXHRcdFx0XHRcdCQoJy5oZWFkZXJfX2J1cmdlcicpLmFkZENsYXNzKCdoZWFkZXJfX2J1cmdlcl9ibGFjaycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCQoJy5oZWFkZXJfX2J1cmdlcicpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2J1cmdlcl9ibGFjaycpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0ZnVuY3Rpb24gZ2V0V2lkdGgoZWwpIHtcblx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KCQoZWwpLndpZHRoKCksICQoZWwpLm91dGVyV2lkdGgoKSk7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIHdpbmRvd1NpemUoKSB7XG5cdFx0XHRcdHZhciB3aW5kb3dXaWR0aCA9IGdldFdpZHRoKHdpbmRvdyk7XG5cdFx0XHRcdGlmICh3aW5kb3dXaWR0aCA+PSAxMDI0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHdpbmRvd1dpZHRoIDwgMTAyNCkge1xuXHRcdFx0XHRcdGNsaWNrTGluaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCQod2luZG93KS5vbignbG9hZCByZXNpemUnLCB3aW5kb3dTaXplKTtcblx0XHR9XG5cdH0sXG5cdG1vdW50ZWQoKSB7XG5cdFx0dGhpcy5hbmltYXRlTW9iaWxlTmF2KCk7XG5cdFx0dGhpcy5pbml0RnVsbFBhZ2UoKTtcblx0XHR0aGlzLmluaXRQZXJmZWN0U2Nyb2xsR2FsbGVyeSgpO1xuXHRcdHRoaXMuaW5pdFNsaWNrKCk7XG5cdFx0dGhpcy5lbmFibGVPbmx5TnVtYmVyRW50ZXIoKTtcblx0XHR0aGlzLnBvcHVwQW5pbWF0ZSgpO1xuXHRcdHRoaXMucG9wdXBBbmltYXRlTW9iKCk7XG5cdFx0dGhpcy50YWJzQW5pbWF0ZSgpO1xuXHRcdHRoaXMuaW5pdEZhbmN5KCk7XG5cdFx0dGhpcy5pbml0TWFwKCk7XG5cdFx0dGhpcy5pbml0SW5wdXRNYXNrKCk7XG5cdFx0dGhpcy5pbml0U2Nyb2xsVG9CbG9jaygpO1xuXHR9XG59KTsiXX0=
