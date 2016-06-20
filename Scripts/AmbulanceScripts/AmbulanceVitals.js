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

function ajaxSaveVitalSigns(vitalSigns) {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 'vitalSigns': vitalSigns }),
        url: "Ambulance.aspx/AddVitalSigns",
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

function createRow(vitalSign, number) {
    var rowCount = $('#vitalTable tr').length;
    if (rowCount == 1)
        $('<tr id="' + number + 'vitalTR"></tr>').appendTo('#vitalTable');
    else {
        var $row = $('<tr id="' + number + 'vitalTR"></tr>');
        $('#vitalTable > tbody:last').append($row);
    }
    rowID = number + "vitalTR";
    add(vitalSign, rowID);
    return;
}

function add(vitalSign, rowID) {
    addTime(rowID);
    id = rowID.charAt(0);
    $('<td> <span class="systolic">' + vitalSign.systolic + '</span></td>').appendTo('#' + rowID);
    $('<td> <span class="diastolic">' + vitalSign.diastolic + '</span></td>').appendTo('#' + rowID);
    $('<td> <span>' + vitalSign.pulseType + '</span> <span class="slash">/ </span> <span class="pulseRate">' + vitalSign.pulseRate + '</span></td>').appendTo('#' + rowID);
    $('<td> <span>' + vitalSign.respirationType + '</span> <span class="slash">/ </span> <span class="respirationRate">' + vitalSign.respirationRate + '</span></td>').appendTo('#' + rowID);
    $('<td> <span class="spo2">' + vitalSign.spo2 + '</span></td>').appendTo('#' + rowID);
    $('<td> <span class="co2">' + vitalSign.co2 + '</span></td>').appendTo('#' + rowID);
    $('<td> <span class="bloodSugar">' + vitalSign.bloodSugar + '</span></td>').appendTo('#' + rowID);
    $('<td> <span class="temperature">' + vitalSign.temperature + '</span></td>').appendTo('#' + rowID);
    $('<td> <span class="skin">' + vitalSign.skinType + '</span></td>').appendTo('#' + rowID);
    $('<td> <span class="leftPupil">' + vitalSign.leftPupilType + '</span> <span class="slash">/ </span>'
        + '<span class="rightPupil"/>' + vitalSign.rightPupilType + '</span> </td>').appendTo('#' + rowID);
    $('<td> <span class="pain">' + vitalSign.pain + '</span></td>').appendTo('#' + rowID);
    $('<td> <span class="consciousness">' + vitalSign.consciousnessType + '</span> <button id="' + id + 'removeVital"> - </button> </td>').appendTo('#' + rowID);
}

function addTime(rowID) {
    var nr = rowID.charAt(0);
    $('<td> <input type="text" name="' + nr + 'hourInput" id="' + nr + 'hourInput"/><span class="colon">:</span>' +
    '<input type="text" name="' + nr + 'minuteInput" id="' + nr + 'minuteInput"/></td>').appendTo('#' + rowID);
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    if (hour < 10)
        hour = '0' + hour;
    if (minutes < 10)
        minutes = '0' + minutes;
    $('#' + nr + 'hourInput').val(hour);
    $('#' + nr + 'minuteInput').val(minutes);
    return;
}

function generateVitals() {
    var random = Math.floor(Math.random() * 80) + 50;
    $('#inputSistolic').val(random);
    random = Math.floor(Math.random() * 6) + 1;
    $('#inputDiastolic').val(random);
    random = Math.floor(Math.random() * 6) + 1;
    $('#inputPulsRate').val(random);
    random = Math.floor(Math.random() * 2) + 1;
    checkRadio(random, 'radioPulsR', 'radioPulsI', 0, 0);
    random = Math.floor(Math.random() * 20) + 1;
    $('#inputRespiratieRate').val(random);
    random = Math.floor(Math.random() * 3) + 1;
    checkRadio(random, 'radioRespR', 'radioRespS', 'radioRespL', 0);
    random = Math.floor(Math.random() * 20) + 1;
    $('#inputSPO2').val(random);
    random = Math.floor(Math.random() * 20) + 1;
    $('#inputCO2').val(random);
    random = Math.floor(Math.random() * 20) + 1;
    $('#inputBS').val(random);
    random = Math.floor(Math.random() * 20) + 1;
    $('#inputTemperature').val(random);
    random = Math.floor(Math.random() * 3) + 1;
    checkRadio(random, 'radioSkinC', 'radioSkinP', 'radioSkinW', 0);
    random = Math.floor(Math.random() * 3) + 1;
    checkRadio(random, 'radioPLN', 'radioPLD', 'radioPLNR', 0);
    random = Math.floor(Math.random() * 3) + 1;
    checkRadio(random, 'radioPRN', 'radioPRD', 'radioPRNR', 0);
    random = Math.floor(Math.random() * 10) + 1;
    $("#inputPain").val(random);
    random = Math.floor(Math.random() * 4) + 1;
    checkRadio(random, 'radioConscA', 'radioConscV', 'radioConscP', 'radioConscU');
    disableFields();
    $('#btnGenerateVitals').addClass('buttonOpacity');
    $('#btnAddVital').removeClass('buttonOpacity');
    $('#saveVitals').removeClass('buttonOpacity');
}

function checkRadio(nr, attr1, attr2, attr3, attr4) {
    if (nr == 1) 
        $("#" + attr1).prop("checked", true);
    else if (nr == 2)
        $("#" + attr2).prop("checked", true);
    else if (nr == 3) 
        $("#" + attr3).prop("checked", true);
    else
        $("#" + attr4).prop("checked", true);
}

function disableFields() {
    $("#inputSistolic").prop("disabled", true);
    $("#inputDiastolic").prop("disabled", true);
    $("#inputPulsRate").prop("disabled", true);
    $("#inputRespiratieRate").prop("disabled", true);
    $("#inputSPO2").prop("disabled", true);
    $("#inputCO2").prop("disabled", true);
    $("#inputBS").prop("disabled", true);
    $("#inputTemperature").prop("disabled", true);
}