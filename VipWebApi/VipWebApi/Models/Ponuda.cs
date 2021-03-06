//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace VipWebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Ponuda
    {
      
        public Ponuda()
        {
            this.StavkaPonudes = new HashSet<StavkaPonude>();
        }
      [Key]
        public int IDPonude { get; set; }
        public Nullable<int> IDZap { get; set; }
        public Nullable<int> IDKlijenta { get; set; }
      
        public Nullable<System.DateTime> Datum { get; set; }
        [NotMapped]
        public string DeletedStavkeIDs { get; set; }

      
        public virtual Klijent Klijent { get; set; }
        public virtual Zaposleni Zaposleni { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<StavkaPonude> StavkaPonudes { get; set; }
    }
}
