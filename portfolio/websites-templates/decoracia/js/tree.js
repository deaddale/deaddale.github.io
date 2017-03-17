$('#pano').find('div:first').find('img:first').attr('id','jFlow-bg-img');

var treeItems = {};
var treeInitWidth = 1920 // $('#jFlow-bg-img').width(); $(window).width();
var treeInitHeight = 1080 // $('#jFlow-bg-img').height(); $(window).height();
var treeImageSrc = $('#jFlow-bg-img').attr('src');

$(document).ready(initTree);

function initTree() {
		
	$('<img />')
		.attr('src', treeImageSrc)
		.load(function(){
			
			showTree();
				
		});
}

function showTree() {
	$('body').addClass('tree');

	$('.tree-bg').each(function() {
		treeItems[$(this).index()] = {
			'left':		parseInt($(this).css('left')),
			'top':		parseInt($(this).css('top')),
			'width':	parseInt($(this).css('width')),
			'height':	parseInt($(this).css('height'))
		};
	});

	$('.bx-prev').click(function(){
		$('.tree-bg').bgFlow({image:treeImageSrc});
	});

	$('.bx-next').click(function(){
		$('.tree-bg').bgFlow({image:treeImageSrc});
	});

	$('.tree-bg').bgFlow({image:treeImageSrc});
	resetTreeItems();
}

function resetTreeItems() {
	var sw = $(window).width();
	var sh = $(window).height();
			
	if (sw/sh > 1.777777777777778) {
		var k = sw / treeInitWidth;
	} else {
		var k = sh / treeInitHeight;
	}
	
	// $('#pano').each(function() {
	// 	$(this).css({
	// 		'left':		parseInt( treeItems[$(this).index()]['left'] * k ) + 'px',
	// 		'top':		parseInt( treeItems[$(this).index()]['top'] * k ) + 'px',
	// 		'width':	parseInt( treeItems[$(this).index()]['width'] * k ) + 'px',
	// 		'height':	parseInt(  treeItems[$(this).index()]['height'] * k  ) + 'px'
	// 	}).show();
	// });
}

$(window).bind('resize',function(){
    $('.tree-bg').initBgImage();
	resetTreeItems();
});