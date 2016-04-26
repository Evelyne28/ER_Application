function start(a) {
    return function () {
        $('#myTable > tbody:last-child').append('<tr class="' + a + '-tr"><th class="menu" id="' + a + '-menu1">Menu 1 </th>' +
            '<td><table id="' + a + '-menu1-table"><tr><th>First Name</th><td id="' + a + '-menu1-pFName">First Name</td></tr> <tr><th>Last Name</th><td id="' + a + '-menu1-pLName">Last Name</td></tr> <tr><th>SSN</th><td id="' + a + '-menu1-pSSN">SSN</td></tr> <tr><th>BirthDate</th><td id="' + a + '-menu1-pDate">BirthDate</td></tr> </table></td></tr>');
        $('#myTable > tbody:last-child').append('<tr class="' + a + '-tr"><th class="menu" id="' + a + '-menu2">Menu 2 </th>' +
            '<td><table id="' + a + '-menu2-table"><tr><th>Name</th><td id="' + a + '-menu2-pName">Medicine Name</td></tr> </table></td></tr>');
    }
}
$(document).ready(start('amb1'));
$(document).ready(start('amb2'));

function ajaxOnLoad() {
    //$.ajax({
    //    type: "POST",
    //    data: "{}",
    //    url: "ER.aspx/GetIncidents",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {

    //        $.each(data.d, function (index, item) {
    //            var listAmb = "<tr><th><img src='/Images/blink.gif'>" + item.callerPhone + "</th><td><button id='" + item.callerPhone + "respond'> Respond </button></td></tr>";
    //            $('#callTable').append(listAmb);

    //        })
    //    },
    //    failure: function (response) {
    //        var r = jQuery.parseJSON(response.responseText);
    //        alert("Message: " + r.Message);
    //    }
    //})
    //$.ajax({
    //    type: "POST",
    //    data: "{}",
    //    url: "ER.aspx/GetAmbulances",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {

    //        $.each(data.d, function (index, item) {
    //            if (item.state == 0)
    //                var listAmb = "<li> <button id='dispAmb" + item.ambulanceID + "'> Amb" + item.ambulanceID + "</button>&nbsp&nbsp&nbsp<img src='/Images/GreenCircle.png'></li>";
    //            else
    //                var listAmb = "<li> <button id='dispAmb" + item.ambulanceID + "'> Amb" + item.ambulanceID + "</button>&nbsp&nbsp&nbsp<img src='/Images/RedCircle.png'></li>";
    //            $('#listAmb').append(listAmb);

    //        })
    //    },
    //    failure: function (response) {
    //        var r = jQuery.parseJSON(response.responseText);
    //        alert("Message: " + r.Message);
    //    }
    //})
}


$(function () {
   // ajaxOnLoad();
    var chat = $.connection.chatHub;
    //$.connection.hub.start().done(function () {
    //    $("button[id^='dispAmb']").click(function () {
    //        alert("ba");
    //        chat.server.sendTo(username, "hello", "amb1");
    //    });
    //}
    //$('#map_canvas').hide();
    $("*[class^='amb']").hide();
    $("#dispatchAmbList").hide();
    $("#dispatchDiv").hide();
    $("#infoCall").hide();
    //$("#mapCall").css({ opacity: 0 });
    //$('.menu').hide();
    $('.menuTable-1').hide();

    $('button[id^="dispAmb"]').on('click', function () {
        alert("gheo");
    });

    $('#menuAmb').on('click', function () {
        $('.amb').show();
        $('#dispatchDiv').hide();
        $('#menuAmb').removeClass();
        $('#menuAmb').addClass("show");
        $('#dispatch').removeClass();
        $('#dispatch').addClass("hide");
    });
    $('#dispatch').on('click', function () {
        $('.amb').hide();
        $('#dispatchDiv').show();
        $('#dispatch').removeClass();
        $('#dispatch').addClass("show");
        $('#menuAmb').removeClass();
        $('#menuAmb').addClass("hide");
    });
    $('[id$="button"]').on('click', function (e) {
        //alert("hello");
        $('#dispatchAmbList').empty();
        e.preventDefault();
        $.ajax({
            type: "POST",
            data: "{}",
            url: "ER.aspx/GetAmbulances",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                $.each(data.d, function (index, item) {
                    var listAmb = "<li> <button id='dispAmb" + item.ambulanceID + "'> Amb" + item.ambulanceID + "</button><img src='/Images/Greenlight.gif'></li>";
                    $("#dispatchAmbList").show();
                    $('#dispatchAmbList').append(listAmb);
                    
                })

                $.connection.hub.start().done(function () {
                    $("button[id^='dispAmb']").click(function () {
                        //alert("ba");
                        chat.server.sendTo(username, "hello", "amb1");
                    });
                });
            },
            failure: function (response) {
                var r = jQuery.parseJSON(response.responseText);
                alert("Message: " + r.Message);
            }
        })
    });
    function OnSuccess(response) {
        alert("success");
        console.log(response.d);
    }
    function OnErrorCall(response) {
        console.log("error");
    }

    $(".amb").click(function () {
        var i = this.id;
        //alert('#' + i);
        $('#' + i).click(function () {
            //alert('#' + i);
            $("tr[class^='amb']").hide();
            $("tr[class^='" + i + "']").show();
            $("table[id^='" + i + "']").hide();

            $('#' + i + '-menu1').on('click', function () {
                //alert("am dat click");
                $("table[id^='" + i + "-menu']").hide();
                $('#' + i + '-menu1-table').show();
                //  			$('#' + i + '-menu1').parent().append('<td><table id="' + i + '-menu1-table"><tr><th>First Name</th><td id="' + i + '-menu1-pFName">First Name</td></tr> <tr><th>Last Name</th><td id="' + i + '-menu1-pLName">Last Name</td></tr></table></td>');
            });
            $('#' + i + '-menu2').on('click', function () {
                alert("am dat click");
                $("table[id^='" + i + "-menu']").hide();
                $('#' + i + '-menu2-table').show();
                //  			$('#' + i + '-menu1').parent().append('<td><table id="' + i + '-menu1-table"><tr><th>First Name</th><td id="' + i + '-menu1-pFName">First Name</td></tr> <tr><th>Last Name</th><td id="' + i + '-menu1-pLName">Last Name</td></tr></table></td>');
            });
        });
    });
});