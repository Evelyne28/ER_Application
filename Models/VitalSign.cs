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
    
    public partial class VitalSign
    {
        public VitalSign()
        {
            this.PatientVital = new HashSet<PatientVital>();
        }
    
        public int vitalID { get; set; }
        public Nullable<System.DateTime> vitalTime { get; set; }
        public string consciousnessType { get; set; }
        public Nullable<int> respirationRate { get; set; }
        public string respirationType { get; set; }
        public Nullable<int> pulseRate { get; set; }
        public string pulseType { get; set; }
        public string pulseBP { get; set; }
        public string rightPupilType { get; set; }
        public string leftPupilType { get; set; }
        public string skinType { get; set; }
    
        public virtual ICollection<PatientVital> PatientVital { get; set; }
    }
}