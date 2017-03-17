// Объявляем глобальные переменные
var train_width_2 = 0;
var train_timer_2;
var velocity_2;
var max_shift_2 = 0;
var x = 0;  

function move_train_2()
{
	if (max_shift_2 > 0)
	{
		x = x + velocity_2;
		
		if (x > 0) x = 0;
		if (x < (-1*(max_shift_2))) x = -1*(max_shift_2);
		
		$(".thumbs").css("left", x + "px");
	}
}

//find position cursor mouse enter element
function rPosition_2(element, mouseX, mouseY) {
	var offset = $(element).offset();
	var x = mouseX - offset.left;
	var y = mouseY - offset.top;
	
	return {'x': x, 'y': y};
}

$(function() {
  	//size train 
  	$(".thumbs a, .empty_div_normal_cursor").each(function (i) {
		train_width_2 = train_width_2 + $(this).width();
	});

$(".thumbs").width(train_width_2);

var w_slider = $("#content_bottom").width();
var width_bottom_block = $('#bottom_block').innerWidth();
var indent_width = ((width_bottom_block - 960)/2) + 'px';

	if(train_width_2 > w_slider) {
		//$(".thumbs").css({"margin-left":'-' + indent_width});
		$(".thumbs").css({"margin-left": 0});
	}
	else {
		$(".thumbs").css({"left" : "50%", "margin-left": "-" + train_width_2/2 + "px"});
	}

  	//animat cursor train enter
  	$("#content_bottom").mouseover(function(){
		train_timer_2 = window.setInterval("move_train_2();", 10);
	});
	
	//animat cursor train exit
	$("#content_bottom").mouseout(function(){
		window.clearInterval(train_timer_2);
	});
    
	$(window).resize(function(){
		velocity_2 = 0;
		max_shift_2 = train_width_2 - $("#content_bottom").width();
		
		if(max_shift_2 > 0) {
		$(".thumbs").css({"margin-left":"0px"});
		move_train_2();
		} else {
		$(".thumbs").css({"left" : "50%", "margin-left": "-" + train_width_2/2 + "px"});
		}

	});
	
	//Рассчитываем текущую скорость, которая зависит от координаты мышки на поезде
	$("#content_bottom").mousemove(function(e){
		
		train_width_2 = 0;
		
		$(".thumbs a, .empty_div_normal_cursor").each(function (i) {
			train_width_2 = train_width_2 + $(this).width();
		});
		
		//Считаем полудлину поезда, чтобы посчитать скорость, которая с разным знаком в разных половинах поезда
		var half_width = Math.round($(this).width()/2);
		
		var elementCoords = rPosition_2(this, e.pageX, e.pageY);
		//Пересчитали максимум, на который можно сдвигать поезд, он зависит от размеров окна
		max_shift_2 = train_width_2 - $(this).width();
		
		//Рассчитываем скорость. Делим на 100, чтобы было плавнее. Скорость будет в пределах от 0 до 9
		velocity_2 = Math.round((half_width - elementCoords.x)/200);
	});
});

var width_bottom_block = $('#bottom_block, #bottom_block_typical_page').innerWidth();
var indent_widtH = ((width_bottom_block - 960)/2) + 'px';
// $('.thumbs').find('p').find('a:first').css({'width' : indent_width});
// $('.thumbs').find('p').find('a:last').css({'width' : indent_width});
$('.empty_div_normal_cursor').css({'width' : indent_widtH});