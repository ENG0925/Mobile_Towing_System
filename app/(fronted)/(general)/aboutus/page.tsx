import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { BicepsFlexed } from "lucide-react";

const teamMembers = [
  {
    name: "Homelander",
    position: "CEO",
    image: "",
  },
  {
    name: "Test",
    position: "CEO",
    image: "/path/to/image3.jpg",
  },
  { name: "City Wang", position: "CEO", image: "/path/to/image3.jpg" },
];

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
      <p className="text-center mb-8">
        Sonic Towing Service provides reliable towing services across Malaysia.
        Our advanced system allows real-time driver tracking and automatic ETA
        calculation, ensuring efficiency and transparency.
      </p>

      <div className="flex space-x-4 mb-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="flex flex-col items-center p-4">
            <Image
              src={member.image}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full mb-2"
            />
            <h2 className="font-semibold">{member.name}</h2>
            <p className="text-sm">{member.position}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center mb-4 pt-12">
        <BicepsFlexed className="w-8 h-8  mb-2" />
        <h2 className="text-2xl font-bold mb-4">
          We are looking for talented people
        </h2>
      </div>

      <p className="text-center mb-8">
        Together, we’re not just building a company — we’re revolutionizing
        towing services across Malaysia. Take the next step in your career and
        become a part of our journey to redefine reliability and efficiency.
      </p>

      <Button className="bg-green-500 text-white">Join Us</Button>
    </div>
  );
};

export default AboutUs;
