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
                var liAllergy = "<li><input type='checkbox' name='pAllergies' value='" + item.name + "' id='chkA" + item.name + "'>" + item.name + "</li>";
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
                var liDisease = "<li><input type='checkbox' name='pDisease' value='" + item.name + "' id='chkD" + item.name + "'>" + item.name + "</li>";
                $('#ulHistory').append(liDisease);
            })
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxProblem() {
    $.ajax({ //Get all injuries
        type: "POST",
        data: "{}",
        url: "Ambulance.aspx/GetInjuries",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            $.each(data.d, function (i, item) {
                var liInjury = "<li><input type='checkbox' name='pInjury' value='" + item.name + "' id='chkI" + item.name + "'>" + item.name + "</li>";
                $('#ulInjuries').append(liInjury);
            })
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
    $.ajax({ //Get all mechanisms
        type: "POST",
        data: "{}",
        url: "Ambulance.aspx/GetMechanisms",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            $.each(data.d, function (i, item) {
                var liMechanism = "<li><input type='checkbox' name='pMechanism' value='" + item.name + "' id='chkM" + item.name + "'>" + item.name + "</li>";
                $('#ulMechanism').append(liMechanism);
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
    $.ajax({ 
        type: "POST",
        data: JSON.stringify({ 'patient': patient, 'pa': pa }),
        url: "Ambulance.aspx/AddPatient",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (data) {
            var parts = data.d.split(';');
            $('#patientIDInput').val(parts[0]);
            $('#cPAID').val(parts[1]);
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
        async: true,
        success: function (data) {
            $('#cPAID').val(data.d);
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxScanCard() {
    $('input:checkbox').removeAttr('checked');
    $.ajax({ //Get patient from DB
        type: "POST",
        data: "{}",
        url: "Ambulance.aspx/GetPatient",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {

            $.each(data.d, function (index, item) {
                if (index == 'birthDate') {
                    var objDate = ToJavaScriptDate(item);
                    $('#' + index + 'Input').val(objDate);
                }
                else if (index == 'Allergy') {
                    $.each(item, function (i) {
                        $('#chkA' + item[i].name).prop('checked', true);
                    })
                }
                else
                    $('#' + index + 'Input').val(item);
            })
            var pID = $('#patientIDInput').val();
            $.ajax({ //Get his medical history
                type: "POST",
                data: JSON.stringify({ patientID: pID }),
                url: "Ambulance.aspx/GetPatientDiseases",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data) {

                    $.each(data.d, function (i, item) {
                        $('#chkD' + item).prop('checked', true);
                    })
                },
                failure: function (response) {
                    var r = jQuery.parseJSON(response.responseText);
                    alert("Message: " + r.Message);
                }
            })
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
        async: true,
        success: function (data) {
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}