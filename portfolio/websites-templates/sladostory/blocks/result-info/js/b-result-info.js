(function() {
    $(document).ready(function(){

        // scroll to top
        $('.b-result-info').find('.to-top').click(function () {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 1300);
        });
        
    });
})();