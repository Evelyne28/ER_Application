using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using ER_application.Models;

namespace ER_application.Services
{
    public class AmbulanceHub : Hub
    {
        public void sendIncidentAmbulance(string nameAmb, Incident incident, string coordInc)
        {
            Clients.All.receiveIncidentDispatch(nameAmb, incident, coordInc);
        }

        public void sendPatientER(string fromWho, Patient patient, List<String> allergyList, List<String> diseasesList)
        {
            Clients.All.receivePatient(fromWho, patient, allergyList, diseasesList);
        }

        public void sendProblemER(string fromWho, string pComplaint, string mObservations, List<String> injuries, List<String> mechanisms)
        {
            Clients.All.receiveProblem(fromWho, pComplaint, mObservations, injuries, mechanisms);
        }

        public void sendVitalsER(string fromWho, List<VitalSign> vitalSigns)
        {
            Clients.All.receiveVitals(fromWho, vitalSigns);
        }
    }
}