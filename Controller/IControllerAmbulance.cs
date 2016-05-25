using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Controller
{
    interface IControllerAmbulance
    {
        Patient getRandomPatient();
    }
}
