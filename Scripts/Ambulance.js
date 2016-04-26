$(function () {
    $("#patientDiv").hide();
    $('#dispatchMenu').on('click', function () {
        $('#patientMenu').removeClass('red');
        $('#dispatchMenu').addClass('red');
        $('#dispatchDiv').show();
        $('#patientDiv').hide();
    });
    $('#patientMenu').on('click', function () {
        $('#dispatchMenu').removeClass('red');
        $('#patientMenu').addClass('red');
        $('#patientDiv').show();
        $('#dispatchDiv').hide();
    });
})