// Скрипт берет изображения и обрабатывает их размеры. Затем сравнивает ширину и высоту. Если ширина больше высоты, либо они равны, то height=100%. Если наоборот width=100%
jQuery(document).ready(function($) {
    // Берем все необходимые нам изображения.
    var $img = $('#pano img');

    // Дожидаемся загрузки изображения браузером.
    $img.load(function(){

    // Кладем указатель на изображение в переменную, дабы каждый раз не вызывать функцию и не нагружать дополнительно браузер.
    var CurImg = $(this);

    //Если заданы атрибуты width и height - удаляем их.
    CurImg.removeAttr("width")
         .removeAttr("height")
          //А также перестраховываемся насчет CSS-свойств.
         .css({ width: "", height: "" });

    // Получаем реальные ширину и высоту.
    var width  = CurImg.width();
    var height = CurImg.height();

    // Если изображение больше допустимой ширины или высоты (maxSize), задаем ее соответствующими атрибутами.
    var maxSize = '100%';
    if (height > width) CurImg.attr('width', maxSize);
    else if (width > height) CurImg.attr('height', maxSize);
    else if (height == width) CurImg.attr('height', maxSize);

    // Показываем отмасштабированное изображение.
    CurImg.css('display', 'block');

    });
});