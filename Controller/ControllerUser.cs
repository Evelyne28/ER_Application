using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Repository;
using ER_application.Models;

namespace ER_application.Controller
{
    public class ControllerUser : IControllerUser
    {
        private IRepositoryUser repository;

        public ControllerUser() 
        {
            this.repository = new RepositoryUser();
        }

        public int findUser(String username, String password)
        {
            return repository.findUser(username, password);
        }

        public int getAmbulanceID(String licensePlate)
        {
            return repository.getAmbulanceID(licensePlate);
        }

    }
}