using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Repository
{
    interface IRepositoryPatient
    {
        void createPatient(Patient p);
        List<Patient> readPatients();
        int getPatientID(String ssn);
        List<Incident> readIncidents();
        List<Ambulance> readAmbulances();
    }
}
