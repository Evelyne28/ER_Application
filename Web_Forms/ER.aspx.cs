using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ER_application.Models;
using ER_application.Controller;
using ER_application.Controller.Interfaces;

namespace ER_application.Web_Forms
{
    public partial class UPU : System.Web.UI.Page
    {
        static IControllerER controller;
        protected void Page_Load(object sender, EventArgs e)
        {
            String username = Session["userName"].ToString();
            welcome.InnerHtml = "Welcome " + username;
            controller = new ControllerER();
        }

        [WebMethod]
        public static List<Models.Ambulance> GetAmbulances()
        {
            List<Models.Ambulance> d = controller.getAmbulances();
            return d;
        }
    }
}