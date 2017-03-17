/*
	jQuery Zoom - 2015
	on the basis of jQuery Zoom v1.7.0 - 2013-01-31
	by Jack Moore - jacklmoore.com/zoom
*/

(function ($) {
	var defaults = {
		url: false,
		callback: false,
		target: false,
		duration: 120,
		on: 'mouseover'
	};


	$.zoom = function(target, source, img) {
		var outerWidth,
			outerHeight,
			xRatio,
			yRatio,
			offset,
			position = $(target).css('position'),
			newImgSrc = $('.img-wrapper img:first').attr('src');

		$(target).css({
			position: /(absolute|fixed)/.test() ? position : 'relative',
			overflow: 'hidden'
		});

		$(img)
			.addClass('zoomImg')
			.css({
				position: 'absolute',
				top: 0,
				left: 0,
				opacity: 0,
				border: 'none',
				maxWidth: 'none'
			})
			.appendTo(target);

		return {
			init: function(width, height) {
				outerWidth = $(target).outerWidth();
				outerHeight = $(target).outerHeight();
				xRatio = (width - outerWidth) / $(source).outerWidth();
				yRatio = (height - outerHeight) / $(source).outerHeight();
				offset = $(source).offset();
			},
			move: function (e) {
				var left = (e.pageX - offset.left),
					top = (e.pageY - offset.top);

				top = Math.max(Math.min(top, outerHeight), 0);
				left = Math.max(Math.min(left, outerWidth), 0);

				img.style.left = (left * -xRatio) + 'px';
				img.style.top = (top * -yRatio) + 'px';
			}
		};
	};

	$.fn.zoom = function (options) {
		return this.each(function () {
			var
			settings = $.extend({}, defaults, options || {}),
			target = settings.target || this,
			source = this,
			img = new Image(),
			$img = $(img),
			mousemove = 'mousemove',
			clicked = false;

			img.onload = function () {
    			var width  = this.width;
    			var height = this.height;

				$(this).removeAttr("width")
           		.removeAttr("height")
           		.css({ width: "", height: "" });

				var zoom = $.zoom(target, source, img);

				function start(e) {
					zoom.init(width, height);
					zoom.move(e);

					$img.stop()
					.fadeTo($.support.opacity ? settings.duration : 0, 1);
				}

				function stop() {
					$img.stop()
					.fadeTo(settings.duration, 0);
				}

				
				zoom.init(width, height); 

				if(width > 541) {
					$(source).hover(
						start,
						stop
					)[mousemove](zoom.move);

				} else {
					$(source).unbind();
				}
				
				if ($.isFunction(settings.callback)) {
					settings.callback.call(img);
				}
			};

			$('.thumbnails-wrapper a').on('click', function() {			
				img.src = $(this).attr('href');
			});

			
			img.src = $('.img-wrapper img').attr('src');

		});
	};

	$.fn.zoom.defaults = defaults;
}(window.jQuery));