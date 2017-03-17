(function($) {

	// click mute button : begin
	function muteVolume() {

		var muteButton = $('.mute-volume');

		$(muteButton).on('click', function(event) {
			
			event.preventDefault();

			// если кнопка имеет активный класс
			if ($(muteButton).hasClass('active')){
				$(this).removeClass('active');
				$('.volume-control').removeClass('mute');
			}

			// и если нет активного класса
			else{
				$(this).addClass('active');
				$('.volume-control').addClass('mute');
			}

		});

	}
	muteVolume();
	// click mute button : end

	// click info button : begin
	function informationAboutTrack() {

		var infoButton = $('.info');

		$(infoButton).on('click', function(event) {
			
			event.preventDefault();

			// если кнопка имеет активный класс
			if ($(infoButton).hasClass('active')){
				$(this).removeClass('active');
				hideDescrText(); // показываем картинку/заголовки и скрываем текст
			}

			// и если нет активного класса
			else{
				$(this).addClass('active');
				showDescrText(); // скрываем картинку/заголовки и показываем текст
			}

		});

	}
	informationAboutTrack();
	// click info button : end

	// volume lvl : begin
	function volumeLvl() {

		var volumeControl = $('.volume-control');

		// чтобы кружок таскался
		$(volumeControl).draggable({
			axis: 'x',
			containment: '.line',
			start: function() {
				$(volumeControl).removeClass('mute'); // убираем .mute у блока громкости
				$('.mute-volume').removeClass('active'); // выключаем иконку громкости
			}
		});

		// если юзверь жмакнет на полоску : начало
		$('.volume-lvl').click(function(e){

		    var xClick = e.pageX - $(this).offset().left; // куда ткнул юзверь
		    var newPosition = xClick - 11; // чтобы кружок центрировался
		    var lineWidth = $('.line').outerWidth(); // длина серой полоски
		    var indent = lineWidth - 23; // отступ (23 - ширина белого кружка)

		    // если юзверь ткнул на полоске дальше 277
		    if (xClick >= indent){
		    	$(volumeControl).css('left', indent + 'px');
		    }

		    // если юзверь ткнул на полоске до 23
		    if (xClick <= 23){
		    	$(volumeControl).css('left', 0 + 'px');
		    }

		    // если юзверь ткнул на полоске между 23 и 277
		    if (23 < xClick && xClick < indent){
		    	$(volumeControl).css('left', newPosition + 'px');
		    }

		    $(volumeControl).removeClass('mute'); // убираем .mute у блока громкости
			$('.mute-volume').removeClass('active'); // выключаем иконку громкости

		});
		// если юзверь жмакнет на полоску : конец

	}
	volumeLvl();
	// volume lvl : end

	var container = $('.cover-descr'); // контейнер для всех элементов
	var img = $(container).find('img'); // обложка
	var title = $(container).find('.title') // заголовок/заголовки
	var text = $(container).find('.descr'); // текст-описание (изначально скрыт)

	// show descr text : begin
	function showDescrText(){

		// скрываем изображение и заголовки
		$(img).hide();
		// $(title).hide();

		// захуяриваем кастомный скролл и показываем текст
		$(text).show().customScrollbar();

	}
	// show descr text : end

	// hide descr text : begin
	function hideDescrText(){

		// скрываем изображение и заголовки
		$(img).show();
		// $(title).show();

		// скрываем текст
		$(text).hide();

	}
	// hide descr text : end

	// play : begin
	function play(){

		var btnBegin = $('.btn-begin');

		// main : begin
		$(btnBegin).on('click', function(event) {
			
			event.preventDefault();

			// if 'play'
			if($(this).hasClass('play')){

				$(btnBegin).not(this).each(function() {

					$(this).removeClass('pause').addClass('play');

				});

				$(this).addClass('pause');

			}

			// if 'pause'
			else if($(this).hasClass('pause')){

				$(btnBegin).not(this).each(function() {

					$(this).removeClass('pause').addClass('play');

				});

				$(this).addClass('play');

			}

		});

	}
	play();
	// play : end

	var headerPage = $('#header-page');
	var contentPage = $('#content-page');
	var newsLink = $(headerPage).find('.news');
	var podcastLink = $(headerPage).find('.podcast');
	var slide = $(contentPage).find('.slide');
	var slideActive = $(contentPage).find('.slide.active');
	var newsPage = $('.news-page');
	var mainPage = $('.main-page');
	var podcastPage = $('.podcast-page');

	// анимация перехода между страницами : начало
	function animationSlide(){

		$(newsLink).on('click', function(event) {
			
			event.preventDefault();

			var dataInfo = $(this).attr('data-info');
			var slideActive = $(contentPage).find('.slide.active');

			// активный пункт для ссылки
			$(newsLink).each(function(index, el) {

				$(this).animate({
				opacity: 1,
				display: 'block'},
				200, function() {
				/* stuff to do after animation is complete */
				// $(this).removeClass('active');

			});

			});
			$(this).addClass('active');
			$(podcastLink).removeClass('active');

			// плавно скрываем активный слайд
			$(slideActive).removeClass('active');
			$(newsPage).addClass('active');

			$('.back-to-main-page').css('display', 'inline-block');

		});

		$(podcastLink).on('click', function(event) {
			
			event.preventDefault();

			var dataInfo = $(this).attr('data-info');
			var slideActive = $(contentPage).find('.slide.active');

			// активный пункт для ссылки
			$(newsLink).each(function(index, el) {

				$(this).animate({
				opacity: 1,
				display: 'block'},
				200, function() {
				/* stuff to do after animation is complete */
				// $(this).removeClass('active');
			});

			});
			$(this).addClass('active');
			$(newsLink).removeClass('active');

			// плавно скрываем активный слайд
			$(slideActive).removeClass('active');
			$(podcastPage).addClass('active');

			$('.back-to-main-page').css('display', 'inline-block');

		});

	}
	animationSlide();
	// анимация перехода между страницами : конец

	// новости : начало
	function news(){

		$('#content-page .news-page .one-news a').on('click', function(event) {

			event.preventDefault();

			var currentOneNews = $(this).closest('.one-news');

			$('#content-page .news-page .one-news').each(function(index, el) {

				$(this).removeClass('active').find('.descr-page').find('p + p, p + img, p + img + p').hide();

			});

			$(currentOneNews).addClass('active').find('.descr-page').find('p + p, p + img, p + img + p').show();
			
		});

	}
	news();
	// новости : конец

	// вернуться на главную : начало
    function backToMainPage(){

    	$('.back-to-main-page').on('click', function(event) {

    		var slideActive = $(contentPage).find('.slide.active');
    		
    		event.preventDefault();

    		// плавно скрываем активный слайд
			$(slideActive).removeClass('active');

			$('.main-page').addClass('active');

			$(this).css('display', 'none');

    	});

    }
    backToMainPage();
	// вернуться на главную : конец
	// end

})(jQuery);



