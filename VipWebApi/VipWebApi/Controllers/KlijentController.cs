﻿using System;
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
    public class KlijentController : ApiController
    {
        private VipMobileDBEntities db = new VipMobileDBEntities();

        public KlijentController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }
        // GET: api/Klijent
        public System.Object GetKlijent()
        {

            try
            {
                return db.Klijents;
            }
            catch (Exception)
            {

                return HttpStatusCode.NoContent;
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