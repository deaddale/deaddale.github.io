(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = new Vue({
    el: '#app',
    data: {
        isActiveNav: false,
        scrolled: false
    },
    methods: {
        handleScroll () {
            this.scrolled = window.scrollY > 0;
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    mounted() {
        function getHeight(element) {
            return Math.max($(element).height(), $(element).outerHeight());
        }
        function sliderInit(slider) {
            $(slider).each(function (indx, element) {
                $(element).on('setPosition', function() {
                    var img = $(this).find('img');
                    var imgHeight = getHeight(img);
                    var indent = (imgHeight / 2);
                    $(element).find('.b-slider__arrow').css('top', indent + 'px');
                });
            });
            $(slider).each(function (indx, element) {
                $(element).slick({
                    dots: true,
                    prevArrow: '<div class="b-slider__arrow b-slider__arrow_prev"></div>',
                    nextArrow: '<div class="b-slider__arrow b-slider__arrow_next"></div>'
                });
            });
        }
        sliderInit('.b-slider__slick');
        sliderInit('.b-slider-project__slick');
    }
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvcG9zaC1wcm9qZWN0LmFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0gbmV3IFZ1ZSh7XG4gICAgZWw6ICcjYXBwJyxcbiAgICBkYXRhOiB7XG4gICAgICAgIGlzQWN0aXZlTmF2OiBmYWxzZSxcbiAgICAgICAgc2Nyb2xsZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGhhbmRsZVNjcm9sbCAoKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVkID0gd2luZG93LnNjcm9sbFkgPiAwO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVkICgpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldEhlaWdodChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoJChlbGVtZW50KS5oZWlnaHQoKSwgJChlbGVtZW50KS5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzbGlkZXJJbml0KHNsaWRlcikge1xuICAgICAgICAgICAgJChzbGlkZXIpLmVhY2goZnVuY3Rpb24gKGluZHgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdzZXRQb3NpdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gJCh0aGlzKS5maW5kKCdpbWcnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltZ0hlaWdodCA9IGdldEhlaWdodChpbWcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZW50ID0gKGltZ0hlaWdodCAvIDIpO1xuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5iLXNsaWRlcl9fYXJyb3cnKS5jc3MoJ3RvcCcsIGluZGVudCArICdweCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHNsaWRlcikuZWFjaChmdW5jdGlvbiAoaW5keCwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICc8ZGl2IGNsYXNzPVwiYi1zbGlkZXJfX2Fycm93IGItc2xpZGVyX19hcnJvd19wcmV2XCI+PC9kaXY+JyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnPGRpdiBjbGFzcz1cImItc2xpZGVyX19hcnJvdyBiLXNsaWRlcl9fYXJyb3dfbmV4dFwiPjwvZGl2PidcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlckluaXQoJy5iLXNsaWRlcl9fc2xpY2snKTtcbiAgICAgICAgc2xpZGVySW5pdCgnLmItc2xpZGVyLXByb2plY3RfX3NsaWNrJyk7XG4gICAgfVxufSk7Il19
