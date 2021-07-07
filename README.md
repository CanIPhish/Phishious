![image](https://user-images.githubusercontent.com/5109530/124600570-33cfe000-deaa-11eb-9ccf-438189f47467.png)


What is Phishious?
=======

[Phishious](https://caniphish.com/Phishious/Walkthrough) is an open-source Secure Email Gateway (SEG) evaluation toolkit designed for red-teamers. It provides the ability to see how various Secure Email Gateway technologies behave when presented with phishing material.

### Secure Email Gateways Supported
![image](https://user-images.githubusercontent.com/5109530/124600797-74c7f480-deaa-11eb-859d-a1126dce732f.png)

### Why use Phishious?
We're not joking when we say that Phishious is a world first in Secure Email Gateway evaluation. There is currently no other tool available (free or paid) that provides you the ability to scan your phish against an array of Secure Email Gateways. The closest utility is VirusTotal, however this specifically focuses on Malware detection and not Spam/Phish detection.

Through use of Phishious, you'll be able to freely test your phishing material against the world's most popular Secure Email Gateways. This is an invaluable capability as it provides you an indication of how successful your phishing campaign may be.

### How does Phishious work?
Phishious exploits a common misconfiguration where many organisations broadcast overly sensitive information in email bounce responses and non-delivery reports. The sensitive information typically comes in the form of original untampered inbound message headers. 

By feeding this information into Phishious, it can extract the relevant information and detect when an email is likely to end up in a targets junk folder or be completely blocked by the SEG. When we scale this across many targets, we're able to aggregate this information to provide a holistic view on how various SEGs behave when delivered certain phishing material.

To better understand email bounce attacks and the resulting issues, please read the following [Linkedin Article](https://www.linkedin.com/pulse/abusing-exchange-postmaster-bypass-email-spam-malware-sebastian-salla/) or watch this [BSides Canberra presentation](https://youtu.be/wqRlVtRYwWQ).



### Requirements
Windows 10 Endpoint or Windows Server 2012+ with .NET Core 5.0 onwards

### Setup
Phishious is a .NET Core 5.0 MVC Web Application. Accordingly it can be run on Windows using IIS or Linux using Apache as the Web Server. However the simplest way to use Phishious is to either use the [CanIPhish hosted Phishious Toolkit](https://caniphish.com/Phishious/Index) or to clone the project and then Debug it using your favourite IDE (e.g. Visual Studio, Visual Studio Code, Rider, etc.).

### How to use Phishious
 <details>
          <summary><b>Phase 1: Identification of Vulnerable Mail Receivers</b></summary>
  <br />
           <p>As Phishious is designed to abuse public infrastructure, you need to identify a variety of targets who use differing mail security technologies <i>(e.g. Target 1 uses Sophos PureMessage, Target 2 uses Cisco IronPort, etc.)</i>. Identification of Vulnerable Mail Receivers can be found through manual analysis <i>(e.g. <a href="https://caniphish.com/Public/SupplyChain" target="_blank">CanIPhish Supply Chain Analysis</a>)</i> or programmatic means <i>(e.g. <a href="https://caniphish.zendesk.com/hc/en-us/articles/4402066795919-API-Domain-Tools-Domain-Supply-Chain-Scan" target="_blank">CanIPhish Supply Chain API</a>)</i>.</p>
  <p><i>Reference: The accompanying image is of a CanIPhish Supply Chain Scan which shows a vulnerable <b>'Mail Receiver Supply Chain'</b> that comprises of Symantec MessageLabs and Exchange Online Protection.</i></p>
<a href="https://caniphish.com/assets/images/SupplyChainScan.PNG" target="_blank"><img src="https://caniphish.com/assets/images/SupplyChainScan.PNG" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
         </details>
         <details>
          <summary><b>Phase 2: Filter Priming</b></summary>
  <br />
  <p><b>Step 1.</b> Email <b>non-malicious content</b> to a non-existent address at various target domains where a bounce attack vulnerability exists and a known Secure Email Gateway (SEG) is in-use. <br /><i>Note: At this stage, only Amazon SES and Gmail have been tested for the receipt of bounce responses. Do not use Exchange Online.</i></p>
           <p>
           <i>Reference: The accompanying image is of an email (within Gmail) directed towards non-existent addresses at 15 targets. Each target was uniquely identified and selected for their differing Secure Email Gateway technologies.</i>
          </p>
  <a href="https://caniphish.com/assets/Phishious/Filter-Priming.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Priming.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
  <p>
                                <b>Step 2.</b> Wait 180 seconds. Download all received bounce responses and then upload them to Phishious for Filter Priming. Upon Priming, you will see the status of all Secure Email Gateway technologies identified. For filter detonation (Phase 3), only these technologies will be targeted.
                            <p>
                                <i>Reference: The accompanying images show the email bounce responses being uploaded to Phishious and then the observed result of Filter Priming.</i>
                            </p>
  <a href="https://caniphish.com/assets/Phishious/Filter-Priming-Upload.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Priming-Upload.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
  <a href="https://caniphish.com/assets/Phishious/Filter-Priming-Status.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Priming-Status.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
         </details>
         <details>
          <summary><b>Phase 3: Filter Detonation</b></summary>
  <br />
           <p><b>Step 1.</b> Email <b>malicious content</b> to a non-existent address at the same target domains emailed in Phase 2. <br /><i>Note: At this stage, only Amazon SES and Gmail have been tested for the receipt of bounce responses. Do not use Exchange Online.</i></p>
<p>
                                <i>Reference: The accompanying image is of an email (within Gmail) directed towards the same non-existent addresses at targeted in Phase 2. Each target was uniquely identified and selected for their differing Secure Email Gateway technologies.</i>

                            </p>
   <a href="https://caniphish.com/assets/Phishious/Filter-Detonation.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Detonation.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
  <p>
                                <b>Step 2.</b> Wait 180 seconds. Download all received bounce responses and then upload them to Phishious for Filter Detonation. Upon Detonation, you will see the status of all Secure Email Gateway technologies identified and whether the phish was blocked or remained undetected.
                            <p>
                                <i>Reference: The accompanying images show the email bounce responses being uploaded to Phishious and then the observed result of Filter Detonation.</i>

                            </p>
  <a href="https://caniphish.com/assets/Phishious/Filter-Detonation-Upload.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Detonation-Upload.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
  <a href="https://caniphish.com/assets/Phishious/Filter-Detonation-Result.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Detonation-Result.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
         </details>
         <details>
          <summary><b>Phase 4: Results Analysis</b></summary>
  <br />
           <p>Analyse the results to determine whether your phishing material was blocked or remained undetected. Click <b>'View Detail'</b> to gain insight into what text was analysed within the Email Headers and how this impacted the overall Phishious assessment.</p>
  <p>
                                <i>Reference: The accompanying images show the detailed view of two seperate SEG technologies. This view shows how Phishious analysed Email Headers to provide two seperate results from a single Phishing Email.</i>
                            </p>
  <a href="https://caniphish.com/assets/Phishious/Filter-Detonation-Result-Detail.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Detonation-Result-Detail.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
  <a href="https://caniphish.com/assets/Phishious/Filter-Detonation-Result-Detail-2.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Detonation-Result-Detail-2.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
         </details>

### Example Outputs
<details>
           <summary>Results Analysis View</summary>
          <br />
           <a href="https://caniphish.com/assets/Phishious/Filter-Detonation-Result.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Detonation-Result.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
         </details>
         <details>
           <summary>Filter Detail View</summary>
          <h4>Trend Micro HES</h4>
           <a href="https://caniphish.com/assets/Phishious/Filter-Detonation-Result-Detail.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Detonation-Result-Detail.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
          <h4>Exchange Online Protection</h4>
           <a href="https://caniphish.com/assets/Phishious/Filter-Detonation-Result-Detail-2.png" target="_blank"><img src="https://caniphish.com/assets/Phishious/Filter-Detonation-Result-Detail-2.png" class="img-fluid rounded-lg" style='height: 100%; width: 100%; object-fit: contain' /></a>
         </details>

### Documentation

Documentation is always a work-in-progress and can be found on the [CanIPhish](https://caniphish.com/Phishious/Walkthrough) website or here on GitHub. Find something missing? Let us know by filing an issue!


### Issues

Find a bug? Want more features? Find something missing in the documentation? Let us know! Please don't hesitate to [file an issue](https://github.com/Rices/Phishious/issues/new) and we'll get right on it.

### License
```
Phishious - Open-Source Secure Email Gateway Evaluation Toolkit

The MIT License (MIT)

Copyright (c) 2021 - 2021 CanIPhish Pty Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software ("Phishious Community Edition") and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

### Disclaimer
This tool should be used on applications/networks that you have permission to use. Any misuse or damage caused will be solely the users’ responsibility.
