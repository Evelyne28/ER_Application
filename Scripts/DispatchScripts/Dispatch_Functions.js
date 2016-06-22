function ajaxGetIncidents() {
    $.ajax({
        type: "POST",
        data: "{}",
        url: "Dispatch.aspx/GetIncidents",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data.d, function (index, item) {
                number = item.callerPhone;
                id = item.incidentID;
                allNumbers.push(number);
                if (item.resolved == 0 && phoneNumber != "") {
                    $("#callTable").append("<tr><th id=th" + number + "><img id=img" + number + " src='../Images/blink.gif'>" + number + "</th><td><button id='" + number + "respond' class='buttonOpacity'> Respond </button></td></tr>");
                    $("#" + phoneNumber + "table").siblings().hide();
                }
                else if (item.resolved == 0 && phoneNumber == "")
                    $("#callTable").append("<tr><th id=th" + number + "><img id=img" + number + " src='../Images/blink.gif'>" + number + "</th><td><button id='" + number + "respond'> Respond </button></td></tr>");
                else if (item.resolved == 2 && phoneNumber == "" && item.gravity == "red") {
                    appendWaitingTable(id + "_" + number, 0);
                    waitingMap.push({
                        key: id + "_" + number,
                        value: 0
                    });
                }
                else if (item.resolved == 2 && phoneNumber == "" && item.gravity == "yellow") {
                    appendWaitingTable(id + "_" + number, 1);
                    waitingMap.push({
                        key: id + "_" + number,
                        value: 1
                    });
                }
                else if (item.resolved == 2 && phoneNumber == "" && item.gravity == "green") {
                    appendWaitingTable(id + "_" + number, 2);
                    waitingMap.push({
                        key: id + "_" + number,
                        value: 2
                    });
                }
                //$("#" + phoneNumber + "table").siblings().hide();
                orderTable();
                $("#" + number + "table").hide();
            })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

function ajaxGetAmbulances() {
    $('#listAmbA').empty();
    $('#listAmbB').empty();
    $('#listAmbC').empty();
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
                //$('#dispAmb_' + item.ambulanceID).addClass('.buttonOpacity');
            });
            $('button[id^="dispAmb_"]').addClass('buttonOpacity');
            //Assign case to an ambulance
            $("button[id^='dispAmb_']").click(function (e) {
                //ajaxUpdateIncident();
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
                $(this).addClass('buttonOpacity');
                //chat.server.sendIncident("amb" + ambID, incident);
                //chat.server.sendResolved(number);
                //chat.server.sendCoordinates("amb" + ambID, incident.posInc);
                //chat.server.updateAmbulanceState(ambID, "1");
                sendIncident(ambID, copyOfPhone, incident, "1", coordInc);
                $('#callTable #th' + copyOfPhone).parent().remove();
                $('#tableWaiting #th' + copyOfPhone).parent().remove();
                resolvedCalls.push(copyOfPhone);
                var nr = resolvedCalls[0];
                if (resolvedCalls.length > 10)
                    resolvedCalls.shift();
                $('#tableResolved #th' + nr).parent().remove();
                $("#tableResolved").append("<tr><th id='th" + copyOfPhone + "'>" + copyOfPhone + "</th><td><button id='" + copyOfPhone + "done'> Info </button></td></tr>");
                //ajaxUpdateIncidentResolved(ambID);
                e.preventDefault();
            });
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxGetIncident(number, id) {
    $.ajax({
        type: "POST",
        data: '{id:"' + id + '"}',
        url: "Dispatch.aspx/GetIncident",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data.d, function (index, item) {
                if (index == 'locationGPS') 
                    $("#" + number + "addressInput").val(item);
                if (index == 'callerLocation')
                    $("#" + number + "cLocationInput").val(item);
                if (index == 'callerPhone')
                    $("#" + number + "cPhoneInput").val(item);
                if (index == 'callerName')
                    $("#" + number + "cNameInput").val(item);
                if (index == 'patientLocation')
                    $("#" + number + "pLocationInput").val(item);
                if (index == 'patientState')
                    $("#" + number + "pStateInput").val(item);
                if (index == 'patientInfo')
                    $("#" + number + "pInfoInput").val(item);
                if (index == 'description')
                    $("#" + number + "descInput").val(item);
            });
        },
        error: function (result) {
            alert(result);
        }
    });
}

function ajaxUpdateIncident(resolved) {
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
        data: '{incidentID:"' + incidentID + '", gps:"' + addressInput + '", cLocation:"' + cLocationInput + '", cName:"' + cNameInput + '", pLocation:"'
            + pLocationInput + '", pState:"' + pStateInput + '", pInfo:"' + pInfoInput + '", description:"' + descriptionInput + '", gravity:"'
            + color + '", resolved:"' + resolved + '"}',
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

function ajaxUpdateIncidentResolved(nameAmb) {
    $.ajax({
        type: "POST",
        data: '{incidentID:"' + incidentID + '"}',
        url: "Dispatch.aspx/updateIncidentResolved",
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

function ajaxUpdateIncidentGravity(nameAmb) {
    $.ajax({
        type: "POST",
        data: '{incidentID:"' + incidentID + '", gravity:"' + color + '"}',
        url: "Dispatch.aspx/updateIncidentGravity",
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

function ajaxUpdateAmbulanceStatus(nameAmb, state) {
    var ambulance = {
        ambulanceID: nameAmb,
        licensePlate: ambLicense,
        state: state
    };
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'state': state, 'id': ambID }),
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
    '<tr><th class="tableth">Data</th><td class="tabletd"> <textarea readonly id="' + number + 'dateInput" rows="1" ></textarea></td>' +
    '<th class="tableth">Nume pacient</th><td class="tabletd"> <textarea id="' + number + 'pNameInput" rows="1" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Adresa GPS</th><td> <textarea readonly id="' + number + 'addressInput" rows="3"></textarea></td>' +
    '<th>Locatie pacient</th><td> <textarea id="' + number + 'pLocationInput" rows="3" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Telefon</th><td> <textarea readonly id="' + number + 'cPhoneInput" rows="1"></textarea></td>' +
    '<th>Stare pacient</th><td> <textarea id="' + number + 'pStateInput" rows="3" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Caller Location</th><td> <textarea id="' + number + 'cLocationInput" rows="3" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td>' +
    '<th>Date pacient</th><td> <textarea id="' + number + 'pInfoInput" rows="3" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<tr><th>Nume</th><td> <textarea id="' + number + 'cNameInput" rows="1" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td>' +
    //'<tr><th>Locatie pacient</th><td> <textarea id="' + number + 'pLocationInput" rows="4" cols="50" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr>' +
    '<th>Ce s-a intamplat</th><td> <textarea id="' + number + 'descInput" rows="3" style="background-color:rgba(255, 107, 107, 0.22)"></textarea></td></tr></table>').appendTo('#infoCall');
    //$("#" + number + "table").siblings().hide();
}

function createFreeAmb(id, licensePlate, ambulanceType) {
    var listAmb = "<li id='liAmb_" + id + "'> <button id='dispAmb_" + id + "'>" + licensePlate + "</button>&nbsp&nbsp&nbsp<img id='imgAmb_" + id + "' src='/Images/GreenCircle.png'></li>";
    appendToList(ambulanceType, listAmb);
}

function createBusyAmb(id, licensePlate, ambulanceType) {
    busyAmb.push(id);
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

function manageAmb() {
    $('button[id^="dispAmb_"]').removeClass('buttonOpacity');
    if (busyAmb.length > 0)
        for (var i = 1; i <= busyAmb.length; i++) {
            $('#dispAmb_' + busyAmb[i]).addClass('buttonOpacity');
        }
}