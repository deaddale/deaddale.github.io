// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// CALLS PLUGINS : begin
$(function () {

    // fancybox : begin
    // enter to site, search : begin
    $('a.popup-btn').fancybox({
        minWidth    : 400,
        fitToView   : false,
        padding     : [30,65,30,65],
        autoSize    : true,
        closeClick  : false,
        openEffect  : 'fade',
        closeEffect : 'fade'
    });
    // enter to site, search : end
    // fancybox : end

    // slider section catalog : begin
    $('.slider-section-catalog div .owl-carousel').owlCarousel({
        nav       : true,
        loop      : true,
        items     : 4,
        margin    : 15,
        touchDrag : true,
        mouseDrag : true
    });
    // slider section catalog : end

    // styling select : begin
    $('select.organization-or-person').ikSelect({
        customClass: 'ik-select-organization-or-person'
    });
    // styling select : end

});
// CALLS PLUGINS : end
