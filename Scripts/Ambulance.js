var map;
var geocoder;
var gmarkers = [];
var vitalCount = 2;

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

function addTime(number, rowID) {
    $('<td> <input type="text" name="' + number + 'hourInput" id="' + number + 'hourInput"/>' +
    '<input type="text" name="' + number + 'minuteInput" id="' + number + 'minuteInput"/></td>').appendTo('#' + rowID);
    var now = new Date();
    $('#' + number + 'hourInput').val(now.getHours());
    $('#' + number + 'minuteInput').val(now.getMinutes());
    return;
}

function addRespiration(number, rowID) {
    $('<td> <span>Rate</span> <input type="text" name="' + number + 'respRateInput" id="' + number + 'respRateInput"/><br/>' +
    '<input type="radio" name="' + number + 'respType" value="Regular"/> Regular <br/>' + 
    '<input type="radio" name="' + number + 'respType" value="Shallow"/> Shallow <br/>' +
    '<input type="radio" name="' + number + 'respType" value="Labored"/> Labored <br/></td>').appendTo('#' + rowID);
    return;
}

function addPulse(number, rowID) {
    $('<td> <span>Rate</span> <input type="text" name="' + number + 'pulseRateInput" id="' + number + 'pulseRateInput"/><br/>' +
    '<input type="radio" name="' + number + 'pulseType" value="Regular"/> Regular <br/>' +
    '<input type="radio" name="' + number + 'pulseType" value="Irregular"/> Irregular <br/></td>').appendTo('#' + rowID);
    return;
}

function addConsciousness(number, rowID) {
    $('<td> <input type="radio" name="' + number + 'counsType" value="Alert"/> Alert <br/>' +
    '<input type="radio" name="' + number + 'counsType" value="Voice"/> Voice <br/>' +
    '<input type="radio" name="' + number + 'counsType" value="Pain"/> Pain <br/>' +
    '<input type="radio" name="' + number + 'counsType" value="Unresponsive"/> Unresponsive <br/></td>').appendTo('#' + rowID);
    return;
}

function addPupils(number, rowID) {
    $('<td> <input type="radio" name="' + number + 'pupilType" value="Normal"/> <span>Normal</span> <br/>' +
    '<input type="radio" name="' + number + 'pupilType" value="Dilated"/> <span>Dilated</span> <br/>' +
    '<input type="radio" name="' + number + 'pupilType" value="No reaction"/> <span>No reaction</span> <br/></td>').appendTo('#' + rowID);
    return;
}

function addSkin(number, rowID) {
    $('<td> <input type="radio" name="' + number + 'skinType" value="Cool"/> Cool <br/>' +
    '<input type="radio" name="' + number + 'skinType" value="Pale"/> Pale <br/>' +
    '<input type="radio" name="' + number + 'skinType" value="Worm"/> Worm <br/></td>').appendTo('#' + rowID);
    return;
}

function createRow(number) {
    var $row = $('<tr id="' + number + 'vitalTR"></tr>');
    $('#vitalTable > tbody:last').append($row);
    rowID = number + "vitalTR";
    addTime(number, rowID);
    addConsciousness(number, rowID);
    addRespiration(number, rowID);
    addPulse(number, rowID);  
    addPupils(number, rowID);
    addSkin(number, rowID);
    return;
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
    $("#vitalDiv").hide();

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
    $('#vitalMenu').on('click', function () {
        menuAdministration('vital');
        createRow(1, "1vitalTR");
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
       // ajaxSetSession();
        ev.preventDefault();
    });

    //Scan card
    $(document).on('click', '#buttonCard', function (ev) {
        ajaxScanCard();
        //ajaxAddPatientAmbulance();
        //ajaxSetSession();
        ev.preventDefault();
        return;
    });

    $(document).on('click', '#addVital', function (ev) {
        createRow(vitalCount);    
        vitalCount++;
        ev.preventDefault();
    });

    $(document).on('click', '#saveVitals', function (ev) {
        var vitalSigns = [];
        for (var i = 1; i < vitalCount; i++) {
            var now = new Date();
            now.setHours($('#' + i + 'hourInput').val());
            now.setMinutes($('#' + i + 'minuteInput').val())
            var vitalSign = {
                vitalTime: now,
                consciousnessType: $('input[name="' + i + 'counsType"]:checked').val(),
                respirationRate: $('#' + i + 'respRateInput').val(),
                respirationType: $('input[name="' + i + 'respType"]:checked').val(),
                pulseRate: $('#' + i + 'pulseRateInput').val(),
                pulseType: $('input[name="' + i + 'pulseType"]:checked').val(),
                pulseBP: 'smth',
                rightPupilType: 'right',
                leftPupilType: $('input[name="' + i + 'pupilType"]:checked').val(),
                skinType: $('input[name="' + i + 'skinType"]:checked').val(),
            }
            vitalSigns.push(vitalSign);
        }
        ajaxAddVitalSigns(vitalSigns);
        ev.preventDefault();
    });

    $(document).on('click', '#btnSave', function (ev) {
        ajaxSaveProblems();
        ev.preventDefault();
    });
});