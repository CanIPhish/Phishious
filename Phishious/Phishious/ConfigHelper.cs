using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phishious.Phishious
{
    public class ConfigHelper
    {

    }

    public class PhishiousConfig
    {
        public string SMTPHostname = "";
        public string SMTPPort = "";
        public string SMTPUsername = "";
        public string SMTPPassword = "";
        public List<string> TargetDomains { get; set; }
        public string TargetAddress = "";
        public string StorageType = "";
        public string AWSRegion = "";
        public string S3BucketName = "";
        public string S3BucketFolder = "";
        public string S3BucketFolderOld = "";
        public string S3ScanFrequency = "";
        public string S3ScanDuration = "";
        public string SenderAddress = "";
        public string SenderDisplayName = "";
        public string SenderSubject = "";
    }
}
