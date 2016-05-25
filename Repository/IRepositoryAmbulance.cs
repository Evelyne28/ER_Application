using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Repository
{
    interface IRepositoryAmbulance
    {
        //Patient findPatientById(int id);
        Patient getRandomPatient();
        List<Allergy> getPatientAllergies(String ssn);
    }
}
