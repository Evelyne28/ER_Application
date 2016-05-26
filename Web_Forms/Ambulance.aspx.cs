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

        [WebMethod(EnableSession = true)]
        public static Models.Patient GetPatient()
        {
            Patient p = controller.getRandomPatient();
            HttpContext.Current.Session["patientID"] = p.patientID.ToString();
            return p;
        }

        [WebMethod]
        public static List<String> GetPatientDiseases(int patientID)
        {
            List<String> d = controller.getPatientDiseases(patientID);
            return d;
        }

        [WebMethod]
        public static List<Allergy> GetAllergies()
        {
            List<Allergy> d = controller.getAllergies();
            return d;
        }

        [WebMethod]
        public static List<Disease> GetMedicalHistory()
        {
            List<Disease> d = controller.getMedicalHistory();
            return d;
        }
    }
}