import React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Car,
  Star,
  CalendarCheck,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ManagementAdminSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "user", icon: Users, label: "User" },
    { id: "booking", icon: CalendarCheck, label: "Booking" },
    { id: "vehicle", icon: Car, label: "Vehicle" },
    { id: "driver", icon: UserCircle2, label: "Driver" },
    { id: "feedback", icon: Star, label: "Feedback" },
  ];

  const handleMenuClick = (itemId: string) => {
    router.push(`/management-admin/${itemId}`);
  };

  const isActivePath = (itemId: string) => {
    return pathname?.startsWith(`/management-admin/${itemId}`);
  };

  return (
    <div className="min-h-screen h-full">
      <div className="w-64 bg-[#1B4D3E] text-white p-4 flex flex-col h-full">
        <div className="text-xl font-bold mb-8 text-[#C2F970]">Admin Panel</div>

        <nav className="space-y-2 flex-grow">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={cn(
                  "flex items-center w-full p-3 rounded-lg transition-colors",
                  "hover:bg-[#2C634F]",
                  isActivePath(item.id)
                    ? "bg-[#C2F970] text-[#1B4D3E]"
                    : "text-white"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button className="flex items-center w-full p-3 rounded-lg mt-auto text-white hover:bg-red-700 bg-red-600">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ManagementAdminSidebar;
