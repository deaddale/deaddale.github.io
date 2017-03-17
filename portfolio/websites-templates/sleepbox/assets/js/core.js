(function($){

	// main navigation : begin
    $.fn.mainNav = function() {

	    // variables
	    var link = $('#header-page nav').find('a');

	    $(link).on('click', function(event) {
	    	event.preventDefault();
	    	var blockClass = '.' + $(this).attr('href');
			$('html, body').stop().animate({ scrollTop: $(blockClass).offset().top }, 1000);
	    });
	};
	$.fn.mainNav();
    // main navigation : end

    // motivating block : begin
    $.fn.motivatingBlock = function() {

    	// variables
	    var link = $('.motivating-block').find('a');

	    $(link).on('click', function(event) {
	    	event.preventDefault();
	    	var blockClass = '.' + $(this).attr('href');
			$('html, body').stop().animate({ scrollTop: $(blockClass).offset().top }, 1000);
	    });

    };
    $.fn.motivatingBlock();
    // motivating block : end

    // what is sleepbox : begin
    $.fn.whatIsSleepbox = function() {

	    // variables
	    var whatIsSb      = $('.what-is-sleepbox');
	    var link          = $(whatIsSb).find('.content-block').find('a');
	    var textBlock     = $(whatIsSb).find('.text-block');
	    var oneTextBlock  = $(whatIsSb).find('.text-block').children('div');
	    var maxHeight     = 0;

	    // set height textBlock and his children : beign
	    function getHeight(oneBlock) {
			return Math.max($(oneBlock).height(), $(oneBlock).outerHeight());
		} 

		$(oneTextBlock).each(function(index, el){
			var thisH = getHeight(this);
			if(thisH > maxHeight){maxHeight = thisH;}
		});

		$(oneTextBlock).each(function(){
			$(this).css('height',maxHeight);
		});
	    // set height textBlock and his children : end

	    // click to link : begin
	    $(link).on('click', function(event) {
	    	event.preventDefault();
	    	var blockClass  = '.what-is-sleepbox .' + $(this).attr('href');
	    	var linkClicked = $(this);

	    	// performed tasks on queue
	    	$(link).queue(function () {
	    		$(link).removeClass('active');
	    		$(linkClicked).addClass('active');
				$(this).dequeue();
			});

			$(link).queue(function (next) {
				$(textBlock).children('div').stop().fadeOut(0);
				$(blockClass).stop().fadeIn(700);		
				next();
			});
	    });
	    // click to link : end
	};
	$.fn.whatIsSleepbox();
    // what is sleepbox : end

    // text popup : begin
    $.fn.textPopup = function(options) {

	    // default settings (object literal of configuration),
	    // expandable using the parameters that were passed to
		var settings = $.extend({
			text : 'Текст по умолчанию. Замените его на при вызове плагина с помощью переменной text',
			link : ''
        }, options);

        // define basic variables
        var text      = settings.text;
        var link      = settings.link;
        var textPopup = $('#text-popup');
        var overlay   = $(textPopup).find('.overlay');
        var closeIcon = $(textPopup).find('.close');
        var textBlock = $(textPopup).find('p');

        // set text
        $(textBlock).html(text);

        // show popup : begin
        // if link is true
        if(link){
	        $(link).click(function(event) {
	        	event.preventDefault();
	        	$(textPopup).fadeIn(350);
	        });
        }
        // if link is false
        else{
        	$(textPopup).fadeIn(350);
        }
        // show popup : end

        // hide popup : begin
        // click to overlay
        $(overlay).click(function(event) {
        	event.preventDefault();
        	$(textPopup).fadeOut(250);
        });
        // click to close icon
        $(closeIcon).click(function(event) {
        	event.preventDefault();
        	$(textPopup).fadeOut(250);
        });
        // hide popup : end
	};
    // text popup : end

})(jQuery);

$(document).ready(function() {

	// google map : begin
    function initMap() {
		var myLatlng = new google.maps.LatLng(55.82566289, 37.7838707);
		// var myMarker = new google.maps.LatLng(55.824587, 37.780106);
		var mapOptions = {
		    zoom: 17,
		    center: myLatlng,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    scrollwheel: false,
		    disableDefaultUI: true
		};
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		// var marker = new google.maps.Marker({
		//     position: myMarker,
		//     icon: 'assets/images/footer/marker.png'
		// });

		// To add the marker to the map, call setMap();
		// marker.setMap(map);

	}
	initMap();
    // google map : end

});


