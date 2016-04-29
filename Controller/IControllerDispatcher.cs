using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Controller
{
    public interface IControllerDispatcher
    {
        void createPatient(String firstName, String lastName, String ssn, DateTime birthDate);
        int createIncident(DateTime d, String callerPhone);
        List<Patient> readPatients();
        int getPatientID(String ssn);
        List<Incident> readIncidents();
        List<Ambulance> readAmbulances();
        bool updateIncident(int id, String gps, String cLocation, String cName,
                                   String pLocation, String pState, String pInfo, String description, int resolved);
    }
}
