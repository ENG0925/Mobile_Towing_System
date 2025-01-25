"use client";

import ManagementAdminSidebar from "@/components/common/ManagementAdmin-Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div>
        <ManagementAdminSidebar />
      </div>
      <div className="mx-10 p-8 w-full">{children}</div>
    </div>
  );
}
