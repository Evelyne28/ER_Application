using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Models;

namespace ER_application.Repository
{
    public class RepositoryPatient : IRepositoryPatient
    {
        EREntities context;

        public RepositoryPatient() {
            context = new EREntities();
        }

        public void createPatient(Patient p)
        {
            context.Patient.Add(p);
            context.SaveChanges();
        }

        public List<Patient> readPatients()
        {
            List<Patient> patients = new List<Patient>();
            var load = from a in context.Patient select a;
            if (load != null) {
                try {
                    patients = load.ToList();
                }
                catch (Exception ex) {
                    string exception = ex.InnerException.ToString();
                }        
            }
            return patients;
        }

        public int getPatientID(String ssn)
        {
            var patientID = (from a in context.Patient
                             where a.ssn == ssn
                             select new
                             {
                                a.patientID
                             }).ToList();

            return (int)patientID.ElementAt(0).patientID;
        }

        public List<Incident> readIncidents()
        {
            List<Incident> incidents = new List<Incident>();
            var load = from a in context.Incident where a.resolved == 0 select a;
            if (load != null)
            {
                try
                {
                    incidents = load.ToList();
                }
                catch (Exception ex)
                {
                    string exception = ex.InnerException.ToString();
                }
            }
            return incidents;
        }

        public List<Ambulance> readAmbulances()
        {
            List<Ambulance> ambulances = new List<Ambulance>();
            var load = from a in context.Ambulance select a;
            if (load != null)
            {
                try
                {
                    ambulances = load.ToList();
                }
                catch (Exception ex)
                {
                    string exception = ex.InnerException.ToString();
                }
            }
            return ambulances;
        }
    }
}