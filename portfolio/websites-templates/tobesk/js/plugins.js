(function($){

	// BXSLIDER : begin
	var $slider = $('#bxslider');

	var slider = $slider.bxSlider({
    	mode: 'vertical',
  		slideMargin: 0,
  		adaptiveHeight: true,
  		controls: false,
  		infiniteLoop: false,

  		// active slide animations : begin
  		onSliderLoad: function() {
			$("#bxslider > div:not([class='bx-clone'])").eq(0).addClass('active-slide');
		},
		onSlideBefore: function() {
			$("#bxslider > div").removeClass('active-slide');
			current = slider.getCurrentSlide();
			$("#bxslider > div:not([class='bx-clone'])").eq(current).addClass('active-slide');

			// if second slide is active : begin
			if ($('.active-slide').hasClass('second-slide')){
				$('#content-page .second-slide .first').removeClass('null-pos');
				setInterval(function() {
                	$('#content-page .second-slide .second').removeClass('null-pos');
				}, 1000);
				setInterval(function() {
                	$('#content-page .second-slide h1').animate({opacity: 1}, 500);
				}, 1800);
				setInterval(function() {
					$('#content-page .second-slide p,#content-page .second-slide a').animate({opacity: 1}, 500);
				}, 2150);
				setInterval(function() {
					$('#content-page .second-slide .next-slide').animate({opacity: 1}, 300);
				}, 2500);
			}
			// if second slide is active : end

			// if third slide is active : begin
			if ($('.active-slide').hasClass('third-slide')){
				$('#content-page .third-slide .first').removeClass('null-pos');
				setInterval(function() {
                	$('#content-page .third-slide .second').removeClass('null-pos');
				}, 1000);
				setInterval(function() {
                	$('#content-page .third-slide h1').animate({opacity: 1}, 500);
				}, 1800);
				setInterval(function() {
					$('#content-page .third-slide p,#content-page .third-slide a').animate({opacity: 1}, 500);
				}, 2150);
				setInterval(function() {
					$('#content-page .third-slide .next-slide').animate({opacity: 1}, 300);
				}, 2500);
			}
			// if third slide is active : end

			// if fourth fourth is active : begin
			if ($('.active-slide').hasClass('fourth-slide')){
				// animations first slide : begin
                $('#content-page .fourth-slide .first').removeClass('null-pos');

                setInterval(function() {
                	$('#content-page .fourth-slide .glow').removeClass('null-pos').next('div').removeClass('null-pos');
				}, 500);

				setInterval(function() {
                	$('#content-page .fourth-slide .third, #content-page .first-slide .fourth').show(500);
				}, 1000);

				setInterval(function() {
                	$('#content-page .fourth-slide h1').animate({opacity: 1}, 500);
				}, 1450);

				setInterval(function() {
					$('#content-page .fourth-slide article, .fourth-slide a.button').animate({opacity: 1}, 500);
				}, 1800);

				setInterval(function() {
					$('#content-page .fourth-slide .next-slide').animate({opacity: 1}, 250);
				}, 2100);
			}
			// if fourth slide is active : end

			// if fifth slide is active : begin
			if ($('.active-slide').hasClass('fifth-slide')){
				$('#content-page .fifth-slide .first').removeClass('null-pos');
				setInterval(function() {
                	$('#content-page .fifth-slide .second').removeClass('null-pos');
				}, 1000);
				setInterval(function() {
                	$('#content-page .fifth-slide h1').animate({opacity: 1}, 500);
				}, 1800);
				setInterval(function() {
					$('#content-page .fifth-slide p,#content-page .fifth-slide a.button').animate({opacity: 1}, 500);
				}, 2150);
			}
			// if fifth slide is active : end

		}
  		// active slide animations : end

	});

	// set keyboard listener
	// $(document).keydown(function(e){
	// 	if (e.keyCode == 40) // Right arrow 
	// 	{
	// 		slider.goToNextSlide();
	// 		return false;
	// 	}
	// 	else if (e.keyCode == 38) // left arrow
	// 	{
	// 		slider.goToPrevSlide();
	// 		return false;
	// 	}
	// });

	// scroll : begin
	var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
	
	if(isMac){

		isMoving = false;
	    $slider.on('mousewheel', function(e) {

	        if (e.deltaY > 1) {
	            if (!isMoving) {
	                isMoving = true; 
	                slider.goToPrevSlide();
	            }

	        }

	        else if (e.deltaY < -1) {
	            if (!isMoving) {
	                isMoving = true;
	                slider.goToNextSlide();
	            }
	        }

	        else { isMoving = false; }

	        event.stopPropagation();
			event.preventDefault();

	    });
	}
	else{
		$slider.on("mousewheel", function(event, delta, deltaX, deltaY) {

            //console.log(event, delta, deltaX, deltaY);

            if (delta > 0) {
                slider.goToPrevSlide();
            }
            if (deltaY < 0){
                slider.goToNextSlide();
            }
            event.stopPropagation();
            event.preventDefault();

        });
	}
	// scroll : end

	// click to icon (slide down)
	$('#content-page .next-slide').on('click', function(event) {

		slider.goToNextSlide();

		event.stopPropagation();
		event.preventDefault();

	});
	// BXSLIDER : end

	// FANCYBOX : begin
	$('.fancybox').fancybox({
		padding: 0
	});
	// FANCYBOX : end

})(jQuery);