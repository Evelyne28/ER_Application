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
    }
}