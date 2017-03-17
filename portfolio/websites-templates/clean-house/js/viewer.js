/*
	jQuery viewer - 2015
*/
(function($) { 

$.fn.viewer = function() {
	var target = $('.img-wrapper');
	var thumbs = $('.thumbnails-wrapper a');
	var image = $('.img-wrapper img');
	var imgWidth;
	var imgSrc = $(image).attr('src');

	replaceImg();
	imgLoad();

	// строим список больших изображений для fancybox
	$(thumbs).each(function(index, el) {

		var curHref = $(this).attr('href');
		var fancyVisible = $(target).find('a.fancybox').attr('href');

		$(this).closest('.slider-wrapper').find('.img-wrapper').append('<img src="' + curHref + '" alt="" class="fancybox new" rel="one-item-gallery">');
		$(this).closest('.slider-wrapper').find('.img-wrapper').find('img[src="' + fancyVisible + '"].new').remove();

	});

	function replaceImg(){

		$(thumbs).on('click', function() {

			// удаляем все активные классы
			$(thumbs).removeClass('active');

			// добавляем к текущей ссылке активный класс
			$(this).addClass('active');

			// прячем исходное большое изображение
			$(image).hide();

			// загружаем новое большое изображение
			imgLoad();

			// меняем href ссылочки
			imgSrc = $(this).attr('href');
			$(image).attr('src', imgSrc);
			
			return false;

		});


	};

	function imgLoad() {

    	var src = $(image).attr('src');
		$(image).attr('src', '');
		$(image).attr('src', src);

		$(image).on('load', function() {
			imgWidth = $(this).width();
	        if(imgWidth > 401) {
	        	$(this).addClass('resized'); 
	        };
	        $(image).show();
	    })
	    	    
	}
}
})(jQuery);

