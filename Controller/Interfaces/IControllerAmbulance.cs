using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Controller.Interfaces
{
    interface IControllerAmbulance
    {
        int addPatient(Patient p);
        //int addAllergy(Allergy a);
        int addPatientAmbulance(PatientAmbulance pa);
        void addVitalSigns(List<VitalSign> vitalSigns, int paID);
        void addPatientInjury(List<String> injuryList, int paID);
        Patient getRandomPatient();
        List<Disease> getPatientDiseases(int id);
        List<Allergy> getAllergies();
        List<Disease> getMedicalHistory();
        List<Injury> getInjuries();
        List<Mechanism> getMechanisms();
        List<VitalSign> getVitalSigns();
        void addPatientAllergies(List<String> allergies, int pID);
        void addPatientDiseases(List<String> diseases, int pID);
    }
}
