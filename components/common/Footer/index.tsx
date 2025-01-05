// components/footer/Footer.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Social Media</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold main-text-yellow">
            REQUEST BE DRIVER
          </h2>
          <div className="flex">
            <Input
              type="email"
              placeholder="Enter your email..."
              className="bg-white text-black"
            />
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              →
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
