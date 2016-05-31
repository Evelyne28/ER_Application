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
                createPatient(number);
                createAllergies(number);
                createDiseases(number);
                menuAdministration('dispatch');
                ev.preventDefault();
            });
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    })
}