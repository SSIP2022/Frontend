import React, { useState } from "react";
import { Accordian } from "../../components/accordian";
import styles from "../../styles/Faqs.module.scss";

const faqs = [
  {
    title: "What are Prepaid Legal Services?",
    description:
      "The concept of Pre-paid legal Service is first of its kind initiative which seeks to ensure protection against potential class legal expenses incurred in the course of litigation battles by qualified legal professionals.",
  },
  {
    title:
      "Am I eligible for benefits under this scheme immediately after subscribing to the plan?",
    description:
      "No, you are eligible for the benefits under the plan only after 1 month of subscription.",
  },
  {
    title: "How can I avail of these services?",
    description:
      "It’s quite simple, all you have to do is register yourself at our website portal, select a plan that suits you, and let’s get started.",
  },
  {
    title: "How is Individual Plan different from Family Plan?",
    description:
      "Most of the services offered by our Sheriffs are common to both the plans with the only exception that the family plan covers all the dependability of the subscriber including children and parents while the individual plan caters only to the needs of an individual Subscriber.",
  },
  {
    title:
      "Does this plan cover every legal dispute whether civil or criminal in nature?",
    description:
      "No, your plan covers only disputes which are civil in nature and does not cover disputes which are criminal in nature.",
  },
  {
    title:
      "What if I need to engage the services of a lawyer who specializes and deals in Criminal cases?",
    description:
      "All such services shall not be covered under your existing plan but we can surely make arrangements on requests depending upon your exigencies and the fees for the same shall be charged separately in accordance with standard industry practice.",
  },
  {
    title:
      "Is there any limit on the number of family members who can avail of benefits under the Family plan?",
    description:
      "There is no such limit on the number of beneficiaries under the family plan as long as such a member is an Immediate dependable of the subscriber.",
  },
  {
    title:
      "Do I need to renew my plan immediately at the time of expiry of my plan?",
    description:
      "Yes, we will send you a reminder for the same one month prior to such expiry and in addition to the same 1 month grace period after such expiry shall also be offered, failing which your plan shall stand terminated.",
  },
  {
    title: "Is there any Limitation on access to services under my plan?",
    description:
      "The only restriction is that you are not eligible for availing benefits for your outstanding legal dispute or query.",
  },
  {
    title: "Do you offer any complimentary services?",
    description:
      "Yes, we offer complementary services in the nature of filing of annual Income Tax Returns or GST Returns.",
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
