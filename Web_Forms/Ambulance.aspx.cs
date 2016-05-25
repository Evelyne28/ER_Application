using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ER_application.Controller;
using ER_application.Models;

namespace ER_application.Web_Forms
{
    public partial class Ambulance : System.Web.UI.Page
    {
        static IControllerAmbulance controller;
        String ssn = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            String username = Session["userName"].ToString();
            welcome.InnerHtml = "Welcome " + username;
            controller = new ControllerAmbulance();
        }

        protected void btn_Add_Click(object sender, EventArgs e)
        {
            String firstName = "", lastName = "";
            if (!string.IsNullOrEmpty(Request.Form["firstName"]))
            {
                firstName = Request.Form["firstName"];
            }
            if (!string.IsNullOrEmpty(Request.Form["lastName"]))
            {
                lastName = Request.Form["lastName"];
            }
            if (!string.IsNullOrEmpty(Request.Form["ssn"]))
            {
                ssn = Request.Form["ssn"];
            }

            DateTime date = DateTime.Now;
            //controller.createPatient(firstName, lastName, ssn, date);
        }

        [WebMethod]
        public static Models.Patient GetPatient()
        {
            Models.Patient p = controller.getRandomPatient();
            return p;
        }
    }
}