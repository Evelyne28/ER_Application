using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Models;
using ER_application.Repository.Interfaces;

namespace ER_application.Repository
{
    public class RepositoryAmbulance : IRepositoryAmbulance
    {
        public EREntities context;
        
        public RepositoryAmbulance() {
            context = new EREntities();
        }

        public int addPatient(Patient p)
        {
            IGenericRepository<Patient> repoPatient = new GenericRepository<Patient>(context);
            repoPatient.Add(p);
            return p.patientID;
        }

        public int addAllergy(Allergy a)
        {
            context.Allergy.Add(a);
            context.SaveChanges();
            return a.allergyID;
        }

        public int addPatientAmbulance(PatientAmbulance pa)
        {
            context.PatientAmbulance.Add(pa);
            context.SaveChanges();
            return pa.paID;
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
            IGenericRepository<Patient> repoPatient = new GenericRepository<Patient>(context);
            return repoPatient.GetAll().Cast<Patient>().ToList();
        }

        public List<Allergy> getAllergies()
        {
            IGenericRepository<Allergy> repoAllergy = new GenericRepository<Allergy>(context);
            return repoAllergy.GetAll().Cast<Allergy>().ToList();
        }

        public List<Injury> getInjuries()
        {
            IGenericRepository<Injury> repoInjury = new GenericRepository<Injury>(context);
            return repoInjury.GetAll().Cast<Injury>().ToList();
        }

        public List<Mechanism> getMechanisms()
        {
            IGenericRepository<Mechanism> repoMechanism = new GenericRepository<Mechanism>(context);
            return repoMechanism.GetAll().Cast<Mechanism>().ToList();
        }

        public List<Disease> getMedicalHistory()
        {
            context.Configuration.ProxyCreationEnabled = false;
            List<Disease> diseases = new List<Disease>();
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