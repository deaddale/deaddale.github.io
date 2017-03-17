(function() {
	$(document).ready(function(){
        // Parallax
        function parallax (){
            var windowWidth = getWidth(window);

            if (windowWidth > 960){
                $('[data-type="background"]').each(function(){

                    // Создаем объект
                    var $bgobj = $(this);
                    $(window).scroll(function() {
                        // Вычисляем коэффициент
                        var yPos = -($(window).scrollTop() / $bgobj.data('speed'));

                        // Присваиваем значение background-position
                        var coords = 'center '+ yPos + 'px';

                        // Создаем эффект Parallax Scrolling
                        $bgobj.css({ backgroundPosition: coords });
                    });
                });
            }
        }

        // Вычисление математического максимума ширины элемента
        function getWidth(el) {
            return Math.max($(el).width(), $(el).outerWidth());
        }

        // Вызов основной функции для параллакс-эффекта
        parallax();
	});
})();