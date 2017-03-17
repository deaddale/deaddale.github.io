// request a call expert (1):begin
function validateRequestCallExpertFirst(formData, jqForm, options) { 

    var nameValue = $('#request_call_expert_first form input[name=name]').fieldValue(); 
    var telephoneValue = $('#request_call_expert_first form input[name=telephone]').fieldValue(); 

    if (!nameValue[0] || !telephoneValue[0]) { 
        var name = $('#request_call_expert_first form input[name=name]').val();
        var telephone = $('#request_call_expert_first form input[name=telephone]').val();
        if (name == 0){
        	$('#request_call_expert_first form input[name=name]').addClass('red');
        }
        if (telephone == 0){
        	$('#request_call_expert_first form input[name=telephone]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
	$('#request_call_expert_first > div:nth-of-type(1), #request_call_expert_first > p,  #request_call_expert_first form').hide();
	$('#request_call_expert_first article').show();
	$('#request_call_expert_first form input[name=telephone]').removeClass('red');
	$('#request_call_expert_first form input[name=name]').removeClass('red');
}

$('#request_call_expert_first form').ajaxForm({
	dataType: 'json',
    beforeSubmit:  validateRequestCallExpertFirst,
    //Успешное окончание обработки
    success: function() {}    
});
// request a call expert (1):end

// how quickly find staff:begin
function validateHowQuicklyFindStaff(formData, jqForm, options) { 

    var nameValue = $('#how_quickly_find_staff form input[name=name]').fieldValue(); 
    var telephoneValue = $('#how_quickly_find_staff form input[name=telephone]').fieldValue();
    var emailValue = $('#how_quickly_find_staff form input[name=email]').fieldValue(); 

    if (!nameValue[0] || !telephoneValue[0] || !emailValue[0]) { 
        var name = $('#how_quickly_find_staff form input[name=name]').val();
        var telephone = $('#how_quickly_find_staff form input[name=telephone]').val();
        var email = $('#how_quickly_find_staff form input[name=email]').val();
        if (name == 0){
        	$('#how_quickly_find_staff form input[name=name]').addClass('red');
        }
        if (telephone == 0){
        	$('#how_quickly_find_staff form input[name=telephone]').addClass('red');
        }
        if (email == 0){
        	$('#how_quickly_find_staff form input[name=email]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
	$('#how_quickly_find_staff > div:nth-of-type(1), #how_quickly_find_staff > p,  #how_quickly_find_staff form').hide();
	$('#how_quickly_find_staff article').show();
	$('#how_quickly_find_staff form input[name=telephone]').removeClass('red');
	$('#how_quickly_find_staff form input[name=name]').removeClass('red');
	$('#how_quickly_find_staff form input[name=email]').removeClass('red');
}

$('#how_quickly_find_staff form').ajaxForm({
	dataType: 'json',
    beforeSubmit:  validateHowQuicklyFindStaff,
    //Успешное окончание обработки
    success: function() {}    
});
// how quickly find staff:end

// get a free consultation (1):begin
function validateGetAFreeConsultationFirst(formData, jqForm, options) { 

    var nameValue = $('#get_a_free_consultation_first form input[name=name]').fieldValue(); 
    var telephoneValue = $('#get_a_free_consultation_first form input[name=telephone]').fieldValue();

    if (!nameValue[0] || !telephoneValue[0]) { 
        var name = $('#get_a_free_consultation_first form input[name=name]').val();
        var telephone = $('#get_a_free_consultation_first form input[name=telephone]').val();
        if (name == 0){
        	$('#get_a_free_consultation_first form input[name=name]').addClass('red');
        }
        if (telephone == 0){
        	$('#get_a_free_consultation_first form input[name=telephone]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
	$('#get_a_free_consultation_first > div:nth-of-type(1), #get_a_free_consultation_first > p,  #get_a_free_consultation_first form').hide();
	$('#get_a_free_consultation_first article').show();
	$('#get_a_free_consultation_first form input[name=telephone]').removeClass('red');
	$('#get_a_free_consultation_first form input[name=name]').removeClass('red');
}

$('#get_a_free_consultation_first form').ajaxForm({
	dataType: 'json',
    beforeSubmit:  validateGetAFreeConsultationFirst,
    //Успешное окончание обработки
    success: function() {}    
});
// get a free consultation (1):end

// get consultation (1):begin
function validateGetConsultationFirst(formData, jqForm, options) { 

    var nameValue = $('#get_consultation_first form input[name=name]').fieldValue(); 
    var telephoneValue = $('#get_consultation_first form input[name=telephone]').fieldValue();
    var postValue = $('#get_consultation_first form input[name=post]').fieldValue();

    if (!nameValue[0] || !telephoneValue[0] || !postValue[0]) { 
        var name = $('#get_consultation_first form input[name=name]').val();
        var telephone = $('#get_consultation_first form input[name=telephone]').val();
        var post = $('#get_consultation_first form input[name=post]').val();
        if (name == 0){
        	$('#get_consultation_first form input[name=name]').addClass('red');
        }
        if (telephone == 0){
        	$('#get_consultation_first form input[name=telephone]').addClass('red');
        }
        if (post == 0){
        	$('#get_consultation_first form input[name=post]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
	$('#get_consultation_first > div:nth-of-type(1), #get_consultation_first > p,  #get_consultation_first form').hide();
	$('#get_consultation_first article').show();
	$('#get_consultation_first form input[name=telephone]').removeClass('red');
	$('#get_consultation_first form input[name=name]').removeClass('red');
}

$('#get_consultation_first form').ajaxForm({
	dataType: 'json',
    beforeSubmit:  validateGetConsultationFirst,
    //Успешное окончание обработки
    success: function() {}    
});
// get consultation (1):end

// request a call expert (2):begin
function validateRequestCallExpertSecond(formData, jqForm, options) { 

    var nameValue = $('#request_call_expert_second form input[name=name]').fieldValue(); 
    var telephoneValue = $('#request_call_expert_second form input[name=telephone]').fieldValue(); 

    if (!nameValue[0] || !telephoneValue[0]) { 
        var name = $('#request_call_expert_second form input[name=name]').val();
        var telephone = $('#request_call_expert_second form input[name=telephone]').val();
        if (name == 0){
            $('#request_call_expert_second form input[name=name]').addClass('red');
        }
        if (telephone == 0){
            $('#request_call_expert_second form input[name=telephone]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
    $('#request_call_expert_second > div:nth-of-type(1), #request_call_expert_second > p,  #request_call_expert_second form').hide();
    $('#request_call_expert_second article').show();
    $('#request_call_expert_second form input[name=telephone]').removeClass('red');
    $('#request_call_expert_second form input[name=name]').removeClass('red');
}

$('#request_call_expert_second form').ajaxForm({
    dataType: 'json',
    beforeSubmit:  validateRequestCallExpertSecond,
    //Успешное окончание обработки
    success: function() {}    
});
// request a call expert (2):end

// get consultation (20 resume):begin
function validateApplicationFor20Summary(formData, jqForm, options) { 

    var nameValue = $('#application_for_20_summary form input[name=name]').fieldValue(); 
    var telephoneValue = $('#application_for_20_summary form input[name=telephone]').fieldValue();
    var postValue = $('#application_for_20_summary form input[name=post]').fieldValue();

    if (!nameValue[0] || !telephoneValue[0] || !postValue[0]) { 
        var name = $('#application_for_20_summary form input[name=name]').val();
        var telephone = $('#application_for_20_summary form input[name=telephone]').val();
        var post = $('#application_for_20_summary form input[name=post]').val();
        if (name == 0){
            $('#application_for_20_summary form input[name=name]').addClass('red');
        }
        if (telephone == 0){
            $('#application_for_20_summary form input[name=telephone]').addClass('red');
        }
        if (post == 0){
            $('#application_for_20_summary form input[name=post]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
    $('#application_for_20_summary > div:nth-of-type(1), #application_for_20_summary > p,  #application_for_20_summary form').hide();
    $('#application_for_20_summary article').show();
    $('#application_for_20_summary form input[name=telephone]').removeClass('red');
    $('#application_for_20_summary form input[name=name]').removeClass('red');
}

$('#application_for_20_summary form').ajaxForm({
    dataType: 'json',
    beforeSubmit:  validateApplicationFor20Summary,
    //Успешное окончание обработки
    success: function() {}    
});
// get consultation (20 resume):end

// get consultation (40 resume):begin
function validateApplicationFor40Summary(formData, jqForm, options) { 

    var nameValue = $('#application_for_40_summary form input[name=name]').fieldValue(); 
    var telephoneValue = $('#application_for_40_summary form input[name=telephone]').fieldValue();
    var postValue = $('#application_for_40_summary form input[name=post]').fieldValue();

    if (!nameValue[0] || !telephoneValue[0] || !postValue[0]) { 
        var name = $('#application_for_40_summary form input[name=name]').val();
        var telephone = $('#application_for_40_summary form input[name=telephone]').val();
        var post = $('#application_for_40_summary form input[name=post]').val();
        if (name == 0){
            $('#application_for_40_summary form input[name=name]').addClass('red');
        }
        if (telephone == 0){
            $('#application_for_40_summary form input[name=telephone]').addClass('red');
        }
        if (post == 0){
            $('#application_for_40_summary form input[name=post]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
    $('#application_for_40_summary > div:nth-of-type(1), #application_for_40_summary > p,  #application_for_40_summary form').hide();
    $('#application_for_40_summary article').show();
    $('#application_for_40_summary form input[name=telephone]').removeClass('red');
    $('#application_for_40_summary form input[name=name]').removeClass('red');
}

$('#application_for_40_summary form').ajaxForm({
    dataType: 'json',
    beforeSubmit:  validateApplicationFor40Summary,
    //Успешное окончание обработки
    success: function() {}    
});
// get consultation (40 resume):end

// get consultation (100 resume):begin
function validateApplicationFor100Summary(formData, jqForm, options) { 

    var nameValue = $('#application_for_100_summary form input[name=name]').fieldValue(); 
    var telephoneValue = $('#application_for_100_summary form input[name=telephone]').fieldValue();
    var postValue = $('#application_for_100_summary form input[name=post]').fieldValue();

    if (!nameValue[0] || !telephoneValue[0] || !postValue[0]) { 
        var name = $('#application_for_100_summary form input[name=name]').val();
        var telephone = $('#application_for_100_summary form input[name=telephone]').val();
        var post = $('#application_for_100_summary form input[name=post]').val();
        if (name == 0){
            $('#application_for_100_summary form input[name=name]').addClass('red');
        }
        if (telephone == 0){
            $('#application_for_100_summary form input[name=telephone]').addClass('red');
        }
        if (post == 0){
            $('#application_for_100_summary form input[name=post]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
    $('#application_for_100_summary > div:nth-of-type(1), #application_for_100_summary > p,  #application_for_100_summary form').hide();
    $('#application_for_100_summary article').show();
    $('#application_for_100_summary form input[name=telephone]').removeClass('red');
    $('#application_for_100_summary form input[name=name]').removeClass('red');
}

$('#application_for_100_summary form').ajaxForm({
    dataType: 'json',
    beforeSubmit:  validateApplicationFor100Summary,
    //Успешное окончание обработки
    success: function() {}    
});
// get consultation (100 resume):end

// write a review:begin
function writeAReview(formData, jqForm, options) { 

    var nameValue = $('#write_a_review form input[name=name]').fieldValue(); 
    var companyValue = $('#write_a_review form input[name=company]').fieldValue();
    var postValue = $('#write_a_review form textarea[name=messageorquestion]').fieldValue();

    if (!nameValue[0] || !telephoneValue[0] || !postValue[0]) { 
        var name = $('#write_a_review form input[name=name]').val();
        var company = $('#write_a_review form input[name=company]').val();
        var post = $('#write_a_review form textarea[name=messageorquestion]').val();
        if (name == 0){
            $('#write_a_review form input[name=name]').addClass('red');
        }
        if (company == 0){
            $('#write_a_review form input[name=company]').addClass('red');
        }
        if (post == 0){
            $('#write_a_review form textarea[name=messageorquestion]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
    $('#write_a_review > div:nth-of-type(1), #write_a_review > p,  #write_a_review form').hide();
    $('#write_a_review article').show();
    $('#write_a_review form input[name=telephone]').removeClass('red');
    $('#write_a_review form input[name=name]').removeClass('red');
    $('#write_a_review form textarea[name=messageorquestion]').removeClass('red');
}

$('#write_a_review form').ajaxForm({
    dataType: 'json',
    beforeSubmit:  writeAReview,
    //Успешное окончание обработки
    success: function() {}    
});
// write a review:end

// get a free consultation (2):begin
function validateGetAFreeConsultationSecond(formData, jqForm, options) { 

    var nameValue = $('#get_a_free_consultation_second form input[name=name]').fieldValue(); 
    var telephoneValue = $('#get_a_free_consultation_second form input[name=telephone]').fieldValue();

    if (!nameValue[0] || !telephoneValue[0]) { 
        var name = $('#get_a_free_consultation_second form input[name=name]').val();
        var telephone = $('#get_a_free_consultation_second form input[name=telephone]').val();
        if (name == 0){
            $('#get_a_free_consultation_second form input[name=name]').addClass('red');
        }
        if (telephone == 0){
            $('#get_a_free_consultation_second form input[name=telephone]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
    $('#get_a_free_consultation_second > div:nth-of-type(1), #get_a_free_consultation_second > p,  #get_a_free_consultation_second form').hide();
    $('#get_a_free_consultation_second article').show();
    $('#get_a_free_consultation_second form input[name=telephone]').removeClass('red');
    $('#get_a_free_consultation_second form input[name=name]').removeClass('red');
}

$('#get_a_free_consultation_second form').ajaxForm({
    dataType: 'json',
    beforeSubmit:  validateGetAFreeConsultationSecond,
    //Успешное окончание обработки
    success: function() {}    
});
// get a free consultation (2):end

// get consultation (2):begin
function validateGetConsultationSecond(formData, jqForm, options) { 

    var nameValue = $('#get_consultation_second form input[name=name]').fieldValue(); 
    var telephoneValue = $('#get_consultation_second form input[name=telephone]').fieldValue();
    var postValue = $('#get_consultation_second form input[name=post]').fieldValue();

    if (!nameValue[0] || !telephoneValue[0] || !postValue[0]) { 
        var name = $('#get_consultation_second form input[name=name]').val();
        var telephone = $('#get_consultation_second form input[name=telephone]').val();
        var post = $('#get_consultation_second form input[name=post]').val();
        if (name == 0){
            $('#get_consultation_second form input[name=name]').addClass('red');
        }
        if (telephone == 0){
            $('#get_consultation_second form input[name=telephone]').addClass('red');
        }
        if (post == 0){
            $('#get_consultation_second form input[name=post]').addClass('red');
        }
        return false; 
    }
    //Успешное окончание обработки
    $('#get_consultation_second > div:nth-of-type(1), #get_consultation_second > p,  #get_consultation_second form').hide();
    $('#get_consultation_second article').show();
    $('#get_consultation_second form input[name=telephone]').removeClass('red');
    $('#get_consultation_second form input[name=name]').removeClass('red');
}

$('#get_consultation_second form').ajaxForm({
    dataType: 'json',
    beforeSubmit:  validateGetConsultationSecond,
    //Успешное окончание обработки
    success: function() {}    
});
// get consultation (2):end