// Preloader:begin
//<![CDATA[
    $(window).load(function() { // makes sure the whole site is loaded
        $("#loader-wrapper")
            // .delay(10)
            .fadeOut(800, function() {
                // $('html').css('overflow', 'auto');

                // animations first slide : begin
                $('#content-page .first-slide .first').removeClass('null-pos');

                setInterval(function() {
                	$('#content-page .first-slide .glow').removeClass('null-pos').next('div').removeClass('null-pos');
				}, 500);

				setInterval(function() {
                	$('#content-page .first-slide .third, #content-page .first-slide .fourth').show(500);
				}, 1000);

				setInterval(function() {
                	$('#content-page .first-slide h1').animate({opacity: 1}, 500);
				}, 1450);

				setInterval(function() {
					$('#content-page .first-slide p,#content-page .first-slide i,#content-page .first-slide a').animate({opacity: 1}, 500);
				}, 1800);

				setInterval(function() {
					$('#content-page .first-slide .next-slide').animate({opacity: 1}, 250);
				}, 2100);

				setInterval(function() {
					$('.bx-wrapper .bx-pager').animate({'right': '5%'}, 300);
				}, 2500);
                // animations first slide : end

            });
    });
//]]>
// Preloader:end

(function($){
// monitor the height of the browser window : begin
var windowHeight = $(window).outerHeight();
if (785 > windowHeight){
	$('body').addClass('minimize');
}
else{
	$('body').removeClass('minimize');
}
// monitor the height of the browser window : end

// text to center (all slide) : begin
$.fn.posText = function(element) {

	var element = $(this);
	var heightWindow = $(window).height();
	var heightText = $(element).find('.text-wrapper').height();
	var dif = (heightWindow - heightText)/2;
	$(element).find('.text-wrapper').css('top', dif + 'px');
	$(element).css('height', heightWindow + 'px');

};

$('#content-page .first-slide').posText();
$('#content-page .second-slide').posText();
$('#content-page .third-slide').posText();
$('#content-page .fourth-slide').posText();
$('#content-page .fifth-slide').posText();
// text to center (all slide) : end

// sign up / sign in : begin
$('#modal-window-signup-login').find('.enter').click(function(event) {

	$(this).removeClass('passive');
	$('#modal-window-signup-login').find('.reg').addClass('passive');

	$('#modal-window-signup-login').find('form.sign-up').hide(0);
	$('#modal-window-signup-login').find('form.sign-in').show(0);
	$('#modal-window-signup-login').find('form.forgot-pass').hide(0);

	return false;
});

$('#modal-window-signup-login').find('.reg').click(function(event) {

	$(this).removeClass('passive');
	$('#modal-window-signup-login').find('.enter').addClass('passive');

	$('#modal-window-signup-login').find('form.sign-up').show(0);
	$('#modal-window-signup-login').find('form.sign-in').hide(0);
	$('#modal-window-signup-login').find('form.forgot-pass').hide(0);

	return false;
});
// sign up / sign in : end

// placeholder : begin
$('input,textarea').focus(function(){
   $(this).data('placeholder',$(this).attr('placeholder'))
   $(this).attr('placeholder','');
});
$('input,textarea').blur(function(){
   $(this).attr('placeholder',$(this).data('placeholder'));
});
// placeholder : end
})(jQuery);
