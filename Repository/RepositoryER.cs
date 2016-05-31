using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Repository.Interfaces;
using ER_application.Models;

namespace ER_application.Repository
{
    public class RepositoryER : IRepositoryER
    {
        public EREntities context;
        public IGenericRepository<Ambulance> repoAmbulance;

        public RepositoryER()
        {
            context = new EREntities();
            repoAmbulance = new GenericRepository<Ambulance>(context);
        }

        public List<Ambulance> getAmbulances()
        {
            return repoAmbulance.GetAll().Cast<Ambulance>().ToList();
        }
    }
}