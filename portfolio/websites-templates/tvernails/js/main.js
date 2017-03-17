$(document).ready(function() {

	function abc(){
		a = $(window).outerWidth();
		console.log(a);
	}
	abc();

	$(window).resize(function(event) {

		abc();
	
	});

	// main nav : begin
	function mainNav(){
		$('#header-page nav').on('click', function(event) {

			var windowWidth = $(window).outerWidth();
			if (windowWidth < 549){
				$(this).toggleClass('active').find('ul').toggle();
			}

		});
	}
	mainNav();
	// main nav : end

	// registration/login : begin
	function regLogin(){
		var regLoginForm = $('#reg-login-form');
		var forms = $(regLoginForm).find('.forms');
		var regForm = $(regLoginForm).find('.reg');
		var loginForm = $(regLoginForm).find('.login');
		var recoveryForm = $(regLoginForm).find('.recovery');
		var linkLogin = $('#header-page .top-block').find('.login-link');
		var linkReg = $('#header-page .top-block').find('.reg-link');
		var linkRecovery = $(loginForm).find('.forgot-pass-link');
		var linkReg2 = $(loginForm).find('.reg-link');
		var closeButton = $(regLoginForm).find('.close-btn');
		var overlay = $(regLoginForm).find('.overlay');

		// close : begin
		function closeRegLoginForm(){
			$(regForm).animate({
				top: '-100%'},
				900, function() {
				$(regForm).hide();
			});

			$(loginForm).animate({
				top: '-100%'},
				900, function() {
				$(loginForm).hide();
			});

			$(recoveryForm).animate({
				top: '-100%'},
				900, function() {
				$(recoveryForm).hide();
			});
			
			function hide() {
			  $(regLoginForm).hide();
			}
			setTimeout(hide, 800);
		}
		$(closeButton).on('click', function(event) {
			closeRegLoginForm();
		});
		$(overlay).on('click', function(event) {
			closeRegLoginForm(); 
		});
		// close : end

		// registration : begin
		$(linkReg).on('click', function(event) {
			
			event.preventDefault();
			
			$(regLoginForm).show();

			function show() {
				$(regForm).show().animate({top: '0'}, 900);
			}
			setTimeout(show, 200);

		});
		$(linkReg2).on('click', function(event) {
			
			event.preventDefault();

			$(loginForm).animate({
				top: '-100%'},
				900, function() {
				$(loginForm).hide();
			});

			function show() {
				$(regForm).show().animate({top: '0'}, 900);
			}
			setTimeout(show, 900);

		});
		// registration : end

		// login : begin
		$(linkLogin).on('click', function(event) {
			
			event.preventDefault();
			
			$(regLoginForm).show();

			function show() {
				$(loginForm).show().animate({top: '0'}, 900);
			}
			setTimeout(show, 200);

		});
		// login : end

		// recovery : begin
		$(linkRecovery).on('click', function(event) {
			
			event.preventDefault();

			$(loginForm).animate({
				top: '-100%'},
				900, function() {
				$(loginForm).hide();
			});

			function show() {
				$(recoveryForm).show().animate({top: '0'}, 900);
			}
			setTimeout(show, 900);

		});
		// recovery : end

		// width form : begin
		function widthRegLogin(){

			var windowWidth = $(window).outerWidth();

			if (windowWidth < 380){
				$(forms).css({
					width: windowWidth + 'px',
					left: 0,
					margin: 0
				});
			}

			if (windowWidth >= 380){
				$(forms).css({
					width: windowWidth + 'px',
					left: '50%',
					marginLeft: '-190px',
					width: 380
				});
			}

		}
		widthRegLogin();

		$(window).resize(function(event) {

			widthRegLogin();

		});
		// width form : end

	}
	regLogin();
	// registration/login : end

});
