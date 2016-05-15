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

        <div id="callDiv">
            <p>Apeluri nepreluate</p>
            <table id="callTable"> </table>
        </div>

        <div id="infoCall">
            <%--<table id="infoTable">
                <tr>
                    <td id="itPos"> <input type="hidden" name="cPos" id="cPos"/></td>
                </tr>
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
            </table>--%>
        </div>
        <div id="mapCall"> </div>

        <div id="divAmb">
            <ul id="listAmb">

            </ul>
        </div>
        <div id="map_canvas" style="width:100%;height:500px;"></div>

    </div>
    </form>
   <!--Script references. -->
   <!--Reference the jQuery library. -->
    <script src="/Scripts/Dispatch.js" "></script>
    <script src="/Scripts/jquery-1.10.2.min.js" "></script>
    <!--Reference the SignalR library. -->
    <script src="/Scripts/jquery.signalR-2.0.2.min.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src='<%: ResolveClientUrl("~/signalr/hubs") %>'></script>
</body>
</html>
