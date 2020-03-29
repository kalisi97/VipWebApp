using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using VipWebApi.Models;

namespace VipWebApi.Controllers
{
    public class UredjajController : ApiController
    {
        private VipMobileDBEntities db = new VipMobileDBEntities();

        // GET: api/Uredjaj
        public System.Object GetUredjaj()
        {
            var result = (from a in db.Uredjajs
                          join b in db.Proizvodjacs on a.IDProizvodjaca equals b.IDProizvodjaca


                          select new
                          {
                              a.IDUredjaja,
                              a.Naziv,
                              a.Model,
                              a.Boja,
                              a.Cena,
                              Proizvodjac = b.Naziv


                          }).ToList();

            return result;
        }

        public IHttpActionResult GetUredjaj(long id)
        {
            var uredjaj = (from a in db.Uredjajs
                           where a.IDUredjaja == id

                           select new
                           {
                               a.IDUredjaja,
                               a.Naziv,
                               a.Model,
                               a.Boja,
                               a.Cena,
                               a.IDProizvodjaca


                           }).FirstOrDefault();

        

            return Ok(new { uredjaj });
        }

        [ResponseType(typeof(Uredjaj))]
        public IHttpActionResult PostUredjajs(Uredjaj uredjaj)
        {


            try
            {

                if (uredjaj.IDUredjaja == 0)
                {
                    db.Uredjajs.Add(uredjaj);

                }
                else
                    db.Entry(uredjaj).State = EntityState.Modified;

                db.SaveChanges();
                return Ok();
            }catch(Exception ex)
            {
                throw ex;
            }
            }



        [ResponseType(typeof(Uredjaj))]
        public IHttpActionResult DeleteUredjaj(long id)
        {
            Uredjaj uredjaj = db.Uredjajs
                .SingleOrDefault(x => x.IDUredjaja == id);

          

            db.Uredjajs.Remove(uredjaj);
            db.SaveChanges();

            return Ok(uredjaj);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

      
    }
}