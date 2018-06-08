// Глобальный прелоадер для всех страниц
function hidePreloader() {
	$('.cssload-container').removeClass('cssload-container--loading');
}

// Слайдеры контента
function initSlickSlider() {
	$(".slider-phone").slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000,
	});

	$(".slider-mac").slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
	});
}

// Выбор страны на странице profile-acсounts
function checkCountry() {
	$('.settings .form__row--country select.form__select').on('change', function () {
		var optionContent = $(this).find('option:selected').text();
		var optionVal = $(this).val();
		if (optionVal != 0) {
			$(this).after("<div class='form__item-selected'><span class='form__remove-btn'></span><span class='form__item-selected-text'>" + optionContent + "</span></div>");
		}
		var itemSelected = $('.form__item-selected');
		$(itemSelected).on('click', function () {
			$(this).remove();
		});
	});
}

// Выбор языка на странице profile-general
function selectLang() {
	var firstСondition = false;
	var secondСondition = false;
	var langText = '';

	$('.settings .form__row--lang select.form__select--lang-txt').on('change', function () {
		var optionContent = $(this).find('option:selected').text();
		var optionVal = $(this).val();

		if (optionVal != 0) {
			firstСondition = true;
			langText = optionContent;
		}
	});

	$('.settings .form__row--lang select.form__select--lang-lvl').on('change', function () {
		var optionVal = $(this).val();
		if (optionVal != 0) {
			secondСondition = true;

			if (firstСondition && secondСondition) {
				var lvlOneSelected = "<i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item'></i><i class='form__item-selected-lvl-item'></i><i class='form__item-selected-lvl-item'></i>";
				var lvlTwoSelected = "<i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item'></i><i class='form__item-selected-lvl-item'></i>";
				var lvlThreeSelected = "<i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item'></i>";
				var lvlFourSelected = "<i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i><i class='form__item-selected-lvl-item form__item-selected-lvl-item--active'></i>";

				if (optionVal == 1) {
					$('.form__row--lang-result')
						.append("<div class='form__item-selected'><span class='form__remove-btn'></span><span class='form__item-selected-text'>" + langText + "</span><span class='form__item-selected-lvl'>" + lvlOneSelected + "</span></div>");
				}
				if (optionVal == 2) {
					$('.form__row--lang-result')
						.append("<div class='form__item-selected'><span class='form__remove-btn'></span><span class='form__item-selected-text'>" + langText + "</span><span class='form__item-selected-lvl'>" + lvlTwoSelected + "</span></div>");
				}
				if (optionVal == 3) {
					$('.form__row--lang-result')
						.append("<div class='form__item-selected'><span class='form__remove-btn'></span><span class='form__item-selected-text'>" + langText + "</span><span class='form__item-selected-lvl'>" + lvlThreeSelected + "</span></div>");
				}
				if (optionVal == 4) {
					$('.form__row--lang-result')
						.append("<div class='form__item-selected'><span class='form__remove-btn'></span><span class='form__item-selected-text'>" + langText + "</span><span class='form__item-selected-lvl'>" + lvlFourSelected + "</span></div>");
				}
				var itemSelected = $('.form__item-selected');
				$(itemSelected).on('click', function () {
					$(this).remove();
				});
			}
		}
	});
}

function initValidateForm() {
	$("#form-general").validate({
		focusCleanup: true,
		focusInvalid: false,
		errorPlacement: function (error, element) {
			return true;
		}
	});
}

// Скрытие/показ моб. меню
function actionBurgerMenu() {
	$('.header__hamburger').on('click', function () {
		$(this).toggleClass('is-active');
		$('.header__nav').slideToggle();
		$('.header__phone').slideToggle();
		console.log(this)
	});
}

// Инициализация waypoint
function initWaypoint() {
	$('.box').waypoint(function (dir) {
		if (dir === 'down') {
			$(this.element).removeClass('fadeOutDown')
			$(this.element).addClass('fadeInUp');
		} else {
			$(this.element).removeClass('fadeInUp')
			$(this.element).addClass('fadeOutDown');
		}
	}, {
		offset: '85%'
	});

	$('.box-offset--95').waypoint(function (dir) {
		if (dir === 'down') {
			$(this.element).removeClass('fadeOutDown')
			$(this.element).addClass('fadeInUp');
		} else {
			$(this.element).removeClass('fadeInUp')
			$(this.element).addClass('fadeOutDown');
		}
	}, {
		offset: '95%'
	});

	$('.box-offset--75').waypoint(function (dir) {
		if (dir === 'down') {
			$(this.element).removeClass('fadeOutDown')
			$(this.element).addClass('fadeInUp');
		} else {
			$(this.element).removeClass('fadeInUp')
			$(this.element).addClass('fadeOutDown');
		}
	}, {
		offset: '75%'
	});
}

// Клик на ссылку "Faq"
function clickFaqLink() {
	$('.faq__link').on('click', function () {
		$(this).next('.faq__content').slideToggle();
		$(this).toggleClass('faq__link--clicked');
	});
}

// Активация внутреннего прелоадера
function clickFormNext() {
	$('.form__next').on('click', function (e) {
		e.preventDefault();
		$('.cssload-container').addClass('cssload-container--loading');
	});
}

// Смена класса при клике на кнопку '+'
function actionPlusBtn() {
	$('.form__item--services .btn--plus').on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('form__item--input-showed');
	});
}

// Call functions
$(document).ready(function () {
	setTimeout(hidePreloader, 1000);
	initSlickSlider();
	checkCountry();
	selectLang();
	initValidateForm();
	actionBurgerMenu();
	initWaypoint();
	clickFaqLink();
	clickFormNext();
	actionPlusBtn();
});

// $(rowLang).find('.settings select.form__select').on('change', function () {
// 	var optionContent = $(this).find('option:selected').text();
// 	var optionVal = $(this).val();
// });
