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
    public class ZaposleniController : ApiController
    {
        private VipMobileDBEntities db = new VipMobileDBEntities();

        // GET: api/Zaposleni
        public IQueryable<Zaposleni> GetZaposleni()
        {
            return db.Zaposlenis;
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