var map;
var geocoder;
var ambID;
var ambLicense;
var color = "";
var phoneNumber = "";
var copyOfPhone = "";
var incidentID = "";
var allNumbers = [];
var busyNumbers = [];
var waitingMap = [];
var dictionary = {};
var timestart = null;

var vis = "";
var stop = true;

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

function showtimer(timercount) {
    if (timercount) {
        clearTimeout(timercount);
        clockID = 0;
    }
    if (!timestart) {
        timestart = new Date();
    }
    var timeend = new Date();
    var timedifference = timeend.getTime() - timestart.getTime();
    timeend.setTime(timedifference);
    var minutes_passed = timeend.getMinutes();
    if (minutes_passed < 10) {
        minutes_passed = "0" + minutes_passed;
    }
    var seconds_passed = timeend.getSeconds();
    if (seconds_passed < 10) {
        seconds_passed = "0" + seconds_passed;
    }
    var minutes = minutes_passed + ":" + seconds_passed;
    $("#timetextarea" + copyOfPhone).val(minutes);
    timercount = setTimeout("showtimer()", 1000);
}

function timeCounter() {
    //if (!timercount) {
    //    timestart = new Date();
    //document.timetextarea.value = "00:00";
    var tCount = 0;
        $("#timetextarea" + copyOfPhone).val("00:00");
        //document.timeform.laptime.value = "";
        tCount = setTimeout("showtimer()", 1000, tCount);
    //}
    //else {
    //    alert("hello");
        //var timeend = new Date();
        //var timedifference = timeend.getTime() - timestart.getTime();
        //timeend.setTime(timedifference);
        //var minutes_passed = timeend.getMinutes();
        //if (minutes_passed < 10) {
        //    minutes_passed = "0" + minutes_passed;
        //}
        //var seconds_passed = timeend.getSeconds();
        //if (seconds_passed < 10) {
        //    seconds_passed = "0" + seconds_passed;
        //}
        //var milliseconds_passed = timeend.getMilliseconds();
        //if (milliseconds_passed < 10) {
        //    milliseconds_passed = "00" + milliseconds_passed;
        //}
        //else if (milliseconds_passed < 100) {
        //    milliseconds_passed = "0" + milliseconds_passed;
        //}
        //document.timeform.laptime.value = minutes_passed + ":" + seconds_passed + "." + milliseconds_passed;
   // }
}

function cronometro() {
    // if (stop == false) {
    values = dictionary[copyOfPhone];
    parts = values.split(';');
    minuti = parts[0];
    secondi = parts[1];
        secondi++;
        if (secondi > 59) {
            secondi = 0;
            minuti++;
        }
        values = minuti + ";" + secondi;
        dictionary[copyOfPhone] = values;
        mostra(secondi, minuti);
        setTimeout("cronometro()", 1000);
    //}
}
function mostra() {
    //if (ore < 10) vis = ""; else vis = ore;
    values = dictionary[copyOfPhone];
    parts = values.split(';');
    minuti = parts[0];
    secondi = parts[1];
    vis = "";
    if (minuti < 10) vis = vis + "0";
    vis = vis + minuti + ":";
    if (secondi < 10) vis = vis + "0";
    vis = vis + secondi;
    document.getElementById("timetextarea" + copyOfPhone).innerHTML = vis;
}


function sendIncident(nameAmb, number, incident, state, coordInc) {
    var dispatchCon = $.connection.dispatchHub;
    var ambulanceCon = $.connection.ambulanceHub;
    dispatchCon.server.sendResolvedDispatch(nameAmb, state, number, incident);
    ambulanceCon.server.sendIncidentAmbulance('amb' + nameAmb, incident, coordInc);
}

function appendWaitingTable(key, val) {
    if (val == 0)
        $("#tableWaiting").append("<tr><th id='th" + key + "'><img id='img" + key + "' src='../Images/redC.png'>"
            + key + "</th><td><button id='" + key + "info'> Info </button> <span id='timetextarea" + key + "'> 00:00 </span></td></tr>");
    if (val == 1)
        $("#tableWaiting").append("<tr><th id='th" + key + "'><img id='img" + key + "' src='../Images/yellowCircle.png'>"
            + key + "</th><td><button id='" + key + "info'> Info </button> <span id='timetextarea" + key + "'> 00:00 </span></td></tr>");
    if (val == 2)
        $("#tableWaiting").append("<tr><th id='th" + key + "'><img id='img" + key + "' src='../Images/GreenCircle.png'>"
            + key + "</th><td><button id='" + key + "info'> Info </button> <span id='timetextarea" + key + "'> 00:00 </span></td></tr>");
}

function orderTable() {
    //ordoneaza tabelul apelurilor in asteptare in functie de prioritate
    var sorted = waitingMap.slice(0).sort(function (a, b) {
        return a.value - b.value;
    });
    $('#tableWaiting tbody').remove();
    waitingMap = [];
    for (var i = 0, len = sorted.length; i < len; ++i) {
        waitingMap.push({
            key: sorted[i].key,
            value: sorted[i].value
        });
        appendWaitingTable(sorted[i].key, sorted[i].value);
    }
}

function orderWaitingTable(val) {
    $('#th' + phoneNumber).parent().remove();
    appendWaitingTable(phoneNumber, val);
    waitingMap.push({
        key: phoneNumber,
        value: val
    });
    orderTable();
}

google.maps.event.addDomListener(window, "load", initialize);
var username = $('#welcome').text();
var gmarkers = [];

var startLoc = new Array();
//startLoc[0] = 'Strada Agricultorilor 8, Cluj-Napoca';
//startLoc[1] = 'Piata Garii, Cluj-Napoca';
//startLoc[2] = 'Strada Ciprian Porumbescu 5, Cluj-Napoca';
//startLoc[3] = '46.769859, 23.580823';

var endLoc = new Array();
//endLoc[0] = 'Strada Hermann Oberth 5, Cluj-Napoca';
endLoc[1] = 'Strada Hermann Oberth 5, Cluj-Napoca';
//endLoc[2] = 'Strada Hermann Oberth 5, Cluj-Napoca';
//endLoc[3] = 'Strada Hermann Oberth 5, Cluj-Napoca';
$(function () {
    var dispatchCon = $.connection.dispatchHub;
    $("#infoCall").hide();
    $("#divCall").hide();
    $("#tableActions").hide();
    //Show caller number
    dispatchCon.client.showNumber = function (number) {
        parts = number.split(';');
        number = parts[0];
        allNumbers.push(number);
        if (phoneNumber != "") {
            $("#callTable").append("<tr><th id=th" + number + "><img id=img" + number + " src='../Images/blink.gif'>" + number + "</th><td><button id='" + number + "respond' class='buttonOpacity'> Respond </button></td></tr>");
            $("#" + phoneNumber + "table").siblings().hide();
        }
        else
            $("#callTable").append("<tr><th id=th" + number + "><img id=img" + number + " src='../Images/blink.gif'>" + number + "</th><td><button id='" + number + "respond'> Respond </button></td></tr>");
        //$("#" + phoneNumber + "table").siblings().hide();
        $("#" + number + "table").hide();

        $('button[id^=' + number + ']').click(function (ev) { //Respond to call
            phoneNumber = number;
            incidentID = parts[1];
            createTable(phoneNumber, parts[1]);
            $("#" + phoneNumber + "dateInput").val(parts[2] + " --- " + parts[3]);
            $("#" + phoneNumber + "table").siblings().hide();
            $("#" + phoneNumber + "table").show();
            dispatchCon.server.sendResponseDispatch("yes;" + number);
            dispatchCon.server.sendBusySignalDispatch(username, number);
            $("button[id$='respond']").addClass('buttonOpacity'); //disable la toate butoanele
            //disable butoane ambulanta
            $("#infoCall").show();
            $("#divCall").show();
            $("#tableActions").show();
            //$("#" + phoneNumber + "respond").addClass('buttonOpacity');
            //$("button[id$='respond']").not('#' + number + 'respond').addClass('buttonOpacity');
            $('#listAmbA').empty();
            ajaxGetAmbulances();
            ev.preventDefault();
        });
    };

    //Show GPS location of number
    dispatchCon.client.sendPosition = function (pos, number) {
        var parts = number.split(';');
        var ll = pos.split(',');
        $("#" + parts[0] +"cPos").val(pos);
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
            content: "<span>" + parts[0] + "</span>"
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
        //Show street name and number based on coordinates
        geocoder.geocode({
            'latLng': latlng
        }, function (results, status) {
            var result = results[0];
            var city = "";
            var street = "";
            var streetNr = "";
            for (var i = 0, len = result.address_components.length; i < len; i++) {
                var ac = result.address_components[i];
                if (ac.types.indexOf("street_number") >= 0) streetNr = ac.long_name;
                if (ac.types.indexOf("route") >= 0) street = ac.long_name;
                if (ac.types.indexOf("locality") >= 0) city = ac.long_name;
            }
            if (city != '' && street != '' && streetNr != '') {
                $("#" + parts[0] + "addressInput").val(street + " " + streetNr + " " + city);
            }
        });
        $("#" + parts[0] + "cPhoneInput").val(parts[0]);
    };

    //dispatchCon.client.receiveIncident = function (toWho, incident) {
    //    var nr = incident.callerPhone;
    //    $("#" + nr + "addressInput").val(incident.locationGPS);
    //    $("#" + nr + "cLocationInput").val(incident.callerLocation);
    //    $("#" + nr + "cPhoneInput").val(incident.callerPhone);
    //    $("#" + nr + "cNameInput").val(incident.callerName);
    //    $("#" + nr + "pLocationInput").val(incident.patientLocation);
    //    $("#" + nr + "pStateInput").val(incident.patientState);
    //    $("#" + nr + "pInfoInput").val(incident.patientInfo);
    //    $("#" + nr + "descInput").val(incident.description);
    //}

    dispatchCon.client.receiveBusySignal = function (fromWho, number) {
        busyNumbers.push(number);
        $("#img" + number).remove();
        $('#th' + number).prepend('<img id="img"' + number + ' src="../Images/redC.png" />');
        if (username != fromWho)
            $('#' + number + 'respond').addClass('buttonOpacity');
        
        //alert(fromWho);
    };

    dispatchCon.client.receiveBusyCall = function (fromWho, number) {
        for (var i = 0; i < allNumbers.length; i++) {
            if ($.inArray(allNumbers[i], busyNumbers) == -1)
                $('#' + allNumbers[i] + 'respond').removeClass('buttonOpacity');
            else
                $('#' + allNumbers[i] + 'respond').addClass('buttonOpacity');
        }
    };

    dispatchCon.client.receiveResolvedDispatch = function (nameAmb, state, number, incident) {
        //Receive incident
        var nr = incident.callerPhone;
        $("#" + nr + "addressInput").val(incident.locationGPS);
        $("#" + nr + "cLocationInput").val(incident.callerLocation);
        $("#" + nr + "cPhoneInput").val(incident.callerPhone);
        $("#" + nr + "cNameInput").val(incident.callerName);
        $("#" + nr + "pLocationInput").val(incident.patientLocation);
        $("#" + nr + "pStateInput").val(incident.patientState);
        $("#" + nr + "pInfoInput").val(incident.patientInfo);
        $("#" + nr + "descInput").val(incident.description);
        //Show resolved 
        $("#img" + number).remove();
        $('#th' + number).prepend('<img id="img"' + number + ' src="../Images/checked.png" />');
        //Update ambulance state
        $("#imgAmb_" + nameAmb).remove();
        if (state == "1") {
            $('#liAmb_' + nameAmb).append('<img id="imgAmb_"' + nameAmb + ' src="../Images/RedCircle.png" />');
            $('#dispAmb_' + item.ambulanceID).addClass('.buttonOpacity');
        }
        else {
            $('#liAmb_' + nameAmb).prepend('<img id="imgAmb_"' + nameAmb + ' src="../Images/GreenCircle.png" />');
            $('#dispAmb_' + item.ambulanceID).removeClass('.buttonOpacity');
        }
        ajaxUpdateAmbulanceStatus(state);
    }

    $(document).on('click', '#btnEndCall', function (ev) {
        //$("button[id^='dispAmb']").addClass('.buttonOpacity');
        if (color == "")
            alert("Please select incident gravity");
        else {
            $("button[id$='respond']").not('#' + phoneNumber + 'respond').removeClass('buttonOpacity');
            $('#' + phoneNumber + 'respond').addClass('buttonOpacity');
            for (var i = 0; i < allNumbers.length; i++) {
                if ($.inArray(allNumbers[i], busyNumbers) == -1)
                    $('#' + allNumbers[i] + 'respond').removeClass('buttonOpacity');
                else
                    $('#' + allNumbers[i] + 'respond').addClass('buttonOpacity');
            }
        }
        ajaxUpdateIncident();
        copyOfPhone = phoneNumber;
        phoneNumber = "";
        // ajaxSetSession();
        ev.preventDefault();
    });

    $(document).on('click', '#btnWait', function (ev) {
        if (color == "")
            alert("Please select incident gravity");
        else {
            if (color == 'red') 
                orderWaitingTable(0);
            if (color == 'yellow')
                orderWaitingTable(1);
            if (color == 'green') 
                orderWaitingTable(2);
            copyOfPhone = phoneNumber;
            //dictionary.push({
            //    key: phoneNumber,
            //    value: "0;0"
            //})
            $("button[id$='respond']").not('#' + phoneNumber + 'respond').removeClass('buttonOpacity');
            $('#' + phoneNumber + 'respond').addClass('buttonOpacity');
            for (var i = 0; i < allNumbers.length; i++) {
                if ($.inArray(allNumbers[i], busyNumbers) == -1)
                    $('#' + allNumbers[i] + 'respond').removeClass('buttonOpacity');
                else
                    $('#' + allNumbers[i] + 'respond').addClass('buttonOpacity');
            }
            dictionary[phoneNumber] = "0;0";
            //cronometro(0,0);
            phoneNumber = "";
        }
        ev.preventDefault();
    });

    $(document).on('click', '#btnRed', function (ev) {
        color = 'red';
        ev.preventDefault();
    });

    $(document).on('click', '#btnYellow', function (ev) {
        color = 'yellow';
        ev.preventDefault();
    });

    $(document).on('click', '#btnGreen', function (ev) {
        color = 'green';
        ev.preventDefault();
    });

    $.connection.hub.start().done(function () {
    });
 
});