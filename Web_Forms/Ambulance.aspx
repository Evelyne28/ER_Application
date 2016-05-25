<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Ambulance.aspx.cs" Inherits="ER_application.Web_Forms.Ambulance" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="~/CSS/Ambulance.css"/>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js"></script>
    <script type="text/javascript" src="http://www.geocodezip.com/scripts/v3_epoly.js"></script>
    <script type="text/javascript" src="/Scripts/jquery-2.2.1.min.js"></script>
    

<%--    <script type="text/javascript" src="/Scripts/createMarker.js"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
    <div id="welcome" runat="server">
    
    </div>
    <table id="myTable">
	    <tr>
			<th class="header" id="dispatchMenu"> Dispatch </th>
			<th class="header" id="patientMenu"> Patient info </th>
			<th class="header" id="problemMenu"> Problem </th>
			<th class="header" id="vitalMenu"> Vital signs </th>
			<th class="header" id="interventionsMenu"> Interventions </th>
		</tr>
	</table>
	<div id="dispatchDiv">
		<table id="dispatchTable">
			<tr>
                <th>Adresa GPS</th>
                <td id="itAddress"> <textarea id="addressGPSInput" name="addressGPSInput" rows="4" cols="50"></textarea></td>
            </tr>
            <tr>
                <th>Caller Location</th>
                <td id="itCLocation"> <textarea id="cLocationInput" name="cLocationInput" rows="4" cols="50"></textarea> </td>
            </tr>
            <tr>
                <th>Telefon</th>
                <td id="itCPhone"> <input type="text" name="cPhoneInput" id="cPhoneInput"/></td>
            </tr>
            <tr>
                <th>Caller name</th>
                <td id="itCName"> <input type="text" name="cNameInput" id="cNameInput"/></td>
            </tr>
            <tr>
                <th>Locatie pacient</th>
                <td id="idPLocation"> <textarea id="pLocationInput" name="pLocationInput" rows="4" cols="50"></textarea></td>
            </tr>
            <tr>
                <th>Stare pacient</th>
                <td id="idPState"> <textarea id="pStateInput" name="pStateInput" rows="4" cols="50"></textarea> </td>
            </tr>
            <tr>
                <th>Date pacient</th>
                <td id="idPInfo"> <textarea id="pInfoInput" name="pInfoInput" rows="4" cols="50"></textarea> </td>
            </tr>
            <tr>
                <th>Ce s-a intamplat</th>
                <td id="idDesc"> <textarea id="descInput" name="descInput" rows="4" cols="50"></textarea> </td>
            </tr>
		</table>
	</div>
	<div id="patientDiv">
		<table id="patientTable">
			<tr>
				<th> Nume </th>
				<td> <input type="text" name="lastNameInput" id="lastNameInput"/> </td>
			</tr>
            <tr>
                <th> Prenume </th>
                <td> <input type="text" name="firstNameInput" id="firstNameInput"/> </td>
            </tr>
            <tr>
                <th> CNP </th>
                <td> <input type="text" name="ssnInput" id="ssnInput"/> </td>
            </tr>
            <tr>
                <th> Sex </th>
                <td> <input type="text" name="genderInput" id="genderInput"/> </td>
            </tr>
            <tr>
                <th> Adresa </th>
                <td> <input type="text" name="addressInput" id="addressInput"/> </td>
            </tr>
            <tr>
                <th> Telefon </th>
                <td> <input type="text" name="phoneInput" id="phoneInput"/> </td>
            </tr>
            <tr>
                <th> Data nasterii </th>
                <td> <input type="text" name="birthDateInput" id="birthDateInput"/> </td>
            </tr>
            <tr> 
                <th> Varsta </th>
                <td> <input type="text" name="ageInput" id="ageInput"/> </td>
            </tr>
            <tr> 
                <th> Oras </th>
                <td> <input type="text" name="cityInput" id="cityInput"/> </td>
            </tr>
            <tr>
                <th> Judet </th>
                <td> <input type="text" name="countyInput" id="countyInput"/> </td>
            </tr>
            <tr>
                <th> Cod postal </th>
                <td> <input type="text" name="zipCodeInput" id="zipCodeInput"/> </td>
            </tr>
            <tr>
                <th> Grupa sangvina </th>
                <td> <input type="text" name="bloodTypeInput" id="bloodTypeInput"/> </td>
            </tr>
		</table>
        <div id="divCard">
            <button id="buttonCard"> Scanează cardul </button>
        </div>
        <div id="divAllergies">
            <p id="pAllergy"> Alergii </p>
            <ul id="ulAllergies"> </ul>
        </div>

        <div id="mHistory">

        </div>
        
        
		<%--<button id="patientButton"> Send </button>--%>
	</div>
        <div id="mapCall"> </div>
        

    </form>
    <!--Script references. -->
    <!--Reference the jQuery library. -->
    <script src="/Scripts/jquery-1.10.2.min.js" ></script>
    <!--Reference the SignalR library. -->
    <script src="/Scripts/jquery.signalR-2.0.2.min.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src="/signalr/hubs"></script>
    <script src='<%: ResolveClientUrl("~/signalr/hubs") %>'></script>
    <script src="/Scripts/Ambulance.js" "></script>
    <!--Add script to update the page and send messages.-->
    <script type="text/javascript">


        //var username = '<%= Session["userName"] %>';
        //var myMarker = null;
        //var i = 0;

        //var marker = null;
        //infowindow = new google.maps.InfoWindow(
        //  {
        //      size: new google.maps.Size(150, 50)
        //  });

        //var myOptions = {
        //    zoom: 10,
        //    mapTypeId: google.maps.MapTypeId.ROADMAP
        //}
        //map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        //address = 'Strada Hermann Oberth 5, Cluj-Napoca'
        //geocoder = new google.maps.Geocoder();
        //geocoder.geocode({ 'address': address }, function (results, status) {
        //    map.fitBounds(results[0].geometry.viewport);
        //});

        //google.maps.event.addListener(map, 'click', function () {
        //    infowindow.close();
        //});

        //google.maps.event.addListener(map, 'click', function (event) {
        //        if (marker) {
        //            marker.setPosition(event.latLng);
        //        } else {
        //            marker = new google.maps.Marker({
        //                position: event.latLng,
        //                map: map
        //            });
        //        }
        //        myMarker = event.latLng;
        //    //placeMarker(event.latLng);
        //    alert(myMarker.toString());
        //    //var chat = $.connection.chatHub;
        //    //$.connection.hub.start().done(function () {
        //    //    //Call the Send method on the hub.
        //      //  chat.server.send(username, event.latLng);
        //    //    //Clear text box and reset focus for next comment.
        //        //$('#patientState').val('').focus();
        //    //});
        //});

        $(function () {

            // Declare a proxy to reference the hub.
            var chat = $.connection.chatHub;
            //// Create a function that the hub can call to broadcast messages.
            chat.client.receive = function (name, message, toWho) {
                if (toWho == username) {
                    alert(name + " " + message + " " + toWho);
                }
                else
                    alert("not to me");
                //alert(message);
                //$('#loc').html(message);
            };
            // Get the user name and store it to prepend to messages.
            //$('#displayname').val(prompt('Enter your name:', ''));
            // Set initial focus to message input box.
            //$('#patientState').focus();
            // Start the connection.
            $.connection.hub.start().done(function () {
                //$('#Update').click(function () {
                    //chat.server.send(username, myMarker.toString());
                    //chat.server.send(username, myMarker.toString() + "_" + $('#patientState').val());
                    //patient = {
                    //    firstName: "Jon",
                    //    lastName: "Snow",
                    //    ssn: "123",
                    //    birthDate: "02/02/1999"
                    //};
                    //alert("gheo");
                    //chat.server.update(username, patient);
                    // Call the Send method on the hub.
                    // Clear text box and reset focus for next comment.
                    //$('#patientState').val('').focus();
                //});
                //$('#Add').click(function () {
                //    //chat.server.send(username, myMarker.toString());
                //    chat.server.send(username, myMarker.toString() + "_" + $('#firstName').val());
                //    // Call the Send method on the hub.
                //    // Clear text box and reset focus for next comment.
                //    $('#firstName').val('').focus();
                //});
                chat.client.receive = function (name, message, toWho) {
                    if (toWho == username) {
                        alert(name + " " + message + " " + toWho);
                    }
                    else
                        alert("not to me");
                   // $('#loc').html(message);
                };
            });
        });
       // initialize();
        //function initialize() {

        //    var marker = null;
        //    infowindow = new google.maps.InfoWindow(
        //      {
        //          size: new google.maps.Size(150, 50)
        //      });

        //    var myOptions = {
        //        zoom: 10,
        //        mapTypeId: google.maps.MapTypeId.ROADMAP
        //    }
        //    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        //    address = 'Strada Hermann Oberth 5, Cluj-Napoca'
        //    geocoder = new google.maps.Geocoder();
        //    geocoder.geocode({ 'address': address }, function (results, status) {
        //        map.fitBounds(results[0].geometry.viewport);
        //    });

        //    google.maps.event.addListener(map, 'click', function () {
        //        infowindow.close();
        //    });
        //}

        //var marker;

        //function placeMarker(location) {
        //    if (marker) {
        //        marker.setPosition(location);
        //    } else {
        //        marker = new google.maps.Marker({
        //            position: location,
        //            map: map
        //        });
        //    }
        //}

        //google.maps.event.addListener(map, 'click', function (event) {
        //    placeMarker(event.latLng);
        //    alert(event.latLng);
        //    var chat = $.connection.chatHub;
        //    $.connection.hub.start().done(function () {
        //        //Call the Send method on the hub.
        //        chat.server.send("amb1", event.latLng);
        //        //Clear text box and reset focus for next comment.
        //        //$('#patientState').val('').focus();
        //    });
        //});

       
        //$(document).ready(function () {
       
        //Add.Attributes.Add("onclick", " this.disabled = true; " + ClientScript.GetPostBackEventReference(btnSave, null) + ";");

        //document.getElementById("Update").disabled = true;
        
        //$('#Add').click(function () {
        //    document.getElementById("Add").disabled = true;
        //    document.getElementById("Update").disabled = false;
        //});

            //});
  

        //--------------------------------------------------------------


        //function start(a) {
        //    return function () {
        //        $('#myTable > tbody:last-child').append('<tr class="' + a + '-tr"><th class="menu" id="' + a + '-menu1">Menu 1 </th>' +
        //            '<td><table id="' + a + '-menu1-table"><tr><th>First Name</th><td id="' + a + '-menu1-pFName">First Name</td></tr> <tr><th>Last Name</th><td id="' + a + '-menu1-pLName">Last Name</td></tr> <tr><th>SSN</th><td id="' + a + '-menu1-pSSN">SSN</td></tr> <tr><th>BirthDate</th><td id="' + a + '-menu1-pDate">BirthDate</td></tr> </table></td></tr>');
        //        $('#myTable > tbody:last-child').append('<tr class="' + a + '-tr"><th class="menu" id="' + a + '-menu2">Menu 2 </th>' +
        //            '<td><table id="' + a + '-menu2-table"><tr><th>Name</th><td id="' + a + '-menu2-pName">Medicine Name</td></tr> </table></td></tr>');
        //    }
        //}
        //$(document).ready(start('amb1'));
        //$(document).ready(start('amb2'));

        //$('#menuAmb').on('click', function () {
        //    $('.amb').show();
        //    $('#dispatchDiv').hide();
        //    $('#menuAmb').removeClass();
        //    $('#menuAmb').addClass("show");
        //    $('#dispatch').removeClass();
        //    $('#dispatch').addClass("hide");
        //});
        //$('#dispatch').on('click', function () {
        //    $('.amb').hide();
        //    $('#dispatchDiv').show();
        //    $('#dispatch').removeClass();
        //    $('#dispatch').addClass("show");
        //    $('#menuAmb').removeClass();
        //    $('#menuAmb').addClass("hide");
        //});



        //$('[id$="button"]').on('click', function (e) {
        //    $('#dispatchAmbList').empty();
        //    e.preventDefault();
        //    $.ajax({
        //        type: "POST",
        //        data: "{}",
        //        url: "ER.aspx/GetAmbulances",
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (data) {

        //            $.each(data.d, function (index, item) {
        //                var listAmb = "<li> <button id='dispAmb" + item.ambulanceID + "'> Amb" + item.ambulanceID + "</button><img src='/Images/Greenlight.gif'></li>";
        //                $("#dispatchAmbList").show();
        //                $('#dispatchAmbList').append(listAmb);

        //            })

        //            $.connection.hub.start().done(function () {
        //                $("button[id^='dispAmb']").click(function () {
        //                    chat.server.sendTo(username, "hello", "amb1");
        //                });
        //            });
        //        },
        //        failure: function (response) {
        //            var r = jQuery.parseJSON(response.responseText);
        //            alert("Message: " + r.Message);
        //        }
        //    })
        //});
        //function OnSuccess(response) {
        //    alert("success");
        //    console.log(response.d);
        //}
        //function OnErrorCall(response) {
        //    console.log("error");
        //}

        //$(".amb").click(function () {
        //    var i = this.id;
        //    //alert('#' + i);
        //    $('#' + i).click(function () {
        //        //alert('#' + i);
        //        $("tr[class^='amb']").hide();
        //        $("tr[class^='" + i + "']").show();
        //        $("table[id^='" + i + "']").hide();

        //        $('#' + i + '-menu1').on('click', function () {
        //            //alert("am dat click");
        //            $("table[id^='" + i + "-menu']").hide();
        //            $('#' + i + '-menu1-table').show();
        //            //  			$('#' + i + '-menu1').parent().append('<td><table id="' + i + '-menu1-table"><tr><th>First Name</th><td id="' + i + '-menu1-pFName">First Name</td></tr> <tr><th>Last Name</th><td id="' + i + '-menu1-pLName">Last Name</td></tr></table></td>');
        //        });
        //        $('#' + i + '-menu2').on('click', function () {
        //            alert("am dat click");
        //            $("table[id^='" + i + "-menu']").hide();
        //            $('#' + i + '-menu2-table').show();
        //            //  			$('#' + i + '-menu1').parent().append('<td><table id="' + i + '-menu1-table"><tr><th>First Name</th><td id="' + i + '-menu1-pFName">First Name</td></tr> <tr><th>Last Name</th><td id="' + i + '-menu1-pLName">Last Name</td></tr></table></td>');
        //        });
        //    });
        //});
    </script>
</body>
</html>
