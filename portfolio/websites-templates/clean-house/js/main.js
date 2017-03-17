// Preloader:begin
$(window).load(function() { // makes sure the whole site is loaded
    $(".preloader")
        .fadeOut(1200, function() {

            // animations first slide : begin
            $('.loader-wrapper').fadeOut(1300);

        });
});
// Preloader:end

$(document).ready(function() {

	// placeholder : begin
	$('input,textarea').focus(function(){
	   $(this).data('placeholder',$(this).attr('placeholder'))
	   $(this).attr('placeholder','');
	});
	$('input,textarea').blur(function(){
	   $(this).attr('placeholder',$(this).data('placeholder'));
	});
	// placeholder : end

	// main navigation. dropdown menu : begin
	$('#header-page .top-line nav > ul > li.dropdown > a').on('click', function(e) {
		
        $(this).next('ul').show();
		event.preventDefault();

	});

	// сlick outside block
	$(document).mouseup(function (e) {
	    var container = $('#header-page .top-line nav > ul > li > ul');
	    if (container.has(e.target).length === 0){
	        container.hide();
	    }
	});
	// main navigation. dropdown menu : end

	// product : begin
    // кастомный инпут (логика работы):begin
    $('body').on( 'click', '.one-product form > .number .controls .minus, .one-item-page .information .inputs-and-soc-services>div:first-child form>.number .controls .minus, .listing .content .vertical-list .one-product-full-width > form .input-wrapper .controls .minus',function () {
        var $input = $(this).closest('.input-wrapper').find('input[type="text"]');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('body').on( 'click', '.one-product form > .number .controls .plus,.one-item-page .information .inputs-and-soc-services>div:first-child form>.number .controls .plus, .listing .content .vertical-list .one-product-full-width > form .input-wrapper .controls .plus', function () {
        var $input = $(this).closest('.input-wrapper').find('input[type="text"]');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    // кастомный инпут (логика работы):end

	// отслеживание ввода в инпут (запрет на кол-во товаров меньше 1)
	$('.one-product form>.number .input-wrapper,.one-item-page .information .inputs-and-soc-services>div:first-child form>.number .input-wrapper, .listing .content .vertical-list .one-product-full-width > form .input-wrapper').on('change', 'input[type="text"]', function(){
		var val = $(this).val();
		if (val <= 0){
			$(this).val('1');

		}
	});

    $('.basket table tr td.input .number').on('change', 'input[type="text"]', function(){
        var val = $(this).val();
        if (val <= 0){
            $(this).val('1');
            var currentTr = $(this).closest('tr');
            var numbersProduct = $(this).val();
            var price = $(currentTr).find('.price > div').text();
            var price = parseInt(price.replace(/\D+/g,""));
            var total = numbersProduct * price;

            function replacement(n) {
                var a = (n + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
                $(currentTr).find('.total > div:nth-child(1)').html(a + '&nbsp;' + '<span class="ruble">o</span>');
            }
            replacement(total);
            }
    });

	// запрет ввода любых символов, кроме цифр:begin
    var filter_keys = {
        apply_events: function ($jq, callback) {
            $jq.bind({
                keyup: function (e) {
                    callback(e);
                },
                keydown: function (e) {
                    callback(e);
                },
                keypress: function (e) {
                    callback(e);
                }
            });
        },

        get_float: function (num) {
            var new_num = parseFloat((num.replace(/[^0-9]/gi, "")).toString());
            new_num = isNaN(new_num) ? "" : new_num;
            return new_num;
        },

        numbers: function ($input, callback) {
            $input.each(function () {
                var $this = $(this),
                    value;

                filter_keys.apply_events($this, function (e) {
                    var type_event = e.type,
                        type;
                    value = $this.val();

                    type = String.fromCharCode(e.which);
                    if (type_event === "keypress") {

                        if (! /^\d+$/.test(type) && type) {
                            value = filter_keys.get_float(value);
                            $this.val( value );
                        }

                    } else {
                        value = $this.val();
                        if (! /^\d+$/.test(value)) {
                            value = filter_keys.get_float(value);
                            $this.val( value );
                        }
                    }

                    if (typeof callback == "function") callback($this ,value, e);

                });
            });
        }
    };

    $(function () {
        filter_keys.numbers($('.one-product form>.number .input-wrapper input[type="text"], .one-item-page .information .inputs-and-soc-services>div:first-child form>.number .input-wrapper input[type="text"], .listing .content .vertical-list .one-product-full-width > form .input-wrapper input[type="text"],.basket table tr td.input .number input[type="text"]'),
        function ($input, value, event) {});
    });
	// запрет ввода любых символов, кроме цифр:end

    // карточка товара. табы : начало
    $('.tabs-titles').on('click', 'div', function(event) {

        var dataTab = $(this).attr('data-tab');
        $('.tabs-titles div').removeClass('active')
        $(this).addClass('active');

        $('.tabs-content > div').removeClass('active')
        $('.tabs-content div[data-tab*="'+dataTab+'"]').addClass('active').

        event.preventDefault();

    });

    // плавная прокрутка к блокам к характеристикам
    $('.one-item-page .information > a').on('click', function(){

        $('html, body').animate({
            scrollTop: $('.more-about-product').offset().top
        }, 900);
        $('[data-tab="characteristics"]').click();

    });
    // карточка товара. табы : конец
	// product : end

    // список товаров (фильтр) : начало
    // левая колонка
    $('.listing .filters .filter-brand > div:last-child a').click(function(event) {
        
        // $(this).toggleClass('active');
        // event.preventDefault();

    });

    // селект
    $('.listing .content .sorting .select').click(function(event) {
        
        $(this).toggleClass('active');
        event.preventDefault();

    });
    $('.listing .content .sorting .select a').click(function(event) {

        var filterTextLink = $(this).text();
        $(this).closest('.select').find('span').text(filterTextLink);
        event.preventDefault();

    });
    $(document).mouseup(function (e) {
        var container = $('.listing .content .sorting .select');
        if (container.has(e.target).length === 0){
            container.removeClass('active');
        }
    });

    // вид
    $('.listing .content .sorting .variant a').click(function(event) {

        var data = $(this).attr('data-attr');

        if (data == 'tile'){
            // $('.listing .content .masonry').addClass('active');
            // $('.listing .content .vertical-list').removeClass('active');
            $('.listing .content .masonry').removeClass('vertical-list');
            // Masonry (Cascading grid layout library) : begin
                    // формирую сетку
            $('#content-page.listing .masonry').isotope({
                // options
                itemSelector: '#content-page.listing .masonry .one-product',
                masonry: {
                   gutter: 3
                },
            });
            // Masonry (Cascading grid layout library) : end
        }

        else if (data == 'list'){
            // $('.listing .content .vertical-list').addClass('active');
            // $('.listing .content .masonry').removeClass('active');
            $('.listing .content .masonry').addClass('vertical-list');
            // Masonry (Cascading grid layout library) : begin
            $('#content-page.listing .masonry').isotope({
                // options
                itemSelector: '#content-page.listing .masonry .one-product',
                masonry: {
                   gutter: 1
                },
            });
            
            // Masonry (Cascading grid layout library) : end
        }

        $(this).closest('.variant').find('a').removeClass('active');
        $(this).addClass('active');

        event.preventDefault();

    });
    // список товаров (фильтр) : конец

    // корзина : начало
    // удаление строки корзины
    $('.basket table tr td.total > div.remove').click(function(event) {

        $(this).closest('tr').animate({
            'opacity': '0'},
            170, function() {
                $(this).hide(100);
            });

        event.preventDefault();

    });

    // изменение цены : начало
    var totalSum = 0;

    $('.basket table tr td.input .number input[type="text"]').each(function(indx, element){
        var currentTr= $(this).closest('tr');
        var numbersProduct = $(this).val();
        var numbersProductOld = $(this).val();
        var price = $(currentTr).find('.price > div').text();
        var price = parseInt(price.replace(/\D+/g,""));
        var total = numbersProduct * price;

        function replacement(n) {
            var a = (n + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
            $(currentTr).find('.total > div:nth-child(1)').html(a + '&nbsp;' + '<span class="ruble">o</span>');
        }
        replacement(total);

        totalSum += total;

    });

    // общая сумма
    function replacementAll(k) {
        var b = (k + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
        $('.basket .total-money div').html('<span>Итого:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' + b + '&nbsp;' + '<span class="ruble">o</span>');
    }
    replacementAll(totalSum);

    // любое изменение input[type="text"]
    $('.basket table tr td.input .number input[type="text"]').change(function() {
        
        var currentTr = $(this).closest('tr');
        var numbersProduct = $(this).val();
        var price = $(currentTr).find('.price > div').text();
        var price = parseInt(price.replace(/\D+/g,""));
        var total = numbersProduct * price;

        function replacement(n) {
            
            var a = (n + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
            $(currentTr).find('.total > div:nth-child(1)').html(a + '&nbsp;' + '<span class="ruble">o</span>');

        }
        replacement(total);

    })
    // изменение цены : конец

    // помощь у чекбоксов : начало
    $('.basket').on('click', '.help', function(event) {
        
        event.preventDefault();

        $('.basket').find('.help').removeClass('active');
        $(this).addClass('active');

    });
    $(document).mouseup(function (e) {
        var container = $('.basket .help');
        if (container.has(e.target).length === 0){
            container.removeClass('active');
        }
    });
    // помощь у чекбоксов : конец
    // корзина : конец

});