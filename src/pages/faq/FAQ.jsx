import React, { useState } from "react";
import { Accordian } from "../../components/accordian";
import styles from "../../styles/Faqs.module.scss";

const faqs = [
  {
    title: "What is CCRS?",
    description:
      "CCRS is a web based enterprise solution that allows AMC to enhance citizen satisfaction through comprehensive service management and efficient service delivery. CCRS automates entire complaint process right from registration to closure. It also enforces service level policies to ensure the complaint gets attended within desired timeline or gets escalated to higher authorities for their attention and intervention.   A citizens can lodge complaints through a call center, website or by visiting a ward office. At call center or ward office, an operator registers a complaint in the system with all necessary details. A complainant can lodge single or multiple complaints during a single call. In all cases, the complainant is given complaint acknowledgment number.  Once a complaint is registered with the system, it is assigned to a concerned area officer dealing with the reported problem. The system automatically sends an SMS to officer alerting him on the complaint for taking required actions. The officer calls up the complainant, if necessary, to seek specific details.  The officer is expected to resolve the complaint within a specified period. Once a complaint is resolved, the officer marks the complaint closed in the system. The citizen receives an SMS confirming resolution of the complaint. If the citizen is not satisfied; he/she can request to re-open the complaint, which then escalates to the higher authority.  If the complaint is not resolved and closed within the specified period, the same gets escalated to higher authorities. On repeated failure to resolve it gets escalated to the Dy. Commissioner ",
  },
  {
    title:
      "Benefits of CCRS?",
    description:
      "Citizens need not go to Ward offices to register complaintSystem available round the clock - Call Centre, Website, SMS, Email, IVR, Ward Offices, Mobile ApplicationImproved communication by way of SMS / Email alertsCCRS provides data of frequent complaints and average turnaround time for each kind of problem.It helps Municipality/Corporation to focus the areas to improve the services by enhancing the manpower and infrastructure. This also helps Municipality/Corporation to prioritize on their services.",
  },
  {
    title: "How to register a complaint?",
    description:
      "A citizen can register complaint(s) at call center, ward office or through website.To register complaint online through website:Click on the “Online” option of Complaint Registration and enter detail of your complaint.To register complaint at call center:Contact our dedicated call center by dialing 155303 from landline or mobile 24*7 to raise complaint. Municipality/Corporation assures to provide a seamless support.To register complaint through E-Mail:Send your Email with “ Name, Mobile Number, Problem to resolve and Location where the problem is “ at “ccrs@ahmedabadcity.gov.in“ The call operator will check the email and register the complaint in the system. Operator may contact the citizen in case, information provided is insufficient or any clarification required.To register complaint through SMS: Send text “AMCCRS NEW” to 56767. A Call Centre operator will call back to take necessary details to register the complaint.",
  },
  {
    title: "How to register a complaint at Call center?",
    description:
      "Citizen could contact our dedicated call center by dialing 155303 from landline or mobile to raise complaint. This service is available 24*7. Municipality/Corporation assures to provide a seamless support.",
  },
  {
    title:
      "How to register a complaint through Website?",
    description:
      "Citizen can visit our website at ssip-2022.vercel.app Go to complaint registeration and click on Online for registering a complaint.",
  },
  {
    title:
      "How to register a complaint through Email?",
    description:
      "Citizen can send an Email with “ Name, Mobile Number, Problem to resolve and Location where the problem is  at “ccrs@ahmedabadcity.gov.in“. The call center operator will check the email and register the complaint in the system. Operator may contact the citizen in case, information provided is insufficient or any clarification required.",
  },
  {
    title:
      "How to register a complaint through SMS?",
    description:
      "Citizen can send a text message  “AMCCRS NEW” to 56767. A Call Center operator will call back to take necessary details to register the complaint.",
  },
  {
    title:
      "How to register a complaint through Ward office?",
    description:
      "Citizens need to go at Ward offices to register a complaint with the respective officer.",
  },
  {
    title: "How to register a complaint through IVR?",
    description:
      "Citizen can register a complaint through IVR during non working hours or when all operators are busy attending complaints by calling 155303.Step – 1 : Select language – Press 1 for Gujarati, 2 for English or 3 for HindiStep – 2 : Press 1 to continue with IVR or press 2 for callbackStep – 3 : Tell your Name & press #Step – 4 : Tell your Mobile Number & press #Step – 5 : Tell your Problem to resolve & press # Step – 6 : Tell your Location address where the problem is & press # The call center operator will listen to the IVR recorded complaint and register the same in the system. He may contact the citizen in case information provided is insufficient or any clarification required.",
  },
  {
    title: "Do you offer any complimentary services?",
    description:
      "Yes, we offer complementary services in the nature of filing of annual Income Tax Returns or GST Returns.",
  },
  {
    title: "Is there a Mobile app available?",
    description:
      "Yes, there is a mobile app available. You can download the app from Google play store and IOS store for Android and IOS respectively by searching for AMC CCRS. You need to register with your mobile number and then you can register a complaint.",
  },
];

function Faqs() {
  const [isOpen, setIsOpen] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
    faq5: false,
    faq6: false,
    faq7: false,
    faq8: false,
    faq9: false,
    faq10: false,
  });

  function toggleAccordian(key) {
    setIsOpen({ ...isOpen, [key]: !isOpen[key] });
  }
  return (
    <div className={styles.faqsWrapper}>
      <h3 className="darkBlueHeading">Frequently Asked Questions</h3>
      <div className={styles.faqsListWrapper}>
        {faqs.map((faq, i) => {
          return (
            <div onClick={() => toggleAccordian(`faq${i + 1}`)}>
              <Accordian
                title={faq.title}
                isOpen={isOpen[`faq${i + 1}`]}
                description={faq.description}
                
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faqs;
