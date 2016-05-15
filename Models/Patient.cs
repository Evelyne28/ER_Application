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
        }
    
        public int patientID { get; set; }
        public string ssn { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public Nullable<System.DateTime> birthDate { get; set; }
        public Nullable<int> age { get; set; }
        public string gender { get; set; }
        public string bloodType { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string phone { get; set; }
        public string patientState { get; set; }
    
        public virtual ICollection<PatientAmbulance> PatientAmbulance { get; set; }
    }
}