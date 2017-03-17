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