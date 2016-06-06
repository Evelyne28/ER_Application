﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dispatch.aspx.cs" Inherits="ER_application.Web_Forms.ER" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="~/CSS/Dispatch.css"/>
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
                <th class="hide"> </th>
				<th class="show" id="dispatch">Dispatch</th>
				<th class="hide"> </th>
			</tr>
		</table>
        <table id="calls">
            <tr>
                <td>
                    <div id="callDiv">
                        <p>Apeluri nepreluate</p>
                        <table id="callTable"></table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="divWaiting">
                        <p>Apeluri in asteptare</p>
                        <table id="tableWaiting"></table>
                    </div>
                </td>
            </tr> 
        </table>
        

        <div id="infoCall">
        
        </div>
        <div id="mapCall"> </div>
        
       <%-- <div id="divColors">
            <button id="btnRed" style="background-color:red"></button>
            <button id="btnYellow" style="background-color:yellow"></button>
            <button id="btnGreen" style="background-color:green"></button>
        </div>
        <div id="divCall">
            
        </div>--%>
        <div id="divAmb">
            <ul id="listAmb">
            </ul>
        </div>
        <div id="map_canvas" style="width:100%;height:500px;"></div>
        
        <table id="tableActions">
            <tr>
                <th></th>
                <td>Gravitatea situatiei</td>
            </tr>
            <tr>
                <th></th>
                <td>
                    <button id="btnRed" style="background-color:red"></button>
                    <button id="btnYellow" style="background-color:yellow"></button>
                    <button id="btnGreen" style="background-color:green"></button>
                </td>
            </tr>
            <tr>
                <th></th>
                <td>
                    <button id="btnWait">Pune in asteptare</button>
                    <button id="btnEndCall">Inchide apelul</button>
                </td>
            </tr>
        </table>
    </div>
    </form>
   <!--Script references. -->
   <!--Reference the jQuery library. -->
    <script src="/Scripts/DispatchScripts/Dispatch.js"></script>
    <script src="/Scripts/DispatchScripts/Dispatch_Functions.js"></script>
    <script src="/Scripts/jquery-1.10.2.min.js"></script>
    <!--Reference the SignalR library. -->
    <script src="/Scripts/jquery.signalR-2.0.2.min.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src='<%: ResolveClientUrl("~/signalr/hubs") %>'></script>
</body>
</html>
