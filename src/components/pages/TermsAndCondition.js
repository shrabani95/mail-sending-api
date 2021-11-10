import React from 'react';
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import ProfileHeader from '../header_footer/ProfileHeader';
const TermsAndCondition = () => {
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
                    <h3>Terms and Conditions</h3>
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                      <div className="text">
                        <p>This document is an agreement between HELLOSTAR MEDIA PRIVATE LIMITED (hereinafter referred to as “Expy.bio”) and Creators, and defines how Expy.bio interacts with Celebrities, Influencers, Experts, Stars (hereinafter referred to as “Creators”) and Users, as well as procedures on how Creators provide video messages to Users.</p>
                        <p>In creating an account or using the site Expy.bio, the Creator accepts these terms and conditions as well as represents and warrants that he/she:</p>
                        <p>a) has carefully read and understood the User Agreement and Privacy Policy of Expy.bio;</p>
                        <p>b) has the right, in accordance with applicable law, to enter into contractual relations under this User Agreement and there is nothing that would limit its legal capacity,</p>
                        <p>c) is above 18 years of age and an adult in accordance with the legislation of the country of citizenship of the Creator and the countries of his residence;</p>
                        <p>d) has been notified that the content of Expy.bio is intended exclusively for adults.</p>
                        
                        <h4>Terms and definitions:</h4>

                        <p>The terms and definitions listed below have the following meaning for the purposes of this User Agreement:</p>
                        <p>Expy.bio – online information service (website) located on the Internet with a domain name "Expy.bio", the author, developer and copyright holder of which is HELLOSTAR MEDIA PRIVATE LIMITED. The online service allows users to upload, send, store, and receive content and various data, including Expy.bio videos and advertising materials.</p>
                        <p>Website – a set of graphic and informational materials, as well as computer programs and databases that ensure that the network address https:&#x0002F;&#x0002F;Expy.bio, where Expy.bio is located and available on the Internet.</p>
                        <p>The Administration of Expy.bio – authorized Expy.bio management employees acting on behalf of Expy.bio.</p>
                        <p>Expy.bio Creator – a person who is popular / has achieved particular success in a particular field of activity, including but not limited to: artists, actors, showmen, bloggers, athletes, businessmen, politicians, gurus, singers, musicians, stars, celebrities, etc., who have registered their personal account on Expy.bio, via the Internet and using the website Expy.bio.</p>
                        <p>User – a person who has access to the website Expy.bio, via the Internet and using the website Expy.bio.</p>
                        <p>Expy Service - any transaction-based service that is offered and undertaken on Expy, whether a video message, live video session, content paywall among others.</p>
                        <p>Expy Video – a video message (video clip) recorded by a creator at the request and tasks of the User, the duration of which cannot be less than 30 seconds.</p>
                        <p>Expy Live - a live video session between a creator and a user, booked directly on Expy. A user may book multiple sessions concurrently. </p>
                        <p>Content of Expy.bio– protected results of intellectual activity, including texts of literary works, their titles, prefaces, annotations, articles, illustrations, covers, musical works with or without text, graphics, texts, photographs, derivatives, composites and other works, user interfaces, visual interfaces, trademark names, logos, computer programs, databases, as well as the design, structure, selection, coordination, appearance, general style and location of this content, which is part of Expy.bio and other intellectual property items all together and / or separately contained on the site Expy.bio.</p>
                       
                       <h4>1. General Terms of Interaction and Subject of the User Agreement</h4>
                        <p>1.1. Use of materials and services of Expy.bio is regulated by the current legislation of the Republic of India.</p>
                        <p>1.2. This Agreement is a public offer. By getting access to Expy.bio the Creator is considered to have agreed to the terms and conditions of this Agreement.</p>
                        <p>1.3. The Administration of Expy.bio has the right to:</p>
                        <p>1.3.1. unilaterally change the terms of this Agreement at any time. Such changes will take effect from the moment the new version of the Agreement is posted on Expy.bio. If the Creator does not agree with the changes made, they may refuse to access Expy.bio, stop using the materials and services Expy.bio;</p>
                        <p>1.3.2. restrict the Creator access to Expy.bio if the Creator violates the terms of this Agreement;</p>
                        <p>1.3.3. change the amount of payment charged for services rendered by Expy.bio.</p>
                        <p>1.4. In accordance with the terms of this Agreement, the Creator is commissioned and assigned by the User through the website Expy.bio and undertakes to record, upload to his/her personal account Expy.bio and send the Expy Service to the User, for which Expy.bio pays the Creator a compensation in the form of 90% of the revenue received from each User who ordered and paid for the services of the Creator.</p>
                        <p>1.4.1. The Creator has the right to independently set the price for each Expy Service. However, this price cannot be less than Rupees 100 per Expy Service.</p>
                        <p>1.5. Expy.bio provides the Creator with the following services:</p>
                        <p>registration (creation) of a personal account, with various statistical data, as well as the ability to offer and receive various paid requests via Expy services;</p>
                        <p>access to all services of Expy.bio is available both for free and/or for a fee;</p>
                        <p>access to a shared chat with the ability to post comments and messages;</p>
                        <p>access to Expy.bio's search and navigation tools;</p>
                        <p>accepting and transferring payments;</p>
                        <p>"Premium" status, which implies a privileged position for the Creator who have acquired this status;</p>
                        <p>other types of services implemented on the pages Expy.bio.</p>
                        <p>1.6. Payment of the Creator's remuneration is made within 14 days after the User's funds are received by the online payment service. The online payment service is not managed by Expy.bio and the relationship with the service is governed by the terms of the payment service provider. Therefore, Expy.bio is not responsible for any delays or failures  in receiving payment caused by any third-party service. However, in such a case, the Expy team would initiate the payment again.</p>
                        <p>1.7. This Agreement applies to all currently existing (actually functioning) services of Expy.bio, as well as any subsequent modifications and additional services that appear in the future services of Expy.bio.</p>
                        
                        <h4>2. Obligations of the Creator, the procedure for interacting with Expy.bio and Users, as well as rights to the results of intellectual activities</h4>
                        <p>2.1. The Creator undertakes to record, upload to his/her personal account in Expy.bio and send the video Expy.bio to each User who orders it. However, if it is not possible to fulfill the User's request, the Creator has the right to reject the request within 72 hours of its receipt. If the request is accepted, the video must be uploaded to your personal profile within 72 hours of acceptance.</p>
                        <p>2.2. When creating an Expy Service the Creator undertakes to act strictly within the framework of the User's request.</p>
                        <p>2.3. The Creator also has the right to reject a User's request if it is undesirable, contains offensive language, obscenities, calls to incite ethnic hatred or enmity, violations of laws, etc. 2.4. In case of rejection of the request from Expy.bio the Creator is not liable to make any payments.2.4. In case of rejection of the request from Expy.bio the Creator is not liable to make any payments.2.4. In case of rejection of the request from Expy.bio the Creator is not liable to make any payments.</p>
                        <p>2.4. In case of rejection of the request from Expy.bio the Creator is not liable to make any payments.</p>
                        <p>2.5. After completing registration and creating an account, the Creator agrees to provide Expy.bio the following information: 1. one image in high resolution; 2. biography; 3. social networks; 4. payment details, 5. other information.</p>
                        <p>2.6. The Creator agrees not to take any actions that may be considered as violating Indian or international laws, including in the field of intellectual property, copyright and / or related rights, as well as any actions that lead or may lead to a violation of normal operation of Expy.bio and services of Expy.bio.</p>
                        <p>2.7. The website Expy.bio enables the Creator to upload, send, store, and receive various content, including Expy Services and promotional materials (the "Content"). The Creator retains the rights to all the results of intellectual activity.</p>
                        <p>2.8. By uploading, sending, saving, or receiving content, a creator provides Expy.bio permission to reproduce and use the Creator's content in any way (unless otherwise specified by the Creator in the submission process). The Creator provides Expy.bio and to those who work together with Expy.bio license to use, post, store, reproduce, modify, create derivative works (such as translations, adaptations, or other changes that is required to work correctly in Expy.bio platform), public display and distribution on the Site, in social networks, on other sites, and in the media.</p>
                        <p>Use of Expy.bio materials is not allowed without the consent of the copyright holders. For legitimate use of Expy.bio materials, it is necessary to conclude license agreements (obtain licenses) from the copyright holders.</p>
                        <p>2.9. License submitted by Expy.bio, is intended for limited operation, promotion and improvement of the website Expy.bio and its services, as well as for the development of new services. The license for the Creator's content is not exclusive, meaning that the Creator may use their content for personal purposes or allow third parties to use the Creator's content for their own purposes.</p>
                        <p>2.10. The license is fully paid for and does not require any royalties. Therefore, Expy.bio does not pay the Creator any remuneration in connection with the use of the Creator's content. Expy.bio has the right to use the license on the territory of the whole world. In addition, Expy.bio has the right to sub-license the rights granted to Users and use them in any other way, if it is necessary for the activity Expy.bio. </p>
                        <p>2.11. The license is perpetual, which means that the rights of Expy.bio for this license are preserved even after the Creator ceases to use it in Expy.bio. </p>
                        <p>2.12. The Creator agrees that Expy.bio may display, distribute, broadcast, or otherwise use advertising that includes the Creator's content.</p>
                        <p>2.13. By accepting this Agreement, the Creator states and warrants that:</p>
                        <p>all rights to the content belong to the Creator legally and the Creator has the right to grant Expy.bio the rights as described above;</p>
                        <p>Any fees or other charges that may be associated with the use of the Creator's content have been considered paid;</p>
                        <p>The Creator's content does not violate intellectual property rights, the right to inviolability of private life, denigrates the honor, dignity and business reputation and does not violate other legal rights of third parties.</p>
                        <p>2.14. The Creator acknowledges and agrees that the relationship governed by this Agreement is not a confidential, fiduciary, or other special relationship. Expy.bio is not responsible for any use or disclosure of any content provided by the Creator.</p>
                        <p>2.15. Expy.bio has the right to deny the Creator in accepting or transmitting the content without explanation. In addition, Expy.bio has the right to remove the Creator's content from the website Expy.bio without explanation.</p>
                        <p>2.16. If a creator cancels their Expy account, the Creator may request that Expy.bio no longer display the Creator's videos on the website. However Expy is not liable for the sharing/publicizing of content by the user, which was submitted prior to the cancelling of the Creator's account. In select cases, Expy.bio can restrict the use of the Creator's videos by Users for whom it was created by the Creator.</p>
                        <p>2.17. When quoting materials published on Expy.bio, including copyrighted works, links to Expy.bio is mandatory as per the applicable laws of India.</p>
                        <p>2.18. The Creator's content on Expy.bio must not conflict with the requirements of the legislation of the Republic of India and generally accepted norms of morality.</p>
                        <p>2.19. The Creator is hereby notified that the Administration of Expy.bio is not responsible for visiting and using external resources, links to which may be contained on Expy.bio.</p>
                        <p>2.20. The Creator agrees that the Administration of Expy.bio is not responsible or liable, directly or indirectly, to the Creator in connection with any possible or incurred losses or damages related to any content of Expy.bio, copyright registration and information about such registration, goods or services available on Expy.bio or obtained through external sites or resources.</p>
                        <p>2.21. The Creator accepts the provision that all materials and services Expy.bio or any part of them may be accompanied by advertising. The Creator agrees that the Administration of Expy.bio does not bear any responsibility and does not have any obligations in connection with such advertising.</p>
                        <p>2.22. Additionally, the Creator of Expy.bio undertakes to:</p>
                        <p>2.22.1. provide at the request of the Administration of Expy.bio additional information that is directly related to the services provided Expy.bio.</p>
                        <p>2.22.2. observe the property and non-property rights of authors and other copyright holders while using Expy.bio.</p>
                        <p>2.22.3. not to take actions that may be considered disruptive to normal operation of Expy.bio.</p>
                        <p>2.22.4. not to distribute any confidential and protected by the Indian legislation information about individuals or legal entities using the Expy.bio platform.</p>
                        <p>2.22.5. avoid any actions that may violate the confidentiality of information protected by the Indian legislation.</p>
                        <p>2.22.6. not to use Expy.bio to distribute advertising information, except with the consent of the Administration of Expy.bio.</p>
                        <p>2.22.7. not to use the services of Expy.bio with the purpose of:</p>
                        <p>2.22.7.1. downloading content that is illegal, violates any rights of third parties; promotes violence, cruelty, hatred and (or) discrimination on racial, national, sexual, religious, social grounds; contains false information and (or) insults to specific individuals, organizations, and authorities.</p>
                        <p>2.22.7.2. encouraging others to commit illegal actions, as well as assistance to persons whose actions are aimed at violating restrictions and prohibitions in force on the territory of India.</p>
                        <p>2.22.7.3. violating the rights of minors and (or) causing them harm in any form.</p>
                        <p>2.22.7.4. infringement of the rights of minorities.</p>
                        <p>2.22.7.5. representing yourself as another person or representative of an organization and/or community without sufficient rights, including employees of Expy.bio.</p>
                        <p>2.22.7.6. misleading anybody about the properties and characteristics of any service on Expy.bio.</p>
                        
                        <p>2.22.7.7. incorrectly comparing Expy.bio, as well as forming a negative attitude to persons who (do not) use Expy.bio, or condemning such persons.</p>
                        <p>2.23. Creators are forbidden to:</p>
                        <p>2.23.1. use any devices, programs, procedures, algorithms, and methods, automatic devices, or equivalent manual processes to access, acquire, copy, or track content of Expy.bio;</p>
                        <p>2.23.2. disturb the proper functioning Expy.bio;</p>
                        <p>2.23.3. bypass the navigation structure of Expy.bio in any way to obtain or attempt to obtain any information, documents, or materials by any means not specifically provided by the services of Expy.bio;</p>
                        <p>2.23.4. get unauthorized access to functions of Expy.bio, any other systems or networks related to Expy.bio, as well as any services offered on Expy.bio;</p>
                        <p>2.23.4. violate the security or authentication system on Expy.bio or in any network related to Expy.bio.</p>
                        <p>2.23.5. perform reverse search, track, or attempt to track any information about any other user of Expy.bio.</p>
                        <p>2.23.6. use Expy.bio and its Content for any purpose prohibited by the Indian legislation, as well as to incite any illegal activity or other activity that violates the rights of Expy.bio or any other persons.</p>
                        <p>2.23.7. Use, share or post any user-submitted content in any form (whether .mp4, .doc, .ppt, .pdf, .psd etc.), unless approval given by the user in the form of written consent. Everything is to be kept private on Expy otherwise.</p>
                        <h4>3. Usage of Expy.bio</h4>
                        <p>3.1. The website (landing page) and the content included in the Website are owned and managed by the Administration of Expy.bio.</p>
                        <p>3.2. The content of the Website may not be copied, published, reproduced, transmitted or distributed in any way, or posted on the global Internet without the prior written consent of the Administration Expy.bio.</p>
                        <p>3.3. The content of the Website is protected by copyright, trademark law, as well as other rights related to intellectual property and unfair competition law.</p>
                        <p>3.4. In order to purchase goods and services offered on the Expy.bio website, the Creator is required to create (register) a creator account and provide a phone number and email.</p>
                        <p>3.5. The Creator is personally responsible for maintaining the confidentiality of the account information, including the password, as well as for all activities conducted on behalf of the Creator account without exception.</p>
                        <p>3.6. The Creator must immediately notify the Administration of Expy.bio any unauthorized use of their account or password, or any other security breach.</p>
                        <p>3.7. The site administration has the right to unilaterally cancel a creator's account if it has not been used for more than 12 consecutive calendar months without notifying the Creator.</p>
                        <p>3.8. This Agreement applies to all additional terms and conditions for the purchase of goods and services provided on Expy.bio.</p>
                        <p>3.9. Information posted on Expy.bio, shall not be construed as a modification of this Agreement.</p>
                        <p>3.10. Administration of Expy.bio has the right to make changes to the list of products and services offered on the website at any time without notice to the Creator  of Expy.bio, and (or) the prices applicable to such goods for their sale and (or) services rendered by Expy.bio.</p>
                        <p>3.11. Expy is forbidden to use, share or post any user-submitted content (i.e. Media and work sent in by the user for Creator review and feedback exclusively) in any form (whether .mp4, .doc, .ppt, .pdf, .psd etc.), unless approval is given by the user in the form of written consent. Everything is to be kept private on Expy otherwise, between the user and the Creator.</p>
                        
                        <h4>4. Responsibilities</h4>
                        <p>4.1. Any damages or losses (financial or otherwise) that the Creator may incur in the event of intentional or negligent violation of any provision of this Agreement, as well as due to unauthorized access to the communications of another Creator, is not reimbursable by the Administration of Expy.bio .</p>
                        <p>4.2. The Administration of Expy.bio is not responsible for:</p>
                        <p>4.2.1. delays or failures in the process of performing operations caused by force majeure, as well as any case of problems in telecommunications, computer, electrical and other related systems.</p>
                        <p>4.2.2. actions by transfer systems, banks, payment gateways and for delays related to their operation.</p>
                        <p>4.2.3. proper functioning of the website in the event that the Creator does not have the necessary technical means to use it, and does not bear any obligations to provide users with such means.</p>
                        <h4>5. Violation of the terms of the User Agreement</h4>
                        <p>5.1. The administration Expy.bio may disclose any information collected about the Creator if disclosure is necessary in connection with an investigation or complaint regarding misuse of Expy.bio or to establish the identity of a creator who may violate or interfere with the rights of the Administration of Expy.bio or the rights of other Creator and Users of Expy.bio.</p>
                        <p>5.2. The Administration Expy.bio has the right to disclose any information about the Company that it deems necessary to comply with the provisions of current legislation or court decisions, to ensure compliance with the terms of this Agreement, to protect the rights or safety of HELLOSTAR MEDIA PRIVATE LIMITED or the Users.</p>
                        <p>5.3. The Administration of Expy.bio has the right to disclose information about a creator if the current Indian legislation requires or permits such disclosure.</p>
                        <p>5.4. The Administration of Expy.bio has the right to terminate and/or block the User's access to the Expy.bio website without prior notice, if the Creator has violated this Agreement or the terms of use contained in other documents of Expy.bio, as well as in the event of the termination of the site or due to a technical issue or problem.</p>
                        <p>5.5. The site administration is not responsible to the Creator or third parties for the termination of access to Expy.bio if the Creator violates any provision of this Agreement or any other document containing the terms of use of Expy.bio.</p>
                        
                        <h4>6. Other conditions</h4>
                        <p>6.1. All possible disputes arising out of or related to this Agreement shall be resolved in accordance with the current Indian legislation at the place of registration of HELLOSTAR MEDIA PRIVATE LIMITED, in the High Court of Kolkata.</p>
                        <p>6.2. Nothing in the Agreement should be understood as establishing any Agent / Agency relationship, partnership relationship, joint activity relationship, personal employment relationship, or any other relationship not expressly provided for in the Agreement.</p>
                        <p>6.3. The court's recognition of any provision of the Agreement as invalid or unenforceable does not invalidate other provisions of the Agreement.</p>
                        <p>6.4. Inaction on the part of the Administration of Expy.bio in case of violation by any of the Creators of the provisions of the Agreement does not deprive the Administration Expy.bio the right to take appropriate actions later in order to protect their interests and copyright protection of materials protected in accordance with the law.</p>
                        <p><b>The Creator confirms that he / she has read and understood all the points of this User Agreement and accepts them unconditionally.</b></p>
                        
                        <h4>Company Details:</h4>
                        <p>Company name: <b>HELLOSTAR MEDIA PRIVATE LIMITED</b></p>
                        <p>CIN: <b>U92130WB2020PTC237015</b></p>
                        <p>PAN: <b>AAFCH2528G</b></p>
                        <p>Mailing Address: <b>A. Roychowdhury, c/o HELLOSTAR MEDIA PRIVATE LIMITED, Flat No.321 Block 8, 7 K. B. Sarani, Lp-5/37/2, Kolkata, West Bengal, India, 700080</b></p>
                        <p>Address other than R/o where all or any books of account and papers are maintained <b>Office 602, Saltee Plaza, 1 Jessore Road, Kolkata, West Bengal, 700080 IN</b></p>
                        <p>Managing director: <b>Aniruddha Roychowdhury</b></p>
                        
                        <h4>Bank details:</h4>
                        <p>Bank Name: <b>ICICI Bank Limited</b></p>
                        <p>Bank Branch: <b>Kolkata, Nager Bazar Branch</b></p>
                        <p>Bank address: <b>235, Jessore Road, Nagerbazar, Kolkata, West Bengal, 700028 IN</b></p>
                        <p>IFSC Code: <b>ICIC0001100</b></p>
                        <p>A/c No. <b>110005001679</b></p>
                        <p>SWIFT Code: <b>ICICINBB006</b></p>
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


export default TermsAndCondition
