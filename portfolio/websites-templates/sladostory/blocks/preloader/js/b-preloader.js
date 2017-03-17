(function () {
    $(window).on('load', function () {
        var $preloader   = $('.b-preloader'),
            $logo        = $preloader.find('img'),
            $htmlTag     = $('html');

        $logo.fadeTo(300, 0, function() {
            $preloader.fadeTo(300, 0, function() {
                $htmlTag.delay(100).css('overflow','visible');
                $logo.hide();
                $preloader.hide();
            });
        });
    });
})();