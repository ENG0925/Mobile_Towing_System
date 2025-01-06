import React from "react";
import { useRouter, usePathname } from "next/navigation";
import PropTypes from "prop-types";

interface SidebarProps {
  userEmail: string;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userEmail, userName }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-64 bg-emerald-800 text-white flex flex-col min-h-screen">
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-white rounded-full mb-4"></div>
          <h2 className="font-semibold">{userName}</h2>
          <p className="text-sm text-emerald-200">{userEmail}</p>
        </div>

        <nav className="space-y-2">
          <button
            className={`w-full p-3 rounded flex items-center space-x-3 ${
              currentPath === "/user/bookinghistory"
                ? "bg-emerald-600"
                : "hover:bg-emerald-700"
            }`}
            onClick={() => handleNavigation("/user/bookinghistory")}
          >
            <span>Booking History</span>
          </button>
          <button
            className={`w-full p-3 rounded flex items-center space-x-3 ${
              currentPath === "/user/addvehicle"
                ? "bg-emerald-600"
                : "hover:bg-emerald-700"
            }`}
            onClick={() => handleNavigation("/user/addvehicle")}
          >
            <span>Add Vehicle</span>
          </button>
          <button
            className={`w-full p-3 rounded flex items-center space-x-3 ${
              currentPath === "/user/accountsetting"
                ? "bg-emerald-600"
                : "hover:bg-emerald-700"
            }`}
            onClick={() => handleNavigation("/user/accountsetting")}
          >
            <span>Account Setting</span>
          </button>
        </nav>
      </div>

      <div className="mt-auto p-4">
        <button className="w-full p-3 text-emerald-800 bg-white rounded-lg hover:bg-emerald-50">
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
