(
    function () {
        // Заводим новый блок (calc, так как есть блок calc)
        var packTableBlock = {};

        // Регистрация
        WindCore.blockRegister(
            // Новый блок объединяется с существующим "WindBlock" (почитать подробнее про extend)
            $.extend(
                packTableBlock,
                WindBlock, {
                    // Устанавливаем родительский блок
                    getSelector: function () {
                        return '.js-content';
                    },
                    // Возвращает массив объектов с которыми работаем
                    getBindings: function () {
                        // Сохраняем текущий контекст
                        var self = this;

                        return [
                            // Следующий слайд (с первого)
                            [
                                'click',
                                '.js-scroll-to-next-slide',
                                function (event) {
                                    event.preventDefault();
                                    // Действие
                                    $('#fp-nav ul li:nth-child(2) a span').click();
                                    console.log('9')
                                }
                            ],
                            // Предыдущий слайд (с последнего)
                            [
                                'click',
                                '.js-scroll-to-top-slide',
                                function (event) {
                                    event.preventDefault();
                                    // Действие
                                    $('#fp-nav ul li:nth-child(1) a span').click();
                                }
                            ]
                        ];
                    },
                    // Вызывается при загрузке странице
                    // $target - получаем в getSelector
                    initialize: function ($target) {
                        // full page plugin : begin
                        $target.fullpage({
                            navigation: true,
                            slidesNavigation: false,
                            normalScrollElements: '.b-preloader',
                            css3: true,
                            controlArrows: true,
                            verticalCentered: true,
                            onLeave: function (index, nextIndex, direction) {
                                var navLink = $('#fp-nav');
                                var socIcon = $('.b-soc-networks');

                                if (nextIndex !== 1 || nextIndex !== 7) {
                                    $(navLink).addClass('black');
                                    $(socIcon).addClass('black');
                                }
                                else {
                                    $(navLink).removeClass('black');
                                    $(socIcon).removeClass('black');
                                }

                                $(this).next('.section').find('.b-advantages').find('img').addClass('animated fadeInDown');
                                $(this).next('.section').find('.b-advantages').find('a:last-child').addClass('animated fadeInDown');
                            }
                        });
                        // full page plugin : end

                        // animate page : begin
                        // Social icons and navigation
                        $('.b-soc-networks').addClass('animated fadeInLeft');
                        $('#fp-nav').addClass('animated fadeInRight');

                        // section first
                        var sectionFirst = $('.section.first');
                        sectionFirst.find('h1').addClass('animated slideInDown');
                        sectionFirst.find('.b-scroll-to.-next-slide').addClass('animated slideInUp');
                        // animate page : end
                    }
                }
            )
        );
    }()
);