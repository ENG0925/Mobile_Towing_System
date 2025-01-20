"use client";
import React from "react";
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

const BookingHistory = () => {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "booking complete":
        return "bg-emerald-100 text-emerald-700";
      case "in progress":
        return "bg-orange-100 text-orange-700";
      case "cancel":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "booking complete":
        return <CheckCircle className="w-4 h-4" />;
      case "in progress":
        return <Clock className="w-4 h-4" />;
      case "cancel":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getBookings = () => [
    {
      id: 1,
      bookingID: "250106001",
      status: "In Progress",
      bookingDate: "06-01-2025",
      vehicle: "Proton Saga",
      estimateCost: "RM 20.00",
    },
    {
      id: 2,
      bookingID: "250106002",
      status: "Booking Complete",
      bookingDate: "06-01-2025",
      vehicle: "Toyota Camry",
      estimateCost: "RM 50.00",
    },
    {
      id: 3,
      bookingID: "250106003",
      status: "In Pending",
      bookingDate: "06-01-2025",
      vehicle: "Honda Civic",
      estimateCost: "RM 30.00",
    },
    {
      id: 4,
      bookingID: "250106004",
      status: "Cancel",
      bookingDate: "06-01-2025",
      vehicle: "Nissan Altima",
      estimateCost: "RM 40.00",
    },
  ];

  const handleBookingClick = (id: number) => {
    router.push(`/user/${id}`);
  };

  const handlePayment = (bookingID: number) => {
    const encodedData = btoa(JSON.stringify(bookingID));
    router.push(`/user/payment?data=${encodedData}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Booking Cards */}
          {getBookings().map((booking, index) => (
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
                        Booking ID: {booking.bookingID}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Vehicle</p>
                        <p className="font-medium">{booking.vehicle}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{booking.bookingDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">{booking.estimateCost}</p>
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
                        onClick={() => handleBookingClick(booking.id)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePayment(booking.id)}
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
