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
    
    public partial class Injury
    {
        public Injury()
        {
            this.Patient = new HashSet<Patient>();
        }
    
        public int injuryID { get; set; }
        public string name { get; set; }
    
        public virtual ICollection<Patient> Patient { get; set; }
    }
}
