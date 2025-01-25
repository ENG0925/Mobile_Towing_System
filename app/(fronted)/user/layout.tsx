"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getAccountDetail } from "@/lib/api/user";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
      const fetchData = async () => {
        try {
          const id = localStorage.getItem("userId");
          const response = await getAccountDetail(Number(id));
          setUserData(response.data);
  
        } catch (error) {
          console.error("Error fetching account details:", error);
        }
      };
  
      fetchData();
    }, []);
    
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <Sidebar
          userName= {userData.name}
          userEmail={userData.email}
        />
        <div className="flex-grow">{children}</div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
