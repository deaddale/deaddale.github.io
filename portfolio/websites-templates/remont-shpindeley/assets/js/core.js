(function($){

	// переключение скрытия/показа главного меню в мобильной версии : начало
	$.fn.toggleShowNav = function(options) {

		// определяем переменные
        var mainNav = $('#main-nav');
        var windowWidth = $(window).outerWidth();

       	// добавляем класс 'mobile' при ширине окна < 956 : начало
		if (windowWidth < 956){
			$(mainNav).addClass('mobile');
		}
		else{
			$(mainNav).removeClass('mobile');
		}
       	// добавляем класс 'mobile' при ширине окна < 956 : конец

       	// добавляем класс 'mobile' при изменении ширины окна : начало
		$(window).resize(function(event) {

			var windowWidth = $(window).outerWidth();

			if (windowWidth < 956){
				$(mainNav).addClass('mobile');
			}
			else{
				$(mainNav).removeClass('mobile');
			}
		});
       	// добавляем класс 'mobile' при изменении ширины окна : конец

       	// клик на главном меню (скрытие/раскрытие) : начало        
       	$(mainNav).on('click', function(event) {
       		
       		if ($(mainNav).hasClass('mobile')){
       			$(mainNav).toggleClass('active');
       		}
       	});
       	// клик на главном меню (скрытие/раскрытие) : конец        
	};
	$.fn.toggleShowNav();
	// переключение скрытия/показа главного меню в мобильной версии : конец

	// появление попапа с формой обратной связи : начало
	$.fn.showPopUp = function(options) {

        var btn = $('.show-pp-feedback-form');
        var popUp = $('.popup-feedback-form');
        var overlay = $('.popup-feedback-form').find('.overlay');
        var closeIcon = $('.popup-feedback-form').find('.close');

        $(btn).click(function(event) {

        	var scrollPos = $(window).scrollTop();
        	var topPos = scrollPos+50;
        	
        	$(popUp).find('form').css('top', topPos + 'px').closest(popUp).show();
        });

        $(overlay).click(function(event) {
        	$(popUp).hide();
        });

        $(closeIcon).click(function(event) {
        	$(popUp).hide();
        });
	}
	$.fn.showPopUp();
	// появление попапа с формой обратной связи : конец

})(jQuery);





















