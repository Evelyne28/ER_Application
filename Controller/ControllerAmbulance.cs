using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Repository;
using ER_application.Models;

namespace ER_application.Controller
{
    public class ControllerAmbulance : IControllerAmbulance
    {
        private IRepositoryAmbulance repository;

        public ControllerAmbulance() 
        {
            this.repository = new RepositoryAmbulance();
        }

        public Patient getRandomPatient()
        {
            return repository.getRandomPatient();
        }
    }
}