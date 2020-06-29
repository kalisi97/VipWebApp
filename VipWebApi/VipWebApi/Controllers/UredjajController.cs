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
            try
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
                if (result == null) return HttpStatusCode.NoContent;
                return result;
            }
            catch (Exception)
            {
                //The server encountered an unexpected condition which prevented it from fulfilling the request
                return InternalServerError();
            }
        }

        public IHttpActionResult GetUredjaj(long id)
        {
            try
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

                if (uredjaj == null) return NotFound(); ;

                return Ok(new { uredjaj });
            }
            catch (Exception)
            {
                //The server encountered an unexpected condition which prevented it from fulfilling the request
                return InternalServerError();
            }
        }




        public IHttpActionResult GetUredjajByFilter(string nazivUredjaja)
        {
            try
            {
                if (String.IsNullOrEmpty(nazivUredjaja)) return NotFound();
                var uredjaj = (from a in db.Uredjajs
                               where a.Naziv.ToLower().Contains(nazivUredjaja.ToLower())

                               select new
                               {
                                   a.IDUredjaja,
                                   a.Naziv,
                                   a.Model,
                                   a.Boja,
                                   a.Cena,
                                   a.IDProizvodjaca


                               }).FirstOrDefault();

                if(uredjaj == null) return NotFound();

                return Ok(new { uredjaj });
            }
            catch (Exception)
            {
                //The server encountered an unexpected condition which prevented it from fulfilling the request
                return InternalServerError();
            }
        }






        [ResponseType(typeof(Uredjaj))]
        public IHttpActionResult PostUredjajs(Uredjaj uredjaj)
        {


            try
            {
                if(uredjaj==null) return NotFound();

                if (uredjaj.IDUredjaja == 0)
                {
                    db.Uredjajs.Add(uredjaj);

                }
                else
                    db.Entry(uredjaj).State = EntityState.Modified;

                db.SaveChanges();
                return Ok();
            }catch(Exception)
            {
                //The server encountered an unexpected condition which prevented it from fulfilling the request
                return InternalServerError();
            }
            }



        [ResponseType(typeof(Uredjaj))]
        public IHttpActionResult DeleteUredjaj(long id)
        {
            try
            {
               
                Uredjaj uredjaj = db.Uredjajs
                        .SingleOrDefault(x => x.IDUredjaja == id);

                if (uredjaj == null) return NotFound();
             
                db.Uredjajs.Remove(uredjaj);
                db.SaveChanges();
               
                return Ok(uredjaj);
            }
            catch (Exception)
            {
                return InternalServerError();

            }
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