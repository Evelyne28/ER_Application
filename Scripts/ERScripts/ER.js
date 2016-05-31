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
    '<tr><th>Grupa sangvina</th><td> <input type="text" id="' + number + 'bloodTypeInput"/></td></tr></td></tr></table>').appendTo('#patientDiv');
}

function createAllergies(number) {
    $('<div id="' + number + 'divAllergies"><p class="pAllergy"> Alergii </p><ul id="' + number + 'ulAllergies"></ul></div>').appendTo('#patientDiv');
}

function createDiseases(number) {
    $('<div id="' + number + 'divHistory"><p class="pHistory"> Istoric medical </p><ul id="' + number + 'ulDiseases"></ul></div>').appendTo('#patientDiv');
}

function createObservations(number) {
    $('<table id="' + number + 'commentsPb">' + 
    '<tr><th>Ce acuza pacientul</th><td> <textarea id="' + number + 'pComplaint" rows="7" cols="70"></textarea></td></tr>' +
    '<tr><th>Observatii</th><td> <textarea id="' + number + 'mObservations" rows="7" cols="70"></textarea></td></tr></table>').appendTo('#patientDiv');
}

function createInjuries(number) {
    $('<div id="' + number + 'divInjuries"><p class="pInjury"> Probleme </p><ul id="' + number + 'ulInjuries"></ul></div>').appendTo('#patientDiv');
}

function createMechanism(number) {
    $('<div id="' + number + 'divMechanism"><p class="pMechanism"> Mechanism of injury </p><ul id="' + number + 'ulMechanism"></ul></div>').appendTo('#patientDiv');
}


$(function () {
    var ambID;
    var chat = $.connection.chatHub;
    ajaxGetAmbulances();
    chat.client.receivePatient = function (fromWho, patient, allergyList, diseasesList) {
        ambID = fromWho;
        createPatient(ambID);
        createAllergies(ambID);
        createDiseases(ambID);
        $('#' + ambID + 'patientID').val(patient.patientID);
        $('#' + ambID + 'lastNameInput').val(patient.lastName);
        $('#' + ambID + 'firstNameInput').val(patient.firstName);
        $('#' + ambID + 'ssnInput').val(patient.ssn);
        $('#' + ambID + 'genderInput').val(patient.gender);
        $('#' + ambID + 'addressInput').val(patient.address);
        $('#' + ambID + 'phoneInput').val(patient.phone);
        $('#' + ambID + 'birthDateInput').val(patient.birthDate);
        $('#' + ambID + 'ageInput').val(patient.age);
        $('#' + ambID + 'cityInput').val(patient.city);
        $('#' + ambID + 'countyInput').val(patient.county);
        $('#' + ambID + 'zipCodeInput').val(patient.zipCode);
        $('#' + ambID + 'bloodTypeInput').val(patient.bloodType);
        $.each(allergyList, function (i, item) {
            var liDisease = "<li id='liA_" + item + "'>" + item + "</li>";
            $('#' + ambID + 'ulAllergies').append(liDisease);
        })
        $.each(diseasesList, function (i, item) {
            var liDisease = "<li id='liD_" + item + "'>" + item + "</li>";
            $('#' + ambID + 'ulDiseases').append(liDisease);
        })
    }

    chat.client.receiveProblem = function (fromWho, pComplaint, mObservations, injuries) {
        ambID = fromWho;
        createInjuries(ambID);
        $.each(injuries, function (i, item) {
            var liInjury = "<li id='liI_" + item + "'>" + item + "</li>";
            $('#' + ambID + 'ulInjuries').append(liInjury);
        })
        createObservations(ambID);
        $('#' + ambID + 'pComplaint').val(pComplaint);
        $('#' + ambID + 'mObservations').val(mObservations);
    }
    //ajaxGetAmbulances();
    $("#patientDiv").hide();
    $("#problemDiv").hide();
    $("#vitalDiv").hide();

    $('#dispatchMenu').on('click', function () {
        menuAdministration('dispatch');
    });
    $('#patientMenu').on('click', function () {
        menuAdministration('patient');
        //if ($('#ulAllergies li').length == 0 && $('#ulHistory li').length == 0)
        //    ajaxPatient();
    });
    $('#problemMenu').on('click', function () {
        menuAdministration('problem');
        //if ($('#ulInjuries li').length == 0 && $('#ulMechanism li').length == 0)
        //    ajaxProblem();
    });
    $('#vitalMenu').on('click', function () {
        menuAdministration('vital');
        //createRow(1, "1vitalTR");
    });
});