import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const HelpandSupport = () => {
  const getFAQData = () => {
    return [
      {
        question: "How can I get help with using the towing system?",
        answer:
          "You can find assistance and support resources in the Help & Support section. We provide detailed guides, FAQs, and contact information to help you with any queries or issues you may have with using our towing system.",
      },
      {
        question: "What should I do if my vehicle breaks down?",
        answer:
          "If your vehicle breaks down, you can use our towing service app to request assistance immediately. Our team will be dispatched to your location.",
      },
      {
        question: "How do I track my towing service?",
        answer:
          "You can track your towing service in real-time through our app, which provides updates on the estimated time of arrival.",
      },
      {
        question: "Are there any additional fees for towing services?",
        answer:
          "Additional fees may apply based on distance and the type of service required. Please refer to our pricing section for more details.",
      },
      {
        question: "How can I provide feedback on the service?",
        answer:
          "We value your feedback! You can provide feedback through the app or by contacting our customer service.",
      },
    ];
  };

  return (
    <div>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 main main-text-green justify-self-center pb-4">
            Common FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {getFAQData().map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default HelpandSupport;
