﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Repository;
using ER_application.Models;
using ER_application.Controller.Interfaces;
using ER_application.Repository.Interfaces;

namespace ER_application.Controller
{
    public class ControllerDispatcher : IControllerDispatcher
    {
        private IRepositoryDispatcher repository;

        public ControllerDispatcher() 
        {
            this.repository = new RepositoryDispatcher();
        }

        public void createPatient(String firstName, String lastName, String ssn, DateTime birthDate) {
            //Patient p = new Patient(firstName, lastName, ssn, birthDate);
            //repository.createPatient(p);
        }

        public int createIncident(DateTime d, String callerPhone, int resolved)
        {
            Incident i = new Incident(d, callerPhone, resolved);
            return repository.createIncident(i);
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

        public void updateAmbulance(int id, int stateAmb)
        {
            repository.updateAmbulance(id, stateAmb);
        }

        public void updateIncident(Incident i, int id)
        {
            repository.updateIncident(i, id);
        }

        public void updateIncidentResolved(int id)
        {
            repository.updateIncidentResolved(id);
        }

        public void updateIncidentGravity(int id, string gravityLevel)
        {
            repository.updateIncidentGravity(id, gravityLevel);
        }

        public Incident getIncident(int id)
        {
            return repository.getIncident(id);
        }

        //public bool updateIncident(int id, String gps, String cLocation, String cName,
        //                           String pLocation, String pState, String pInfo, String description, int resolved)
        //{
        //    Incident i = new Incident();
        //    i.incidentID = id;
        //    i.locationGPS = gps;
        //    i.callerLocation = cLocation;
        //    i.callerName = cName;
        //    i.patientLocation = pLocation;
        //    i.patientState = pState;
        //    i.patientInfo = pInfo;
        //    i.description = description;
        //    i.resolved = resolved;
        //    return repository.updateIncident(i);
        //}
    }
}