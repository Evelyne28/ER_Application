using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Repository.Interfaces
{
    interface IRepositoryAmbulance
    {
        int addPatient(Patient p);
        //int addAllergy(Allergy a);
        int addPatientAmbulance(PatientAmbulance pa);
        void addPatientInjury(PatientInjury pi);
        void addInjuryMechanism(InjuryMechanism im);
        void addPatientVital(PatientVital pv);
        Patient getRandomPatient();
        List<int> getPatientDiseases(int id);
        List<Allergy> getAllergies();
        List<Disease> getMedicalHistory();
        List<Injury> getInjuries();
        List<Mechanism> getMechanisms();
        List<VitalSign> getVitalSigns();
        Injury findInjury(int id);
        PatientInjury findPatientInjury(int paID, int injuryID);

        int addVitalSign(VitalSign vs);
    }
}
