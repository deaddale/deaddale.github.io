(function() {
	$(document).ready(function(){
		var select = $('.b-select');

        $(select).click(function () {
            $(this).addClass('open');
        });

        $(select).find('span').click(function () {
            $(this).toggleClass('current');
        });
	});
})();