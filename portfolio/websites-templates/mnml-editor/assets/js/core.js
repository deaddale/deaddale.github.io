(function($){

	// кнопки
	var buttons = {
		titleFirstBtn  : 'button.title-first-lvl',
		titleSecondBtn : 'button.title-second-lvl',
		paragraphBtn   : 'button.paragraph',

		boldBtn        : 'button.bold',
		italicBtn      : 'button.italic',

		deleteBtn      : 'button.delete',
		undoBtn        : 'button.undo',
		redoBtn        : 'button.redo',
		formatRmvBtn   : 'button.format-remove',

		createLinkBtn  : 'button.create-link',

		pasteImage     : 'button.paste-image',

		ulList         : 'button.ul-list',
		olList         : 'button.ol-list',

		addTable       : 'button.add-table'
	}

	// h1
	$(buttons.titleFirstBtn).on('click', function() {
		document.execCommand('formatBlock', false, '<h1>'); 
	});

	// h2
	$(buttons.titleSecondBtn).on('click', function() {
		document.execCommand('formatBlock', false, '<h2>'); 
	});

	// p
	$(buttons.paragraphBtn).on('click', function() {
		document.execCommand('formatBlock', false, '<p>'); 
	});

	// bold
	$(buttons.boldBtn).on('click', function() {
		document.execCommand('bold', null, null); 
	});

	// italic
	$(buttons.italicBtn).on('click', function() {
		document.execCommand('italic', null, null); 
	});

	// delete
	$(buttons.deleteBtn).on('click', function() {
		document.execCommand("delete", null, true);
		document.execCommand('formatBlock', false, 'div');
	});

	// undo
	$(buttons.undoBtn).on('click', function() {
		document.execCommand("undo", null, null);
	});

	// redo
	$(buttons.redoBtn).on('click', function() {
		document.execCommand("redo", null, null);
	});

	// format remove
	$(buttons.formatRmvBtn).on('click', function() {
		document.execCommand('formatBlock', false, 'div');	
	});

	// create link : begin
	function saveSelection() {
    	if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            var ranges = [];
	            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
	                ranges.push(sel.getRangeAt(i));
	            }
	            return ranges;
	        }
	    } else if (document.selection && document.selection.createRange) {
	        return document.selection.createRange();
	    }
	    return null;
	}

	function restoreSelection(savedSel) {
	    if (savedSel) {
	        if (window.getSelection) {
	            sel = window.getSelection();
	            sel.removeAllRanges();
	            for (var i = 0, len = savedSel.length; i < len; ++i) {
	                sel.addRange(savedSel[i]);
	            }
	        } else if (document.selection && savedSel.select) {
	            savedSel.select();
	        }
	    }
	}

	function createLink() {
	    // В этом нет особой необходимости, но для примера пусть будет
	    var savedSel = saveSelection();
	    var url = document.getElementById('url').value;
	    restoreSelection(savedSel);
	    document.execCommand('CreateLink', false, url);
	}

	$(buttons.createLinkBtn).on('click', function() {
		createLink();	
	});
	// create link : end

	// paste image
	$('#img-file').change(function (){
		var tmppath = URL.createObjectURL(event.target.files[0]);
		var valImg = $(this).val();
		document.execCommand("delete", null, true); 
		document.execCommand('insertImage', null, tmppath);
		if (tmppath	 != 0){
			$(this).closest('ul').find('.descr b').html(valImg + ' загружен');
		}
	});

	// insert unordered list
	$(buttons.ulList).on('click', function() {
		document.execCommand('formatBlock', false, ''); 
		document.execCommand('insertunorderedlist');
	});

	// insert ordered list
	$(buttons.olList).on('click', function() {
		document.execCommand('formatBlock', false, ''); 
		document.execCommand('insertorderedlist');
	});

	// add table
	$(buttons.addTable).on('click', function() {
		var sTable = '';
		sTable = '<table><tbody>';
		var trValue = $('#tr-value').val();
		var tdValue = $('#td-value').val();

		for (var i=1; i <= trValue; i++) {
			sTable += '<tr>';
			for (var a=1; a <= tdValue; a++) {
				sTable += '<td>&nbsp;';
			}
		}

		document.execCommand("delete", null, true);
		document.execCommand('insertHtml', false, sTable);
	});
})(jQuery);
