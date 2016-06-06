using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Models;
using ER_application.Repository.Interfaces;

namespace ER_application.Repository
{
    public class RepositoryDispatcher : IRepositoryDispatcher
    {
        EREntities context;
        IGenericRepository<Ambulance> repoAmb;
        IGenericRepository<Incident> repoInc;

        public RepositoryDispatcher() {
            context = new EREntities();
            repoAmb = new GenericRepository<Ambulance>(context);
            repoInc = new GenericRepository<Incident>(context);
        }

        public void createPatient(Patient p)
        {
            context.Patient.Add(p);
            context.SaveChanges();
        }

        public int createIncident(Incident i)
        {
            context.Incident.Add(i);
            context.SaveChanges();
            return i.incidentID;
        }

        public void updateAmbulance(Ambulance a, int id)
        {
            repoAmb.Update(a, id);
        }

        public void updateIncident(Incident i, int id)
        {
            //repoInc.Update(i, id);
            using (var db = new EREntities())
            {
                var result = db.Incident.SingleOrDefault(b => b.incidentID == id);
                if (result != null)
                {
                    result.locationGPS = i.locationGPS;
                    result.callerLocation = i.callerLocation;
                    result.callerName = i.callerName;
                    result.patientLocation = i.patientLocation;
                    result.patientState = i.patientState;
                    result.patientInfo = i.patientInfo;
                    result.description = i.description;
                    db.SaveChanges();
                }
            }
            //try
            //{
            //    Incident i = context.Incident.Find(incident.incidentID);
            //    if (i != null)
            //    {
            //        i.locationGPS = incident.locationGPS;
            //        i.callerLocation = incident.callerLocation;
            //        i.callerName = incident.callerName;
            //        i.patientLocation = incident.patientLocation;
            //        i.patientState = incident.patientState;
            //        i.patientInfo = incident.patientInfo;
            //        i.description = incident.description;
            //        i.resolved = incident.resolved;
            //        context.SaveChanges();
            //        return true;
            //    }
            //}
            //catch (Exception ex)
            //{
            //    string exception = ex.InnerException.ToString();
            //} 
            //return false;

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
            context.Configuration.ProxyCreationEnabled = false;
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