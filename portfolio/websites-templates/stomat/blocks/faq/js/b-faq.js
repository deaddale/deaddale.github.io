// Global JS file
(function() {
	$(document).ready(function(){
		$('.b-faq').find('.title').click(function () {
           $(this).next('.content').slideToggle();
        });
	});
})();