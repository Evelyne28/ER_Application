<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Ambulance.aspx.cs" Inherits="ER_application.Web_Forms.Ambulance" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Ambulance</title>
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
                <td><input type="hidden" name="cPAID" id="cPAID"/></td>
            </tr>
            <tr>
                <td><input type="hidden" name="cIncidentID" id="cIncidentID"/></td>
            </tr>
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
                <td> <input type="hidden" name="patientIDInput" id="patientIDInput"/> </td>
            </tr>
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
        <div id="divAllergies">
            <p id="pAllergy"> Alergii </p>
            <ul id="ulAllergies"> </ul>
        </div>
        <div id="addPatient">
            
        </div>
        <div id="divCard">
            <button id="btnAddPatient"> Adauga pacient </button>
            <button id="buttonCard"> Scanează cardul </button>
        </div>
        
        <div id="mHistory">
            <p id="pHistory"> Istoric medical </p>
            <ul id="ulHistory"> </ul>
        </div>
	</div>
    <div id="problemDiv">
        <table id="commentsPb">
            <tr>
                <th>Ce acuza pacientul</th><td><textarea id="pComplaint" rows="7" cols="70"></textarea></td>
            </tr>
            <tr>
                <th>Observatii</th><td><textarea id="mObservations" rows="7" cols="70"></textarea></td>
            </tr>
        </table>
        <div id="mechanism">
            <p id="pMechanism"> Mechanism of injury</p>
            <ul id="ulMechanism"></ul>
        </div>
	    <div id="injuryPb">
            <p id="pInjury">Presenting problem</p>
		    <ul id="ulInjuries"></ul>
		</div>      
        <div id="divMgm">
            <button id="btnSave"> Salveaza</button>
        </div>
	</div>
    <div id="vitalDiv">
        <button id="addVital"> Adauga  </button>
        <button id="saveVitals"> Salveaza  </button>
        <table id="vitalTable">
            <tr id="vitalHeader">
                <th> Time </th>
                <th> Nivel de constiinta </th>
                <th> Respiratie </th>
                <th> Puls </th>
                <th> Left / Right</th>
                <th> Piele </th>
            </tr>
        </table>
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
    <script src="/Scripts/AmbulanceScripts/Ambulance.js"></script>
    <script src="/Scripts/AmbulanceScripts/AmbulanceDispatch.js"></script>
    <script src="/Scripts/AmbulanceScripts/AmbulancePatient.js"></script>
    <script src="/Scripts/AmbulanceScripts/AmbulanceProblem.js"></script>
    <script src="/Scripts/AmbulanceScripts/AmbulanceVitals.js"></script>
    <script src="/Scripts/AmbulanceScripts/AmbulanceInterventions.js"></script>
    <!--Add script to update the page and send messages.-->
    <script type="text/javascript">

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
          
            $.connection.hub.start().done(function () {
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
    
    </script>
</body>
</html>
