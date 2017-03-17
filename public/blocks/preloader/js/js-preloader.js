// preloader : begin
$(window).on('load', function () {
    var body = $('body');
    var preloader = $('.b-preloader');
    var fpNav = $('#fp-nav');

    function preloaderAnim() {
        $(preloader).fadeOut('slow');
    }
    setTimeout(preloaderAnim(), 500);
});
// preloader : end