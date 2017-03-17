	
	/*
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	<http://www.gnu.org/licenses/gpl.html>
	
	*/

	// options : 
	//
	// waitForStop (default : false)       => Waits for the end of the movement to move content
	// speed (default : 400)              => Speed of movement when waitForStop is set to true
	// opacity (default : 1)              => Well ... Opacity ;)
	
	(function($) {
	
		$.fn.bgFlow = function(options) {
			var defaults = {
				//waitForStop: false,
				speed: 400,
				// opacity: 1
			};
			
			var opts = $.extend(defaults, options);
			
			$('body').css('overflow', 'hidden');	
			
			//this.css({'position': 'absolute', 'z-index': '-1'});
			
			el = this;
			
			var im = new Image();
			im.onload = function() {
				//var imTag = $('<img src="'+im.src+'" id="jFlow-bg-img" alt="'+im.src+'" />').css('opacity',0);
				var imTag = $('.cur_div').find('#jFlow-bg-img');
				el.append(imTag);
				
				imTag.animate({'opacity':opts.opacity}, 400);
			
				el.initBgImage();
			}
			im.src = opts.image;

			$(document).mousemove(function(r){

				// Условие. Если #header поднят, то исполняем код (движение изображения)
				if ($('#header').css('top') === '-200px' && ($('#modal_window_wrapper').css('display') === 'none')) {

				    var sw = $(window).width(); // 1920
				    var sh = $(window).height(); // 1000

				    if (sw/sh > 1.6) {
				        var k = sw / treeInitWidth;
				        var w = sw;
				        var h = parseInt(treeInitHeight*k);
				    } else {
				        var k = sh / treeInitHeight;
				        var h = sh;
				        var w = parseInt(treeInitWidth*k);
				    }
				    
				    var rx = w/sw;
				    var ry = h/sh;

				    var x = r.pageX;
				    var y = r.pageY;
				        
				    var left = x*(1 - rx);
				    var top = (ry < 1) ? (sh-h) : y*(1 - ry); 

				    el.css({
				        left : left,
				        top  : top
				    });

				    $('.tree-container').css({
				        left : left,
				        top  : top
				    });

			    }
			    
			});
				
			return this;
		}
		
		$.fn.initBgImage = function() {
		
			el = this;
			
			var sw = $(window).width();
			var sh = $(window).height();
			
			if (sw/sh > 1.6) {
			
				var k = sw / treeInitWidth;
				var w = sw;
				var h = parseInt(treeInitHeight*k);
					
				var cx = 0;
				var cy = sh-h;
				
				var iw = sw;
				var ih = parseInt(sw / 1.6);
				
				var cw = sw;
				var ch = el.height();
			
			} else {
				
				var k = sh / treeInitHeight;
				var h = sh;
				var w = parseInt(treeInitWidth*k);
				
				var cx = (sw-w)/2;
				var cy = 0;
				
				var iw = parseInt(sh * 1.6);
				var ih = sh;
				
				var cw = el.width();
				var ch = sh;
			}

			// $('#jFlow-bg-img').attr({width: iw, height: ih});
			var ihH = ih/1.111111111111111;
			
			$('#jFlow-bg-img').attr({width: iw, height: ih});
			
			el.css({left: cx+'px', top: cy+'px'});
			$('.tree-container').css({width: cw+'px', height: ch+'px'});

		}
	})(jQuery);