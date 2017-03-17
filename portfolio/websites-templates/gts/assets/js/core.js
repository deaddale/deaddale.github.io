(function($){

    // navigation in catalog (aside) : begin
    $.fn.navCatalogAside = function() {

	    // variables
	    var accordionHeadFirstLvl = $('#content-page .nav-catalog .list-of-links > ul > li > a.local');
        var accordionBodyFirstLvl = $('#content-page .nav-catalog .list-of-links > ul > li > .sub-menu-second-lvl');

        var accordionHeadSecondLvl = $('#content-page .nav-catalog .list-of-links > ul > li > ul > li a.local');
        var accordionBodySecondLvl = $('#content-page .nav-catalog .list-of-links > ul > li > ul > li > .sub-menu-third-lvl');

        // open/close second lvl category
        accordionHeadFirstLvl.on('click', function(event) {
 
            event.preventDefault();

            if ($(this).hasClass('active')) {
                $(this).next().slideUp('normal');
                $(this).removeClass('active');
                accordionBodyFirstLvl.find(accordionHeadSecondLvl).removeClass('active').next().slideUp('normal');
            }
            else if ($(this).attr('class') != 'active') {
                accordionBodyFirstLvl.slideUp('normal');
                $(this).next().stop(true,true).slideToggle('normal');
                accordionHeadFirstLvl.removeClass('active');
                $(this).addClass('active');
                accordionBodyFirstLvl.find(accordionHeadSecondLvl).removeClass('active').next().slideUp('normal');
            }
        });

        // open/close third lvl category
        accordionHeadSecondLvl.on('click', function(event) {
 
            event.preventDefault();

            if ($(this).hasClass('active')) {
                $(this).next().slideUp('normal');
                $(this).removeClass('active');
            }
            else if ($(this).attr('class') != 'active') {
                accordionBodySecondLvl.slideUp('normal');
                $(this).next().stop(true,true).slideToggle('normal');
                accordionHeadSecondLvl.removeClass('active');
                $(this).addClass('active');
            }
        });

        // reload page with class "active" for links
        $(window).load(function() {
            $('.nav-catalog')
                .find('a.active')
                .closest('ul')
                .css('display', 'block')
                .prev('a')
                .addClass('active')
                .closest('ul')
                .css('display', 'block')
                .prev('a')
                .addClass('active');
        });
	};
	$.fn.navCatalogAside();
    // navigation in catalog (aside) : end

    // presentation catalog animation : begin
    $.fn.presentationCatalogAnimation = function(){

        // variables
        var mainWrapper  = $('.present-catalog');
        var innerWrapper = $(mainWrapper).find('.sections');
        var oneBlock     = $(innerWrapper).find('> div');
        var allMainMenu  = $(innerWrapper).find('> div > .menu');

        // click on one block : begin
        $(oneBlock).click(function(event) {
            if(!$(this).is('.active')){

                event.preventDefault();

                // inner variables
                var otherEl          = $(oneBlock).not(this);
                var activeBlock      = $(this);
                var defaultPosEl     = $(this).position();
                var menu             = $(this).find('.menu');
                var subMenuLink      = $(menu).find('a.local');
                var allSecondLvlMenu = $(menu).find('> ul > li > ul');
                var backLink         = $(menu).find('i');
                var closeIcon        = $(menu).find('.close');

                // hide all blocks except active
                $(otherEl).addClass('invis');

                // this add class 'active'
                $(this).addClass('active')
                
                // animate position active block (upper left corner)
                $(this).queue(function () {
                    $(this).delay(300).animate({
                        left: -defaultPosEl.left,
                        top: -defaultPosEl.top},
                        500);
                    $(this).dequeue();
                });

                // show additional menu
                $(this).queue(function () {
                    $(menu).slideDown(370);
                    $(this).dequeue();
                });

                // show second lvl additional menu : begin
                $(subMenuLink).unbind().click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    var widthFirstLvlLink       = $(this).outerWidth();
                    var leftOffsetSecondLvlLink = +(widthFirstLvlLink) + 30;

                    // position addition menu
                    $(this).queue(function () {
                        $(this).next('ul').css({
                            left: leftOffsetSecondLvlLink
                        });
                        $(this).dequeue();
                    });

                    // show/hide additional menu
                    $(this).queue(function (next) {
                        if ($(this).hasClass('active')) {
                            $(this).next().slideUp(100);
                            $(this).removeClass('active');
                        }
                        else if ($(this).attr('class') != 'active') {
                            allSecondLvlMenu.slideUp(100);
                            $(this).next().stop(true,true).slideToggle('normal');
                            subMenuLink.removeClass('active');
                            $(this).addClass('active');
                        }
                        next();
                    });
                });
                // show second lvl additional menu : end

                // back link : begin
                $(backLink).unbind().click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $(this).queue(function () {
                        allSecondLvlMenu.fadeOut(100);
                        allMainMenu.fadeOut(300);
                        $(this).closest('.sections').find('div').addClass('invis');
                        $(this).dequeue();
                    });

                    $(this).queue(function (prev) {
                        $(oneBlock).animate({
                            left: 0,
                            top: 0},
                            500);
                        prev();
                    });

                    $(this).queue(function (next) {
                        function showAllBlock() {
                            $(oneBlock).removeClass('invis active');
                        }
                        setTimeout(showAllBlock, 200);
                        next();
                    });
                });
                // back link : end

                // close icon click : begin
                $(closeIcon).unbind().click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $(this).closest('ul').slideUp('fast');
                });
                // close icon click : end
            }
        });
        // click on one block : end
    };
    $.fn.presentationCatalogAnimation();
    // presentation catalog animation : end

    // registration page : begin
    $.fn.registrationPage = function(){

        var regForm            = $('.registration-form');
        var select             = $(regForm).find('select');
        var contactPersonBtn   = $(regForm).find('.one-line .add-contact-person');

        // change select value : begin
        $(select).change(function(){
            if($(this).val() == 1){
                $(regForm).find('.legal-entity').fadeIn(250);
                $(regForm).find('.individual').fadeOut(100);
            }
            else if($(this).val() == 2){
                $(regForm).find('.individual').fadeIn(250);
                $(regForm).find('.legal-entity').fadeOut(100);
            }
            else{
                $(regForm).find('.legal-entity').fadeOut(100);
                $(regForm).find('.individual').fadeOut(100);
            }
        });
        // change select value : end

        // click "add contact person"
        $(contactPersonBtn).click(function(event) {
            event.preventDefault();

            var attrNumber = ++($('.registration-form .legal-entity').find('.one-line.contact-person').length);
            var contactPersonBlock = '<div class="one-line contact-person"><div class="label">Контактное лицо</div><input type="text" name="users[' + attrNumber + '][name]" placeholder="Введите фамилию и имя" required><input type="text" name="users[' + attrNumber + '][phone]" placeholder="Введите номер телефона" required></div>';   

            $(contactPersonBlock).insertBefore($(this).closest('.one-line')).find('.label').append('<span class="remove-contact-person">(Удалить)</span>');

            var length = $(contactPersonBlock).find('.remove-contact-person').length;
            if (length > 1){
                $(this).closest('.one-line').prev('.one-line').find('.remove-contact-person').not(':eq(1)').remove();
            }

            // console.log(length)
        });

        // click "удалить"
        $('body').on('click', 'span.remove-contact-person', function(event) {
            $(this).closest('.one-line').remove();
        });
    };
    // registration page : end
    $.fn.registrationPage();

})(jQuery);







