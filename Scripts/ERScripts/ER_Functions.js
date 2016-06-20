function ajaxGetAmbulances() {
    $.ajax({ //Get all ambulances
        type: "POST",
        data: "{}",
        url: "ER.aspx/GetAmbulances",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {

            $.each(data.d, function (i, item) {
                var liAmb = "<li> <button id='btnAmb" + item.ambulanceID + "'>" + item.licensePlate + "</button></li>";
                $('#ulAmb').append(liAmb);
            });
            $("button[id^='btnAmb']").click(function (ev) {
                ambID = $(this).attr('id');
                id = ambID.substr(ambID.length - 1);
                menuAdministration('patient');
                hideAndShow(id, 'patientDiv');
                ev.preventDefault();
            });
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function menuAdministration(value) {
    var items = ["dispatch", "patient", "problem", "vital", "interventions"];
    if (value == 'dispatch') {
        $("#mapCall").css({ opacity: 1, zoom: 1 });
        document.getElementById('mapCall').style.width = '40%';
    }
    else {
        $("#mapCall").css({ opacity: 0, zoom: 0 });
        document.getElementById('mapCall').style.width = '5%';
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

function hideAndShow(ambID, name) {
    $('#' + ambID + name).show();
    $('#' + ambID + name).siblings().hide();
}

function createDiv(id, name) {
    $('<div id="' + id + name + '"</div>').appendTo('#' + name);
}

function createPatient(number) {
    $('<table id="' + number + 'patientTable"><tr><td> <input type="hidden" id="' + number + 'patientID"/></td></tr>' +
    '<tr><th>Nume</th><td> <input type="text" id="' + number + 'lastNameInput"/></td></tr>' +
    '<tr><th>Prenume</th><td> <input type="text" id="' + number + 'firstNameInput"/></td></tr>' +
    '<tr><th>CNP</th><td> <input type="text" id="' + number + 'ssnInput"/></td></tr>' +
    '<tr><th>Sex</th><td> <input type="text" id="' + number + 'genderInput"/></td></tr>' +
    '<tr><th>Adresa</th><td> <input type="text" id="' + number + 'addressInput"/></td></tr>' +
    '<tr><th>Telefon</th><td> <input type="text" id="' + number + 'phoneInput"/></td></tr>' +
    '<tr><th>Data nasterii</th><td> <input type="text" id="' + number + 'birthDateInput"/></td></tr>' +
    '<tr><th>Varsta</th><td> <input type="text" id="' + number + 'ageInput"/></td></tr>' +
    '<tr><th>Oras</th><td> <input type="text" id="' + number + 'cityInput"/></td></tr>' +
    '<tr><th>Judet</th><td> <input type="text" id="' + number + 'countyInput"/></td></tr>' +
    '<tr><th>Cod postal</th><td> <input type="text" id="' + number + 'zipCodeInput"/></td></tr>' +
    '<tr><th>Grupa sangvina</th><td> <input type="text" id="' + number + 'bloodTypeInput"/></td></tr></td></tr></table>').appendTo('#' + number + 'patientDiv');
    $('<div id="' + number + 'divReceive">').appendTo('#' + number + 'patientDiv');
}

function createAllergies(number) {
    $('<div id="' + number + 'divAllergies"><p class="pAllergy"> Alergii </p><ul id="' + number + 'ulAllergies"></ul></div>').appendTo('#' + number + 'divReceive');
}

function createDiseases(number) {
    $('<div id="' + number + 'divHistory"><p class="pHistory"> Istoric medical </p><ul id="' + number + 'ulDiseases"></ul></div>').appendTo('#' + number + 'divReceive');
}

function createObservations(number) {
    $('<table id="' + number + 'commentsPb">' +
    '<tr><th>Ce acuza pacientul</th><td> <textarea id="' + number + 'pComplaint" rows="7" cols="70"></textarea></td></tr>' +
    '<tr><th>Observatii</th><td> <textarea id="' + number + 'mObservations" rows="7" cols="70"></textarea></td></tr></table>').appendTo('#' + number + 'patientDiv');
}

function createInjuries(number) {
    $('<div id="' + number + 'divInjuries"><p class="pInjury"> Probleme </p><ul id="' + number + 'ulInjuries"></ul></div>').appendTo('#' + number + 'divReceive');
}

function createMechanism(number) {
    $('<div id="' + number + 'divMechanism"><p class="pMechanism"> Mechanism of injury </p><ul id="' + number + 'ulMechanism"></ul></div>').appendTo('#' + number + 'divReceive');
}

function createVitals(id) {
    $('<table id="' + id + 'vitalTable"><tr id="vitalHeader"><th>Time</th> <th>Sistolic</th> <th>Diastolic</th>' + 
        '<th>Puls</th> <th><Respiratie</th> <th>SPO2</th> <th>CO2</th> <th>Blood sugar</th> <th>Temperature</th>' +
        '<th>Skin</th> <th>Pupils left/right</th> <th>Pain</th> <th>Conciousness</th>').appendTo('#' + id + 'vitalDiv');
}

function createVitalRow(id, item) {
    $('<tr> <td>' + item.vitalTime + '</td><td>' + item.systolic + '</td><td>' + item.diastolic + '</td>' +
        '<td>' + item.pulseRate + ' ' + item.pulseType + '</td><td>' + item.respirationRate + ' ' + item.respirationType + '</td>' + 
        '<td>' + item.spo2 + '</td><td>' + item.co2 + '</td><td>' + item.bloodSugar + '</td><td>' + item.temperature + '</td>' +
        '<td>' + item.skinType + '</td><td>' + item.leftPupilType + '/' + item.rightPupilType + '</td>' +
        '<td>' + item.pain + '</td><td>' + item.consciousnessType + '</td></tr>').appendTo('#' + id + 'vitalTable');
}