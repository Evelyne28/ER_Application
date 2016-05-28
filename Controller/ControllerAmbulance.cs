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

        public int addAllergy(Allergy a)
        {
            return repository.addAllergy(a);
        }

        public int addPatientAmbulance(PatientAmbulance pa) 
        {
            return repository.addPatientAmbulance(pa);
        }

        public Patient getRandomPatient()
        {
            return repository.getRandomPatient();
        }

        public List<String> getPatientDiseases(int id)
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

    }
}