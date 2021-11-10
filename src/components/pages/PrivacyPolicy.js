import React from 'react';
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import ProfileHeader from '../header_footer/ProfileHeader';
const PrivacyPolicy = () => {
  const  JM_ID= parseInt(localStorage.getItem('JM_ID'))
  return (
    <>
    {
          (JM_ID > 0) ?
          <ProfileHeader/>
          :
          <MainHeader/>
      }
      <div>
        	<div className="privacypolicy-sec">
              <div className="container">
                <div className="row">
                  <div className="title">
                    <h3>Privacy policy</h3>
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                      <div className="text">
                        <h4>1. General provisions</h4>
                        <p>This document represents the personal data processing policy, compiled in accordance with the requirements of the Indian <b>Privacy policy contents under the Information Technology Rules, 2011 and Information Technology Act, 2000</b> "on personal data", and defines the procedure for processing personal data and measures to ensure the security of personal data on the site Expy.bio – HELLOSTAR MEDIA PRIVATE LIMITED (hereinafter – Expy.bio).</p>
                        <p>1.1. Expy.bio sets, as its most important goal and condition for the implementation of its activities, the observance of human and civil rights and freedoms in the processing of personal data, including the protection of the rights to privacy, personal and family secrets.</p>
                        <p>1.2. This policy with regard to the processing of personal data (hereinafter referred to as the Policy), it applies to all information that Expy.bio receives on website users of https:&#47;&#47;Expy.bio.</p>
                        
                        <h4>2. Terminology used in the Policy</h4>
                        <p>2.1. Expy.bio – online information service (website) located on the Internet with the domain name Expy.bio, the author, developer and copyright holder of which is a HELLOSTAR MEDIA PRIVATE LIMITED.</p>
                        <p>2.2. Automated processing of personal data – processing of personal data using computer and Internet technology;</p>
                        <p>2.3. Blocking of personal data – temporary termination of processing of personal data (except for cases when processing is necessary to clarify personal data);</p>
                        <p>2.4. Website – a set of graphic and informational materials, as well as computer programs and databases that ensure their availability on the Internet on the network address https:&#47;&#47;Expy.bio;</p>
                        <p>2.5. Personal Data Information System — a set of personal data contained in databases, information technologies and technical means that ensure their processing;</p>
                        <p>2.6. Depersonalization of personal data — actions that make it impossible to determine the identity of personal data to a specific User or other personal data subject without using additional information;</p>
                        <p>2.7. Personal data processing – any action (operation) or set of actions (operations) performed with or without the use of automation tools with personal data, including collection, recording, systematization, accumulation, storage, clarification (update, change), extraction, use, transfer (distribution, provision, access), depersonalization, blocking, deletion, destruction of personal data;</p>
                        <p>2.8. Expy.bio - legal entities that independently or jointly with other persons organize and (or) process personal data, as well as determine the purposes of personal data processing, the composition of personal data to be processed, actions (operations) performed with personal data;</p>
                        <p>2.9. Personal data – any information related directly or indirectly to a specific or identifiable website User on https:&#47;&#47;Expy.bio;</p>
                        <p>2.10. User – any user of the website https:&#47;&#47;Expy.bio;</p>
                        <p>2.11. Provision of Personal Data – actions aimed at disclosure of personal data to a certain person or a certain circle of persons;</p>
                        <p>2.12. Distribution of Personal Data – any actions aimed at disclosure of personal data to an indefinite circle of persons (transfer of personal data) or at familiarization with personal data of an unlimited number of persons, including disclosure of personal data in the mass media, placement in information and telecommunications networks, or providing access to personal data in any other way;</p>
                        <p>2.13. Cross-border transfer of personal data – transfer of personal data to the territory of a foreign state to a foreign state authority, a foreign individual or a foreign legal entity;</p>
                        <p>2.14. Destruction of personal data – any action in which personal data is destroyed irrevocably and becomes impossible to restore the contents of personal data in the information system of personal data and (or) any material carriers of personal data.</p>
                        
                        <h4>3. Expy.bio will process the following personal data of the User:</h4>
                        <p>3.1. Full name;</p>
                        <p>3.2. Phone number;</p>
                        <p>3.3. Email address;</p>
                        <p>3.4. City of residence, gender, age;</p>
                        <p>3.5. Social network data;</p>
                        <p>3.6. The collection and processing of anonymous data about visitors (including "cookies") through the services of Internet statistics (Yandex Metric and Google Analytics and others).</p>
                        <p>3.7. The above-mentioned data is further grouped under the General concept of Personal data.</p>
                        
                        <h4>4. Payment security</h4>
                        <p>4.1. Security of Online payments (via the Internet) is provided by the acquiring Bank in the payment system and operates on the basis of modern protocols and technologies developed by the international payment systems Visa International, MasterCard Worldwide (3D-Secure: Verified By VISA, MasterCard SecureCode) and other payment schemes like PayTM, PayPal, PayU, and other banking systems.</p>
                        <p>4.2. The cardholder's confidential data received is Processed in the processing center of the acquiring Bank certified according to the PCI DSS standard (it is not stored on our Web server).</p>
                        <p>4.3. The security of the transmitted information is provided using modern security protocols on the Internet.</p>
                        <p>4.4. The user is sent an Online receipt in accordance with payment policies, and the company's financial statements are also made in accordance with the Indian Tax System.</p>
                        <p>4.5. The Online payment service (via the Internet) is carried out in accordance with payment systems and gateways with the Rules of the international payment systems Visa, MasterCard and other systems on the principles of confidentiality and security of payment, which uses the most modern methods of verification, encryption and data transmission over closed communication channels.</p>
                        <p>4.6. Bank card data is entered on a secure payment page provided by the payment gateway provider.</p>
                        <p>4.7. On the Bank card data entry page, you will need to enter the card number, cardholder's name, card expiration date, and a three-digit security code (CVV2 for VISA or CVC2 for MasterCard). All the necessary data is printed on the map itself.</p>
                        <p>4.8. Then the User is redirected to the page of their Bank to enter the 3DSecure code, which is sent to the User via SMS or OTP. </p>
                        
                        <h4>5. Purposes of personal data processing</h4>
                        <p>5.1. The Purpose of processing the User's personal data is to conclude, execute and terminate civil contracts; to provide the User with access to the services, information and / or materials contained on the website Https://Expy.bio; providing services to the User.</p>
                        <p>5.2. Also, Expy.bio has the right to send notifications to the User about new products and services, special offers and various events. The user can always refuse to receive informational messages by sending Expy.bio email address to support@Expy.bio marked "Unsubscribe from notifications of new products and services and special offers".</p>
                        <p>5.3. Depersonalized User data collected through Internet statistics services is used to collect information about User actions on the site, improve the quality of the site and its content.</p>
                        
                        <h4>6. Legal grounds for processing personal data</h4>
                        <p>6.1. Expy.bio processes the User's personal data only if they are filled in and / or sent by the User independently via special forms located on the site https:&#47;&#47;Expy.bio. By filling out the relevant forms and / or submitting your personal data on Expy.bio, the User agrees to this Policy.</p>
                        <p>6.2. Expy.bio processes depersonalized data about the User if this is allowed in the User's browser settings (saving cookies and enabling JavaScript technology).</p>
                        
                        <h4>7. Procedure for collecting, storing, transferring and other types of personal data processing</h4>
                        <p>7.1. Security of personal data processed on Expy.bio is provided by implementing legal, organizational and technical measures necessary to fully comply with the requirements of current legislation in the field of personal data protection.</p>
                        <p>7.1.1. We also may disclose your information:</p>
                        <p>In response to a court order, or a request for cooperation from law enforcement or other government agency; to establish or exercise our legal rights; to defend against legal claims; or as otherwise required by law. In such cases, we may raise or waive any legal objection or right available to us.</p>
                        <p>When we believe disclosure is appropriate in connection with efforts to investigate, prevent, or take other action regarding illegal activity, suspected fraud or other wrongdoing; to protect and defend the rights, property or safety of our company, our users, our employees, or others; to comply with applicable law or cooperate with law enforcement; or to enforce our website terms and conditions or other agreements or policies.</p>
                        <p>In connection with a substantial corporate transaction, such as the sale of our business, a divestiture, merger, consolidation, or asset sale, or in the unlikely event of bankruptcy.</p>
                        <p>7.2. Expy.bio ensures the safety of personal data and takes all possible measures to prevent access to personal data of unauthorized persons.</p>
                        <p>7.3. The User's personal data will never, under any circumstances, be transferred to third parties, except in cases related to the implementation of current legislation.</p>
                        <p>7.4. If any inaccuracies in personal data are detected, the User can update them independently by sending a request to Expy.bio notification to the email address of Expy.bio - support@Expy.bio marked "Updating personal data"</p>
                        <p>7.5. The term for processing personal data is unlimited. The user can withdraw their consent to the processing of personal data at any time by sending Expy.bio a notification via e-mail to the email address of Expy.bio - support@Expy.bio marked "Revocation of consent to the processing of personal data".</p>
                        <p>7.6. Children's Privacy</p>
                        <p>Our Service does not address anyone under the age of 18 ("Children").</p>
                        <p>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children have provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
                        <h4>8. Cross-border transfer of personal data</h4>
                        <p>8.1. Your information, including Personal Data, may be transferred to, and maintained on computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from your jurisdiction.</p>
                        <p>8.2. Expy.bio, prior to the start of the cross-border transfer of personal data, is obliged to make sure that the foreign state, on the territory of which it is intended to transfer personal data, provides reliable protection of the rights of personal data subjects.</p>
                        <p>8.3. Cross-border transfer of personal data on the territory of foreign States that do not meet the above requirements can only be carried out if the personal data subject agrees in writing to cross-border transfer of his/her personal data and / or performs the contract to which the personal data subject is a party.</p>
                        
                        <h4>9. Final provisions</h4>
                        <p>9.1. The user can get any clarification on issues of interest related to the processing of their personal data by contacting Expy.bio using email support@Expy.bio.</p>
                        <p>9.2. This document will reflect any changes to the personal data processing policy Expy.bio. The policy is valid indefinitely until it is replaced with a new version.</p>
                        <p>9.3. The current version of the Policy is freely available on the Internet at https:&#47;&#47;Expy.bio/privacy-policy/.</p>
                        <p>9.4. This document shall be read and interpreted in accordance with Indian law, without regard to conflict of law provisions subject to the exclusive jurisdiction of the appropriate courts located in Kolkata, West Bengal, India.</p>
                        <p>Company name:<b>HELLOSTAR MEDIA PRIVATE LIMITED</b></p>
                        <p>CIN:<b>U92130WB2020PTC237015</b></p>
                        <p>PAN:<b>AAFCH2528G</b></p>
                        <p>Mailing Address:<b>A. Roychowdhury, c/o HELLOSTAR MEDIA PRIVATE LIMITED, Flat No.321 Block 8, 7 K. B. Sarani, Lp-5/37/2, Kolkata, West Bengal, India, 700080
</b></p>
                        <p>Address other than R/o where all or any books of account and papers are maintained<b>Office 602, Saltee Plaza, 1 Jessore Road, Kolkata, West Bengal, 700080 IN
</b></p>
                        <p>Managing director: <b>Aniruddha Roychowdhury</b></p>
                        <p>Telephone: <b>+91 (033) 4064 4035</b></p>
                        <p>Email:<b>admin@expy.bio</b></p>
                        <h4>Bank details:</h4>
                        <p>Bank Name: <b>ICICI Bank Limited</b></p>
                        <p>Bank Branch: <b>Kolkata, Nager Bazar Branch</b></p>
                        <p>Bank address: <b>235, Jessore Road, Nagerbazar, Kolkata, West Bengal, 700028 IN
</b></p>
                        <p>IFSC Code:<b>ICIC0001100</b></p>
                        <p>A/c No.<b>110005001679</b></p>
                        <p>SWIFT Code:<b>ICICINBB006</b></p>
                      </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
    <FooterClass/>
    </>
  )
}


export default PrivacyPolicy
