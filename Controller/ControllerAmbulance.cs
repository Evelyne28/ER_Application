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

        public void addVitalSigns(List<VitalSign> vitalSigns, int paID) {
            foreach (VitalSign vs in vitalSigns)
            {
                int id = repository.addVitalSign(vs);
                PatientVital pv = new PatientVital();
                pv.paID = paID;
                pv.vID = id;
                repository.addPatientVital(pv);
            }
        }

        public void addPatientInjury(List<String> injuryList, int paID)
        {
            foreach (String injuryID in injuryList) {
                int id = Convert.ToInt32(injuryID);
                PatientInjury pi = repository.findPatientInjury(paID, id);
                if (pi != null)
                {
                    PatientInjury pi2 = new PatientInjury(paID, id);
                    repository.addPatientInjury(pi2);
                }
            }

        }

        public Patient getRandomPatient()
        {
            return repository.getRandomPatient();
        }

        public List<int> getPatientDiseases(int id)
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