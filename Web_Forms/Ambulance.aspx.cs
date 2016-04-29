using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ER_application.Controller;

namespace ER_application.Web_Forms
{
    public partial class Ambulance : System.Web.UI.Page
    {
        public IControllerDispatcher controller;
        String ssn = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            String username = Session["userName"].ToString();
            welcome.InnerHtml = "Welcome " + username;
            controller = new ControllerDispatcher();
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
            controller.createPatient(firstName, lastName, ssn, date);
        }
    }
}