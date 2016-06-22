function ajaxSaveInterventions(interventionList) {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'interventionList': interventionList }),
        url: "Ambulance.aspx/SaveInterventions",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            id = $('#ambulanceID').val();
            sendVitalsER(id, vitalSigns);
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}