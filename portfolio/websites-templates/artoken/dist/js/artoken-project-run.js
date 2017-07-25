(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(
    function () {
        _faq();
        _alert();
    }()
);

function _faq() {
    $('.b-faq__subtitle').on('click', function () {
        $(this)
            .closest('.b-faq__item')
            .addClass('b-faq__item_active')
            .siblings()
            .removeClass('b-faq__item_active');
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
}

function _alert() {
    $('.js-alert').on('click', function (event) {
        event.preventDefault();
        $('.js-popup').addClass('b-popup_active');
    });
    $('.js-popup .b-popup__overlay').on('click', function (event) {
        event.preventDefault();
        $('.js-popup').removeClass('b-popup_active');
    })
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXJ0b2tlbi1wcm9qZWN0LmFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBfZmFxKCk7XG4gICAgICAgIF9hbGVydCgpO1xuICAgIH0oKVxuKTtcblxuZnVuY3Rpb24gX2ZhcSgpIHtcbiAgICAkKCcuYi1mYXFfX3N1YnRpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmItZmFxX19pdGVtJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYi1mYXFfX2l0ZW1fYWN0aXZlJylcbiAgICAgICAgICAgIC5zaWJsaW5ncygpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ItZmFxX19pdGVtX2FjdGl2ZScpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcykub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfYWxlcnQoKSB7XG4gICAgJCgnLmpzLWFsZXJ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5qcy1wb3B1cCcpLmFkZENsYXNzKCdiLXBvcHVwX2FjdGl2ZScpO1xuICAgIH0pO1xuICAgICQoJy5qcy1wb3B1cCAuYi1wb3B1cF9fb3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcuanMtcG9wdXAnKS5yZW1vdmVDbGFzcygnYi1wb3B1cF9hY3RpdmUnKTtcbiAgICB9KVxufSJdfQ==
