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

    public partial class StavkaPonude
    {
        [Key]
        public int Rbr { get; set; }
        [Key, ForeignKey("Ponuda")]
        public int IDPonude { get; set; }
        public Nullable<int> IDTP { get; set; }
        public Nullable<int> IDUredjaja { get; set; }
    
        public virtual Ponuda Ponuda { get; set; }
        public virtual TarifniPaket TarifniPaket { get; set; }
        public virtual Uredjaj Uredjaj { get; set; }
    }
}
