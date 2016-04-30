var map;
var geocoder;

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
    var chat = $.connection.chatHub;
    $("#infoCall").hide();
    //chat.client.methodName = function (name, patient) {
    //    $('#' + name + '-menu1-pFName').html(patient.firstName);
    //    $('#' + name + '-menu1-pLName').html(patient.lastName);
    //    $('#' + name + '-menu1-pSSN').html(patient.ssn);
    //    $('#' + name + '-menu1-pDate').html(patient.date);
    //};

    //Show caller number
    chat.client.showNumber = function (number) {
        parts = number.split(';');
        number = parts[0];
        $("#callTable").append("<tr><th id=th" + number + "><img id=img" + number + " src='../Images/blink.gif'>" + number + "</th><td><button id='" + number + "respond'> Respond </button></td></tr>");
        $('[id^=' + number + ']').click(function (ev) {
            //Respond to call
            chat.server.sendResponse("yes;" + number);
            chat.server.sendBusySignal(username, number);
            $("#infoCall").show();
            $("button[id$='respond']").not('#' + number + 'respond').addClass('buttonOpacity');
            //Show ambulances status
            $.ajax({
                type: "POST",
                data: "{}",
                url: "Dispatch.aspx/GetAmbulances",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    $.each(data.d, function (index, item) {
                        if (item.state == 0)
                            var listAmb = "<li> <button id='dispAmb" + item.ambulanceID + "'> Amb" + item.ambulanceID + "</button>&nbsp&nbsp&nbsp<img src='/Images/GreenCircle.png'></li>";
                        else
                            var listAmb = "<li> <button id='dispAmb" + item.ambulanceID + "'> Amb" + item.ambulanceID + "</button>&nbsp&nbsp&nbsp<img src='/Images/RedCircle.png'></li>";
                        $('#listAmb').append(listAmb);

                    })
                    //Assign case to an ambulance
                    $("button[id^='dispAmb']").click(function (e) {
                        var id = parts[1];
                        var address = $("#addressInput").val();
                        var cLocation = $("#cLocationInput").val();
                        var cName = $("#cNameInput").val();
                        var pLocation = $("#pLocationInput").val();
                        var pState = $("#pStateInput").val();
                        var pInfo = $("#pInfoInput").val();
                        var description = $("#descInput").val();
                        $.ajax({
                            type: "POST",
                            data: '{id:"' + id + '", gps:"' + address + '", cLocation:"' + cLocation + '", cName:"' + cName
                                   + '", pLocation:"' + pLocation + '", pState:"' + pState + '", pInfo:"' + pInfo + '", description:"' + description + '"}',
                            url: "Dispatch.aspx/updateIncident",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(textStatus);
                            },
                            success: function (result) {
                                alert("success");
                            }
                        });
                        chat.server.sendTo(username, "hello", "amb1");
                        e.preventDefault();
                    });

                },
                failure: function (response) {
                    var r = jQuery.parseJSON(response.responseText);
                    alert("Message: " + r.Message);
                }
            })
            ev.preventDefault();
        });
    };

    //Show GPS location of number
    chat.client.sendPosition = function (pos, number) {
        var ll = pos.split(',');
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
                $("#addressInput").val(street + " " + streetNr + " " + city);
            }
        });
        var parts = number.split(';');
        $("#cPhoneInput").val(parts[0]);
    };

    chat.client.receiveBusySignal = function (fromWho, number) {
        $("#img" + number).remove();
        $('#th' + number).prepend('<img id="img"' + number + ' src="../Images/redC.png" />');
        if (username != fromWho)
            $('#' + number + 'respond').addClass('buttonOpacity');
        else
            alert("nu merge");
    };

    $.connection.hub.start().done(function () {


        //$("button[id^='dispAmb']").click(function () {
        //    alert("ba");

        //    chat.server.sendTo(username, "hello", "amb1");

        //});

        

        //chat.client.methodName = function (name, patient) {
        //    $('#' + name + '-menu1-pFName').html(patient.firstName);
        //    $('#' + name + '-menu1-pLName').html(patient.lastName);
        //    $('#' + name + '-menu1-pSSN').html(patient.ssn);
        //    $('#' + name + '-menu1-pDate').html(patient.date);
        //};
    });
 
});