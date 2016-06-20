using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Web.Services;
using ER_application.Controller;
using ER_application.Models;
using ER_application;
using ER_application.Controller.Interfaces;
using System.Threading;

namespace ER_application.Web_Forms
{
    public partial class ER : System.Web.UI.Page
    {
        static IControllerDispatcher ctrl = new ControllerDispatcher();
        protected void Page_Load(object sender, EventArgs e)
        {
            String username = Session["userName"].ToString();
            dispatch.InnerHtml = "Dispecerat: " + username;
            //if (!serverExists)
            //{
            //    ServerWorker singleton = ServerWorker.InstanceCreation();
            //    Thread t = new Thread(() => singleton.ExecuteConcurrentServer());
            //    //Thread t = new Thread(new ThreadStart(execute));
            //    t.Start();
            //    //singleton.ExecuteConcurrentServer();
            //}
        }

        [WebMethod]
        public static Models.Ambulance[] GetAmbulances()
        {
            return ctrl.readAmbulances().ToArray();
        }

        [WebMethod]
        public static Models.Incident[] GetIncidents()
        {
            return ctrl.readIncidents().ToArray();
        }

        [WebMethod]
        public static void UpdateAmbulance(int id, int state)
        {
            ctrl.updateAmbulance(id, state);
        }

        [WebMethod]
        public static void UpdateIncidentResolved(int incidentID)
        {
            ctrl.updateIncidentResolved(incidentID);
        }

        [WebMethod]
        public void updateIncidentGravity(int id, string gravityLevel)
        {
            ctrl.updateIncidentGravity(id, gravityLevel);
        }

        [WebMethod]
        public static void UpdateIncident(string incidentID, string gps, string cLocation, string cName,
                                          string pLocation, string pState, string pInfo, string description, string gravity)
        {
            //GPS.Program p = new GPS.Program();
            //string s = p.returnPath();
            //Process.Start(p.returnPath() + "\\GPS.exe");
           // System.Diagnostics.Process.Start(@"cmd.exe", @"/k C:\\Users\\Eve\\Documents\\GPS.exe");
            Incident i = new Incident();
            i.locationGPS = gps;
            i.callerLocation = cLocation;
            i.callerName = cName;
            i.patientLocation = pLocation;
            i.patientState = pState;
            i.patientInfo = pInfo;
            i.description = description;
            i.gravity = gravity;
            ctrl.updateIncident(i, Convert.ToInt32(incidentID));
        }
    }
}