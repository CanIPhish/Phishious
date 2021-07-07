using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Phishious.Models;
using Phishious.Phishious;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Phishious.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Phishious()
        {
            return View();
        }

        [HttpPost]

        public ActionResult PhishiousResult()
        {
            List<PhishiousResult> matchedFiltersList = new List<PhishiousResult>();
            PhishiousHelper pHelper = new PhishiousHelper();
            foreach (IFormFile file in HttpContext.Request.Form.Files)
            {
                
                //IFormFile file = Request.Files[fileName];
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    var content = reader.ReadToEnd();
                    List<PhishiousResult> matchedFilters = pHelper.FilterIdentification(content, file.FileName, false);
                    if (matchedFilters != null) { matchedFiltersList.AddRange(matchedFilters); }
                }
            }
            if (matchedFiltersList.Count == 0)
            {
                return Content("No Filters Found");
            }
            else
            {
                return Content(JsonConvert.SerializeObject(matchedFiltersList));
            }
        }

        [HttpPost]
        public ActionResult PhishiousDetonate()
        {
            List<PhishiousResult> matchedFiltersList = new List<PhishiousResult>();
            PhishiousHelper pHelper = new PhishiousHelper();
            foreach (IFormFile file in HttpContext.Request.Form.Files)
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    var content = reader.ReadToEnd();
                    List<PhishiousResult> matchedFilters = pHelper.FilterIdentification(content, file.FileName, true);
                    if (matchedFilters != null) { matchedFiltersList.AddRange(matchedFilters); }
                }
            }
            if (matchedFiltersList.Count == 0)
            {
                return Content("No Filters Found");
            }
            else
            {
                return Content(JsonConvert.SerializeObject(matchedFiltersList));
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
