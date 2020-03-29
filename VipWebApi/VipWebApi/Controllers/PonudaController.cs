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
    public class PonudaController : ApiController
    {
        private VipMobileDBEntities db = new VipMobileDBEntities();

        // GET: api/Ponuda
        public System.Object GetPonuda()
        {
            var result = (from a in db.Ponudas
                          join b in db.Klijents on a.IDKlijenta equals b.IDKlijenta 
                          join c in db.Zaposlenis on a.IDZap equals c.IDZap

                          select new
                          {
                              a.IDPonude,
                              a.Datum,
                              Klijent = b.Naziv,
                              Zaposleni = c.ImePrezime
                              
                            
                          }).ToList();

            return result;
        }

        public IHttpActionResult GetPonuda(long id)
        {
            var ponuda = (from a in db.Ponudas
                         where a.IDPonude == id

                         select new
                         {
                             a.IDPonude,
                             a.Datum,
                             a.IDKlijenta,
                             a.IDZap,
                             DeletedStavkeIDs = ""

                         }).FirstOrDefault();

            var ponudaDetails = (from a in db.StavkaPonudes
                                join b in db.TarifniPakets on a.IDTP equals b.IDTP
                                join c in db.Uredjajs on a.IDUredjaja equals c.IDUredjaja
                                where a.IDPonude == id

                                select new
                                {

                                    a.Rbr,
                                    a.IDUredjaja,
                                    a.IDTP,
                                    a.IDPonude,
                                    a.Uredjaj.Naziv,
                                    a.TarifniPaket.NazivT
                                  
                                   
                                }).ToList();

            return Ok(new { ponuda, ponudaDetails });
        }
       

        // POST: api/Ponuda
        [ResponseType(typeof(Ponuda))]
        public IHttpActionResult PostPonuda (Ponuda ponuda)
        {


            try
            {

                if (ponuda.IDPonude == 0)
                {
                    db.Ponudas.Add(ponuda);

                    foreach (var item in ponuda.StavkaPonudes)
                    {

                        if (item.IDPonude == 0)
                        {

                            db.StavkaPonudes.Add(item);



                        }

                    }


                }
                else
                {

                    Ponuda p = db.Ponudas.AsNoTracking().FirstOrDefault(a => a.IDPonude == ponuda.IDPonude);


                    foreach (var item in ponuda.StavkaPonudes)
                    {
                        if (item.IDPonude == 0)
                        {
                            item.IDPonude = p.IDPonude;

                            db.StavkaPonudes.Add(item);

                        }
                        else
                            db.Entry(item).State = EntityState.Modified;
                    }
                    db.Entry(ponuda).State = EntityState.Modified;

                }

                if (ponuda.DeletedStavkeIDs != "")
                {

                    foreach (var id in ponuda.DeletedStavkeIDs.Split(',').Where(x => x != ""))
                    {
                        StavkaPonude x = db.StavkaPonudes.Find(Convert.ToInt64(id), ponuda.IDPonude);
                        db.StavkaPonudes.Remove(x);
                    }
                }

                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        [ResponseType(typeof(Ponuda))]
        public IHttpActionResult DeletePonuda(long id)
        {
            Ponuda ponuda = db.Ponudas.Include(y => y.StavkaPonudes)
                .SingleOrDefault(x => x.IDPonude == id);

            foreach (var item in ponuda.StavkaPonudes.ToList())
            {
                db.StavkaPonudes.Remove(item);
            }

            db.Ponudas.Remove(ponuda);
            db.SaveChanges();

            return Ok(ponuda);
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