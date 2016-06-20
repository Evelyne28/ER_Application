using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Repository;
using ER_application.Models;
using ER_application.Controller.Interfaces;
using ER_application.Repository.Interfaces;

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

        public Ambulance findAmbulance(string userName, string password)
        {
            return repository.findAmbulance(userName, password);
        }

    }
}