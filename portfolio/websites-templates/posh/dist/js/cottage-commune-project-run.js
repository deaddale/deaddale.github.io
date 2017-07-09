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
    // destroyed () {
    //     window.removeEventListener('scroll', this.handleScroll);
    // },
    mounted() {
        function getHeight(element) {
            return Math.max($(element).height(), $(element).outerHeight());
        }
        var $slider = $('.b-slider__slick');
        $slider.each(function (indx, element) {
            $(element).on('setPosition', function() {
                var img = $(this).find('.b-slider__img');
                var imgHeight = getHeight(img);
                var indent = (imgHeight / 2);
                $(element).find('.b-slider__arrow').css('top',indent + 'px');
            });
        });
        $slider.each(function (indx, element) {
            $(element).slick({
                dots: true,
                prevArrow: '<div class="b-slider__arrow b-slider__arrow_prev"></div>',
                nextArrow: '<div class="b-slider__arrow b-slider__arrow_next"></div>'
            });
        });
    }
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY290dGFnZS1jb21tdW5lLXByb2plY3QuYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGRhdGE6IHtcbiAgICAgICAgaXNBY3RpdmVOYXY6IGZhbHNlLFxuICAgICAgICBzY3JvbGxlZDogZmFsc2VcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaGFuZGxlU2Nyb2xsICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZWQgPSB3aW5kb3cuc2Nyb2xsWSA+IDA7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZWQgKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVTY3JvbGwpO1xuICAgIH0sXG4gICAgLy8gZGVzdHJveWVkICgpIHtcbiAgICAvLyAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldEhlaWdodChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoJChlbGVtZW50KS5oZWlnaHQoKSwgJChlbGVtZW50KS5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJHNsaWRlciA9ICQoJy5iLXNsaWRlcl9fc2xpY2snKTtcbiAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uIChpbmR4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdzZXRQb3NpdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbWcgPSAkKHRoaXMpLmZpbmQoJy5iLXNsaWRlcl9faW1nJyk7XG4gICAgICAgICAgICAgICAgdmFyIGltZ0hlaWdodCA9IGdldEhlaWdodChpbWcpO1xuICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSAoaW1nSGVpZ2h0IC8gMik7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuYi1zbGlkZXJfX2Fycm93JykuY3NzKCd0b3AnLGluZGVudCArICdweCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24gKGluZHgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuc2xpY2soe1xuICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiAnPGRpdiBjbGFzcz1cImItc2xpZGVyX19hcnJvdyBiLXNsaWRlcl9fYXJyb3dfcHJldlwiPjwvZGl2PicsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiAnPGRpdiBjbGFzcz1cImItc2xpZGVyX19hcnJvdyBiLXNsaWRlcl9fYXJyb3dfbmV4dFwiPjwvZGl2PidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59KTsiXX0=
