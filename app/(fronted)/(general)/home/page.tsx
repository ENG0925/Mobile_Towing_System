"use client";
// pages/index.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Truck,
  User,
  FileText,
  Instagram,
  Phone,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const feedbacks = [
    {
      name: "Emily Johnson",
      content:
        "I was impressed by the efficiency and professionalism of the towing service. Highly recommended!",
    },
    {
      name: "Michael Lee",
      content:
        "The towing team provided by this company is top-notch. Quick response and excellent service!",
    },
    {
      name: "Sophia Rodriguez",
      content:
        "Had a great experience using the towing service. Professional and helpful throughout the process.",
    },
    {
      name: "David Smith",
      content:
        "Appreciate the reliable and timely assistance I received when using the towing system. Will definitely use it again!",
    },
  ];

  // Function to get FAQ data
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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold">
              Book Your Towing Adventure Now!
            </h1>
            <p className="text-lg">
              Experience the thrill of booking your towing system with just one
              click!
            </p>
            <Button
              className="main-bg-yellow text-black text-lg px-8"
              onClick={() => router.push("/bookingflow")}
              disabled = {localStorage.getItem("userId") ? false : true}
            >
              Book Now
            </Button>
          </div>
          <div className="relative h-64 md:h-[30rem] overflow-hidden">
            <Image
              src="/image/home/Flatbed-Tow-Truck-Hauling-A-Classic-Car.png"
              alt="Towing Service"
              layout="fill"
              // width={1200}
              // height={1200}
              objectFit="cover"
              className="rounded-lg absolute -top-10 left-0"
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96">
            <Image
              src="/image/home/profesional-person.jpg"
              alt="Professional Staff"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className="text-gray-600">
              Sonic Towing Service provides reliable towing services across
              Malaysia. Our advanced system allows real-time driver tracking and
              automatic ETA calculation, ensuring efficiency and transparency.
            </p>
            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                className="main-bg-yellow border border-black border-[3px] w-full"
                onClick={() => router.push("/aboutus")}
              >
                LEARN MORE
              </Button>
              <Button
                className="bg-white text-black border border-black border-[3px] w-full"
                // onClick={() => router.push("/")}
              >
                CONTACT US
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-4">
        <div className="mx-auto flex justify-between items-center w-full h-32">
          <div className="flex items-center space-x-2 main-bg-yellow h-full w-full justify-center main-text-green">
            <Instagram className="w-8 h-8 text-black" />
            <span className="text-lg">sonictowingservice</span>
          </div>
          <div className="flex items-center space-x-2 main-bg-green h-full w-full justify-center main-text-yellow">
            <Phone className="w-8 h-8 text-yellow-400" />
            <span className="text-lg">+60 123456789</span>
          </div>
          <div className="flex items-center space-x-2 main-bg-yellow h-full w-full justify-center main-text-green">
            <Mail className="w-8 h-8 text-black" />
            <span className="text-lg">sonictowing@gmail.com</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Service Features */}
      <section
        className="py-20 px-6"
        style={{
          backgroundImage: "url('/image/home/car-truck.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center space-y-4">
              <Star className="w-12 h-12 text-yellow-400 fill-current" />
              <div className="text-center">
                <div className="font-bold text-2xl">5</div>
                <p className="text-sm">Rate & start service</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Truck className="w-12 h-12 text-yellow-400 fill-current" />
              <div className="text-center">
                <div className="font-bold text-2xl">5</div>
                <p className="text-sm">Get a towing service</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <User className="w-12 h-12 text-yellow-400 fill-current" />
              <div className="text-center">
                <div className="font-bold text-2xl">5</div>
                <p className="text-sm">Get & start service</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <FileText className="w-12 h-12 text-yellow-400 fill-current" />
              <div className="text-center">
                <div className="font-bold text-2xl">5</div>
                <p className="text-sm">Track & start service</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Customer Feedback Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto justify-items-center">
          <h2 className="text-3xl font-bold mb-8 main-text-green">
            Customer Feedbacks
          </h2>
          <p className="text-gray-600 mb-8">
            Read what our customers have to say about our towing system service
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedbacks.map((feedback, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-green-800">
                      {feedback.name}
                    </h3>
                    <p className="text-sm text-gray-600">{feedback.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
