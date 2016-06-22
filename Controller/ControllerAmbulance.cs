using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Repository;
using ER_application.Models;
using ER_application.Controller.Interfaces;
using ER_application.Repository.Interfaces;

namespace ER_application.Controller
{
    public class ControllerAmbulance : IControllerAmbulance
    {
        private IRepositoryAmbulance repository;

        public ControllerAmbulance() 
        {
            this.repository = new RepositoryAmbulance();
        }

        public int addPatient(Patient p)
        {
            return repository.addPatient(p);
        }

        //public int addAllergy(Allergy a)
        //{
        //    return repository.addAllergy(a);
        //}

        public int addPatientAmbulance(PatientAmbulance pa) 
        {
            return repository.addPatientAmbulance(pa);
        }

        public void addPatientAllergies(List<String> allergies, int pID)
        {
            List<Allergy> list = new List<Allergy>();
            Patient p = repository.findPatient(pID);
            foreach (String a in allergies)
            {
                int idA = Convert.ToInt32(a);
                Allergy allergy = repository.findAllergy(idA);
                list.Add(allergy);
            }
            repository.addPatientAllergies(list, p);
        }

        public void addPatientDiseases(List<String> diseases, int pID) 
        {
            Patient p = repository.findPatient(pID);
            foreach (String d in diseases)
            {
                int idD = Convert.ToInt32(d);
                Disease disease = repository.findDisease(idD);
                PatientDisease pd = new PatientDisease(pID, idD);
                repository.addPatientDisease(pd);
            }
        }

        public void addVitalSigns(List<VitalSign> vitalSigns, int paID) {
            foreach (VitalSign vs in vitalSigns)
            {
                int id = repository.addVitalSign(vs);
                PatientVital pv = new PatientVital(paID, id);
                repository.addPatientVital(pv);
            }
        }

        public void addPatientInjury(List<String> injuryList, int paID)
        {
            foreach (String injuryID in injuryList) {
                int id = Convert.ToInt32(injuryID);
                PatientInjury pi = repository.findPatientInjury(paID, id);
                if (pi == null)
                {
                    PatientInjury pi2 = new PatientInjury(paID, id);
                    repository.addPatientInjury(pi2);
                }
            }
        }

        public void addInjuryMechanism(List<String> mechanismList, int paID)
        {
            foreach (String mechanismID in mechanismList)
            {
                int id = Convert.ToInt32(mechanismID);
                InjuryMechanism im = repository.findInjuryMechanism(paID, id);
                if (im == null)
                {
                    InjuryMechanism im2 = new InjuryMechanism(paID, id);
                    repository.addInjuryMechanism(im2);
                }
            }
        }

        public void addPatientIntervention(List<PatientIntervention> intList, int paID)
        {
            foreach (PatientIntervention pInt in intList)
            {
                pInt.paID = paID;
                repository.addPatientIntervention(pInt);
            }
        }

        public Patient getRandomPatient()
        {
            return repository.getRandomPatient();
        }

        public List<Disease> getPatientDiseases(int id)
        {
            return repository.getPatientDiseases(id);
        }

        public List<Allergy> getAllergies()
        {
            return repository.getAllergies();
        }

        public List<Disease> getMedicalHistory()
        {
            return repository.getMedicalHistory();
        }

        public List<Injury> getInjuries()
        {
            return repository.getInjuries();
        }

        public List<Mechanism> getMechanisms()
        {
            return repository.getMechanisms();
        }

        public List<VitalSign> getVitalSigns()
        {
            return repository.getVitalSigns();
        }

    }
}