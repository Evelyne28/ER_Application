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
                <th class="show" id="dispatch" runat="server"></th>
                <th class="hide"> </th>	
				<th class="hide" id="toggleMap"> Harta </th>
			</tr>
		</table>
        <table id="calls">
            <tr>
                <th> Apeluri nepreluate </th>
                <th> Apeluri in asteptare </th>
                <th> Apeluri rezolvate </th>
            </tr>
            <tr>
                <td>
                    <div id="callDiv">
                        <%--<p>Apeluri nepreluate</p>--%>
                        <table id="callTable"></table>
                    </div>
                </td>
                <td>
                    <div id="divWaiting">
                        <%--<p>Apeluri in asteptare</p>--%>
                        <table id="tableWaiting"></table>
                    </div>
                </td>
                <td> 
                    <div id="divResolved"> 
                        <table id="tableResolved"></table>
                    </div>
                </td>
            </tr>
        </table>
        

        
        <div id="mapCall"> </div>
        <div id="infoCall">
        
        </div>
        <table id="tableActions">
            <tr>
                <td class="gravity">Gradul de urgenta</td>
            </tr>
            <tr>
                <td>
                    <button id="btnRed" style="background-color:red"></button>
                    <button id="btnYellow" style="background-color:yellow"></button>
                    <button id="btnGreen" style="background-color:green"></button>
                </td>
            </tr>
            <tr>
                <td>
                    <button id="btnWait">Pune in asteptare</button>
                    <button id="btnEndCall">Inchide apelul</button>
                </td>
            </tr>
        </table>
       <%-- <div id="divColors">
            <button id="btnRed" style="background-color:red"></button>
            <button id="btnYellow" style="background-color:yellow"></button>
            <button id="btnGreen" style="background-color:green"></button>
        </div>
        <div id="divCall">
            
        </div>--%>
        <div id="divAmb">
            <ul id="listAmbA"></ul>
            <ul id="listAmbB"></ul>
            <ul id="listAmbC"></ul>
        </div>
        <%--<div id="map_canvas" style="width:100%;height:500px;"></div>--%>
        
        
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
