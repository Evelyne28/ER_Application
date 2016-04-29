using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using ER_application.Services;
using System.Threading;

//[assembly: OwinStartup(typeof(Chat.Startup))]
[assembly: OwinStartup(typeof(Chat.Startup))]

namespace Chat
{
    public class Startup
    {
        bool serverExists = false;
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
            if (!serverExists)
            {
                ServerWorker singleton = ServerWorker.InstanceCreation();
                Thread t = new Thread(() => singleton.ExecuteConcurrentServer());
                //Thread t = new Thread(new ThreadStart(execute));
                t.Start();
                //singleton.ExecuteConcurrentServer();
            }
        }
    }
}
