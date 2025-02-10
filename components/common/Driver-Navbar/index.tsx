import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, LogOut, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/lib/api/driver";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DriverNavbar = () => {
  const pathname: any = usePathname();
  const router = useRouter();

  const isTodayTasks = pathname.startsWith("/driver/driver-booking");
  const isAllTasks = pathname === "/driver/driver-all-task";

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-4 mt-4">
                  <Button
                    variant={isTodayTasks ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => router.push("/driver/driver-booking")}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Today's Tasks
                  </Button>
                  <Button
                    variant={isAllTasks ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => router.push("/driver/driver-all-task")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    All Tasks
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:gap-x-4">
              <Button
                variant={isTodayTasks ? "default" : "ghost"}
                onClick={() => router.push("/driver/driver-booking")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Today's Tasks
              </Button>
              <Button
                variant={isAllTasks ? "default" : "ghost"}
                onClick={() => router.push("/driver/driver-all-task")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                All Tasks
              </Button>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            className="gap-2"
            onClick={async() => {
              const response = await logout(localStorage.getItem("driverID"));
              toast(response?.message, {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                type: response?.success === true ? "success" : "error",
              });
              if (!response.success) return;
              localStorage.removeItem("driverID");
              router.push("/driver-login");
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DriverNavbar;
