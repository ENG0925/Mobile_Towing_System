import React from "react";
import { useRouter, usePathname } from "next/navigation";
import PropTypes from "prop-types";
import { logout } from "@/lib/api/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SidebarProps {
  userEmail: string;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userEmail, userName }) => {
  const router = useRouter();
  const currentPath: any = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    const response = await logout(Number(localStorage.getItem("userId")));
    if (response?.success === true) {
      localStorage.removeItem("userId");
      router.push("/home");
    }
    toast(response?.message, {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: response?.success === true ? "success" : "error",
    });
  };

  return (
    <div className="w-64 bg-emerald-800 text-white flex flex-col min-h-screen">
      <div className="p-6 space-y-8">
        <div className="border-b border-emerald-700 pb-4">
          <h2 className="text-lg font-semibold mb-1 text-center">{userName}</h2>
          <p className="text-sm text-emerald-200 text-center">{userEmail}</p>
        </div>

        <nav className="space-y-3">
          <button
            className={`w-full p-3 rounded-lg flex items-center transition-colors ${
              currentPath.startsWith("/user/bookinghistory")
                ? "bg-emerald-600 font-medium"
                : "hover:bg-emerald-700"
            }`}
            onClick={() => handleNavigation("/user/bookinghistory")}
          >
            <span>Booking History</span>
          </button>
          <button
            className={`w-full p-3 rounded-lg flex items-center transition-colors ${
              currentPath.startsWith("/user/vehicle")
                ? "bg-emerald-600 font-medium"
                : "hover:bg-emerald-700"
            }`}
            onClick={() => handleNavigation("/user/vehicle")}
          >
            <span>Add Vehicle</span>
          </button>
          <button
            className={`w-full p-3 rounded-lg flex items-center transition-colors ${
              currentPath.startsWith("/user/accountsetting")
                ? "bg-emerald-600 font-medium"
                : "hover:bg-emerald-700"
            }`}
            onClick={() => handleNavigation("/user/accountsetting")}
          >
            <span>Account Setting</span>
          </button>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button
          className="w-full p-3 text-emerald-800 bg-white rounded-lg hover:bg-emerald-50 transition-colors font-medium"
          onClick={() => handleLogout()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

// PropTypes for validation
Sidebar.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Sidebar;
