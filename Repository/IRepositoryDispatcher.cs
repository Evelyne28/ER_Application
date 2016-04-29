using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Repository
{
    interface IRepositoryDispatcher
    {
        void createPatient(Patient p);
        int createIncident(Incident i);
        List<Patient> readPatients();
        int getPatientID(String ssn);
        List<Incident> readIncidents();
        List<Ambulance> readAmbulances();
        bool updateIncident(Incident i);
    }
}
