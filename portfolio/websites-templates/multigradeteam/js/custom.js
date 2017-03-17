// блок "наша техника". смена изображений и описаний : начало
$(function() {

	// ссылка на категорию
	var category = $('.our_technics .categories_technics div span');
	var units = $('.our_technics .units_technics div span');

	// клик по ссылке категории
	$(category).click(function(event) {

		// получаем значение атриубта "data-category" из ссылки по которой кликнули
		var dateCategory = $(this).attr('data-category');

		// назначаем активные пункты
		$(this).parents('.categories_technics').find('span').removeClass('active');
		$(this).addClass('active');
		$('.photo_technics').removeClass('active');
		$(".photo_technics[data-category='"+dateCategory+"']").addClass('active');
		$('.units_technics').removeClass('active');
		$(".units_technics[data-category='"+dateCategory+"']").addClass('active');
		$('.text_technics').removeClass('active');
		$(".text_technics[data-category='"+dateCategory+"']").addClass('active');

		// алгоритм смены категории : начало
		// фото
		$('.our_technics .photo_technics').hide(0, function() {
			$(".our_technics .photo_technics[data-category='"+dateCategory+"']").show(0);
		});
		// модели
		$('.our_technics .units_technics').hide(0, function() {
			$(".our_technics .units_technics[data-category='"+dateCategory+"']").show(0);
		});
		// текст
		$('.our_technics .text_technics').hide(0, function() {
			$(".our_technics .text_technics[data-category='"+dateCategory+"']").show(0);
		});
		// алгоритм смены категории : конец

	});

	// клик по ссылке модели
	$(units).click(function(event) {

		// получаем значение атриубта "data-model" из ссылки по которой кликнули
		var dateModel = $(this).attr('data-model');
		var dateCategoryActive = $('.our_technics .categories_technics div span.active').attr('data-category');

		// назначаем активный пункт
		$(this).parents('.units_technics').find('span').removeClass('active');
		$(this).addClass('active');
		// $(".text_technics[data-category='"+dateCategory+"']").find('p').removeClass('active');
		// $(".text_technics[data-model='"+dateModel+"']").addClass('active');

		// алгоритм смены модели : начало
		// фото
		$(".our_technics .photo_technics[data-category='"+dateCategoryActive+"'] > div").hide(0, function() {
			$(".our_technics .photo_technics.active > div[data-model='"+dateModel+"']").show(0);
		});
		// текст
		$(".our_technics .text_technics[data-category='"+dateCategoryActive+"'] p").hide(0, function() {
			$(".our_technics .text_technics p[data-model='"+dateModel+"']").css('display', 'block');
		});
		// алгоритм смены модели : конец

	});

});
// блок "наша техника". смена изображений и описаний : конец

// всплывающие подсказки у блока "наша техника"
$(function() {

	$('.our_technics .photo_technics > div > .hint div:last-child').hover(function() {
		$(this).prev('div').animate({'opacity': '1'}, 300)
	}, function() {
		$(this).prev('div').animate({'opacity': '0'}, 300)
	});

});