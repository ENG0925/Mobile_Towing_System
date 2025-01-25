"use client";

import SystemAdminSidebar from "@/components/common/SystemAdmin-Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div>
        <SystemAdminSidebar />
      </div>
      <div className="mx-10 p-8 w-full">{children}</div>
    </div>
  );
}
