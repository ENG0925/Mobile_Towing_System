"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllDriverBooking } from "@/lib/api/driver";

interface Booking {
  id: string;
  customerName: string;
  vehicleType: string;
  plateNumber: string;
  serviceLocation: string;
  towingLocation: string;
  status: "pending" | "in-progress" | "completed";
  bookingDate: string;
}

const DriverBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  // Mock data array
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch bookings data
      const response = await getAllDriverBooking(localStorage.getItem('driverID'));
      setBookings(response.data);
    };

    fetchData();
  }, []);
  
  const statusClasses: Record<string, string> = {
    "complete": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "unpaid": "bg-blue-100 text-blue-800 border-blue-200",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "canceled": "bg-red-100 text-red-800 border-red-200",
    "pending": "bg-gray-100 text-gray-800 border-gray-200",
  };

  const handleBookingClick = (bookingId: string) => {
    // // Navigate to booking detail page
    // console.log(`Navigating to booking ${bookingId}`);
    const encodedBooking = btoa(JSON.stringify(bookingId));
    router.push(`/driver/driver-booking-detail?data=${encodedBooking}`);
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-black-800 mb-6">
          Today's Bookings
        </h1>

        <div className="space-y-4">
          {bookings.length === 0 && (
            <p className="text-black-800 text-center">No bookings found</p>
          )}
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="border-emerald-100 hover:border-emerald-200 transition-colors cursor-pointer"
              onClick={() => handleBookingClick(booking.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-semibold text-black-800">
                      Booking #{booking.id}
                    </h2>
                    <p className="text-sm text-emerald-600">
                      {booking.bookingDate}
                    </p>
                  </div>
                  <Badge variant="outline" className={statusClasses[booking.status] || statusClasses["pending"]}>
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-emerald-600">Customer</div>
                    <div className="font-medium">{booking.customerName}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-emerald-600">Vehicle</div>
                    <div className="font-medium">
                      {booking.vehicleType} ({booking.plateNumber})
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2 mt-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600 mt-1" />
                      <div>
                        <div className="text-sm text-emerald-600">Pickup</div>
                        <div className="font-medium">
                          {booking.serviceLocation}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600 mt-1" />
                      <div>
                        <div className="text-sm text-emerald-600">Drop-off</div>
                        <div className="font-medium">
                          {booking.towingLocation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverBookings;
