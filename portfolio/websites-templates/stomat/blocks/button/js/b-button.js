(function() {
	$(document).ready(function(){

        $('.b-header').find('.b-button.call').click(function () {
            $('html, body').animate({
                scrollTop: $('.b-make-an-appointment.big').offset().top
            }, 1500);
        });
	});
})();