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
                var liInjury = "<li><input type='checkbox' name='pInjury' value='" + item.name + "' id='chkI" + item.name + "_" + item.injuryID + "'>" + item.name + "</li>";
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
                var liMechanism = "<li><input type='checkbox' name='pMechanism' value='" + item.name + "' id='chkM" + item.name + "_" + item.mechanismID + "'>" + item.name + "</li>";
                $('#ulMechanism').append(liMechanism);
            })
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxSaveProblems() {
    var injuriesList = [];
    var mechanismList = [];
    var injuries = [];
    var mechanisms = [];
    var pComplaint = $('#pComplaint').val();
    var mObservations = $('#mObservations').val();
    $('#ulInjuries input:checked').each(function () {
        var parts = $(this).attr('id').split('_');
        id = parts[1];
        injuriesList.push(id);
        injuries.push(parts[0].slice(4));
    });
    $('#ulMechanism input:checked').each(function () {
        var parts = $(this).attr('id').split('_');
        id = parts[1];
        mechanismList.push(id);
        mechanisms.push(parts[0].slice(4));
    });
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'injuriesList': injuriesList }),
        url: "Ambulance.aspx/AddPatientInjury",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (data) {
            $.ajax({
                type: "POST",
                data: JSON.stringify({ 'mechanismList': mechanismList }),
                url: "Ambulance.aspx/AddInjuryMechanism",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (data) {
                    id = $('#ambulanceID').val();
                    sendProblemER(id, pComplaint, mObservations, injuries, mechanisms);
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
    });
}