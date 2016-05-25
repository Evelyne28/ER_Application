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
            return patients.ElementAt(number);
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

        
    }
}