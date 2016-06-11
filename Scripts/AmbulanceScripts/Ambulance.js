var map;
var geocoder;
var gmarkers = [];
var vitalSigns = [];
var vitalCount = 1;
var interval;

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

function sendPatientER(fromWho, patient, allergyList, diseasesList) {
    var chat = $.connection.chatHub;
    chat.server.sendPatientER(fromWho, patient, allergyList, diseasesList);
}

function sendProblemER(fromWho, pComplaint, mObservations, injuries) {
    var chat = $.connection.chatHub;
    chat.server.sendProblemER(fromWho, pComplaint, mObservations, injuries);
}

function sendVitals(fromWho, vitalsList) {
    var chat = $.connection.chatHub;
    chat.server.sendVitalsER(fromWho, vitalsList);
}

google.maps.event.addDomListener(window, "load", initialize);

$(function () {   
    var chat = $.connection.ambulanceHub;
    var username = $('#welcome').text();
    var parts = username.split(' ');
    username = parts[1];
    //ajaxOnLoad();
    $("#patientDiv").hide();
    $("#problemDiv").hide();
    $("#vitalDiv").hide();

    $(document).click(function () {
        clearInterval(interval);    
    });

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
        $('#inputVitals').hide();
        $('#divRight').hide();
    });

    chat.client.receiveIncidentDispatch = function (nameAmb, incident, coordInc) {
        interval = setInterval(notifyAmbulance, 400);
        if (nameAmb == username) {
            $("#cIncidentID").val(incident.incidentID);
            $("#addressGPSInput").val(incident.locationGPS);
            $("#cLocationInput").val(incident.callerLocation);
            $("#cPhoneInput").val(incident.callerPhone);
            $("#cNameInput").val(incident.callerName);
            $("#pLocationInput").val(incident.patientLocation);
            $("#pStateInput").val(incident.patientState);
            $("#pInfoInput").val(incident.patientInfo);
            $("#descInput").val(incident.description);
            //Receive coordinates
            var ll = coordInc.split(',');
            var lat = parseFloat(ll[0]);
            var lng = parseFloat(ll[1]);
            var latlng = new google.maps.LatLng(lat, lng);
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: incident.callerPhone
            });
            gmarkers.push(marker);
            var infowindow = new google.maps.InfoWindow({
                content: "<span>" + incident.callerPhone + "</span>"
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
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
        $("#buttonCard").addClass('buttonOpacity');
        ajaxAddPatient();
       // ajaxSetSession();
        ev.preventDefault();
    });

    //Scan card
    $(document).on('click', '#buttonCard', function (ev) {
        $("#btnAddPatient").addClass('buttonOpacity');
        ajaxScanCard();
        //ajaxAddPatientAmbulance();
        //ajaxSetSession();
        ev.preventDefault();
        return;
    });

    $(document).on('click', '#addVital', function (ev) {
        $('#inputVitals').show();
        $('#divRight').show();
        $('#btnAddVital').addClass('buttonOpacity');
        $('#saveVitals').addClass('buttonOpacity');
        ev.preventDefault();
    });

    $("button[id$='removeVital']").click(function (ev) {
        id = $(this).attr('id');
        nr = id.charAt(0);
        $('#vitalTable tr #' + nr + 'vitalTR').remove();
        ev.preventDefault();
    });

    $(document).on('click', "button[id$='removeVital']", function (ev) {
        if (confirm('Are you sure ?')) {
            $(this).closest('tr').remove();
        }      
        ev.preventDefault();
    });

    $(document).on('click', '#btnGenerateVitals', function (ev) {
        generateVitals();
        ev.preventDefault();
    });

    $(document).on('click', '#saveVitals', function (ev) {
        ajaxAddVitalSigns(vitalSigns);
        ev.preventDefault();
    });

    $(document).on('click', '#btnAddVital', function (ev) {
        var now = new Date();
        var vitalSign = {   
            vitalTime: now,
            systolic: $('#inputSistolic').val(),
            diastolic: $('#inputDiastolic').val(),
            pulseRate: $('#inputPulsRate').val(),
            pulseType: $('input[name="puls"]:checked').val(),
            respirationRate: $('#inputRespiratieRate').val(),
            respirationType: $('input[name="respiratie"]:checked').val(),
            spo2: $('#inputSPO2').val(),
            co2: $('#inputCO2').val(),
            bloodSugar: $('#inputBS').val(),
            temperature: $('#inputTemperature').val(),
            skinType: $('input[name="skin"]:checked').val(),
            leftPupilType: $('input[name="pupilLeft"]:checked').val(),
            rightPupilType: $('input[name="pupilRight"]:checked').val(),
            pain: $('#inputPain').val(),
            consciousnessType: $('input[name="consciousness"]:checked').val()
        }
        vitalSigns.push(vitalSign);
        createRow(vitalSign, vitalCount);
        vitalCount++;
       // ajaxAddVitalSigns(vitalSigns);
        ev.preventDefault();
    });

    $(document).on('click', '#btnSave', function (ev) {
        ajaxSaveProblems();
        ev.preventDefault();
    });

    $.connection.hub.start().done(function () {
    });
});