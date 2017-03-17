jQuery(function() {


	jQuery('.feedback').submit( function( e ){

		e.preventDefault();

		var data = jQuery( this ).serialize();
		jQuery('.status_mail').html( 'Отправляем письмо...' );
		jQuery.post(
		    ajax_mailsend_object.ajaxurl,
		    {
		        action: 'ajax-mailsend',
		        nonce: ajax_mailsend_object.nonce,
		        post: data
		    }, 
		    function( response ) {
		    	jQuery('.status_mail').html( response.errors );
		    }
		);	

	});
	

});

