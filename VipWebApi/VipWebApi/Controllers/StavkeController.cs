using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VipWebApi.Models;

namespace VipWebApi.Controllers
{


    public class StavkeController : ApiController
    {
        private VipMobileDBEntities db = new VipMobileDBEntities();
        public int GetStavke()
        {
            var stavkas = db.StavkaPonudes.ToList();
            return stavkas.Count();
        }
    }
}
