using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Models;
using ER_application.Repository;
using ER_application.Controller.Interfaces;
using ER_application.Repository.Interfaces;

namespace ER_application.Controller
{
    public class ControllerER : IControllerER
    {
        private IRepositoryER repository;

        public ControllerER() 
        {
            this.repository = new RepositoryER();
        }

        public List<Ambulance> getAmbulances()
        {
            return repository.getAmbulances();
        }
    }
}