(function($){

	// detecting text changes : begin
	// http://zurb.com/playground/jquery-text-change-custom-event
	$('#header-page .bottom-line .search form input[type=text]').bind('textchange', function (event) {
		$('#header-page .bottom-line .search .dropdown-list').show();
	});
	// сlick outside block
	$(document).mouseup(function (e) {
	    var container = $('#header-page .bottom-line .search .dropdown-list');
	    if (container.has(e.target).length === 0){
	        container.hide();
	    }
	});
	// detecting text changes : end

	// height main page slider : begin
	function heightMainPageSlider(){

		var windowHeight  = $(window).outerHeight(); // получаем высоту области просмотра браузера

		// если высота области просмотра меньше суммы высот шапки и слайдера
		if(windowHeight < 780){

			$('#banner-page').addClass('minimize');

		}
		else{
			$('#banner-page').removeClass('minimize');
		}

	}
	heightMainPageSlider();
	// height main page slider : end

	// novelty (main page) : begin
	// owl carousel (http://owlgraphic.com/owlcarousel/index.html)
	$('.novelty-carousel').owlCarousel({
		items  : 4,
		loop   : true,
		nav    : true,
		margin : 20
	});
	// novelty (main page) : end

	// logotypes-carousel (main page) : begin
	$('.logotypes-carousel').owlCarousel({
		items  : 5,
		loop   : true,
		nav    : true,
		margin : 45
	});
	// logotypes-carousel (main page) : end

	// one-item : begin
	// slider
	$('.slider-wrapper').viewer();
	$('.one-item-page .fancybox').fancybox({
		padding    : 0,
		nextEffect : 'fade'
	});
	$('.img-wrapper').zoom();
	$('.thumbnails-wrapper').owlCarousel({
		items  : 4,
		loop   : false,
		nav    : true,
		margin : 10
	});
	// one-item : end

	// clining services : begin
	$('.clining-services .fancybox').fancybox({
		padding    : 0,
		nextEffect : 'fade'
	});	
	// clining services : end

})(jQuery);