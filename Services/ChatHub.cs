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
        public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }

        public void Update(string name, Patient p)
        {
            Clients.All.methodName(name, p);
        }

        public void sendTo(string name, string message, string toWho)
        {
            Clients.All.receive(name, message, toWho);
        }

        public void sendBusySignal(string fromWho, string number)
        {
            Clients.All.receiveBusySignal(fromWho, number);
        }

        public void sendResponse(string response)
        {
            String number = response.Split(';')[1];
            ServerWorker.singleTonServer.map[number].response = response;
        }

        //public void gps(string number)
        //{
        //    Clients.All.showNumber(number);
        //}
    }
}