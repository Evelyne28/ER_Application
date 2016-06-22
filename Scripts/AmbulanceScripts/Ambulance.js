var map;
var geocoder;
var gmarkers = [];
var vitalSigns = [];
var vitalCount = 1;
var interval;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

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
    var ambulanceHub = $.connection.ambulanceHub;
    ambulanceHub.server.sendPatientER(fromWho, patient, allergyList, diseasesList);
}

function sendProblemER(fromWho, pComplaint, mObservations, injuries, mechanisms) {
    var ambulanceHub = $.connection.ambulanceHub;
    ambulanceHub.server.sendProblemER(fromWho, pComplaint, mObservations, injuries, mechanisms);
}

function sendVitalsER(fromWho, vitalSigns) {
    var ambulanceHub = $.connection.ambulanceHub;
    ambulanceHub.server.sendVitalsER(fromWho, vitalSigns);
}

function sendVitals(fromWho, vitalsList) {
    var ambulanceHub = $.connection.ambulanceHub;
    ambulanceHub.server.sendVitalsER(fromWho, vitalsList);
}

google.maps.event.addDomListener(window, "load", initialize);

$(function () {
   // context = document.getElementById('canvasInAPerfectWorld').getContext("2d");
    var canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', '350px');
    canvas.setAttribute('height', '200px');
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    $('#canvas').mousedown(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });
    $('#canvas').mouseup(function (e) {
        paint = false;
    });
    $('#canvas').mouseleave(function (e) {
        paint = false;
    });
    var ambulanceHub = $.connection.ambulanceHub;
    //var parts = username.split(' ');
    //username = parts[1];
    //ajaxOnLoad();
    $("#patientDiv").hide();
    $("#problemDiv").hide();
    $("#vitalDiv").hide();
    $('#interventionsDiv').hide();

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
    $('#interventionsMenu').on('click', function () {
        menuAdministration('interventions');
        $('#inputVitals').hide();
        $('#divRight').hide();
    });

    ambulanceHub.client.receiveIncidentDispatch = function (nameAmb, incident, coordInc) {
        interval = setInterval(notifyAmbulance, 400);
        $("#dispatchMenu").css('background-color', '#333');
        var id = $('#ambulanceID').val();
        //nameAmb = nameAmb.substring(3, nameAmb.length-1);
        if (nameAmb == id) {
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
    ambulanceHub.client.receiveCoordinates = function (toWho, coordinates) {
        var id = $('#ambulanceID').val();
        toWho = toWho.substring(3, toWho.length - 1);
        if (toWho == id) {
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
        ajaxSaveVitalSigns(vitalSigns);
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

    $(document).on('click', '#btnSaveInterventions', function (ev) {
        var intList = [];
        $('#blsDiv input[type="checkbox"]:checked').each(function () {
            var intervention = {};
            var name = $(this).attr('value');
            if (name == 'Controlul hemoragiei prin')
                intervention.intType = $('#inputBleeding').val();
            if (name == 'Imobilizare membru prin') {
                var selectedButton = $('#imobLimb input[type="radio"]:checked').val();
                intervention.intType = selectedButton;
            }
            if (name == 'RCP inceputa') {
                intervention.intHour = $('#rcpHour').val();
                intervention.intMin = $('#rcpMinute').val();
            }
            if (name == 'Defibrilare') {
                intervention.intNumber = $('#inputDefibNr').val();
                var selectedButton = $('#defibrilation input[type="radio"]:checked').val();
                intervention.intType = selectedButton;
            }
            if (name == 'Ventilatie artificiala') {
                var selectedButton = $('#artificialVentilation input[type="radio"]:checked').val();
                intervention.intType = selectedButton;
            }
            intervention.intName = name;
            intList.push(intervention);
        });
        ajaxSaveInterventions(intList);
        ev.preventDefault();
    });

    $.connection.hub.start().done(function () {
    });
});