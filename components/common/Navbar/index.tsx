// components/navbar/Navbar.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full bg-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {/* Left menu items */}

        <Link href="/feedback" className="text-gray-600 hover:text-green-800">
          Feedback
        </Link>

        <Link href="/aboutus" className="text-gray-600 hover:text-green-800">
          About Us
        </Link>

        {/* Center logo */}
        <div className="relative ">
          <Link href="/home">
            <div className="relative w-16 h-16">
              <Image
                src="/image/logo/logo.png"
                alt="Sonic Towing Logo"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
          </Link>
        </div>

        {/* Right menu items */}
        <Link
          href="/helpandsupport"
          className="text-gray-600 hover:text-green-800"
        >
          Help & Support
        </Link>

        <Button variant="ghost" className="text-green-800 hover:bg-green-50">
          Sign In
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
