$(function () {
    var ambID;
    var chat = $.connection.chatHub;
    ajaxGetAmbulances();
    chat.client.receivePatient = function (fromWho, patient, allergyList, diseasesList) {
        ambID = fromWho;
        createDiv(ambID, 'patientDiv');
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

    chat.client.receiveProblem = function (fromWho, pComplaint, mObservations, injuries, mechanisms) {
        ambID = fromWho;
        createInjuries(ambID);
        $.each(injuries, function (i, item) {
            var liInjury = "<li id='liI_" + item + "'>" + item + "</li>";
            $('#' + ambID + 'ulInjuries').append(liInjury);
        })
        createMechanism(ambID);
        $.each(mechanisms, function (i, item) {
            var liMechanism = "<li id='liM_" + item + "'>" + item + "</li>";
            $('#' + ambID + 'ulMechanism').append(liMechanism);
        })
        createObservations(ambID);
        $('#' + ambID + 'pComplaint').val(pComplaint);
        $('#' + ambID + 'mObservations').val(mObservations);
    }

    chat.client.receiveVitals = function (fromWho, vitalSigns) {
        ambID = fromWho;
        createVitals(ambID);
        $.each(vitalSigns, function (i, item) {
            //var tdVital = "<td id='tdV_" + item + "'>" + item + "</li>";
            //$('#' + ambID + 'ulInjuries').append(liInjury);
            createVitalRow(ambID, item);
        })
        //createObservations(ambID);
        //('#' + ambID + 'pComplaint').val(pComplaint);
        //$('#' + ambID + 'mObservations').val(mObservations);
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