// Preloader:begin
$(window).on('load', function () {
    var $preloader = $('#preloader'),
        $spinner   = $preloader.find('img');
        $spinner.fadeOut();
        $preloader.delay(350).fadeOut('slow', function() {
            $('html').css('overflow', 'auto');
        });

});
// Preloader:end

(function($){

    // navigation scroll : begin
    // click to item : begin
    $('#header-page > .nav nav.normal ul li a, .logo').on('click', function(){
        var id = '#' + $(this).attr('data-scroll');
        $('html, body').animate({
            scrollTop: $(id).offset().top - 96
        }, 900);

        return false;
    });

    $('#header-page > .nav nav.mobile ul li a, .logo').on('click', function(){
        var id = '#' + $(this).attr('data-scroll');
        $('html, body').animate({
            scrollTop: $(id).offset().top - 59
        }, 900);

        $('#header-page>.nav nav.mobile ul.open').removeClass('open'); 

        return false;
    }); 
    // click to item : end

    // assignment active menu item : begin
    $(document).scroll(function(){
        var top = $(document).scrollTop();
        var posSecond = $('#about-shop').offset();
        var posSecond = posSecond.top - 98;
        var posThird = $('#assortment').offset();
        var posThird = posThird.top - 98;
        var posFourth = $('#gallery').offset();
        var posFourth = posFourth.top - 98;
        var posFifth = $('#news').offset();
        var posFifth = posFifth.top - 98;
        var posSixth = $('#contacts').offset();
        var posSixth = posSixth.top - 98;

        if (0 <= top && top < posSecond){
            $('#header-page > .nav nav ul li').each(function(index, el) {
               $(this).removeClass('active');
            });
            $('a[data-scroll="home"]').closest('li').addClass('active');
        }
        else if (posSecond <= top && top < posThird){
            $('#header-page > .nav nav ul li').each(function(index, el) {
               $(this).removeClass('active');
            });
            $('a[data-scroll="about-shop"]').closest('li').addClass('active');
        }
        else if (posThird <= top && top < posFourth){
            $('#header-page > .nav nav ul li').each(function(index, el) {
               $(this).removeClass('active');
            });
            $('a[data-scroll="assortment"]').closest('li').addClass('active');
        }
        else if (posFourth <= top && top < posFifth){
            $('#header-page > .nav nav ul li').each(function(index, el) {
               $(this).removeClass('active');
            });
            $('a[data-scroll="gallery"]').closest('li').addClass('active');
        }
        else if (posFifth <= top && top < posSixth){
            $('#header-page > .nav nav ul li').each(function(index, el) {
               $(this).removeClass('active');
            });
            $('a[data-scroll="news"]').closest('li').addClass('active');
        }
        else if (posSixth <= top){
            $('#header-page > .nav nav ul li').each(function(index, el) {
               $(this).removeClass('active');
            });
            $('a[data-scroll="contacts"]').closest('li').addClass('active');
        }

    });
    // assignment active menu item : end
    // navigation scroll : end

    // mobile navigation :  begin
    $(document).click(function (e) {
        var container = $('#header-page > .nav nav.mobile ul');
        var targer = e.target;
        if (container.has(e.target).length === 0){
            $('#header-page > .nav nav.mobile ul').removeClass('open');
        }
    });

    $('#header-page > .nav nav.mobile ul').after().on('click', function(e) {
        $('#header-page > .nav nav.mobile ul').toggleClass('open');
        e.preventDefault();
    });
    // mobile navigation : end

    // hover to main nav item : begin
    $('#header-page > div:last-child nav ul li a').hover(function() {
        
        $(this).closest('li').addClass('hover'); // input zone

    }, function() {

        $(this).closest('li').removeClass('hover') // output zone

    });
    // hover to main nav item : end

    // parallax function : begin
    $.fn.parallax = function(options){

        var $$ = $(this);
        offset = $$.offset();
        var defaults = {
            "start": 0,
            "stop": offset.top + $$.height(),
            "coeff": 0.95
        };
        var opts = $.extend(defaults, options);

        return this.each(function(){
            $(window).bind('scroll', function() {
                windowTop = $(window).scrollTop();
                if((windowTop >= opts.start) && (windowTop <= opts.stop)) {
                    newCoord = windowTop * opts.coeff;
                    $$.css({
                        "background-position": "0 "+ newCoord + "px"
                    });
                }
            });
        });
    };

    // call the plugin
    $('#banner > div:nth-child(2)').parallax({ "coeff":0.5});
    $('#banner > div:nth-child(3)').parallax({ "coeff":-0.5});
    // parallax function : end

    // photos (ABOUT SHOP) : begin
    $.fn.photos = function(){

        var photos = $('#about-shop .photos ul li'); // select all photo
        var widthContainer = $(window).width();
        
        if (widthContainer > 1920){
            $(photos).closest('li').show(0, function() {
                var dif = widthContainer / 7; // 7 - number of photo (etc)
                $(photos).css('width', 14.28571428571429 + '%');
            }); 
        } 

        if (1600 < widthContainer && widthContainer <= 1920){
            $(photos).closest('li').show(0, function() {
                var dif = widthContainer / 6;
                $(photos).css('width', 16.66666666666667 + '%').closest('li:last-child').hide(0);
            });
        }

        if (1024 < widthContainer && widthContainer <= 1600){
            $(photos).closest('li').show(0, function() {
                var dif = widthContainer / 5;
                $(photos).css('width', 20 + '%').closest('li:last-child').prev('li').andSelf().hide(0);
            });
        }

        if (768 < widthContainer && widthContainer <= 1024){
            $(photos).closest('li').show(0, function() {
                var dif = widthContainer / 4;
                $(photos).css('width', 25 + '%').closest('li:last-child').prev('li').andSelf().prev('li').andSelf().hide(0);
            });
        }

        if (320 < widthContainer && widthContainer <= 768){
            $(photos).closest('li').show(0, function() {
                var dif = widthContainer / 3;
                $(photos).css('width', 33.33333333333333 + '%').closest('li:last-child').prev('li').andSelf().prev('li').andSelf().prev('li').andSelf().hide(0);
            });
        }

        if (320 >= widthContainer){
            $(photos).closest('li').show(0, function() {
                var dif = widthContainer / 2;
                $(photos).css('width', 50 + '%').closest('li:last-child').prev('li').andSelf().prev('li').andSelf().prev('li').andSelf().prev('li').andSelf().hide(0);
            });
        }

    };
    $('body').photos();
    $(window).resize(function() {
        $('body').photos();
    });
    // photos (ABOUT SHOP) : end

    // map initialization : begin
    function initialize() {
        var latlng = new google.maps.LatLng(56.866808,35.911638);
        var settings = {
            zoom: 16,
            scrollwheel: false,
            center: latlng,
            mapTypeControl: false,
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
            navigationControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), 
        settings);

        var companyLogo = new google.maps.MarkerImage('images/content/contacts/marker.png',
            new google.maps.Size(96,106),
            new google.maps.Point(0,0),
            new google.maps.Point(60,70)
        );
        var companyPos = new google.maps.LatLng(56.866808,35.911638);
        var companyMarker = new google.maps.Marker({
            position: companyPos,
            map: map,
            icon: companyLogo,
            // shadow: companyShadow,
            title:"ТЦ Грани. г. Тверь, ул. Горького, 6",
        });
    }
    initialize()
    // map initialization : end

    // Validation form : begin
    function validate(formData, jqForm, options) { 

        var emailValue = $('.form-check-1 input[name=email]').fieldValue(); 

        if (!emailValue[0]) { 
            var email = $('.form-check-1 input[name=email]').val();
            if (email == 0){
                $('.form-check-1 input[name=email]').addClass('error');
            }
            return false; 
        }

        //Успешное окончание обработки
        $('.form-check-1 input[name=email]').removeClass('error');
        $('.form-check-1 .report').fadeIn(150);
    }

    $('.form-check-1').ajaxForm({
        dataType: 'json',
        beforeSubmit:  validate,
        //Успешное окончание обработки
        success: function() {}    
    });
    // Validation form : end

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
