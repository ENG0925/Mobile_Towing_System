"use client";

import React from "react";
import Sidebar from "@/components/common/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar
        userName="Lim Jie Qing"
        userEmail="limjieqing.123456@gmail.com"
      />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
