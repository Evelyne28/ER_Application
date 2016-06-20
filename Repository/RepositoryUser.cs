using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ER_application.Models;
using ER_application.Repository.Interfaces;

namespace ER_application.Repository
{
    public class RepositoryUser : IRepositoryUser
    {
        EREntities context;

        public RepositoryUser() {
            context = new EREntities();
        }

        //returneaza rolul user-ului
        public int findUser(String username, String password)
        {
            var user = (from a in context.UserMode
                       where a.username == username && a.password == password
                       select new
                       {
                           a.role
                       }).ToList();
            if (user.Count == 0)
                return -1;
            else 
                return (int)user.ElementAt(0).role;
        }

        public Ambulance findAmbulance(string userName, string password)
        {
            var ambulance = (from a in context.Ambulance
                             where a.userName == userName && a.userPass == password
                             select a).ToList();
            if (ambulance.Count == 0)
                return null;
            else 
                return (Ambulance)ambulance.ElementAt(0);
        }

        public int getAmbulanceID(String licensePlate)
        {
            var ambulanceID = (from a in context.Ambulance
                               where a.licensePlate == licensePlate
                               select new
                               {
                                  a.ambulanceID
                               }).ToList();

            return (int)ambulanceID.ElementAt(0).ambulanceID;
        }

    }
}