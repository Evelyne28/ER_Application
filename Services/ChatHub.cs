using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using ER_application.Models;

namespace ER_application.Services
{
    public class ChatHub : Hub
    {
        //public static Dictionary<string, string> map = new Dictionary<string, string>();
        //public void Send(string name, string message)
        //{
        //    // Call the broadcastMessage method to update clients.
        //    Clients.All.broadcastMessage(name, message);
        //}

        //public void Update(string name, Patient p)
        //{
        //    Clients.All.methodName(name, p);
        //}

        //public void sendIncident(string toWho, Incident i)
        //{
        //    Clients.All.receiveIncident(toWho, i);
        //}

        //public void sendTo(string name, string message, string toWho)
        //{
        //    Clients.All.receive(name, message, toWho);
        //}

        //public void sendBusySignal(string fromWho, string number)
        //{
        //    if (!map.ContainsKey(number)) {
        //        map.Add(number, fromWho);
        //        Clients.All.receiveBusySignal(fromWho, number);
        //    }       
        //}

        //public void sendResolved(string number)
        //{
        //    Clients.All.receiveResolved(number);
        //}

        //public void updateAmbulanceState(string name, string state)
        //{
        //    Clients.All.updateAmbulance(name, state);
        //}

        //public void sendResponse(string response)
        //{
        //    String number = response.Split(';')[1];
        //    ServerWorker.singleTonServer.map[number].response = response;
        //}

        //public void sendCoordinates(string toWho, string coordinates) {
        //    Clients.All.receiveCoordinates(toWho, coordinates);
        //}

        //public void sendPatientER(string fromWho, Patient patient, List<String> allergyList, List<String> diseasesList)     {
        //    Clients.All.receivePatient(fromWho, patient, allergyList, diseasesList);
        //}

        //public void sendProblemER(string fromWho, string pComplaint, string mObservations, List<String> injuries, List<String> mechanisms)
        //{
        //    Clients.All.receiveProblem(fromWho, pComplaint, mObservations, injuries, mechanisms);
        //}

        //public void sendVitalsER(string fromWho, List<VitalSign> vitalSigns)
        //{
        //    Clients.All.receiveVitals(fromWho, vitalSigns);
        //}

        //public void sendSmth(string hey)
        //{
        //    Clients.All.receiveSmth(hey);
        //}
    }
}