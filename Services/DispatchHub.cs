using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using ER_application.Models;

namespace ER_application.Services
{
    public class DispatchHub : Hub
    {
        public static Dictionary<string, string> map = new Dictionary<string, string>();
        public void sendBusySignalDispatch(string fromWho, string number)
        {
            if (!map.ContainsKey(number))
            {
                map.Add(number, fromWho);
                Clients.All.receiveBusySignal(fromWho, number);
            }
            else
                Clients.All.receiveBusyCall(fromWho, number);
        }

        public void sendResponseDispatch(string response)
        {
            String number = response.Split(';')[1];
            ServerWorker.singleTonServer.map[number].response = response;
        }
   
        public void sendResolvedDispatch(string nameAmb, string state, string number, Incident incident)
        {
            Clients.All.receiveResolvedDispatch(nameAmb, state, number, incident);
        }

        public void sendIncident(string toWho, Incident i)
        {
            Clients.All.receiveIncident(toWho, i);
        }

        public void sendResolved(string number)
        {
            Clients.All.receiveResolved(number);
        }

        public void updateAmbulanceState(string name, string state)
        {
            Clients.All.updateAmbulance(name, state);
        }

        public void sendCoordinates(string toWho, string coordinates)
        {
            Clients.All.receiveCoordinates(toWho, coordinates);
        }
    }
}