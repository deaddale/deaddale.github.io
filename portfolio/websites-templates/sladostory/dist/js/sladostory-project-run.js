(function() {
    $(document).ready(function(){
    });
})();
(function() {
    $(document).ready(function(){
        
        // check viewport
        $('.b-articles').find('.one-article').delay(800).viewportChecker();
    });
})();
(function() {
    $(document).ready(function(){
        
        // show banner
        $('.b-banner').find('img').delay(1000, function() {
            $(this).addClass('fadeIn');
        });
        
    });
})();
(function() {
	$(document).ready(function(){});
})();
(function() {
	$(document).ready(function(){});
})();
(function() {
    $(document).ready(function(){
    });
})();
(function () {
    $(document).ready(function () {

        var bHeader = $('.b-header');

        // search block : begin
        var search     = $(bHeader).find('.search');
        var searchBtn  = $(search).find('.button');
        var searchBtnSubmit = $(search).find('input[type="submit"]');
        var searchForm = $(search).find('.search-form');
        var primaryNav = $(bHeader).find('.b-nav.primary');
        var closeBtn   = $(search).find('.icon-close');

        // открываем поиск
        $(searchBtn).click(function () {
            // показываем навигацию
            $(primaryNav).stop(true,true).fadeOut(300, function() {
                $(closeBtn).stop(true,true).fadeIn(700);
            });

            $(searchBtnSubmit).addClass('active');
            $(searchBtn).addClass('invisible');

            // переключаем состояние формы поиска
            $(searchForm).addClass('active');
        });

        // закрываем поиск
        $(closeBtn).click(function () {
            // скрываем навигацию
            $(closeBtn).stop(true,true).fadeOut(500, function() {
                $(primaryNav).stop(true,true).fadeIn(300);
            });

            $(searchBtnSubmit).removeClass('active');
            $(searchBtn).removeClass('invisible');

            // переключаем состояние формы поиска
            $(searchForm).removeClass('active');
        });
        // search block : end

        // secondary nav : begin
        var secNav     = $(bHeader).find('.b-nav.secondary');
        var secNavBtn  = $(secNav).find('.btn-sec-nav');
        var secNavList = $(secNav).find('> ul');
        var body = $('body');

        // открываем второстепенную навигацию
        $(secNavBtn).click(function () {
            $(secNavList).stop().fadeToggle(500, function() {
                $(secNavList).toggleClass('active');
            });
            $(body).toggleClass('blured');
        });

        // событие клика по веб-документу
        $(document).mouseup(function (e){
            // если клик был не по нашему блоку и не по его дочерним элементам
            if (!secNavList.is(e.target) && secNavList.has(e.target).length === 0 && !secNavBtn.is(e.target)) { //
                // скрываем навигацию
                secNavList.stop().fadeOut(500).removeClass('active');
                // удаляем блюр у контента
                $(body).removeClass('blured');
            }
        });
        // secondary nav : end

        // fixed header : begin
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 50) {
                $(bHeader).addClass('fixed');
            } else {
                $(bHeader).removeClass('fixed');
            }
        });
        // fixed header : end

    });
})();
(function() {
    $(document).ready(function(){
        $('.b-result-info').find('.filter-switcher').click(function (event) {
            event.preventDefault();
            $('.b-filters').toggleClass('active');
        });
        
        // var $select = $('.b-filters').find('select');
        // $select.select2({
        //     theme: 'classic',
        //     minimumResultsForSearch: -1,
        //     width: 'auto',
        //     dropdownAutoWidth: true
        // });
    });
})();
(function() {
	$(document).ready(function(){});
})();
// Global JS file
(function() {
	$(document).ready(function(){});
})();
(function() {
	$(document).ready(function(){
	});
})();
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
(function() {
    $(document).ready(function(){
        // custom input : begin
        var bProducts   = $('.b-products');
        var bProduct    = $(bProducts).find('.one-product');
        
        function customInput(element) {
            $(element).each(function(indexEl){

                var wrapper     = $('.b-products').find('[data-index="'+indexEl+'"]');
                var numberInput = $(wrapper).find('.number-input');
                var minus       = $(numberInput).find('.minus');
                var plus        = $(numberInput).find('.plus');
                var input       = $(numberInput).find('input');

                var resultInfo  = $('.b-result-info');
                var sumProducts = $(resultInfo).find('.sum-products .result');
                var sumMoney    = $(resultInfo).find('.sum-money .result i');

                var priceOne = $(wrapper).find('.price p span').text();
                    priceOne = parseInt(priceOne.replace(/\D+/g,""));

                var giftBox  = $(wrapper).find('.packing label');

                // minus click : begin
                $(minus).click(function () {

                    $(input).val(parseInt($(input).val()) - 1);
                    var inputVal = $(input).val();
                    $(input).change();

                    if (inputVal >= 0){

                        // sum money : begin
                        var olderSumMoney = $(sumMoney).text();
                            olderSumMoney = parseInt(olderSumMoney.replace(/\D+/g,""));
                        var allSumMoney = (olderSumMoney - priceOne).toString();
                        var outSumMoney = allSumMoney.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

                        $(sumMoney).text(outSumMoney);
                        // sum money : end

                        // sum products : begin
                        var olderSumProducts = $(sumProducts).text();

                            if (olderSumProducts > 0){
                                olderSumProducts = parseInt(olderSumProducts.replace(/\D+/g,""));
                                var allSumProducts = (olderSumProducts - 1).toString();
                                var outSumProducts = allSumProducts.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

                                $(sumProducts).text(outSumProducts);
                            }
                        // sum products : end
                    }
                    return false;
                });
                // minus click : end

                // plus click : begin
                $(plus).click(function () {
                    $(input).val(parseInt($(input).val()) + 1);
                    $(input).change();

                    // sum money : begin
                    var olderSumMoney = $(sumMoney).text();
                        olderSumMoney = parseInt(olderSumMoney.replace(/\D+/g,""));
                    var allSumMoney = (olderSumMoney + priceOne).toString();
                    var outSumMoney = allSumMoney.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

                    $(sumMoney).text(outSumMoney);
                    // sum money : end

                    // sum products : begin
                    var olderSumProducts = $(sumProducts).text();
                        olderSumProducts = parseInt(olderSumProducts.replace(/\D+/g,""));
                    var allSumProducts = (olderSumProducts + 1).toString();
                    var outSumProducts = allSumProducts.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

                    $(sumProducts).text(outSumProducts);
                    // sum products : end

                    return false;
                });
                // plus click : end

                // подарочная упаковка : начало
                $(giftBox).find('input').change(function () {
                    if ($(this).is(':checked')){
                        // sum money : begin
                        var olderSumMoney = $(sumMoney).text();
                        olderSumMoney   = parseInt(olderSumMoney.replace(/\D+/g,""));
                        var allSumMoney = (olderSumMoney + 500).toString();
                        var outSumMoney = allSumMoney.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

                        $(sumMoney).text(outSumMoney);
                        // sum money : end
                    }
                    else {
                        // sum money : begin
                        var olderSumMoney = $(sumMoney).text();
                        olderSumMoney   = parseInt(olderSumMoney.replace(/\D+/g,""));
                        var allSumMoney = (olderSumMoney - 500).toString();
                        var outSumMoney = allSumMoney.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

                        $(sumMoney).text(outSumMoney);
                        // sum money : end
                    }
                });
                // подарочная упаковка : конец

                // отслеживание ввода в инпут (запрет на кол-во товаров меньше 0)
                $(numberInput).on('change', 'input', function(){
                    var val = $(this).val();
                    if (val <= 0){
                        $(this).val('0');
                    }
                });

                // запрет ввода любых символов, кроме цифр : begin
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
                    filter_keys.numbers($(input),
                        function ($input, value, event) {});
                });
                // запрет ввода любых символов, кроме цифр : end
            });
        }

        customInput(bProduct);
        // custom input : end
        
        // additional information : begin
        $('.b-products .one-product .btns-order-and-info .info').fancybox({
            openSpeed: 500,
            closeSpeed: 500,
            beforeShow : function() {
                // call bxslider
                var slider = $('.b-add-info').find('.slider').bxSlider({
                    pager: false,
                    infiniteLoop: false,
                    hideControlOnEnd: true
                });
            }
        });

        $('.b-products .one-product .btns-order-and-info .order').fancybox({
            openSpeed: 500,
            closeSpeed: 500
        });
        // additional information : end

        // slider product : begin
        var sliderWrapper = $(bProducts).find('.slider');
        var slider        = $(sliderWrapper).find('.owl-carousel');

        $(slider).addClass('invisible').viewportChecker({
            offset: 500,
            invertBottomOffset: true,
            classToRemove: 'invisible',
            classToAdd: 'visible',
            callbackFunction: function(elem, action){
                $(elem).owlCarousel({
                    items: 1,
                    center: true,
                    startPosition: 1,
                    nav: true,
                    navText: [],
                    autoplay: false,
                    navSpeed: 1500,
                    smartSpeed: 1500,
                    animateIn: 'fadeIn',
                    animateOut: 'fadeOut',
                    touchDrag: false,
                    mouseDrag: false
                });

                /*
                Привет, неизвестный разработчик. Прости меня за эти setInterval и setTimeout.
                Дело в том, что я не смог остановить анимацию средствами плагина owlCarousel.
                Я перечитал всё что только возможно по документации,
                просмотрел кучу сторонних ресурсов вроде github и stackoverflow...
                На к сожалению ничего не помогло. Метод останавливающий автозапуск слайдера не работает.
                Пришлось прибегать к извращениям. Если будут вопросы по коду - стучи в скайп ddale_lf :)
                Хорошего дня!
                */

                // начать повторы кликов на правый контрол с интервалом 2 сек
                var timerId = setInterval(function() {
                    $(elem).find('.owl-next').click();
                }, 1000);

                setTimeout(function() {
                    clearInterval(timerId);
                }, 4000);

                // клик на checkbox с подарочной упаковкой : начало
                $(elem).closest('.container').find('.packing label input').change(function () {
                    if ($(this).is(':checked')){
                        var timerId = setInterval(function() {
                            $(elem).find('.owl-prev').click();
                        }, 1000);

                        setTimeout(function() {
                            clearInterval(timerId);
                        }, 4000);
                    }
                    else {
                        var timerId = setInterval(function() {
                            $(elem).find('.owl-next').click();
                        }, 1000);

                        setTimeout(function() {
                            clearInterval(timerId);
                        }, 4000);
                    }
                });
                // клик на checkbox с подарочной упаковкой : конец
            }
        });
        // slider product : end
    });
})();
(function() {
    $(document).ready(function(){

        // scroll to top
        $('.b-result-info').find('.to-top').click(function () {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 1300);
        });
        
    });
})();
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
(function() {
	$(document).ready(function(){});
})();