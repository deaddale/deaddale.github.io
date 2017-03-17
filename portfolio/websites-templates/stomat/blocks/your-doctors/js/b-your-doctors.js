(function() {
    $(document).ready(function(){

        var owl = $(".b-your-doctors .owl-carousel");

        // carousel
        owl.owlCarousel({
            nav: false,
            loop: true,
            dots: false,
            smartSpeed: 700,
            margin: 20,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items: 1
                },
                // breakpoint from 480 up
                480 : {
                    items: 2
                },
                // breakpoint from 768 up
                768 : {
                    items: 3
                },
                // breakpoint from 768 up
                960 : {
                    items: 3
                },
                // breakpoint from 768 up
                980 : {
                    items: 4
                }
            },
            onInitialized: callback
        });
        function callback(event) {
            $(".b-your-doctors .owl-carousel .one-doctor > div:last-child").matchHeight();
        }

        // Go to the next item
        $('.b-your-doctors .owl-nav .owl-next').click(function() {
            owl.trigger('next.owl.carousel');
        })
        
        // Go to the previous item
        $('.b-your-doctors .owl-nav .owl-prev').click(function() {
            owl.trigger('prev.owl.carousel');
        })
    });
})();