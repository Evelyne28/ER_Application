﻿var map;
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

function menuAdministration(value) {
    var items = ["dispatch", "patient", "problem", "vital", "interventions"];
    if (value == 'dispatch') {
        $("#mapCall").css({ opacity: 1, zoom: 1 });
        document.getElementById('mapCall').style.width = '40%';
    }
    else {
        $("#mapCall").css({ opacity: 0, zoom: 0 });
        document.getElementById('mapCall').style.width = '10%';
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i] == value) {
            $('#' + items[i] + 'Menu').addClass('red');
            $('#' + items[i] + 'Div').show();
        }
        else {
            $('#' + items[i] + 'Menu').removeClass('red');
            $('#' + items[i] + 'Div').hide();
        }
    }
}

google.maps.event.addDomListener(window, "load", initialize);

$(function () {   
    var chat = $.connection.chatHub;
    var username = $('#welcome').text();
    var parts = username.split(' ');
    username = parts[1];
    //ajaxOnLoad();
    $("#patientDiv").hide();
    $("#problemDiv").hide();

    $('#dispatchMenu').on('click', function () {
        menuAdministration('dispatch');
    });
    $('#patientMenu').on('click', function () {
        menuAdministration('patient');
        if ($('#ulAllergies li').length == 0 && $('#ulHistory li').length == 0)
            ajaxPatient();
    });
    $('#problemMenu').on('click', function () {
        menuAdministration('problem');
        if ($('#ulInjuries li').length == 0 && $('#ulMechanism li').length == 0)
            ajaxProblem();
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
            $("#cIncidentID").val(incident.incidentID);
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

    //Add patient
    $(document).on('click', '#btnAddPatient', function (ev) {
        ajaxAddPatient();
        ajaxSetSession();
        ev.preventDefault();
    });

    //Scan card
    $(document).on('click', '#buttonCard', function (ev) {
        ajaxScanCard();
        ajaxAddPatientAmbulance();
        ev.preventDefault();
        return;
    });

    //jQuery(function () {
    //    return $("body").on("click", ".search_camera_btn", function () {
    //        alert("Ready to enter start");
    //        return IW2.get_camera_list();
    //    });
    //});
});