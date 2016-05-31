function ajaxPatient() {
    $.ajax({ //Get all allergies
        type: "POST",
        data: "{}",
        url: "Ambulance.aspx/GetAllergies",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {

            $.each(data.d, function (i, item) {
                var liAllergy = "<li><input type='checkbox' name='pAllergies' value='" + item.name + "' id='chkA_" + item.allergyID + "'>" + item.name + "</li>";
                $('#ulAllergies').append(liAllergy);
            })
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })

    $.ajax({ //Get all diseases
        type: "POST",
        data: "{}",
        url: "Ambulance.aspx/GetMedicalHistory",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {

            $.each(data.d, function (i, item) {
                var liDisease = "<li><input type='checkbox' name='pDisease' value='" + item.name + "' id='chkD_" + item.diseaseID + "'>" + item.name + "</li>";
                $('#ulHistory').append(liDisease);
            })
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxAddPatient() { //Add patient
    var patient = {
        ssn: $("#ssnInput").val(),
        firstName: $("#firstNameInput").val(),
        lastName: $("#lastNameInput").val(),
        gender: $("#genderInput").val(),
        address: $("#addressInput").val(),
        phone: $("#phoneInput").val(),
        birthDate: $("#birthDateInput").val(),
        age: $("#ageInput").val(),
        city: $("#cityInput").val(),
        county: $("#countyInput").val(),
        zipCode: $("#zipCodeInput").val(),
        bloodType: $("#bloodTypeInput").val()
    };
    var pa = {
        incidentID: $("#cIncidentID").val(),
        ambulanceID: 1
    }
    var diseaseList = [];
    $('#ulHistory input:checked').each(function () {
        var parts = $(this).attr('id').split('_');
        id = parts[1];
        diseaseList.push(id);
    });
    var allergyList = [];
    $('#ulAllergies input:checked').each(function () {
        var parts = $(this).attr('id').split('_');
        id = parts[1];
        allergyList.push(id);
    });
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'patient': patient, 'pa': pa, 'allergyList': allergyList, 'diseaseList': diseaseList }),
        url: "Ambulance.aspx/AddPatient",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (data) {
            sendPatientER('amb1', patient, allergyList, diseaseList);
            var parts = data.d.split(';');
            $('#patientIDInput').val(parts[0]);
            $('#cPAID').val(parts[1]);
            ajaxSetSession();      
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxAddPatientAmbulance() {
    var pa = {
        incidentID: $("#cIncidentID").val(),
        patientID: $("#patientIDInput").val(),
        ambulanceID: 1
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'pa': pa }),
        url: "Ambulance.aspx/AddPatientAmbulance",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#cPAID').val(data.d);
            ajaxSetSession();
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxScanCard() {
    $('li').css("color", "black");
    $('input:checkbox').removeAttr('checked');
    var allergyList = [];
    var diseasesList = [];
    $.ajax({ //Get patient from DB
        type: "POST",
        data: "{}",
        url: "Ambulance.aspx/GetPatient",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data.d, function (index, item) {
                if (index == 'birthDate') {
                    var objDate = ToJavaScriptDate(item);
                    $('#' + index + 'Input').val(objDate);
                }
                else if (index == 'Allergy') {
                    $.each(item, function (i) {
                        $('#chkA_' + item[i].allergyID).prop('checked', true);
                        $('#chkA_' + item[i].allergyID).parent().css("color", "red");
                        allergyList.push(item[i].name);
                    })
                }
                else
                    $('#' + index + 'Input').val(item);
            })
            var pID = $('#patientIDInput').val();
            var patient = {
                patientID: pID,
                ssn: $("#ssnInput").val(),
                firstName: $("#firstNameInput").val(),
                lastName: $("#lastNameInput").val(),
                gender: $("#genderInput").val(),
                address: $("#addressInput").val(),
                phone: $("#phoneInput").val(),
                birthDate: $("#birthDateInput").val(),
                age: $("#ageInput").val(),
                city: $("#cityInput").val(),
                county: $("#countyInput").val(),
                zipCode: $("#zipCodeInput").val(),
                bloodType: $("#bloodTypeInput").val()
            };

            $.ajax({ //Get his medical history
                type: "POST",
                data: JSON.stringify({ patientID: pID }),
                url: "Ambulance.aspx/GetPatientDiseases",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.each(data.d, function (i, item) {
                        $('#chkD_' + item.diseaseID).prop('checked', true);
                        $('#chkD_' + item.diseaseID).parent().css("color", "red");
                        diseasesList.push(item.name);
                    })
                    sendPatientER('amb1', patient, allergyList, diseasesList);
                },
                failure: function (response) {
                    var r = jQuery.parseJSON(response.responseText);
                    alert("Message: " + r.Message);
                }
            })
            
            ajaxAddPatientAmbulance();
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxSetSession() { //Set session variables
    var patientID = $('#patientIDInput').val();
    var incidentID = $('#cIncidentID').val();
    var ambulanceID = 1;
    var paID = $('#cPAID').val();
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'pID': patientID, 'iID': incidentID, 'aID': ambulanceID, 'paID': paID }),
        url: "Ambulance.aspx/SetSession",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}