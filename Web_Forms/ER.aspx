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
            <table id="infoTable">
                <tr>
                    <th>Address</th>
                    <td id="itAddress"> <input type="text" name="addressInput" id="addressInput"/></td>
                </tr>
                <tr>
                    <th>Caller Location</th>
                    <td id="itCLocation"> <input type="text" name="cLocationInput" id="cLocationInput"/> </td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td id="itCPhone"> <input type="text" name="cPhoneInput" id="cPhoneInput"/></td>
                </tr>
                <tr>
                    <th>Caller name</th>
                    <td id="itCName"> <input type="text" name="cNameInput" id="cNameInput"/></td>
                </tr>
                <tr>
                    <th>Patient Location</th>
                    <td id="idPLocation"> <input type="text" name="pLocationInput" id="pLocationInput"/></td>
                </tr>
                <tr>
                    <th>Patient State</th>
                    <td id="itPState"> <input type="text" name="pStateInput" id="pStateInput"/> </td>
                </tr>
                <tr>
                    <th>Patient General Info</th>
                    <td id="itPInfo"> <input type="text" name="pInfoInput" id="pInfoInput"/> </td>
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
        function initialize() {
            var latlng = new google.maps.LatLng(46.765647, 23.587470);
            var myOptions = {
                zoom: 13,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("mapCall"),
                    myOptions);

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
                $("#callTable").append("<tr><th id=th" + number + "><img id=img" + number + " src='../Images/blink.gif'>" + number + "</th><td><button id='" + number + "respond'> Respond </button></td></tr>");
                $('[id^=' + number + ']').click(function (ev) {
                    
                    chat.server.sendResponse("yes;" + number);
                    $("#infoCall").show();

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
                var latlng = new google.maps.LatLng(parseFloat(ll[0]), parseFloat(ll[1]));
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
