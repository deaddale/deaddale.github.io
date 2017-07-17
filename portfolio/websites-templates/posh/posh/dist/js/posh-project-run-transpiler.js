(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
            }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
})({ 1: [function (require, module, exports) {
        var app = new Vue({
            el: '#app',
            data: {
                isActiveNav: false,
                scrolled: false
            },
            methods: {
                handleScroll() {
                    this.scrolled = window.scrollY > 0;
                }
            },
            created() {
                window.addEventListener('scroll', this.handleScroll);
            },
            mounted() {
                function getHeight(element) {
                    return Math.max($(element).height(), $(element).outerHeight());
                }
                function sliderInit(slider) {
                    $(slider).each(function (indx, element) {
                        $(element).on('setPosition', function () {
                            var img = $(this).find('img');
                            var imgHeight = getHeight(img);
                            var indent = imgHeight / 2;
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
    }, {}] }, {}, [1]);
