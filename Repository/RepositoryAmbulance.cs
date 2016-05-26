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
            List<Allergy> allergies = getPatientAllergies(p.patientID);
            p.Allergy = allergies;          
            return p;
        }

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

        public List<Allergy> getAllergies()
        {
            List<Allergy> allergies = new List<Allergy>();
            context.Configuration.ProxyCreationEnabled = false;
            var load = from a in context.Allergy select a;
            if (load != null)
            {
                try
                {
                    allergies = load.ToList();
                }
                catch (Exception ex)
                {
                    string exx = ex.InnerException.ToString();
                }
            }
            return allergies;
        }

        public List<Disease> getMedicalHistory()
        {
            List<Disease> diseases = new List<Disease>();
            context.Configuration.ProxyCreationEnabled = false;
            var load = from a in context.Disease where a.history.Equals("yes") select a;
            if (load != null)
            {
                try
                {
                    diseases = load.ToList();
                }
                catch (Exception ex)
                {
                    string exx = ex.InnerException.ToString();
                }
            }
            return diseases;
        }

        public List<Allergy> getPatientAllergies(int id)
        {
            List<Allergy> allergies = new List<Allergy>();
            context.Configuration.ProxyCreationEnabled = false;
            var patient = context.Patient.Find(id);
            var load = context.Entry(patient).Collection(b => b.Allergy).Query().ToList();
            allergies = load;
            return allergies;
        }

        public List<String> getPatientDiseases(int id)
        {
            List<String> diseases = new List<String>();
            context.Configuration.ProxyCreationEnabled = false;
            var load = from p in context.Patient
                       from d in context.Disease
                       from pd in context.PatientDisease
                       where p.patientID == id && p.patientID == pd.pID && pd.dID == d.diseaseID
                       select new { d.name, pd.diagnosedDate };
            foreach (var disease in load)
            {
                String s = disease.name;
                diseases.Add(s);
            }
            return diseases;
        }

    }
}