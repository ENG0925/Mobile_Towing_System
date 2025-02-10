"use client";
import React, { useEffect, useState } from "react";
import {
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  CreditCard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllTowBooking } from "@/lib/api/user";

interface TowBooking {
  bookingNo: string;
  bookingDate: string;
  status: string;
  estimatedCost: string;
  model: string;
}

const BookingHistory = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<TowBooking[]>([]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-gray-100 text-gray-700"
      case "unpaid":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-orange-100 text-orange-700";
      case "cancel":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "unpaid":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "cancel":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fecthData = async () => {
      const userID = localStorage.getItem("userId");
      const response = await getAllTowBooking(Number(userID));
      setBookings(response?.data);
    };
    fecthData();
  }, []);

  const handleBookingClick = (id: number) => {
    router.push(`/user/${id}`);
  };

  const handlePayment = (bookingNo: number, amount: number) => {
    const object = { bookingNo, amount };
    const encodedData = btoa(JSON.stringify(object));
    router.push(`/user/payment?data=${encodedData}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Booking Cards */}
          {bookings.length === 0 && (
            <p className="text-center text-gray-500">
              No booking history
            </p>
          )}
          {bookings.map((booking, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        Booking ID: {booking.bookingNo}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Vehicle</p>
                        <p className="font-medium">{booking.model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{booking.bookingDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">{booking.estimatedCost}</p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleBookingClick(Number(booking.bookingNo))
                        }
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePayment(Number(booking.bookingNo), Number(booking.estimatedCost))}
                        disabled={booking.status !== "unpaid"}
                        className={booking.status !== "unpaid" ? "opacity-50 cursor-not-allowed" : ""}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Make Payment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
