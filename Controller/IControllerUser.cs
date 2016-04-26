using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ER_application.Controller
{
     public interface IControllerUser
    {
        int findUser(String username, String password);
        int getAmbulanceID(String licensePlate);
    }
}
