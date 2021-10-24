using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Phishious.Phishious
{
    public class PhishiousHelper
    {
        private List<string> FilterIdentificationWords = new List<string>(new string[] { "IronPort", "E=Sophos", "E=McAfee", "PerlMx", "Trustwave SEG", "Trustwave MailMarshal", "Exchange", "Microsoft SMTP Server", "Proofpoint-Spam", "X-FireEye", "Forcepoint", "google", "X-TMASE-Result", "trendmicro", "Diagnostic information for administrators", "Proofpoint-Virus", "CrossPremisesHeaders", "SYMC-ESS-Spam", "Exchange-CrossPremises", "MS-Office365", "X-Forefront-Antispam-Report:", "Postfix", "X-VirusChecked", "X-StarScan", "FireEye ETP", "FE-ETP", "X-FE-ETP-METADATA", "Mimecast-Spam", "X-Mimecast-Impersonation-Protect", "protection.outlook.com", "X-MailControl", "X-MailControl-Inbound", "x-msw-jemd-malware", "x-msw-jemd-refid", "X-SEA-Spam", "X-Barracuda-Spam-Score" });

        public List<PhishiousResult> FilterIdentification(string fileText, string fileName, bool detonate)
        {
            List<string> matchedKeyWords = FilterIdentificationWords.Where(s => fileText.Contains(s)).Distinct().ToList();
            Console.WriteLine(matchedKeyWords);
            List<PhishiousResult> fAllocation = FilterAllocation(matchedKeyWords, fileText, detonate);
            List<PhishiousResult> sTextIncluded = new List<PhishiousResult>();
            foreach (PhishiousResult pResult in fAllocation)
            {
                int index = fileText.IndexOf(pResult.KeywordMatch);
                int maxIndex = Math.Min(fileText.Length, (index + 300)) - index;
                List<int> newLineIndex = AllIndexOf(fileText, Environment.NewLine, StringComparison.OrdinalIgnoreCase);
                int lineCount = 0;
                foreach (int lineIndex in newLineIndex)
                {
                    if (lineIndex > index)
                    {
                        lineCount++;
                        if (lineCount == 5)
                        {
                            maxIndex = (lineIndex - index);
                        }
                    }
                }

                pResult.SurroundingText = fileText.Substring(index, maxIndex);
                pResult.FileName = fileName;
                sTextIncluded.Add(pResult);
            }
            return sTextIncluded;
        }

        public List<int> AllIndexOf(string text, string str, StringComparison comparisonType)
        {
            List<int> allIndexOf = new List<int>();
            int index = text.IndexOf(str, comparisonType);
            while (index != -1)
            {
                allIndexOf.Add(index);
                index = text.IndexOf(str, index + 1, comparisonType);
            }
            return allIndexOf;
        }

        public List<PhishiousResult> FilterAllocation(List<string> matchedKeyWords, string fileText, bool detonate)
        {
            List<PhishiousResult> parsedSupplies = new List<PhishiousResult>();
            int mimeCast = 0;
            int messageLabs = 0;
            int fireeye = 0;
            int trendmicro = 0;
            int forcepoint = 0;
            int clearswift = 0;
            if (matchedKeyWords != null)
            {
                foreach (string rawSupply in matchedKeyWords)
                {
                    switch (rawSupply)
                    {
                        case "IronPort":
                            if (detonate)
                            {
                                string matchedKeyword = rawSupply;
                                if (fileText.Contains("X-IronPort-Anti-Spam-Filtered"))
                                {
                                    matchedKeyword = "X-IronPort-Anti-Spam-Filtered";
                                }
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Cisco IronPort", Status = "Vulnerable" });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Cisco IronPort", Status = "Priming" });
                            }
                            //ironPort++;
                            break;
                        case "E=Sophos":
                            if (detonate)
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Sophos AV", Status = "Vulnerable" });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Sophos AV", Status = "Priming" });
                            }
                            break;
                        case "E=McAfee":
                            if (detonate)
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "McAfee AV", Status = "Vulnerable" });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "McAfee AV", Status = "Priming" });
                            }
                            break;
                        case "X-SEA-Spam":
                            if (detonate)
                            {
                                string fStatus = "Secure";
                                List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                string tAnalysed = Regex.Match(fileText, @"Probability=(.+?)%").Groups[1].Value;
                                if (tAnalysed.Length > 0)
                                {
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("Probability=", tAnalysed, "%"), Description = "Spam probability (<50% Low Confidence | >50% Medium Confidence | >90% High Confidence)" });
                                    int probability = 0;
                                    bool success = Int32.TryParse(tAnalysed, out probability);
                                    if (probability < 50)
                                    {
                                        fStatus = "Vulnerable";
                                    }
                                }
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Sophos ESA", Status = fStatus, TextAnalysed = textAnalysedList });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Sophos ESA", Status = "Priming" });
                            }
                            break;
                        case "PerlMx":
                            if (detonate)
                            {
                                string fStatus = "Vulnerable";
                                List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                string tAnalysed = Regex.Match(fileText, @"Probability=(.+?)%").Groups[1].Value;
                                if (tAnalysed.Length > 0)
                                {
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("Probability=", tAnalysed, "%"), Description = "Spam probability (<50% Low Confidence Spam | >50% Medium Confidence | >90% High Confidence)" });
                                    int probability = 0;
                                    bool success = Int32.TryParse(tAnalysed, out probability);
                                    if (probability >= 50)
                                    {
                                        fStatus = "Secure";
                                    }
                                }
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Sophos PureMessage", Status = fStatus, TextAnalysed = textAnalysedList });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Sophos PureMessage", Status = "Priming" });
                            }

                            break;
                        case "Trustwave SEG":
                        case "Trustwave MailMarshal":
                            if (detonate)
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Trustwave SEG", Status = "Vulnerable" });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Trustwave SEG", Status = "Priming" });
                            }

                            break;
                        case "X-Forefront-Antispam-Report:":
                            if (detonate)
                            {
                                string matchedKeyword = rawSupply;
                                string fStatus = "Secure";
                                List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                if (fileText.Contains("SCL:7") || fileText.Contains("SCL:8") || fileText.Contains("SCL:9"))
                                {
                                    if (fileText.Contains("SCL:7")) { matchedKeyword = "SCL:7"; }
                                    else if (fileText.Contains("SCL:8")) { matchedKeyword = "SCL:8"; }
                                    else if (fileText.Contains("SCL:9")) { matchedKeyword = "SCL:9"; }
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "SCL:7|8|9", Description = "Spam Confidence Level (SCL) of 7, 8 or 9 indicates High confidence spam" });
                                }
                                else if (fileText.Contains("SCL:5") || fileText.Contains("SCL:6"))
                                {
                                    if (fileText.Contains("SCL:5")) { matchedKeyword = "SCL:5"; }
                                    else if (fileText.Contains("SCL:6")) { matchedKeyword = "SCL:6"; }
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "SCL:5|6", Description = "Spam Confidence Level (SCL) of 5 or 6 indicates Medium confidence spam" });
                                }
                                else if (fileText.Contains("SCL:1") || fileText.Contains("SCL:0"))
                                {
                                    if (fileText.Contains("SCL:1")) { matchedKeyword = "SCL:1"; }
                                    else if (fileText.Contains("SCL:0")) { matchedKeyword = "SCL:0"; }
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "SCL:0|1", Description = "Spam Confidence Level (SCL) of 0 or 1 indicates the message was not spam" });
                                    fStatus = "Vulnerable";
                                }
                                else if (fileText.Contains("SCL:-1"))
                                {
                                    if (fileText.Contains("SCL:-1")) { matchedKeyword = "SCL:-1"; }
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "SCL:-1", Description = "Spam Confidence Level (SCL) of -1 indicates the message skipped spam filtering" });
                                    fStatus = "Vulnerable";
                                }
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = matchedKeyword, Filter = "Exchange Online Protection", Status = fStatus, TextAnalysed = textAnalysedList });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Exchange Online Protection", Status = "Priming" });
                            }
                            break;
                        case "Proofpoint-Spam":
                            if (detonate)
                            {
                                string fStatus = "Vulnerable";
                                List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                bool notSpam = false;
                                if (fileText.Contains("rule=inbound_spam_notspam"))
                                {
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "rule=inbound_spam_notspam", Description = "Indicates that the email is classified as not spam" });
                                    notSpam = true;
                                }
                                string overallScore = Regex.Match(fileText, @" score=(.+?) ").Groups[1].Value;
                                if (overallScore.Length > 0)
                                {
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("score=", overallScore), Description = "Spam probability (<50 Low Confidence | >50 Medium Confidence | >90 High Confidence)" });
                                    int probability = 0;
                                    bool success = Int32.TryParse(overallScore, out probability);
                                    if ((probability >= 50) && (!notSpam))
                                    {
                                        fStatus = "Secure";
                                    }
                                }
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Proofpoint SEG", Status = fStatus, TextAnalysed = textAnalysedList });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Proofpoint SEG", Status = "Priming" });
                            }
                            break;
                        case "X-FireEye":
                            if (detonate)
                            {
                                string fStatus = "Vulnerable";
                                List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                if (fileText.Contains("X-FireEye: Clean"))
                                {
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "X-FireEye: Clean", Description = "Analysis has indicated no attachments or links contain malware" });
                                }
                                else
                                {
                                    int index = fileText.IndexOf("X-FireEye");
                                    string subString = fileText.Substring(index, 35);
                                    if (subString.Contains("Clean"))
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "X-FireEye: Clean", Description = "Analysis has indicated no attachments or links contain malware" });
                                    }
                                    else
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = subString.Split(new[] { Environment.NewLine }, StringSplitOptions.None)[0], Description = "Analysis has indicated that attachments or links contain malware" });
                                        fStatus = "Secure";
                                    }
                                }
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "FireEye MX", Status = fStatus, TextAnalysed = textAnalysedList });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "FireEye MX", Status = "Priming" });
                            }
                            break;
                        case "X-FE-ETP-METADATA":
                        case "FireEye ETP":
                        case "FE-ETP":
                            if (fireeye < 1)
                            {
                                if (detonate)
                                {
                                    string keywordMatch = rawSupply;
                                    string fStatus = "Vulnerable";
                                    List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                    if (fileText.Contains("X-FE-ETP-Advanced-Analysis-Result: Clean"))
                                    {
                                        keywordMatch = "X-FE-ETP-Advanced-Analysis-Result";
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "X-FE-ETP-Advanced-Analysis-Result: Clean", Description = "Analysis has indicated no attachments or links contain malware" });
                                        fStatus = "Vulnerable";
                                    }
                                    else if (fileText.Contains("X-FE-ETP-Advanced-Analysis-Result"))
                                    {
                                        keywordMatch = "X-FE-ETP-Advanced-Analysis-Result";
                                        int index = fileText.IndexOf("X-FE-ETP-Advanced-Analysis-Result");
                                        string subString = fileText.Substring(index, 60);
                                        if (subString.Contains("Clean"))
                                        {
                                            textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "X-FE-ETP-Advanced-Analysis-Result: Clean", Description = "Analysis has indicated no attachments or links contain malware" });
                                        }
                                        else
                                        {
                                            textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = subString.Split(new[] { Environment.NewLine }, StringSplitOptions.None)[0], Description = "Analysis has indicated that attachments or links contain malware" });
                                            fStatus = "Secure";
                                        }
                                    }
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = keywordMatch, Filter = "FireEye ETP Cloud", Status = fStatus, TextAnalysed = textAnalysedList });
                                }
                                else
                                {
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "FireEye ETP Cloud", Status = "Priming" });
                                }

                                fireeye++;
                            }
                            break;
                        case "Forcepoint":
                            if (detonate)
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Forcepoint ESG", Status = "Vulnerable" });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Forcepoint ESG", Status = "Priming" });
                            }

                            break;
                        case "X-TMASE-Result":
                        case "trendmicro":
                            if (trendmicro < 1)
                            {
                                if (detonate)
                                {
                                    string fStatus = "Vulnerable";
                                    List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                    if (fileText.Contains("X-TMASE-Result: "))
                                    {
                                        int index = fileText.IndexOf("X-TMASE-Result: ");
                                        string subString = fileText.Substring(index, 60);
                                        string[] subs = subString.Split(new[] { Environment.NewLine }, StringSplitOptions.None)[0].Split('-');
                                        string probabilityString = subs.AsEnumerable().Reverse().Skip(1).FirstOrDefault();
                                        string thresholdString = subs.AsEnumerable().Reverse().FirstOrDefault();
                                        double probability = 0;
                                        double threshold = 0;
                                        bool pSuccess = Double.TryParse(probabilityString, out probability);
                                        bool tSuccess = Double.TryParse(thresholdString, out threshold);
                                        if (pSuccess & tSuccess)
                                        {
                                            if ((probability <= threshold))
                                            {
                                                textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("X-TMASE-Result: ", probabilityString, "-", thresholdString), Description = String.Concat("The spam trend score (", probability, ") is below the detection threshold (", threshold, ")") });
                                            }
                                            else
                                            {
                                                textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = subString.Split(new[] { Environment.NewLine }, StringSplitOptions.None)[0], Description = String.Concat("The spam trend score (", probability, ") is above the detection threshold (", threshold, ")") });
                                                fStatus = "Secure";
                                            }
                                        }
                                        else
                                        {
                                            textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = subString.Split(new[] { Environment.NewLine }, StringSplitOptions.None)[0], Description = "The spam trend score is below the detection threshold" });
                                        }

                                    }
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Trend Micro HES", Status = fStatus, TextAnalysed = textAnalysedList });
                                }
                                else
                                {
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Trend Micro HES", Status = "Priming" });
                                }
                                trendmicro++;

                            }
                            break;
                        case "X-StarScan":
                        case "X-VirusChecked":
                        case "SYMC-ESS-Spam":
                            if (messageLabs < 1)
                            {
                                if (detonate)
                                {
                                    string fStatus = "Vulnerable";
                                    List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                    if (fileText.Contains("X-Spam-Flag: YES"))
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "X-Spam-Flag: YES", Description = "Analysis has indicated the email has been classified as spam" });
                                        fStatus = "Secure";
                                    }
                                    if (fileText.Contains("X-VirusChecked: Checked"))
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = "X-VirusChecked: Checked", Description = "Analysis has indicated no attachments or links contain malware" });
                                    }
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Symantec MessageLabs", Status = fStatus, TextAnalysed = textAnalysedList });
                                }
                                else
                                {
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Symantec MessageLabs", Status = "Priming" });
                                }

                                messageLabs++;
                            }
                            break;
                        case "X-Mimecast-Impersonation-Protect":
                        case "Mimecast-Spam":
                            if (mimeCast < 1)
                            {
                                if (detonate)
                                {
                                    string fStatus = "Vulnerable";
                                    List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                    string overallScore = Regex.Match(fileText, @"X-Mimecast-Spam-Score: (.+?)(\n|\r|\r\n)").Groups[1].Value;
                                    if (overallScore.Length > 0)
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("X-Mimecast-Spam-Score: ", overallScore), Description = "Spam probability (>=3 Low Confidence | >=5 Medium Confidence | >7 High Confidence)" });
                                        double probability = 0;
                                        bool success = Double.TryParse(overallScore, out probability);
                                        if (probability >= 5)
                                        {
                                            fStatus = "Secure";
                                        }
                                    }
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Mimecast SEG", Status = fStatus, TextAnalysed = textAnalysedList });
                                }
                                else
                                {
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Mimecast SEG", Status = "Priming" });
                                }
                                mimeCast++;
                            }
                            break;
                        case "X-MailControl-Inbound":
                        case "X-MailControl":
                            if (forcepoint < 1)
                            {
                                if (detonate)
                                {
                                    string keywordMatch = rawSupply;
                                    string fStatus = "Vulnerable";
                                    List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                    string overallScore = Regex.Match(fileText, @"X-Spam-Score: (.+?)(\n|\r|\r\n)").Groups[1].Value;
                                    if (overallScore.Length > 0)
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("X-Spam-Score: ", overallScore), Description = "Spam probability (>=6 Medium Confidence | >=15 High Confidence)" });
                                        double probability = 0;
                                        bool success = Double.TryParse(overallScore, out probability);
                                        if (probability >= 6)
                                        {
                                            fStatus = "Secure";
                                        }
                                        keywordMatch = "X-Spam-Score";
                                    }
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = keywordMatch, Filter = "Forcepoint Cloud", Status = fStatus, TextAnalysed = textAnalysedList });
                                }
                                else
                                {
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Forcepoint Cloud", Status = "Priming" });
                                }

                                forcepoint++;
                            }
                            break;
                        case "x-msw-jemd-malware":
                        case "x-msw-jemd-refid":
                            if (clearswift < 1)
                            {
                                if (detonate)
                                {
                                    string fStatus = "Vulnerable";
                                    List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                    string malwareStatus = Regex.Match(fileText, @"malware:(.+?);").Groups[1].Value;
                                    string phishingStatus = Regex.Match(fileText, @"phishing:(.+?)(\n|\r|\r\n)").Groups[1].Value;
                                    string newsletterStatus = Regex.Match(fileText, @"newsletter:(.+?);").Groups[1].Value;
                                    //string overallScore = Regex.Match(fileText, @"malware:(.+?)(\n|\r|\r\n)").Groups[1].Value;
                                    if (malwareStatus.Length > 0)
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("malware:", malwareStatus), Description = "Malware status ('no' No malware detected | 'yes' Malware detected)" });
                                        if (malwareStatus.Contains("yes"))
                                        {
                                            fStatus = "Secure";
                                        }
                                    }
                                    if (phishingStatus.Length > 0)
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("phishing:", malwareStatus), Description = "Phishing status ('no' No phishinng detected | 'yes' phishing detected)" });
                                        if (malwareStatus.Contains("yes"))
                                        {
                                            fStatus = "Secure";
                                        }
                                    }
                                    if (newsletterStatus.Length > 0)
                                    {
                                        textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("newsletter:", malwareStatus), Description = "Newsletter status ('no' No newsletter spam detected | 'yes' newsletter spam detected)" });
                                        if (malwareStatus.Contains("yes"))
                                        {
                                            fStatus = "Secure";
                                        }
                                    }
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Clearswift SEG", Status = fStatus, TextAnalysed = textAnalysedList });
                                }
                                else
                                {
                                    parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Clearswift SEG", Status = "Priming" });
                                }
                                clearswift++;
                            }
                            break;
                        case "X-Barracuda-Spam-Score":
                            if (detonate)
                            {
                                string fStatus = "Vulnerable";
                                List<PhishiousTextAnalysed> textAnalysedList = new List<PhishiousTextAnalysed>();
                                string overallScore = Regex.Match(fileText, @"X-Barracuda-Spam-Score: (.+?)(\n|\r|\r\n)").Groups[1].Value;
                                if (overallScore.Length > 0)
                                {
                                    textAnalysedList.Add(new PhishiousTextAnalysed() { TextAnalysed = String.Concat("X-Barracuda-Spam-Score: ", overallScore), Description = "Spam probability (<3.5 classified as not spam | >=3.5 classified as spam)" });
                                    double probability = 0;
                                    bool success = Double.TryParse(overallScore, out probability);
                                    if (probability >= 3.5)
                                    {
                                        fStatus = "Secure";
                                    }
                                }
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Barracuda Email Security", Status = fStatus, TextAnalysed = textAnalysedList });
                            }
                            else
                            {
                                parsedSupplies.Add(new PhishiousResult() { KeywordMatch = rawSupply, Filter = "Barracuda Email Security", Status = "Priming" });
                            }

                            break;
                    }
                }
            }
            return parsedSupplies;
        }
    }
}

public class PhishiousResult
{
    public string FileName { get; set; }
    public string KeywordMatch { get; set; }
    public string Filter { get; set; }
    public string SurroundingText { get; set; }
    public string Status { get; set; }
    public List<PhishiousTextAnalysed> TextAnalysed = new List<PhishiousTextAnalysed>();
}

public class PhishiousTextAnalysed
{
    public string TextAnalysed { get; set; }
    public string Description { get; set; }
}