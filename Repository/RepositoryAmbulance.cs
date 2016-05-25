using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Models;

namespace ER_application.Repository
{
    public class RepositoryAmbulance : IRepositoryAmbulance
    {
        EREntities context;

        public RepositoryAmbulance() {
            context = new EREntities();
        }

        public Patient getRandomPatient()
        {
            List<Patient> patients = new List<Patient>();
            patients = getPatients();
            Random r = new Random();
            int number = r.Next(patients.Count);
            Patient p = patients.ElementAt(number);
            List<Allergy> allergies = getPatientAllergies(p.ssn);
            p.Allergy = allergies;
            return p;
        }

        //public Patient findPatientByID(int id) {
        //    List<Patient> patients = new List<Patient>();
        //    patients = getPatients();
        //    foreach (Patient p in patients)
        //    {
        //        if (p.patientID == id)
        //            return p;
        //    }
        //    return null;
        //}

        public List<Patient> getPatients()
        {
            List<Patient> patients = new List<Patient>();
            context.Configuration.ProxyCreationEnabled = false;
            var load = from a in context.Patient select a;
            if (load != null)
            {
                try
                {
                    patients = load.ToList();
                }
                catch (Exception ex)
                {
                    string exx = ex.InnerException.ToString();
                }
            }
            return patients;
        }

        public List<Allergy> getPatientAllergies(String ssn)
        {
            List<Allergy> allergies = new List<Allergy>();
            var patient = context.Patient.Find(1);
            var load = context.Entry(patient).Collection(b => b.Allergy).Query().ToList();
            allergies = load;
            return allergies;
        }

        
    }
}