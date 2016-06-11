function ajaxGetAmbulances() {
    $.ajax({
        type: "POST",
        data: "{}",
        url: "Dispatch.aspx/GetAmbulances",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            createTitles();
            $.each(data.d, function (index, item) {
                if (item.state == 0) 
                    createFreeAmb(item.ambulanceID, item.licensePlate, item.ambulanceType);
                else if (item.state == 1) 
                    createBusyAmb(item.ambulanceID, item.licensePlate, item.ambulanceType);
                $('#dispAmb_' + item.ambulanceID).addClass('.buttonOpacity');
            })
            //Assign case to an ambulance
            $("button[id^='dispAmb_']").click(function (e) {
                ajaxUpdateIncident();
                ambID = $(this).attr('id');
                ambLicense = $(this).html();
                var parts = ambID.split('_');
                ambID = parts[1];
                incident = {
                    incidentID: parts[1],
                    locationGPS: $("#" + copyOfPhone + "addressInput").val(),
                    callerLocation: $("#" + copyOfPhone + "cLocationInput").val(),
                    callerPhone: $("#" + copyOfPhone + "cPhoneInput").val(),
                    callerName: $("#" + copyOfPhone + "cNameInput").val(),
                    patientLocation: $("#" + copyOfPhone + "pLocationInput").val(),
                    patientState: $("#" + copyOfPhone + "pStateInput").val(),
                    patientInfo: $("#" + copyOfPhone + "pInfoInput").val(),
                    description: $("#" + copyOfPhone + "descInput").val()
                };
                var coordInc = $("#" + copyOfPhone + "cPos").val();
                //chat.server.sendIncident("amb" + ambID, incident);
                //chat.server.sendResolved(number);
                //chat.server.sendCoordinates("amb" + ambID, incident.posInc);
                //chat.server.updateAmbulanceState(ambID, "1");
                sendIncident(ambID, copyOfPhone, incident, "1", coordInc);
                e.preventDefault();
            });
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxUpdateIncident() {
    //var id = $("#" + phoneNumber + "cPos").val();
    var addressInput = $("#" + phoneNumber + "addressInput").val();
    var cLocationInput = $("#" + phoneNumber + "cLocationInput").val();
    var cNameInput = $("#" + phoneNumber + "cNameInput").val();
    var pLocationInput = $("#" + phoneNumber + "pLocationInput").val();
    var pStateInput = $("#" + phoneNumber + "pStateInput").val();
    var pInfoInput = $("#" + phoneNumber + "pInfoInput").val();
    var descriptionInput = $("#" + phoneNumber + "descInput").val();
    $.ajax({
        type: "POST",
        data: '{incidentID:"' + incidentID + '", gps:"' + addressInput + '", cLocation:"' + cLocationInput + '", cName:"' + cNameInput
               + '", pLocation:"' + pLocationInput + '", pState:"' + pStateInput + '", pInfo:"' + pInfoInput + '", description:"' + descriptionInput + '"}',
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
}

function ajaxUpdateAmbulanceStatus(state) {
    var ambulance = {
        ambulanceID: ambID,
        licensePlate: ambLicense,
        state: state
    };
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'ambulance': ambulance, 'id': ambID }),
        url: "Dispatch.aspx/UpdateAmbulance",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (data) {
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}


function createTable(number, incidentID) {
    $('<table id="' + number + 'table"><tr><td> <input type="hidden" id="' + number + 'cPos" value="' + incidentID + '"/></td></tr>' +
    '<tr><th>Data</th><td> <textarea readonly id="' + number + 'dateInput" rows="1" cols="50"></textarea></td></tr>' +
    '<tr><th>Adresa GPS</th><td> <textarea readonly id="' + number + 'addressInput" rows="4" cols="50"></textarea></td></tr>' +
    '<tr><th>Caller Location</th><td> <textarea id="' + number + 'cLocationInput" rows="4" cols="50" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Telefon</th><td> <textarea readonly id="' + number + 'cPhoneInput" rows="1" cols="50"></textarea></td></tr>' +
    '<tr><th>Caller name</th><td> <textarea id="' + number + 'cNameInput" rows="1" cols="50" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Locatie pacient</th><td> <textarea id="' + number + 'pLocationInput" rows="4" cols="50" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Stare pacient</th><td> <textarea id="' + number + 'pStateInput" rows="4" cols="50" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Date pacient</th><td> <textarea id="' + number + 'pInfoInput" rows="4" cols="50" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Ce s-a intamplat</th><td> <textarea id="' + number + 'descInput" rows="4" cols="50" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr></table>').appendTo('#infoCall');
    //$("#" + number + "table").siblings().hide();
}

function createFreeAmb(id, licensePlate, ambulanceType) {
    var listAmb = "<li id='liAmb_" + id + "'> <button id='dispAmb_" + id + "'>" + licensePlate + "</button>&nbsp&nbsp&nbsp<img id='imgAmb_" + id + "' src='/Images/GreenCircle.png'></li>";
    appendToList(ambulanceType, listAmb);
}

function createBusyAmb(id, licensePlate, ambulanceType) {
    var listAmb = "<li id='liAmb_" + id + "'> <button id='dispAmb_" + id + "'>" + licensePlate + "</button>&nbsp&nbsp&nbsp<img id='imgAmb_" + id + "' src='/Images/redC.png'></li>";
    appendToList(ambulanceType, listAmb)
}

function appendToList(ambulanceType, listAmb) {
    if (ambulanceType == 1)
        $('#listAmbA').append(listAmb);
    if (ambulanceType == 2)
        $('#listAmbB').append(listAmb);
    if (ambulanceType == 3)
        $('#listAmbC').append(listAmb);
}

function createTitles() {
    $('#listAmbA').append("<li> Tip A </li>");
    $('#listAmbB').append("<li> Tip B </li>");
    $('#listAmbC').append("<li> Tip C </li>");
}