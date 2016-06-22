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
<%--    <div id="welcome" runat="server">
    
    </div>--%>
    <table id="myTable" runat="server">
	    <tr>
			<th class="header" id="dispatchMenu" runat="server"> </th>
			<th class="header" id="patientMenu"> Informatii pacient </th>
			<th class="header" id="problemMenu"> Leziuni suferite </th>
			<th class="header" id="vitalMenu"> Functii vitale </th>
			<th class="header" id="interventionsMenu"> Interventii medicale </th>
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
        
        
        <div id="mHistory">
            <p id="pHistory"> Istoric medical </p>
            <ul id="ulHistory"> </ul>
        </div>
        <div id="divCard">
            <button id="btnAddPatient"> Adauga pacient </button>
            <button id="buttonCard"> Scanează cardul </button>
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
            <p id="pMechanism"> Modalitatea de ranire</p>
            <ul id="ulMechanism"></ul>
        </div>
	    <div id="injuryPb">
            <p id="pInjury">Leziuni suferite</p>
		    <ul id="ulInjuries"></ul>
		</div>      
        <div id="divMgm">
            <button id="btnSave"> Salveaza</button>
        </div>
	</div>
    <div id="vitalDiv">
        <table id="vitalTable">
            <tr id="vitalHeader">
                <th> <button id="addVital"> + </button> Time </th>
                <th> Pres. sistolica </th>
                <th> Pres. diastolica </th>
                <th> Puls / Tip </th>
                <th> Respiratie / Tip </th>
                <th> SPO2 </th>
                <th> CO2 </th>
                <th> Glicemie </th>
                <th> Temperatura </th>
                <th> Piele </th>
                <th> Pupile Stanga / Dreapta</th>
                <th> Sacala a durerii </th>
                <th> Nivel de constienta </th>
            </tr>
        </table>
        <table id="inputVitals">
		<tr>
			<th> Pres. sistolica </th> 
			<td class="vitalTD"> <input type="text" id="inputSistolic" placeholder="Pres. sistolica"/> </td>
			<th> Pres. diastolica </th>
			<td class="vitalTD"> <input type="text" id="inputDiastolic" placeholder="Pres. diastolica"/> </td>
		</tr>
		<tr>
			<th> Puls </th>
			<td class="vitalTD"> 
				<input type="text" id="inputPulsRate"/> <br/>
				<input type="radio" id="radioPulsR" name="puls" value="Regular"/> Regulat <br/>
				<input type="radio" id="radioPulsI" name="puls" value="Iregular"/> Neregulat
			</td>
			<th> Respiratie </th>
			<td class="vitalTD"> 
				<input type="text" id="inputRespiratieRate"/> <br/>
				<input type="radio" id="radioRespR" name="respiratie" value="Regular"/> Regulat <br/>
				<input type="radio" id="radioRespS" name="respiratie" value="Shallowed"/> Superficial <br/>
				<input type="radio" id="radioRespL" name="respiratie" value="Labored"/> Greu
			 </td>
		</tr>
		<tr>
			<th> SPO2 </th>
			<td class="vitalTD"> <input type="text" id="inputSPO2"/> </td>
			<th> CO2 </th>
			<td class="vitalTD"> <input type="text" id="inputCO2"/> </td>
		</tr>
		<tr>
			<th> Glicemie </th>
			<td class="vitalTD"> <input type="text" id="inputBS"/> </td>
			<th> Temperatura </th>
			<td class="vitalTD"> <input type="text" id="inputTemperature"/> </td>
		</tr>
		<tr>
			<th> Piele </th>
			<td class="vitalTD"> 
				<input type="radio" id="radioSkinP" name="skin" value="Pale"/> Palida
				<br/>
				<input type="radio" id="radioSkinC" name="skin" value="Cool"/> Rece
				<br/>
				<input type="radio" id="radioSkinW" name="skin" value="Worm"/> Calda
			</td>
			<th> Pupile </th>
			<td class="vitalTD">
				<span> Left / Right </span> <br/>
				<input type="radio" id="radioPLN" name="pupilLeft" value="Normal"/> Normal
				<input type="radio" id="radioPRN" name="pupilRight" value="Normal"/> Normal
				<br/>
				<input type="radio" id="radioPLD" name="pupilLeft" value="Dilated"/> Dilatat
				<input type="radio" id="radioPRD" name="pupilRight" value="Dilated"/> Dilatat
				<br/>
				<input type="radio" id="radioPLNR" name="pupilLeft" value="No reaction"/> Fara reactie
				<input type="radio" id="radioPRNR" name="pupilRight" value="No reaction"/> Fara reactie
			</td>
		</tr>
		<tr>
			<th> Scala a durerii </th>
			<td class="vitalTD"> <input type="text" id="inputPain"/> </td>
			<th> Nivel de constienta </th>
			<td class="vitalTD">
				<input type="radio" id="radioConscA" name="consciousness" value="Alert"/> Alert <br/>
				<input type="radio" id="radioConscV" name="consciousness" value="Voice"/> Voce <br/>
				<input type="radio" id="radioConscP" name="consciousness" value="Pain"/> In dureri <br/>
				<input type="radio" id="radioConscU" name="consciousness" value="Unresponsive"/> Inconstient
			</td>
		</tr>
	</table>
    <div id="divRight">
        <button id="btnGenerateVitals"> Genereaza </button>
        <button id="btnAddVital"> Adauga </button>
        <button id="btnCancelVital"> Cancel </button>
        <button id="saveVitals"> Salveaza </button>
    </div>
    </div>
    <div id="interventionsDiv">
        <div id="blsDiv">
            <p id="bslP"> Basic Life Support </p>
            <ul id="interventionsUl">
                <li id="bleeding"> 
                    <input type="checkbox" id="chkBleeding" value="Controlul hemoragiei prin" /> Controlul hemoragiei prin
                    <input type="text" id="inputBleeding" /> 
                </li>
                <li id="imobNeck"> 
                    <input type="checkbox" id="chkImobNeck" value="Imobilizare gat" /> Imobilizare gat
                </li>
                <li id="imobBack"> 
                    <input type="checkbox" id="chkImobBack" value="Imobilizare spate" /> Imobilizare spate
                </li>
                <li id="imobLimb"> 
                    <input type="checkbox" id="chkImobLimb" value="Imobilizare membru prin" /> Imobilizare membru prin
                    <input type="radio" id="radioImobLimbF" name="limb" value="Fixare" /> Fixare
                    <input type="radio" id="radioImobLimbT" name="limb" value="Tractiune" /> Tractiune
                </li>
                <li id="rcpStart">
                    <input type="checkbox" id="chkRcpStart" value="RCP inceputa" /> RCP inceputa
                    <input type="text" id="rcpHour" /><span class="colonInt">:</span> <input type="text" id="rcpMinute" />
                </li>      
                <li id="artificialVentilation">
                    <input type="checkbox" id="cfkArtVent" value="Ventilatie artificiala" /> Ventilatie artificiala <br />
                    <input type="radio" id="radioAVA" name="artven" value="Aparativ" /> Aparativ
                    <input type="radio" id="radioAVN" name="artven" value="Neaparativ" /> Neaparativ
                </li>
                <li id="irrigation">
                    <input type="checkbox" id="chkIrrigation" value="Irigatie" /> Irigatie <br />
                </li>
                <li id="glucose">
                    <input type="checkbox" id="chkGlucose" value="Insta-glucose" /> Glucose <br />
                </li>
                <li id="nebulizer">
                    <input type="checkbox" id="chkNebulizer" value="Nebulizator" /> Nebulizator <br />
                </li>
                <li id="airwayCleared">
                    <input type="checkbox" id="chkAirwayCleared" value="Eliberarea CR" /> Eliberarea CR <br />
                </li>
                <li id="suction">
                    <input type="checkbox" id="chkSuction" value="Aspirat CR" /> Aspirat CR <br />
                </li>
                <li id="nasalCannula">
                    <input type="checkbox" id="chkNasalCannula" value="Canula nazala" /> Canula nazala <br />
                </li>
                <li id="chestTrust">
                    <input type="checkbox" id="chkChestThrust" value="Lovituri in piept/spate" /> Lovituri in piept/spate <br />
                </li>

            </ul>
        </div>
        <div id="alsDiv">
            <p id="alsP"> Advanced Life Support </p>
            <ul id="iterventionsULALS">
                <li id="etTube">
                    <input type="checkbox" id="chkETTube" value="Intubare endotraheala" /> Intubare endotraheala <br />
                </li>
                <li id="ngTube">
                    <input type="checkbox" id="chkNGTube" value="Intubare nazogastrica" /> Intubare nazogastrica <br />
                </li>
                <li id="defibrilation"> 
                    <input type="checkbox" id="chkDefibrilation" value="Defibrilare" /> Defibrilare <br />
                    Numarul de defibrilatii <input type="text" id="inputDefibNr" />
                    <input type="radio" id="radioDefM" name="defib" value="Manuala" /> Manuala
                    <input type="radio" id="radioDefA" name="defib" value="Automata" /> Automata
                </li>
                <li id="cardioversion"> 
                    <input type="checkbox" id="chkCardioversion" value="Cardioversie" /> Cardioversie <br />
                    Numarul de cardioversii <input type="text" id="inputCardioNr" />
                    <input type="radio" id="radioCardM" name="cardio" value="Manuala" /> Manuala
                    <input type="radio" id="radioCardA" name="cardio" value="Automata" /> Automata
                </li>
                <li id="cvl">
                    <input type="checkbox" id="chkCVL" value="Central Venous Line" /> Central Venous Line <br />
                </li>
                <li id="pacing">
                    <input type="checkbox" id="chkPacing" value="Cardiac Pacing" /> Cardiac Pacing <br />
                </li>
                <li id="chestDecomp">
                    <input type="checkbox" id="chkChestDecomp" value="Chest Decompression" /> Chest Decompression <br />
                </li>
                <li id="surgicalAirway">
                    <input type="checkbox" id="chkAirway" value="Surgical airway" /> Surgical airway <br />
                </li>
                <li id="intraLine">
                    <input type="checkbox" id="chkIntraLine" value="Intraosseous line" /> Intraosseous line <br />
                </li>
            </ul>
        </div>
        <div id="canvasDiv"></div>
            <%--<canvas id="canvasInAPerfectWorld" width="300" height="200"></canvas>--%>
        <div id="saveInterventionsDiv">
            <button id="btnSaveInterventions">Salveaza</button>
        </div>
    </div>
    <div id="mapCall"> </div>
    <input id="ambulanceID" type="hidden" runat="server" />
   
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

            //// Declare a proxy to reference the hub.
            //var chat = $.connection.chatHub;
            ////// Create a function that the hub can call to broadcast messages.
            //chat.client.receive = function (name, message, toWho) {
            //    if (toWho == username) {
            //        alert(name + " " + message + " " + toWho);
            //    }
            //    else
            //        alert("not to me");
            //    //alert(message);
            //    //$('#loc').html(message);
            //};
          
            $.connection.hub.start().done(function () {
                //chat.client.receive = function (name, message, toWho) {
                //    if (toWho == username) {
                //        alert(name + " " + message + " " + toWho);
                //    }
                //    else
                //        alert("not to me");
                //   // $('#loc').html(message);
                //};
            });
        });
    
    </script>
</body>
</html>
