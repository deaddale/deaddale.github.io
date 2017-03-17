$(function() {
	
	$.fn.navigation = function(){
		// меню - плавная прокрутка к блокам
		$('header nav span, .logotype img').click(function(){
			var id = '#' + $(this).attr('data-scroll');
			$('html, body').animate({
				scrollTop: $(id).offset().top - 114
			}, 900);

			return false;

			// var b = 'div' + id;
			// var c = $(b).offset()
			// alert(c.top)

		});
		
		// назначение активного пункта меню
		$(document).scroll(function(){
			var top = $(document).scrollTop();
			var navItem = $('header nav span');
			$(navItem).removeClass('active');
			if (top >= 350 && top < 900) { // 1
				$(navItem).eq(0).addClass('active');
			}else if (top >= 901 && top < 1500) { // 2
				$(navItem).eq(1).addClass('active');
			}else if (top >= 1501 && top < 2170) { // 3
				$(navItem).eq(2).addClass('active');
			}else if (top >= 2171) { // 4
				$(navItem).eq(3).addClass('active');
			}
		});
	}

});