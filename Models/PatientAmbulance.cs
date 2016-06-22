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
    
    public partial class PatientAmbulance
    {
        public PatientAmbulance()
        {
            this.InjuryMechanism = new HashSet<InjuryMechanism>();
            this.PatientInjury = new HashSet<PatientInjury>();
            this.PatientIntervention = new HashSet<PatientIntervention>();
            this.PatientVital = new HashSet<PatientVital>();
        }
    
        public int paID { get; set; }
        public Nullable<int> patientID { get; set; }
        public Nullable<int> ambulanceID { get; set; }
        public Nullable<int> incidentID { get; set; }
    
        public virtual Ambulance Ambulance { get; set; }
        public virtual Incident Incident { get; set; }
        public virtual ICollection<InjuryMechanism> InjuryMechanism { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual ICollection<PatientInjury> PatientInjury { get; set; }
        public virtual ICollection<PatientIntervention> PatientIntervention { get; set; }
        public virtual ICollection<PatientVital> PatientVital { get; set; }
    }
}
