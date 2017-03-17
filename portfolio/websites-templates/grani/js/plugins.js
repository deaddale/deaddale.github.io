$(window).load(function(){

	// Masonry (Cascading grid layout library) : begin
	var container = document.querySelector('#gallery .inner-wrapper');
	var msnry = new Masonry( container, {
		// options
		singleMode: false,
		isResizable: true,
		itemSelector: '#gallery .item',
		'gutter': 5
	});
    // Masonry (Cascading grid layout library) : end

    // show gallery after all load
    $('#gallery').css('opacity', 1);
    
});

$(document).ready(function() {
	
	// logos slider (ASSORTMENT) : begin
	$('#logo-slider').owlCarousel({
		items: 4,
		loop:true,
		nav:true,
		responsive:{
		    0:{
		        items:1
		    },
		    768:{
		        items:2
		    },
		    979:{
		        items:4
		    },
		    1199:{
		        items:4
		    }
		}
	});
	// logos slider (ASSORTMENT) : end

	// fixed Floating Elements
	$('#header-page > .nav').ddFixed();
	
	// fancybox
    $('.fancybox').fancybox({
    	padding: 30,
    	scrolling: true,
    	'transitionIn' : 'none',
        'transitionOut' : 'none',
        prevEffect		: 'none',
		nextEffect		: 'none'
    	// arrows: true
    });
	$('#news-slider .one-item a').fancybox({
        padding: 30,
    	scrolling: true,
    	'transitionIn' : 'none',
        'transitionOut' : 'none',
        prevEffect		: 'none',
		nextEffect		: 'none'
	});

    // slider (BUILDING PLAN) : begin
	$('#building-plan-slider').owlCarousel({
		items: 1,
		loop:true,
		nav:true,
		responsive:{
		    0:{
		        items:1
		    },
		    450:{
		        items:1
		    },
		    600:{
		        items:1
		    },
		    700:{
		        items:1
		    },
		    1000:{
		        items:1
		    },
		    1200:{
		        items:1
		    },
		    1400:{
		        items:1
		    },
		    1600:{
		        items:1
		    }
		}
	});
	// slider (BUILDING PLAN) : end

	// slider (NEWS) : begin
	$('#news-slider').owlCarousel({
		items: 3,
		loop:true,
		nav:true,
		responsive:{
		    0:{
		        items:1
		    },
		    450:{
		        items:1
		    },
		    600:{
		        items:2
		    },
		    700:{
		        items:3
		    },
		    1000:{
		        items:3
		    },
		    1200:{
		        items:3
		    },
		    1400:{
		        items:3
		    },
		    1600:{
		        items:3
		    }
		}
	});
	// slider (NEWS) : end

});