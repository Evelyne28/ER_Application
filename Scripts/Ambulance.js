var map;
var geocoder;
var gmarkers = [];

//Map init and centered in Cluj-Napoca
function initialize() {
    var latlng = new google.maps.LatLng(46.765647, 23.587470);
    var myOptions = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapCall"),
            myOptions);
    geocoder = new google.maps.Geocoder();
}

function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    var monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
    var monthName = (monthNames[dt.getMonth()]);
    return (dt.getDate()) + " " + monthName + " " + dt.getFullYear();
}

google.maps.event.addDomListener(window, "load", initialize);

$(function () {
    var chat = $.connection.chatHub;
    var username = $('#welcome').text();
    var parts = username.split(' ');
    username = parts[1];
    $("#patientDiv").hide();

    $('#dispatchMenu').on('click', function () {
        $('#patientMenu').removeClass('red');
        $('#dispatchMenu').addClass('red');
        $('#dispatchDiv').show();
        $('#patientDiv').hide();
    });
    $('#patientMenu').on('click', function () {
        $('#dispatchMenu').removeClass('red');
        $('#patientMenu').addClass('red');
        $('#patientDiv').show();
        $('#dispatchDiv').hide();
    });
    chat.client.receiveIncident = function (toWho, incident) {
        setInterval(function () {
            var color = $("#dispatchMenu").css("background-color");
            if (color == 'rgb(51, 51, 51)') {
                $("#dispatchMenu").css('background-color', 'red');
            }
            else {
                $("#dispatchMenu").css('background-color', '#333');
            }
        }, 400);
        if (toWho == username) {
            $("#addressGPSInput").val(incident.locationGPS);
            $("#cLocationInput").val(incident.callerLocation);
            $("#cPhoneInput").val(incident.callerPhone);
            $("#cNameInput").val(incident.callerName);
            $("#pLocationInput").val(incident.patientLocation);
            $("#pStateInput").val(incident.patientState);
            $("#pInfoInput").val(incident.patientInfo);
            $("#descInput").val(incident.description);
        }
    }

    //Show GPS location of number
    chat.client.receiveCoordinates = function (toWho, coordinates) {
        if (toWho == username) {
            var ll = coordinates.split(',');
            var lat = parseFloat(ll[0]);
            var lng = parseFloat(ll[1]);
            var latlng = new google.maps.LatLng(lat, lng);
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: 'Hello World!'
            });
            gmarkers.push(marker);
            var infowindow = new google.maps.InfoWindow({
                content: "<span>" + number + "</span>"
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }
    }

    $(document).on('click', '#buttonCard', function (ev) {
        ev.preventDefault();
        $.ajax({
            type: "POST",
            data: "{}",
            url: "Ambulance.aspx/GetPatient",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data) {

                $.each(data.d, function (index, item) {
                    if (index == 'birthDate') {
                        var objDate = ToJavaScriptDate(item);
                        $('#' + index + 'Input').val(objDate);
                    }
                    else
                        $('#' + index + 'Input').val(item);
                })
            },
            failure: function (response) {
                var r = jQuery.parseJSON(response.responseText);
                alert("Message: " + r.Message);
            }
        })
        ev.preventDefault();
        return;
    });

    jQuery(function () {
        return $("body").on("click", ".search_camera_btn", function () {
            alert("Ready to enter start");
            return IW2.get_camera_list();
        });
    });
});