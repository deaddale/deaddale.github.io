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
                    console.log('img: ' + img);
                    console.log('imgHeight: ' + imgHeight);
                    console.log('indent: ' + indent);
                    console.log('arrow: ' + $(element).find('.b-slider__arrow'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvcG9zaC1wcm9qZWN0LmFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGRhdGE6IHtcbiAgICAgICAgaXNBY3RpdmVOYXY6IGZhbHNlLFxuICAgICAgICBzY3JvbGxlZDogZmFsc2VcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaGFuZGxlU2Nyb2xsICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZWQgPSB3aW5kb3cuc2Nyb2xsWSA+IDA7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZWQgKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVTY3JvbGwpO1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0SGVpZ2h0KGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgkKGVsZW1lbnQpLmhlaWdodCgpLCAkKGVsZW1lbnQpLm91dGVySGVpZ2h0KCkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlckluaXQoc2xpZGVyKSB7XG4gICAgICAgICAgICAkKHNsaWRlcikuZWFjaChmdW5jdGlvbiAoaW5keCwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkub24oJ3NldFBvc2l0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSAkKHRoaXMpLmZpbmQoJ2ltZycpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nSGVpZ2h0ID0gZ2V0SGVpZ2h0KGltZyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSAoaW1nSGVpZ2h0IC8gMik7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmItc2xpZGVyX19hcnJvdycpLmNzcygndG9wJywgaW5kZW50ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbWc6ICcgKyBpbWcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW1nSGVpZ2h0OiAnICsgaW1nSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGVudDogJyArIGluZGVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcnJvdzogJyArICQoZWxlbWVudCkuZmluZCgnLmItc2xpZGVyX19hcnJvdycpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChzbGlkZXIpLmVhY2goZnVuY3Rpb24gKGluZHgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnPGRpdiBjbGFzcz1cImItc2xpZGVyX19hcnJvdyBiLXNsaWRlcl9fYXJyb3dfcHJldlwiPjwvZGl2PicsXG4gICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJzxkaXYgY2xhc3M9XCJiLXNsaWRlcl9fYXJyb3cgYi1zbGlkZXJfX2Fycm93X25leHRcIj48L2Rpdj4nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzbGlkZXJJbml0KCcuYi1zbGlkZXJfX3NsaWNrJyk7XG4gICAgICAgIHNsaWRlckluaXQoJy5iLXNsaWRlci1wcm9qZWN0X19zbGljaycpO1xuICAgIH1cbn0pOyJdfQ==
