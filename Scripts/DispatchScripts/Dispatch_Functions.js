function ajaxGetAmbulances() {
    $.ajax({
        type: "POST",
        data: "{}",
        url: "Dispatch.aspx/GetAmbulances",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data.d, function (index, item) {
                if (item.state == 0)
                    var listAmb = "<li id='liAmb_" + item.ambulanceID + "'> <button id='dispAmb_" + item.ambulanceID + "'>" + item.licensePlate
                        + "</button>&nbsp&nbsp&nbsp<img id='imgAmb_" + item.ambulanceID + "' src='/Images/GreenCircle.png'></li>";
                else 
                    var listAmb = "<li id='liAmb_" + item.ambulanceID + "'> <button id='dispAmb_" + item.ambulanceID + "'>" + item.licensePlate
                        + "</button>&nbsp&nbsp&nbsp<img id='imgAmb_" + item.ambulanceID + "' src='/Images/RedCircle.png'></li>";
                    
                $('#listAmb').append(listAmb);
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
                    locationGPS: $("#" + phoneNumber + "addressInput").val(),
                    callerLocation: $("#" + phoneNumber + "cLocationInput").val(),
                    callerPhone: $("#" + phoneNumber + "cPhoneInput").val(),
                    callerName: $("#" + phoneNumber + "cNameInput").val(),
                    patientLocation: $("#" + phoneNumber + "pLocationInput").val(),
                    patientState: $("#" + phoneNumber + "pStateInput").val(),
                    patientInfo: $("#" + phoneNumber + "pInfoInput").val(),
                    description: $("#" + phoneNumber + "descInput").val()
                };
                var coordInc = $("#" + phoneNumber + "cPos").val();
                //chat.server.sendIncident("amb" + ambID, incident);
                //chat.server.sendResolved(number);
                //chat.server.sendCoordinates("amb" + ambID, incident.posInc);
                //chat.server.updateAmbulanceState(ambID, "1");
                sendIncident(ambID, phoneNumber, incident, "1", coordInc);
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