(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    $('.js-tabs-nav-item').on('click', function () {
        $('.js-tabs-nav-item').each(function (index, element) {
            $(element).removeClass('b-tabs__nav-link_active');
        });
        $('.js-tabs-content-item').each(function (index, element) {
            $(element).removeClass('b-tabs__content-item_active');
        });
        var number = $(this).addClass('b-tabs__nav-link_active').data('item-num');
        $(".js-tabs-content-item[data-item-num='" + number + "']").addClass('b-tabs__content-item_active');
    });
})();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvcmFtZW5raTMzLXByb2plY3QuYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmpzLXRhYnMtbmF2LWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5qcy10YWJzLW5hdi1pdGVtJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2ItdGFic19fbmF2LWxpbmtfYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtdGFicy1jb250ZW50LWl0ZW0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcygnYi10YWJzX19jb250ZW50LWl0ZW1fYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbnVtYmVyID0gJCh0aGlzKS5hZGRDbGFzcygnYi10YWJzX19uYXYtbGlua19hY3RpdmUnKS5kYXRhKCdpdGVtLW51bScpO1xuICAgICAgICAkKFwiLmpzLXRhYnMtY29udGVudC1pdGVtW2RhdGEtaXRlbS1udW09J1wiICsgbnVtYmVyICsgXCInXVwiKS5hZGRDbGFzcygnYi10YWJzX19jb250ZW50LWl0ZW1fYWN0aXZlJyk7XG4gICAgfSk7XG59KSgpOyJdfQ==
