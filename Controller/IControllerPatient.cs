using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Controller
{
    public interface IControllerPatient
    {
        void createPatient(String firstName, String lastName, String ssn, DateTime birthDate);
        void createIncident(Incident i);
        List<Patient> readPatients();
        int getPatientID(String ssn);
        List<Incident> readIncidents();
        List<Ambulance> readAmbulances();
    }
}
