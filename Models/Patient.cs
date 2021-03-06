//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ER_application.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Patient
    {
        public Patient()
        {
            this.PatientAmbulance = new HashSet<PatientAmbulance>();
            this.PatientDisease = new HashSet<PatientDisease>();
            this.Allergy = new HashSet<Allergy>();
        }
    
        public int patientID { get; set; }
        public string ssn { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string gender { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public Nullable<System.DateTime> birthDate { get; set; }
        public Nullable<int> age { get; set; }
        public string city { get; set; }
        public string county { get; set; }
        public string country { get; set; }
        public string zipCode { get; set; }
        public string bloodType { get; set; }
    
        public virtual ICollection<PatientAmbulance> PatientAmbulance { get; set; }
        public virtual ICollection<PatientDisease> PatientDisease { get; set; }
        public virtual ICollection<Allergy> Allergy { get; set; }

        public Patient(int id, string ssn, string firstName, string lastName, string gender, string address, string phone,
                             DateTime birthDate, int age, string city, string county, string country, string zipCode, string bloodType)
        {
            this.patientID = id;
            this.ssn = ssn;
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.address = address;
            this.phone = phone;
            this.birthDate = birthDate;
            this.age = age;
            this.city = city;
            this.county = county;
            this.country = country;
            this.zipCode = zipCode;
            this.bloodType = bloodType;
        }
    }
}
