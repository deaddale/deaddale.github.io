(function() {
    $(document).ready(function(){
        // carousel
        $(".b-reviews.columns .owl-carousel").owlCarousel({
            nav: true,
            loop: true,
            dots: false,
            smartSpeed: 700,
            margin: 35,
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
            }
        });
    });
})();