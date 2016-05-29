using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ER_application.Models;
using ER_application.Repository.Interfaces;

namespace ER_application.Repository
{
    public class RepositoryAmbulance : IRepositoryAmbulance
    {
        public EREntities context;
        public IGenericRepository<Patient> repoPatient;
        public IGenericRepository<PatientAmbulance> repoPA;
        public IGenericRepository<Allergy> repoAllergy;
        public IGenericRepository<Injury> repoInjury;
        public IGenericRepository<Mechanism> repoMechanism;
        public IGenericRepository<PatientInjury> repoPI;
        public IGenericRepository<VitalSign> repoVS;
        public IGenericRepository<PatientVital> repoPV;
        
        public RepositoryAmbulance() {
            
            context = new EREntities();
            repoPatient = new GenericRepository<Patient>(context);
            repoPA = new GenericRepository<PatientAmbulance>(context);
            repoAllergy = new GenericRepository<Allergy>(context);
            repoInjury = new GenericRepository<Injury>(context);
            repoMechanism = new GenericRepository<Mechanism>(context);
            repoPI = new GenericRepository<PatientInjury>(context);
            repoVS = new GenericRepository<VitalSign>(context);
            repoPV = new GenericRepository<PatientVital>(context);
        }

        public int addPatient(Patient p)
        {
            DetachAll();
            repoPatient.Add(p);
            return p.patientID;
        }

        //public int addAllergy(Allergy a)
        //{
        //    context.Allergy.Add(a);
        //    context.SaveChanges();
        //    return a.allergyID;
        //}

        public int addPatientAmbulance(PatientAmbulance pa)
        {
            DetachAll();
            repoPA.Add(pa);
            return pa.paID;
        }

        public void addPatientInjury(PatientInjury pi)
        {
            repoPI.Add(pi);
        }

        public void addInjuryMechanism(InjuryMechanism im)
        {
            //
        }

        public int addVitalSign(VitalSign vs)
        {
            repoVS.Add(vs);
            return vs.vitalID;
        }

        public void addPatientVital(PatientVital pv)
        {
            repoPV.Add(pv);
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
            return repoPatient.GetAll().Cast<Patient>().ToList();
        }

        public List<Allergy> getAllergies()
        {
            return repoAllergy.GetAll().Cast<Allergy>().ToList();
        }

        public List<Injury> getInjuries()
        {
            return repoInjury.GetAll().Cast<Injury>().ToList();
        }

        public List<Mechanism> getMechanisms()
        {
            return repoMechanism.GetAll().Cast<Mechanism>().ToList();
        }

        public List<VitalSign> getVitalSigns()
        {
            return repoVS.GetAll().Cast<VitalSign>().ToList();
        }

        public List<PatientInjury> getPatientInjuries()
        {
            using (var c = new EREntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                List<PatientInjury> piList = new List<PatientInjury>();
                var load = from a in context.PatientInjury select a;
                if (load != null)
                {
                    try
                    {
                        piList = load.ToList();
                    }
                    catch (Exception ex)
                    {
                        string exx = ex.InnerException.ToString();
                    }
                }
                return piList;
                // return repoPI.GetAll().Cast<PatientInjury>().ToList();
            }
        }

        public List<Disease> getMedicalHistory()
        {
            using (var c = new EREntities())
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
        }

        public List<Allergy> getPatientAllergies(int id)
        {
            using (var c = new EREntities())
            {
                List<Allergy> allergies = new List<Allergy>();
                context.Configuration.ProxyCreationEnabled = false;
                var patient = context.Patient.Find(id);
                var load = context.Entry(patient).Collection(b => b.Allergy).Query().ToList();
                allergies = load;
                return allergies;
            }
        }

        public List<int> getPatientDiseases(int id)
        {
            using (var c = new EREntities())
            {
                List<int> diseases = new List<int>();
                context.Configuration.ProxyCreationEnabled = false;
                var load = from p in context.Patient
                           from d in context.Disease
                           from pd in context.PatientDisease
                           where p.patientID == id && p.patientID == pd.pID && pd.dID == d.diseaseID
                           select new { d.name, d.diseaseID };
                foreach (var disease in load)
                {
                    int i = disease.diseaseID;
                    diseases.Add(i);
                }
                return diseases;
            }
        }

        public Injury findInjury(int id) {
            return repoInjury.Get(id);
        }

        public PatientInjury findPatientInjury(int paID, int injuryID)
        {
            using (var c = new EREntities())
            {
                List<PatientInjury> piList = getPatientInjuries();
                foreach (PatientInjury pi in piList)
                {
                    if (pi.paID == paID && pi.injID == injuryID)
                        return null;
                    else
                        return pi;
                }
                return null;
            }
        }

        public void DetachAll()
        {

            foreach (DbEntityEntry dbEntityEntry in this.context.ChangeTracker.Entries())
            {

                if (dbEntityEntry.Entity != null)
                {
                    dbEntityEntry.State = EntityState.Detached;
                }
            }
        }
    }
}