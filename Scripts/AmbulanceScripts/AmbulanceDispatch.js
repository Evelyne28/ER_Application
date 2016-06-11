function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    var monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
    var monthName = (monthNames[dt.getMonth()]);
    return (dt.getDate()) + " " + monthName + " " + dt.getFullYear();
}

function notifyAmbulance() {
    var color = $("#dispatchMenu").css("background-color");
    if (color == 'rgb(51, 51, 51)') {
        $("#dispatchMenu").css('background-color', 'red');
    }
    else {
        $("#dispatchMenu").css('background-color', '#333');
    }
}

function menuAdministration(value) {
    var items = ["dispatch", "patient", "problem", "vital", "interventions"];
    if (value == 'dispatch') {
        $("#mapCall").css({ opacity: 1, zoom: 1 });
        document.getElementById('mapCall').style.width = '40%';
        document.getElementById('mapCall').style.height = '400px';
    }
    else {
        $("#mapCall").css({ opacity: 0, zoom: 0 });
        document.getElementById('mapCall').style.width = '5%';
        document.getElementById('mapCall').style.height = '0px';
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