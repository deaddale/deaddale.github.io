// Задаем ширину и высоту блоку с картой, а также рассчитываем высоту блока с информацией руководства:начало
$(function() {
    window.onresize = function(event) {
        var windowHeight = $(document).height();
        $('#map_canvas').css({'height' : windowHeight});

        if (windowHeight >= 500 && windowHeight < 600) {
            $('#info_contacts_content').css({'height' : '190'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }

        else if (windowHeight >= 600 && windowHeight < 620) {
            $('#info_contacts_content').css({'height' : '200'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }

        else if (windowHeight >= 620 && windowHeight < 640) {
            $('#info_contacts_content').css({'height' : '260'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }      
        else if (640 < windowHeight && windowHeight <= 660) {
            $('#info_contacts_content').css({'height' : '280'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (660 < windowHeight && windowHeight <= 680) {
            $('#info_contacts_content').css({'height' : '300'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (680 < windowHeight && windowHeight <= 700) {
            $('#info_contacts_content').css({'height' : '300'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (700 < windowHeight && windowHeight <= 720) {
            $('#info_contacts_content').css({'height' : '330'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (720 < windowHeight && windowHeight <= 740) {
            $('#info_contacts_content').css({'height' : '355'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (740 < windowHeight && windowHeight <= 760) {
            $('#info_contacts_content').css({'height' : '375'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (760 < windowHeight && windowHeight <= 780) {
            $('#info_contacts_content').css({'height' : '400'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (780 < windowHeight && windowHeight <= 800) {
            $('#info_contacts_content').css({'height' : '425'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (800 < windowHeight && windowHeight <= 820) {
            $('#info_contacts_content').css({'height' : '450'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
        else if (820 < windowHeight && windowHeight <= 900) {
            $('#info_contacts_content').css({'height' : '500'});
            $('#info_contacts_content').jScrollPane();
            // alert(windowHeight);
        }
    }
    var windowHeight = $(document).height();
    $('#map_canvas').css({'height' : windowHeight});

    if (windowHeight >= 500 && windowHeight < 600) {
        $('#info_contacts_content').css({'height' : '190'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }

    else if (windowHeight >= 600 && windowHeight < 620) {
        $('#info_contacts_content').css({'height' : '200'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }

    else if (windowHeight >= 620 && windowHeight < 640) {
        $('#info_contacts_content').css({'height' : '260'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }      
    else if (640 < windowHeight && windowHeight <= 660) {
        $('#info_contacts_content').css({'height' : '280'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (660 < windowHeight && windowHeight <= 680) {
        $('#info_contacts_content').css({'height' : '300'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (680 < windowHeight && windowHeight <= 700) {
        $('#info_contacts_content').css({'height' : '300'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (700 < windowHeight && windowHeight <= 720) {
        $('#info_contacts_content').css({'height' : '330'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (720 < windowHeight && windowHeight <= 740) {
        $('#info_contacts_content').css({'height' : '355'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (740 < windowHeight && windowHeight <= 760) {
        $('#info_contacts_content').css({'height' : '375'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (760 < windowHeight && windowHeight <= 780) {
        $('#info_contacts_content').css({'height' : '400'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (780 < windowHeight && windowHeight <= 800) {
        $('#info_contacts_content').css({'height' : '425'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (800 < windowHeight && windowHeight <= 820) {
        $('#info_contacts_content').css({'height' : '450'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
    else if (820 < windowHeight && windowHeight <= 900) {
        $('#info_contacts_content').css({'height' : '500'});
        $('#info_contacts_content').jScrollPane();
        // alert(windowHeight);
    }
});

// карта от Google Maps

// инициализируем карту
function initialize() {
    var latlng = new google.maps.LatLng(56.856739,35.908682);
    var settings = {
        zoom: 17,
        center: latlng,
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), 
    settings);

    var companyLogo = new google.maps.MarkerImage('images/content/marker_decoracia.png',
        new google.maps.Size(84,106),
        new google.maps.Point(0,0),
        new google.maps.Point(50,50)
    );
    // var companyShadow = new google.maps.MarkerImage('images/content/marker_decoracia.png',
    //     new google.maps.Size(130,50),
    //     new google.maps.Point(0,0),
    //     new google.maps.Point(65, 50)
    // );
    var companyPos = new google.maps.LatLng(56.856774,35.906128);
    var companyMarker = new google.maps.Marker({
        position: companyPos,
        map: map,
        icon: companyLogo,
        // shadow: companyShadow,
        title:"Декорация. Тверь, ул. Симеоновская, 7",
    });
}

// Задаем ширину и высоту блоку с картой, а также рассчитываем высоту блока с информацией руководства:конец