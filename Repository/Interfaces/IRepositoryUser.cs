using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ER_application.Models;

namespace ER_application.Repository.Interfaces
{
    interface IRepositoryUser
    {
        int findUser(String username, String password);
        int getAmbulanceID(String licensePlate);
        Ambulance findAmbulance(string userName, string password);
    }
}
