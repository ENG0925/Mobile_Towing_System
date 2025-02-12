import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in by looking for user ID in localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []); // Empty dependency array means this runs once on component mount

  const handleUserIconClick = () => {
    router.push("/user/bookinghistory");
  };

  const handleSignIn = () => {
    router.push("/authorization/signin");
  };

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
        <div className="relative">
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

        <Link
          href={localStorage.getItem("userId") ? "/bookingflow" : "#"}
          className={`text-gray-600 ${
            localStorage.getItem("userId")
              ? "hover:text-green-800"
              : "opacity-50 cursor-not-allowed"
          }`}
          onClick={(e) => {
            if (!localStorage.getItem("userId")) {
              e.preventDefault(); // Prevent navigation
            }
          }}
        >
          Service
        </Link>

        {/* Conditional rendering based on localStorage authentication */}
        {isAuthenticated ? (
          <Button
            variant="ghost"
            className="p-2 hover:bg-green-50"
            onClick={handleUserIconClick}
          >
            <User className="w-6 h-6 text-green-800" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="text-green-800 hover:bg-green-50"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
