"use client";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex-grow">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
