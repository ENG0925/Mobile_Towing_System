"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { completeBooking, getDriverBookingDetail } from "@/lib/api/driver";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BookingDetail {
  bookingNo: string;
  customerName: string;
  contactNumber: string;
  vehicleType: string;
  plateNumber: string;
  serviceLocation: string;
  towingLocation: string;
  status: "pending" | "in-progress" | "completed";
  bookingDate: string;
  isCompleted: boolean;
}

const DriverBookingDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedData = searchParams ? searchParams.get("data") : null;
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false); // Track checkbox state

  const bookingId = encodedData ? JSON.parse(atob(encodedData)) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!bookingId) {
        setError("No booking ID provided");
        setLoading(false);
        return;
      }

      const response = await getDriverBookingDetail(bookingId);
      if (!response.success) {
        setError("Booking not found");
        setLoading(false);
        return;
      }

      if (bookingId === response.data.bookingNo) {
        setBooking(response.data);
      } else {
        setError("Booking not found");
      }
      setLoading(false);
    };

    fetchData();
  }, [bookingId]);

  const handleComplete = async() => {
    if (!booking) return;
    const response = await completeBooking(booking.bookingNo);
    toast(response?.message, {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: response?.success === true ? "success" : "error",
    });
    if (!response?.success) return;

    router.push("/driver/driver-booking");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50 p-4 flex items-center justify-center">
        <div className="text-emerald-800">Loading booking details...</div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-emerald-50 p-4 flex items-center justify-center">
        <div className="text-red-600">{error || "No booking data found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="border-b border-emerald-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-black-800">
              Booking #{booking.bookingNo}
            </CardTitle>
            <span className="text-sm text-emerald-600">
              {booking.bookingDate}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Customer & Vehicle Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-emerald-600">Customer</div>
              <div className="font-medium">{booking.customerName}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-emerald-600">Contact</div>
              <div className="font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {booking.contactNumber}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-emerald-600">Vehicle</div>
              <div className="font-medium">{booking.vehicleType}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-emerald-600">Plate Number</div>
              <div className="font-medium">{booking.plateNumber}</div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-emerald-800">Location Details</h3>
            <div className="space-y-4 bg-orange-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-600 mt-1" />
                <div>
                  <div className="text-sm text-orange-600">Pickup Location</div>
                  <div className="font-medium">{booking.serviceLocation}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-600 mt-1" />
                <div>
                  <div className="text-sm text-orange-600">
                    Drop-off Location
                  </div>
                  <div className="font-medium">{booking.towingLocation}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Completion Checklist */}
          {booking.status === "in-progress" && (
            <>
          <div className="space-y-4">
            <h3 className="font-semibold text-emerald-800">
              Completion Checklist
            </h3>
            <div className="space-y-4 bg-white p-4 rounded-lg border border-emerald-100">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="safeDelivery"
                  checked={isChecked}
                  onCheckedChange={(checked) => setIsChecked(checked === true)}
                  className="mt-1 border-emerald-500 text-emerald-600"
                />
                <div className="space-y-1">
                  <label htmlFor="safeDelivery" className="text-sm font-medium">
                    Safe Delivery
                  </label>
                  <p className="text-sm text-gray-500">
                    Vehicle has been safely delivered to the destination
                  </p>
                </div>
              </div>
            </div>
          </div>

          
            <Button
              onClick={handleComplete}
              disabled={!isChecked} // Disable button until checkbox is checked
              className={`w-full ${
                isChecked
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Complete Booking
            </Button>
            </>
          )}
          
          {booking.status !== "in-progress" && (
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => router.push("/driver/driver-booking")}
            >
              Back
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverBookingDetail;
