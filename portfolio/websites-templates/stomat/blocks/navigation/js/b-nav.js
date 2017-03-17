(function() {
	$(document).ready(function(){
		$('.b-header').find('.burger').click(function () {
			$('.b-nav.primary').addClass('active');
			$('.b-nav.overlay').addClass('active');
		});

		$('.b-nav.primary').find('.icon-close').click(function () {
			$('.b-nav.primary').removeClass('active');
			$('.b-nav.overlay').removeClass('active');
		});

		$('.b-nav.overlay').click(function () {
			$('.b-nav.primary').removeClass('active');
			$('.b-nav.overlay').removeClass('active');
		});
	});
})();