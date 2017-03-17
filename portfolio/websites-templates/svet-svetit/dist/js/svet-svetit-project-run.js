(function() {
    $(document).ready(function(){
        // click "купить в 1 клик" : begin
        $('.b-button.one-click').click(function () {
            $(this).find('.b-alert').toggleClass('active');
        });

        $('.b-alert').find('.close').click(function () {
           $(this).closest('div').removeClass('active');
        });
        // click "купить в 1 клик" : end
    });
})();
(function() {
    $(document).ready(function(){

        // custom input : begin
        var countOfNumber = $('.b-basket').find('.count-of-number');

        function customInput(element) {
            $(element).each(function(indexEl){

                var wrapper       = $('.b-basket').find('[data-index="'+indexEl+'"]');
                var result        = $(wrapper).find('.result b');
                var numberInput   = $(wrapper).find('.number-input');
                var minus         = $(numberInput).find('.minus');
                var plus          = $(numberInput).find('.plus');
                var input         = $(numberInput).find('input');

                $(minus).click(function () {
                    var count = parseInt($(input).val()) - 1;
                    count = count < 1 ? 1 : count;
                    $(input).val(count);
                    $(input).change();
                    return false;
                });

                $(plus).click(function () {
                    $(input).val(parseInt($(input).val()) + 1);
                    $(input).change();
                    return false;
                });

                // отслеживание ввода в инпут (запрет на кол-во товаров меньше 1)
                $(numberInput).on('change', 'input', function(){
                    var val = $(this).val();
                    if (val <= 0){
                        $(this).val('1');
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

                // result full sum : begin
                var priceOne = $(wrapper).find('.price').text();
                    priceOne = parseInt(priceOne.replace(/\D+/g,""));
                
                // изменение значения в инпуте
                $(input).change(function(){

                    var valInput = $(this).val();
                    var sum      = (priceOne * valInput).toString();
                    var out      = sum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                    var valueSumFinish = 0;

                    $(result).text(out);

                    $(countOfNumber).find('.result').each(function (indx, element) {
                        var valueSum = $(element).find('b').text();
                            valueSum = parseInt(valueSum.replace(/\D+/g,""));
                            valueSum = Number(valueSum);
                            valueSumFinish += valueSum;

                        var valueSumFinish2 = valueSumFinish.toString();
                            valueSumFinish2 = valueSumFinish2.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

                        $('.b-basket .sum p').find('i').text(valueSumFinish2);
                    });
                });
                // result full sum : end
            });
        }

        customInput(countOfNumber);
        // custom input : end

        // column height (one product) : begin
        $(function columnHeight() {
            $('.b-basket .one-product > [data-mh="one-product-basket-group"]').each(function(i, elem) {
                $(elem)
                    .matchHeight({byRow: false}); // Row detection gets confused so disable it
            });
        });
        // column height (one product) : end
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
(function() {
	$(document).ready(function(){
		$('.b-footer > nav.mobile .bottom-block p').click(function () {
           $('.b-footer > nav.mobile .top-block').toggleClass('active');
        });
	});
})();
(function() {
	$(document).ready(function(){
		$('.b-header > nav.mobile .top-block p').click(function () {
           $('.b-header > nav.mobile .bottom-block').toggleClass('active');
        });
	});
})();
(function() {
    $(document).ready(function(){
        $('.b-filters .top-block .mobile-block > .link').click(function () {

            // add active class
            $(this).closest('.mobile-block').next('.wrapper').toggleClass('active');

            $(this).find('span').each(function (index, element) {
                $(element).toggleClass('active');
            });

            // render select
            var $select = $('.b-select').find('select');
            $select.select2({
                theme: 'classic'
            });
        });
    });
})();
(function() {
	$(document).ready(function(){
		// custom checkbox : begin
		$('label.ui-switch').click(function () {
			$(this).toggleClass('checked');
		});
		// custom checkbox : end
	});
})();
// Global JS file
(function() {
	$(document).ready(function(){});
})();
// (function() {
// 	$(document).ready(function() {
// 	    $('.menutop ul li').click(function() {
// 	        $.arcticmodal({
// 	            type: 'ajax',
// 	            url: $(this).children('a').attr('href'),
// 	            afterLoading: function(data, el) {
// 	                $(".arcticmodal-container").css({
// 	                	top: screen.height,
// 	                	overflow: 'hidden'
// 	                });

// 	            },
// 	            afterLoadingOnShow: function(data, el) {
// 	                $(".arcticmodal-container").animate({
// 	                    top: "-=" + screen.height,
// 	                }, 1200, function() {
// 	                	$(".arcticmodal-container").css({
// 		                	overflow: 'auto'
// 		                });
// 	                });

// 	                bindCloseModal();
// 	                setCatalogueBehavior();
// 	                bindSelect();
// 	                counter();
// 	                showMenu();

// 	                switcher();
// 	            },
// 	            beforeClose: function(data, el) {
// 	            	$(".arcticmodal-container").css({ overflow: 'hidden' });
// 	                $(".arcticmodal-container").animate({
// 	                    top: "+=" + screen.height,
// 	                }, 1200);
// 	            }
// 	        });
// 	    });
	
// 	function bindCloseModal() {
// 		$('.js-close_modal').on('click', function() {
//         	$('.arcticmodal-overlay').trigger('click');
//     	});
// 	}
// })();


(function() {
	$(document).ready(function(){
	});
})();
(function() {
    $(document).ready(function(){
        $('.b-our-production .one-product > div > .right-col .btn-show-descr').click(function () {
            $(this).next('.top').toggleClass('active');
            $(this).find('span').each(function (index, element) {
                $(element).toggleClass('active');
            });
        });
    });
})();
(function() {
    $(document).ready(function(){
        
        var leftCol      = $('.b-product .left-col');
        var rightCol     = $('.b-product .right-col');
        var slider       = $(leftCol).find('.slider ul');

        var thumbsLeft   = $(leftCol).find('.thumbs');
        var fancybox     = $('.b-product .slider').find('a.fancybox');
        var thumbsRight  = $(rightCol).find('.carousel > div');

        var oneThumbLeft  = $(leftCol).find('.thumbs .one-thumb');
        var oneThumbRight = $(rightCol).find('.carousel .one-thumb');

        // bxslider (slider)
        slider.bxSlider({
            pagerCustom: thumbsLeft,
            startSlide: 0,
            easing: 'ease-in-out',
            infiniteLoop: false,
            controls: false,
            touchEnabled: true
        });

        // owl carousel (thumb left block)
        thumbsLeft.owlCarousel({
            nav: true,
            loop: true,
            navText: [],
            dots: false,
            items: 3,
            margin: 4,
            onInitialize: callback
        });

        // fancybox (product)
        $(fancybox).fancybox();

        // owl carousel (thumb right block) : begin
        thumbsRight.owlCarousel({
            nav: true,
            loop: true,
            navText: [],
            dots: false,
            margin: 6,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items: 1
                },
                // breakpoint from 0 up
                975 : {
                    items: 3
                }
            }
        });

        // активный таб (левая колонка)
        function callback(event) {
            $(oneThumbLeft).first().addClass('active');
        }

        $(leftCol).find('.thumbs').on('click', '.one-thumb', function () {
            $(oneThumbLeft).removeClass('active');
            $(this).addClass('active');
        });

        // активный таб (правая колонка)
        $(oneThumbRight).click(function () {
            $(oneThumbRight).removeClass('active');
            $(this).addClass('active');
        });

        // custom input : begin
        var bProduct    = $('.b-product');
        var numberInput = $(bProduct).find('.number-input');
        var result      = $(bProduct).find('.price b').last();
        var minus       = $(numberInput).find('.minus');
        var plus        = $(numberInput).find('.plus');
        var input       = $(numberInput).find('input');

        // plus/minus click
        $(minus).click(function () {
            var count = parseInt($(input).val()) - 1;
            count = count < 1 ? 1 : count;
            $(input).val(count);
            $(input).change();
            return false;
        });
        $(plus).click(function () {
            $(input).val(parseInt($(input).val()) + 1);
            $(input).change();
            return false;
        });

        // result full sum
        var priceOne = $(bProduct).find('.price b').first().text();
            priceOne = parseInt(priceOne.replace(/\D+/g,""));

        $(input).change(function(){

            var valInput = $(this).val();
            var sum      = (priceOne * valInput).toString();
            var out      = sum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

            $(result).text(out);

            console.log(sum);
        });

        // отслеживание ввода в инпут (запрет на кол-во товаров меньше 1)
        $(numberInput).on('change', 'input', function(){
            var val = $(this).val();
            if (val <= 0){
                $(this).val('1');
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
        // custom input : end
    });
})();
(function() {
	$(document).ready(function(){
		(function() {
			$(document).ready(function(){
				var $select = $('.b-select').find('select');
				$select.select2({
					theme: 'classic'
				});

                $(window).resize(function() {
                    $select.select2({
                        theme: 'classic'
                    });
                });
			});
		})();
	});
})();
(function() {
    $(document).ready(function(){

        var slider = $('.b-series .left-col .slider ul');
        var thumbs = $('.b-series .left-col .thumbs');

        // bxslider (slider)
        slider.bxSlider({
            pagerCustom: thumbs,
            startSlide: 0,
            easing: 'ease-in-out',
            infiniteLoop: false,
            controls: false,
            touchEnabled: true
        });

        // owl carousel (thumb)
        thumbs.owlCarousel({
            nav: true,
            loop: true,
            navText: [],
            dots: false,
            margin: 6,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items: 1
                },
                // breakpoint from 0 up
                975 : {
                    items: 3
                }
            }
        });
    });
})();
(function() {
	$(document).ready(function(){});
})();
(function() {
    $(document).ready(function(){
    });
 })();
(function() {
	$(document).ready(function(){
		$('.b-tooltip .link').click(function () {
			$(this).siblings('.invisible-block').toggleClass('active');
		});
	});
})();