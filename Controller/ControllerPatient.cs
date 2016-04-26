using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Repository;
using ER_application.Models;

namespace ER_application.Controller
{
    public class ControllerPatient : IControllerPatient
    {
        private IRepositoryPatient repository;

        public ControllerPatient() 
        {
            this.repository = new RepositoryPatient();
        }

        public void createPatient(String firstName, String lastName, String ssn, DateTime birthDate) {
            //Patient p = new Patient(firstName, lastName, ssn, birthDate);
            //repository.createPatient(p);
        }

        public List<Patient> readPatients()
        {
            return repository.readPatients();
        }

        public int getPatientID(String ssn)
        {
            return repository.getPatientID(ssn);
        }

        public List<Incident> readIncidents()
        {
            return repository.readIncidents();
        }

        public List<Ambulance> readAmbulances()
        {
            return repository.readAmbulances();
        }

    }
}