	jQuery.preloadImages = function () {
	    if (typeof arguments[arguments.length - 1] == 'function') {
	        var callback = arguments[arguments.length - 1];
	    } else {
	        var callback = false;
	    }
	    if (typeof arguments[0] == 'object') {
	        var images = arguments[0];
	        var n = images.length;
	    } else {
	        var images = arguments;
	        var n = images.length - 1;
	    }
	    var not_loaded = n;
	    for (var i = 0; i < n; i++) {
	        jQuery(new Image()).attr('src', images[i]).load(function() {
	            if (--not_loaded < 1 && typeof callback == 'function') {
	                callback();
	            }
	        });
	    }
	}


	var train_width = 0;
	var train_timer;
	var velocity;
	var max_shift = 0;
	var x = 0;
	var flag = 0;

	var train_img = 0;


	$.preloadImages(["images/content/img_1.jpg"], function () {
	         $("#pano").css({"visibility":"visible"});
			 train_img = $("#pano img").width();
			 $("#pano").css({"width":train_img});
	});



	//Сдвигаем поезд при каждом обновлении кадра
	function move_train()
	{
		if (max_shift > 0)
		{	
		

			x = x + velocity;
			
			if (x > 0) x = 0;
			if (x < (-1*(max_shift))) x = -1*(max_shift);
			
			$("#pano").css({"left": x + "px", "width":train_img});
			
			if (velocity > 0)
			{
				
				$("#prev_img").show();
				$("#next_img").hide();
			}
			
			if (velocity == 0)
			{
				$("#next_img").hide();
				$("#prev_img").hide();
			}
					
			if (velocity < 0)
			{
				$("#next_img").show();
				$("#prev_img").hide();
			}
			
		if(x == 0) { $("#prev_img").hide();}
		if(x == "-" + max_shift) { $("#next_img").hide();}
			
		}
	}

	//Функция находит позицию курсора мыши внутри элемента
	function rPosition(element, mouseX, mouseY) {
		var offset = $(element).offset();
		var x = mouseX - offset.left;
		var y = mouseY - offset.top;
		
		return {'x': x, 'y': y};
	}

	$(function() {
			
		$("#next_img").hide();
		$("#prev_img").hide();
		
	  	//Считаем длину поезда, для этого складываем длины всех вагонов 
		train_width = train_width + $("#pano").width();
		train_img = $("#pano img").width();
		
		var controller_width = $("#look").width();
	  
	  	x = -1*train_width/2 + controller_width/2;
		
		//alert(train_width);
		$("#pano").css({"left": x + "px", "width":train_img});
	  
	  	//Запускаем цикл анимации если курсор мыши над поездом
	  	$("#look").mouseover(function(){
		//alert("");
			train_timer = window.setInterval("move_train();", 10);
		});
		
		//Останавливаем цикл анимации если курсор мыши ушел с поезда
		$("#look").mouseout(function(){
			window.clearInterval(train_timer);
			$("#next_img").hide();
			$("#prev_img").hide();
		});
	    
		$(window).resize(function(){
			velocity = 0;
			max_shift = train_width - $("#look").width();
			train_img = $("#pano img").width();
	  		move_train();
		});
		
		//Рассчитываем текущую скорость, которая зависит от координаты мышки на поезде
		$("#look").mousemove(function(e){
			train_width = 0;
			train_width = train_width + $("#pano").width();
			//Считаем полудлину поезда, чтобы посчитать скорость, которая с разным знаком в разных половинах поезда
			var half_width = Math.round($(this).width()/2);
			
			var elementCoords = rPosition(this, e.pageX, e.pageY);
			//Пересчитали максимум, на который можно сдвигать поезд, он зависит от размеров окна
			max_shift = train_width - $(this).width();
			
			var sign = velocity;
			
			//Рассчитываем скорость. Делим на 100, чтобы было плавнее. Скорость будет в пределах от 0 до 9
			velocity = Math.round((half_width - elementCoords.x)/100);
		});
	});