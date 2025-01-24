"use client";

import AdminSidebar from "@/components/common/Admin-Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div>
        <AdminSidebar />
      </div>
      <div className="mx-10 p-8 w-full">{children}</div>
    </div>
  );
}
