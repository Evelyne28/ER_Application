using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace ER_application
{
    public class ServerWorker
    {
        private TcpListener server;
        public volatile static ServerWorker singleTonServer;
        private static object lockingObject = new object();
        public Dictionary<string, ClientWorker> map = new Dictionary<string, ClientWorker>();
        //public Dictionary<ClientWorker, string> mapResponses = new Dictionary<ClientWorker, string>();

        private ServerWorker() 
        {
            IPAddress adresaLocala = IPAddress.Parse("192.168.0.13");
            //server = new TcpListener(adresaLocala, 2012);
            //server.Start();
        }
      
        
        public class ClientWorker
        {
            public TcpClient client;
            public ChatHub chat;
            public static string number { get; set; }
            public string response;
            public ClientWorker(TcpClient client)
            {
                this.client = client;

            }

            public void execute(ClientWorker cl)
            {
                try
                {
                    StreamReader Rd = new StreamReader(client.GetStream());
                    StreamWriter Wt = new StreamWriter(client.GetStream());
                    Console.WriteLine("Conexiune acceptata: " + client);
                    String cePrimesc = Rd.ReadLine();
                    String number = cePrimesc;
                    ServerWorker.singleTonServer.map.Add(number, cl);
                    cl.response = "";
                    var hub = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
                    hub.Clients.All.showNumber(number);

                    while (true)
                    {
                        if (!"".Equals(cl.response))
                        { 
                            Wt.AutoFlush = true;
                            Wt.WriteLine(cl.response);
                            cl.response = "";
                            break;
                        }

                        if (response == "Final")
                            break;
                    }
                    System.Threading.Thread.Sleep(10 * 1000);
                    cePrimesc = Rd.ReadLine();
                    hub.Clients.All.sendPosition(cePrimesc, number);
                    client.Close();
                }
                catch (Exception e)
                {
                    System.Console.WriteLine(e.StackTrace);
                }

            }
           

            public void ExecuteOperation(ClientWorker cl)
            {
                Thread t = new Thread(() => execute(cl));
                //Thread t = new Thread(new ThreadStart(execute));
                t.Start();
                
            }
        }

  

        public static ServerWorker InstanceCreation()
        {
            
            if(singleTonServer == null)
            {
                 lock (lockingObject)
                 {
                      if(singleTonServer == null)
                      {
                           singleTonServer = new ServerWorker();
                      }
                 }
                
            }
            return singleTonServer;
        }

        public void ExecuteConcurrentServer()
        {
            IPAddress adresaLocala = IPAddress.Parse("192.168.13.110");
            TcpListener server = new TcpListener(adresaLocala, 2012);
            try
            {
                server.Start();
                //System.Console.WriteLine("Press Ctrl-C to stop");
                while (true)
                {
                    //while (!server.Pending()) { }
                    TcpClient Cl = server.AcceptTcpClient();
                    ClientWorker cw = new ClientWorker(Cl);
                   // ServerWorker.mapResponses.Add(cw, "");
                    //new ClientWorker(Cl).ExecuteOperation();
                    cw.ExecuteOperation(cw);

                }
                
            }
            catch (Exception e)
            {
                System.Console.WriteLine(e.StackTrace);
            }
            server.Stop();
        }

        //public static void Main()
        //{
        //    ExecuteConcurrentServer();
        //}
    }
    
}