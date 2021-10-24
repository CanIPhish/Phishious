using Amazon.S3;
using Amazon.S3.Model;
using EAGetMail;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Phishious.Models;
using Phishious.Phishious;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Text;
using System.Threading;
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
        public IActionResult Automated()
        {
            AutomatedModel aModel = new AutomatedModel();
            try
            {
                string configPath = @"Config/AutoConfig.config";
                string emailPath = @"Config/PrimerBody.txt";
                string configContent;

                using (StreamReader reader = System.IO.File.OpenText(configPath))
                {
                    configContent = reader.ReadToEnd();
                }
                aModel.pConfig = JsonConvert.DeserializeObject<PhishiousConfig>(configContent);
                using (StreamReader reader = System.IO.File.OpenText(emailPath))
                {
                    aModel.pEmailBody = reader.ReadToEnd();
                }
            }
            catch(Exception e)
            {
                aModel.pConfig = new PhishiousConfig();
            }
            return View("Automated", aModel);
        }

        [HttpPost]
        public ActionResult SaveSettings(List<string> tDomains, string tAddress, string sHostname, string sPort, string sUsername, string sPassword, bool gmailStorage, bool awsStorage, string aRegion, string sBucketName, string sBucketFolder, string sBucketFolderOld, string sScanFreq, string sScanDuration, string pSender, string pSenderDisplay, string pSenderSubject, string pEmailBody)
        {
            PhishiousConfig pConfig = new PhishiousConfig();
            if (gmailStorage)
            {
                pConfig.StorageType = "Gmail";
            }
            else
            {
                pConfig.StorageType = "AWS";
            }
            pConfig.AWSRegion = aRegion;
            pConfig.S3BucketFolder = sBucketFolder;
            pConfig.S3BucketFolderOld = sBucketFolderOld;
            pConfig.S3BucketName = sBucketName;
            pConfig.S3ScanDuration = sScanDuration;
            pConfig.S3ScanFrequency = sScanFreq;
            pConfig.SenderAddress = pSender;
            pConfig.SenderDisplayName = pSenderDisplay;
            pConfig.SenderSubject = pSenderSubject;
            pConfig.SMTPHostname = sHostname;
            pConfig.SMTPPassword = sPassword;
            pConfig.SMTPPort = sPort;
            pConfig.SMTPUsername = sUsername;
            pConfig.TargetAddress = tAddress;
            pConfig.TargetDomains = tDomains;
            using (StreamWriter writer = new StreamWriter(@"Config/AutoConfig.config", false))
            {
                writer.Write(JsonConvert.SerializeObject(pConfig));
            }
            using (StreamWriter writer = new StreamWriter(@"Config/PrimerBody.txt", false))
            {
                writer.Write(pEmailBody);
            }

            return Content("Success");
        }

        [HttpPost]
        public ActionResult SavePrimedStatus(string pFilters)
        {
            using (StreamWriter writer = new StreamWriter(@"Config/PrimedFilters.json", false))
            {
                writer.Write(pFilters);
            }
            return Content("Success");
        }

        public ActionResult AutoPrime(List<string> tDomains, string tAddress, string sHostname, string sPort, string sUsername, string sPassword, string pSender, string pSenderDisplay, string pSenderSubject, string pEmailBody)
        {
            try
            {
                String FROM = pSender;
                String FROMNAME = pSenderDisplay;
                String SMTP_USERNAME = sUsername;
                String SMTP_PASSWORD = sPassword;
                String HOST = sHostname;
                int PORT = 25;
                String SUBJECT = pSenderSubject;
                String BODY = pEmailBody;
                foreach (string domain in tDomains)
                {
                    String TO = tAddress + "@" + domain;
                    MailMessage message = new MailMessage();
                    message.IsBodyHtml = true;
                    message.From = new System.Net.Mail.MailAddress(FROM, FROMNAME);
                    message.To.Add(new System.Net.Mail.MailAddress(TO));
                    message.Subject = SUBJECT;
                    message.Body = BODY;

                    using (var sesSMTPClient = new System.Net.Mail.SmtpClient(HOST, PORT))
                    {
                        if (sPort.Equals("587") || sPort.Equals("465"))
                        {
                            sesSMTPClient.Credentials =
                                new NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD);
                            sesSMTPClient.EnableSsl = true;
                        }
                        try
                        {
                            Console.WriteLine("Attempting to send email...");
                            sesSMTPClient.Send(message);
                            Console.WriteLine("Email sent!");
                            System.Threading.Thread.Sleep(50);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                    }
                }
                return Content("Success");
            }
            catch(Exception e)
            {
                return Content(e.Message);
            }
        }

        public ActionResult AutoDetonate(List<string> tDomains, string tAddress, string sHostname, string sPort, string sUsername, string sPassword, string pSender, string pSenderDisplay, string pSenderSubject, string pEmailBody)
        {
            try
            {
                String FROM = pSender;
                String FROMNAME = pSenderDisplay;
                String SMTP_USERNAME = sUsername;
                String SMTP_PASSWORD = sPassword;
                String HOST = sHostname;
                int PORT = 25;
                String SUBJECT = pSenderSubject;
                String BODY = pEmailBody;
                foreach (string domain in tDomains)
                {
                    String TO = tAddress + "@" + domain;
                    MailMessage message = new MailMessage();
                    message.IsBodyHtml = true;
                    message.From = new System.Net.Mail.MailAddress(FROM, FROMNAME);
                    message.To.Add(new System.Net.Mail.MailAddress(TO));
                    message.Subject = SUBJECT;
                    message.Body = BODY;

                    using (var sesSMTPClient = new System.Net.Mail.SmtpClient(HOST, PORT))
                    {
                        if (sPort.Equals("587") || sPort.Equals("465"))
                        {
                            sesSMTPClient.Credentials =
                                new NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD);
                            sesSMTPClient.EnableSsl = true;
                        }
                        try
                        {
                            Console.WriteLine("Attempting to send email...");
                            sesSMTPClient.Send(message);
                            Console.WriteLine("Email sent!");
                            System.Threading.Thread.Sleep(50);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                    }
                }
                return Content("Success");
            }
            catch (Exception e)
            {
                return Content(e.Message);
            }
        }

        public ActionResult GetPrimedFilters()
        {
            string filterPath = @"Config/PrimedFilters.json";
            string filterContent;

            using (StreamReader reader = System.IO.File.OpenText(filterPath))
            {
                filterContent = reader.ReadToEnd();
            }
            return Content(filterContent);
        }

        public async Task<ActionResult> GetPrimeResponse(string aRegion, string sBucketName, string sBucketFolder, string sBucketFolderOld, bool gmailStorage, string sUsername, string sPassword, bool detonate)
        {
            List<PhishiousResult> matchedFiltersList = new List<PhishiousResult>();
            PhishiousHelper pHelper = new PhishiousHelper();
            if(gmailStorage)
            {
                try
                {
                    MailServer oServer = new MailServer("imap.gmail.com", sUsername, sPassword, ServerProtocol.Imap4);
                    MailClient oClient = new MailClient("TryIt");

                    oServer.SSLConnection = true;
                    oServer.Port = 993;
                    oClient.GetMailInfosParam.GetMailInfosOptions = GetMailInfosOptionType.NewOnly;
                    oClient.Connect(oServer);
                    MailInfo[] infos = oClient.GetMailInfos();
                    foreach (MailInfo info in infos)
                    {
                        Mail oMail = oClient.GetMail(info);
                        string allMailText = oMail.TextBody;
                        foreach (var atch in oMail.Attachments)
                        {
                            string decodedString = Encoding.UTF8.GetString(atch.Content);
                            List<PhishiousResult> matchedFiltersAtch = pHelper.FilterIdentification(decodedString, oMail.Subject, detonate);
                            if (matchedFiltersAtch != null) { matchedFiltersList.AddRange(matchedFiltersAtch); }
                        }
                        foreach (var header in oMail.Headers)
                        {
                            allMailText += header.ToString();
                        }
                        List<PhishiousResult> matchedFilters = pHelper.FilterIdentification(allMailText, oMail.Subject, detonate);
                        if (matchedFilters != null) { matchedFiltersList.AddRange(matchedFilters); }
                        oClient.Delete(info);
                    }
                    oClient.Close();
                    if (matchedFiltersList.Count == 0)
                    {
                        return Content("No Filters Found");
                    }
                    else
                    {
                        return Content(JsonConvert.SerializeObject(matchedFiltersList));
                    }
                }
                catch (Exception e)
                {
                    return Content("No Filters Found");
                }
            }
            else
            {
                using (AmazonS3Client client = new AmazonS3Client(Amazon.RegionEndpoint.GetBySystemName(aRegion)))
                {
                    // Build your request to list objects in the bucket
                    ListObjectsRequest request = new ListObjectsRequest
                    {
                        BucketName = sBucketName,
                        Prefix = sBucketFolder
                    };

                    // Build your call out to S3 and store the response
                    ListObjectsResponse response = await client.ListObjectsAsync(request);
                    foreach (S3Object file in response.S3Objects)
                    {
                        try
                        {
                            GetObjectRequest getRequest = new GetObjectRequest
                            {
                                BucketName = file.BucketName,
                                Key = file.Key
                            };
                            using (GetObjectResponse getResponse = await client.GetObjectAsync(getRequest))
                            {
                                using (Stream responseStream = getResponse.ResponseStream)
                                {
                                    using (StreamReader reader = new StreamReader(responseStream))
                                    {
                                        string content = reader.ReadToEnd();
                                        List<PhishiousResult> matchedFilters = pHelper.FilterIdentification(content, file.Key, detonate);
                                        if (matchedFilters != null) { matchedFiltersList.AddRange(matchedFilters); }
                                    }
                                }
                            }
                            string destKey = file.Key.Replace(sBucketFolder, sBucketFolderOld);
                            CopyObjectRequest copyRequest = new CopyObjectRequest
                            {
                                SourceBucket = sBucketName,
                                SourceKey = file.Key,
                                DestinationBucket = sBucketName,
                                DestinationKey = destKey
                            };
                            CopyObjectResponse copyResponse = await client.CopyObjectAsync(copyRequest);

                            var deleteRequest = new DeleteObjectRequest
                            {
                                BucketName = sBucketName,
                                Key = file.Key
                            };
                            var deleteResponse = await client.DeleteObjectAsync(deleteRequest);
                        }
                        catch (Exception e)
                        {
                            return Content("No Filters Found");
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
            }
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
