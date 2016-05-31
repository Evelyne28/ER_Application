function ajaxGetVitalSigns() {
    $.ajax({ //Get all vitalSigns
        type: "POST",
        data: "{}",
        url: "Ambulance.aspx/GetVitalSigns",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {

            $.each(data.d, function (i, item) {
                var liDisease = "<li><input type='checkbox' name='pDisease' value='" + item.name + "' id='chkD" + item.diseaseID + "'>" + item.name + "</li>";
                $('#ulHistory').append(liDisease);
            })
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}

function ajaxAddVitalSigns(vitalSigns) {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'vitalSigns': vitalSigns }),
        url: "Ambulance.aspx/AddVitalSigns",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}