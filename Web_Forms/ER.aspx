<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ER.aspx.cs" Inherits="ER_application.Web_Forms.ER" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="~/CSS/ER.css"/>
    <%--<script src="/Scripts/jquery.signalR-2.0.2.min.js"></script>--%>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js"></script>
    <script type="text/javascript" src="http://www.geocodezip.com/scripts/v3_epoly.js"></script>
    <script type="text/javascript" src="/Scripts/jquery-2.2.1.min.js"></script>
<%--    <script type="text/javascript" src="/Scripts/mapScript.js"></script>--%>
    <%--<script type="text/javascript" src="/Scripts/ajax.js" ></script>--%>
</head>

<body>
   <form id="form1" runat="server">
    <div>
        <div id="welcome" runat="server">

        </div>

        <table id="topMenu">
			<tr>
				<th class="show" id="dispatch">Dispatch</th>
				<th class="hide" id="menuAmb">Ambulances</th>
				<th class="hide">Map</th>
			</tr>
		</table>
        <div id="callDiv">
            <p>Apeluri nepreluate</p>
            <table id="callTable">
            </table>
        </div>
  <%--       <div id="divP">
            <p>Apeluri preluate</p>
            <ul id="listP">

            </ul>
        </div>--%>
        <div id="infoCall">
            <input type="hidden" name="hiddenId" id="hiddenId"/>
            <table id="infoTable">
                <tr>
                    <th>Adresa GPS</th>
                    <td id="itAddress"> <textarea id="addressInput" name="addressInput" rows="4" cols="50"></textarea></td>
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
        <div id="mapCall">

        </div>
        <div id="divAmb">
            <ul id="listAmb">

            </ul>
        </div>
       
        <script>
            function initMap() {
                var mapDiv = document.getElementById('map');
                var map = new google.maps.Map(mapDiv, {
                    center: { lat: 44.540, lng: -78.546 },
                    zoom: 8
                });
            }
    </script>
   <%-- <script src="https://maps.googleapis.com/maps/api/js"
        async defer></script>--%>
        <div id="dispatchDiv" runat="server">
            <asp:Table ID="dispatchTable" runat="server">
                <asp:TableRow>
                    <asp:TableHeaderCell> Date of Event </asp:TableHeaderCell>
                    <asp:TableHeaderCell> Caller name </asp:TableHeaderCell>
                    <asp:TableHeaderCell> Caller phone </asp:TableHeaderCell>
                    <asp:TableHeaderCell> Location </asp:TableHeaderCell>
                    <asp:TableHeaderCell> Description </asp:TableHeaderCell>
                    <asp:TableHeaderCell> Ambulance dispatched </asp:TableHeaderCell>
                </asp:TableRow>
            </asp:Table>
            <ul id="dispatchAmbList">
               <%-- <li>
                    <button id="dispAmb1">Amb 1 <img src="../Images/Greenlight.gif"/> </button>
                    <button id="dispAmb2">Amb 1 <img src="../Images/Greenlight.gif"/> </button>
                    <button id="dispAmb3">Amb 1 <img src="../Images/Greenlight.gif"/> </button>
                    <button id="dispAmb4">Amb 1 <img src="../Images/Greenlight.gif"/> </button>
                    <button id="dispAmb5">Amb 1 <img src="../Images/Greenlight.gif"/> </button>
                </li>--%>
            </ul>

        </div>
        <table id="myTable">
			<tr>
				<th class="amb" id="amb1"> Amb 1 </th>
				<th class="amb" id="amb2"> Amb 2 </th>
				<th class="amb" id="amb3"> Amb 3 </th>
				<th class="amb" id="amb4"> Amb 4 </th>
				<th class="amb" id="amb5"> Amb 5 </th>
			</tr>
        </table>
        <div id="discussion">
        </div>
<%--        <div id="sendInfo">
            <div class="container">
                <input type="text" id="message" />
                <input type="button" id="sendmessage" value="Send" />
                <input type="hidden" id="displayname" />
                <ul id="discussion"></ul>
            </div>

        </div>--%>
       <div id="map_canvas" style="width:100%;height:500px;"></div>
       <div id="state">
       </div>
    
    </div>
    </form>
   <!--Script references. -->
   <!--Reference the jQuery library. -->
    <script src="/Scripts/ER.js" "></script>
    <script src="/Scripts/jquery-1.10.2.min.js" "></script>
    <!--Reference the SignalR library. -->
    <script src="/Scripts/jquery.signalR-2.0.2.min.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <%--<script src="~/signalr/hubs"></script>--%>
    <script src='<%: ResolveClientUrl("~/signalr/hubs") %>'></script>

    <!--Add script to update the page and send messages.-->
    <script type="text/javascript">
        var map;
        var geocoder;
        function initialize() {
            var latlng = new google.maps.LatLng(46.765647, 23.587470);
            var myOptions = {
                zoom: 13,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("mapCall"),
                    myOptions);
            geocoder = new google.maps.Geocoder();

            //var marker = new google.maps.Marker({
            //    position: latlng,
            //    map: map,
            //    title: 'Hello World!'
            //});
        }
        google.maps.event.addDomListener(window, "load", initialize);
        var username = '<%= Session["userName"] %>';
        var gmarkers = [];

        var startLoc = new Array();
        //startLoc[0] = 'Strada Agricultorilor 8, Cluj-Napoca';
        //startLoc[1] = 'Piata Garii, Cluj-Napoca';
        //startLoc[2] = 'Strada Ciprian Porumbescu 5, Cluj-Napoca';
        //startLoc[3] = '46.769859, 23.580823';

        var endLoc = new Array();
        //endLoc[0] = 'Strada Hermann Oberth 5, Cluj-Napoca';
        endLoc[1] = 'Strada Hermann Oberth 5, Cluj-Napoca';
        //endLoc[2] = 'Strada Hermann Oberth 5, Cluj-Napoca';
        //endLoc[3] = 'Strada Hermann Oberth 5, Cluj-Napoca';
       
        $(function () {

            
            // Declare a proxy to reference the hub.
            var chat = $.connection.chatHub;
      
            chat.client.methodName = function (name, patient) {
                $('#' + name + '-menu1-pFName').html(patient.firstName);
                $('#' + name + '-menu1-pLName').html(patient.lastName);
                $('#' + name + '-menu1-pSSN').html(patient.ssn);
                $('#' + name + '-menu1-pDate').html(patient.date);
            };

            chat.client.showNumber = function (number) {
                parts = number.split(';');
                number = parts[0];
                $("#callTable").append("<tr><th id=th" + number + "><img id=img" + number + " src='../Images/blink.gif'>" + number + "</th><td><button id='" + number + "respond'> Respond </button></td></tr>");
                $('[id^=' + number + ']').click(function (ev) {
                    
                    chat.server.sendResponse("yes;" + number);
                    $("#infoCall").show();
                    $("#hiddenId").val(parts[1]);
                    console.log($("#hiddenId").val(parts[1]));
                    $("#img" + number).remove();
                    $('#th' + number).prepend('<img id="img"' + number + ' src="../Images/white.png" />');
                    $.ajax({
                        type: "POST",
                        data: "{}",
                        url: "ER.aspx/GetAmbulances",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            $.each(data.d, function (index, item) {
                                if (item.state == 0)
                                    var listAmb = "<li> <button id='dispAmb" + item.ambulanceID + "'> Amb" + item.ambulanceID + "</button>&nbsp&nbsp&nbsp<img src='/Images/GreenCircle.png'></li>";
                                else
                                    var listAmb = "<li> <button id='dispAmb" + item.ambulanceID + "'> Amb" + item.ambulanceID + "</button>&nbsp&nbsp&nbsp<img src='/Images/RedCircle.png'></li>";
                                $('#listAmb').append(listAmb);

                            })
                            $("button[id^='dispAmb']").click(function (e) {
                                alert("ba");
                                var id = parts[1];
                                var address = $("#addressInput").val();
                                var cLocation = $("#cLocationInput").val();
                                var cName = $("#cNameInput").val();
                                var pLocation = $("#pLocationInput").val();
                                var pState = $("#pStateInput").val();
                                var pInfo = $("#pInfoInput").val();
                                var description = $("#descInput").val();
                                $.ajax({
                                    type: "POST",
                                    data: '{id:"' + id + '", gps:"' + address + '", cLocation:"' + cLocation + '", cName:"' + cName
                                           + '", pLocation:"' + pLocation + '", pState:"' + pState + '", pInfo:"' + pInfo + '", description:"' + description + '"}',
                                    url: "ER.aspx/updateIncident",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        alert(textStatus);
                                    },
                                    success: function (result) {
                                        alert("success");
                                    }
                                });
                                chat.server.sendTo(username, "hello", "amb1");
                                e.preventDefault();
                            });
                            
                        },
                        failure: function (response) {
                            var r = jQuery.parseJSON(response.responseText);
                            alert("Message: " + r.Message);
                        }
                    })
                    ev.preventDefault();
                });
            };

            chat.client.sendPosition = function (pos, number) {
                var ll = pos.split(',');
                var lat = parseFloat(ll[0]);
                var lng = parseFloat(ll[1]);
                var latlng = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: 'Hello World!'
                });
                gmarkers.push(marker);
                var infowindow = new google.maps.InfoWindow({
                    content: "<span>" + number + "</span>"
                });
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

                geocoder.geocode({
                    'latLng': latlng
                }, function (results, status) {
                    var result = results[0];
                    var city = "";
                    var street = "";
                    var streetNr = "";
                    for (var i = 0, len = result.address_components.length; i < len; i++) {
                        var ac = result.address_components[i];
                        if (ac.types.indexOf("street_number") >= 0) streetNr = ac.long_name;
                        if (ac.types.indexOf("route") >= 0) street = ac.long_name;
                        if (ac.types.indexOf("locality") >= 0) city = ac.long_name;
                    }
                    if (city != '' && street != '' && streetNr != '') {
                        $("#addressInput").val(street + " " + streetNr + " " + city);
                    }
                });
                var parts = number.split(';');
                $("#cPhoneInput").val(parts[0]);
                
                
                //$('#img' + number).hide();
                //alert('#img' + number);
                //$('#callTable').find(imgBlink).remove();
            };
            

            //$("#callTable th").click(function () {
            //    GEvent.trigger(gmarkers[i], "click");
            //});
           
            $.connection.hub.start().done(function () {
                
                $("button[id^='dispAmb']").click(function () {
                    alert("ba");
                    
                    chat.server.sendTo(username, "hello", "amb1");

                });

                chat.client.methodName = function (name, patient) {
                    $('#' + name + '-menu1-pFName').html(patient.firstName);
                    $('#' + name + '-menu1-pLName').html(patient.lastName);
                    $('#' + name + '-menu1-pSSN').html(patient.ssn);
                    $('#' + name + '-menu1-pDate').html(patient.date);
                };
            });
        });
    </script>
</body>
</html>
