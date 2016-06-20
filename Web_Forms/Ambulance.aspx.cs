using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ER_application.Controller;
using ER_application.Models;
using ER_application.Controller.Interfaces;

namespace ER_application.Web_Forms
{
    public partial class Ambulance : System.Web.UI.Page
    {
        static IControllerAmbulance controller;
        String ssn = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            String licensePlate = Session["licensePlate"].ToString();
            //welcome.InnerHtml = "Welcome " + licensePlate;
            dispatchMenu.InnerHtml = "Ambulanta" + licensePlate;
            ambulanceID.Value = Session["ambulanceID"].ToString();
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
        public static List<Disease> GetPatientDiseases(int patientID)
        {
            List<Disease> d = controller.getPatientDiseases(patientID);
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

        [WebMethod]
        public static List<Injury> GetInjuries()
        {
            List<Injury> d = controller.getInjuries();
            return d;
        }

        [WebMethod]
        public static List<Mechanism> GetMechanisms()
        {
            List<Mechanism> d = controller.getMechanisms();
            return d;
        }

        [WebMethod]
        public static String AddPatient(Patient patient, PatientAmbulance pa, List<String> allergyList, List<String> diseaseList)
        {
            int idP = controller.addPatient(patient);
            pa.patientID = idP;
            int idPA = controller.addPatientAmbulance(pa);
            if (allergyList.Count != 0)
                controller.addPatientAllergies(allergyList, idP);
            if (diseaseList.Count != 0)
                controller.addPatientDiseases(diseaseList, idP);
            return idP + ";" + idPA;
        }

        [WebMethod]
        public static int AddPatientAmbulance(PatientAmbulance pa)
        {
            int idPA = controller.addPatientAmbulance(pa);
            return idPA;
        }

        [WebMethod(EnableSession = true)]
        public static void AddPatientInjury(List<String> injuriesList)
        {
            String paID = HttpContext.Current.Session["paID"].ToString();
            int id = Convert.ToInt32(paID);
            controller.addPatientInjury(injuriesList, id);
        }

        [WebMethod(EnableSession = true)]
        public static void AddInjuryMechanism(List<String> mechanismList)
        {
            String paID = HttpContext.Current.Session["paID"].ToString();
            int id = Convert.ToInt32(paID);
            controller.addInjuryMechanism(mechanismList, id);
        }

        [WebMethod]
        public static void AddVitalSigns(List<VitalSign> vitalSigns)
        {
            String paID = HttpContext.Current.Session["paID"].ToString();
            int id = Convert.ToInt32(paID);
            controller.addVitalSigns(vitalSigns, id);
        }

        [WebMethod(EnableSession = true)]
        public static void SetSession(String pID, String iID, String aID, String paID)
        {
            HttpContext.Current.Session["patientID"] = pID;
            HttpContext.Current.Session["incidentID"] = iID;
            HttpContext.Current.Session["ambulanceID"] = aID;
            HttpContext.Current.Session["paID"] = paID;
        }
    }
}