"use client";

import DriverNavbar from "@/components/common/Driver-Navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <DriverNavbar />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
