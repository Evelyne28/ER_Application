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
    
    public partial class Ambulance
    {
        public Ambulance()
        {
            this.PatientAmbulance = new HashSet<PatientAmbulance>();
        }
    
        public int ambulanceID { get; set; }
        public string licensePlate { get; set; }
        public Nullable<int> state { get; set; }
    
        public virtual ICollection<PatientAmbulance> PatientAmbulance { get; set; }
    }
}
