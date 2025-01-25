"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, Clock, Phone, Navigation } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { getBookingInfo } from "@/lib/api/user";

// TypeScript interfaces
interface OrderDetails {
  orderId: string;
  orderDate: string;
  bookingNumber: string;
  vehicle: {
    type: string;
    plateNumber: string;
    color: string;
    hasInsurance: boolean;
  };
  driver: {
    currentLocation: {
      lat: number;
      lng: number;
    };
    contactNumber: string;
  };
  serviceLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  towingLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  isFullyWaived: boolean;
  totalAmount: number;
  eta: string;
}


// Mock data
const mockOrderData: OrderDetails = {
  orderId: "456789",
  orderDate: "2025-01-07",
  bookingNumber: "ABC123",
  vehicle: {
    type: "Proton Saga",
    plateNumber: "ABC1234",
    color: "Red",
    hasInsurance: true,
  },
  driver: {
    currentLocation: {
      lat: 3.139,
      lng: 101.6869,
    },
    contactNumber: "+60123456789",
  },
  serviceLocation: {
    lat: 3.139,
    lng: 101.6869,
    address: "MITM, Cyberjaya",
  },
  towingLocation: {
    lat: 3.0319,
    lng: 101.6841,
    address: "KFC, Puchong",
  },
  isFullyWaived: true,
  totalAmount: 150.0,
  eta: "13:00",
};

const Map = () => {
  // This is a placeholder for the actual map component
  // You would typically use a library like Google Maps, Mapbox, or Leaflet
  return (
    <div className="mt-4 h-[400px] rounded-lg overflow-hidden border border-emerald-200">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat: 2.7455, lng: 101.7074 }}
          zoom={13}
        >
          <Marker position={{ lat: 2.7455, lng: 101.7074 }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

interface Props {
  params: {
    id: string;
  };
}

const BookingDetail = ({ params }: Props) => {
  const bookingId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookingInfo(Number(bookingId));
        setOrderDetails(response?.data);
      } catch (error) {
        console.error("Error get ticket info : ", error);
      }
    };
    fetchData();
  }, []);
  const [orderDetails, setOrderDetails] =
    React.useState<OrderDetails>(mockOrderData);

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <Card className="border-emerald-100">
        <CardHeader className="border-b border-emerald-50">
          <div className="flex justify-between items-center">
            <div>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 mb-2"
              >
                Booking ID: {orderDetails.orderId}
              </Badge>
              <CardTitle className="text-lg">
                Booking Date: {orderDetails.orderDate}
              </CardTitle>
            </div>
            <div className="text-sm text-emerald-700 font-medium"></div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Real-time Tracking Section */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-emerald-800">
              <Truck className="h-5 w-5 text-emerald-600" />
              Real-time Tracking
            </h3>

            <Map />

            <div className="grid grid-cols-3 gap-4 bg-orange-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700 justify-center">
                <MapPin className="h-4 w-4" />
                Current Location: Sepang
              </div>
              <div className="flex items-center gap-2 text-orange-700 justify-center">
                <Clock className="h-4 w-4" />
                ETA: 1300
              </div>
              <div className="flex items-center gap-2 text-orange-700 justify-center">
                <Phone className="h-4 w-4" />
                {orderDetails.driver.contactNumber}
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-emerald-800">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-lg border border-emerald-100">
              <div className="space-y-1">
                <div className="text-sm text-emerald-600">Type</div>
                <div className="font-medium">{orderDetails.vehicle.type}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-emerald-600">Plate Number</div>
                <div className="font-medium">
                  {orderDetails.vehicle.plateNumber}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-emerald-600">Color</div>
                <div className="font-medium">{orderDetails.vehicle.color}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-emerald-600">Insurance</div>
                <Badge
                  variant="outline"
                  className={
                    orderDetails.vehicle.hasInsurance
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }
                >
                  {orderDetails.vehicle.hasInsurance ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-emerald-800">Location Details</h3>
            <div className="space-y-3 bg-white p-4 rounded-lg border border-emerald-100">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <div>
                  <div className="text-sm text-emerald-600">
                    Service Location
                  </div>
                  <div className="font-medium">
                    {orderDetails.serviceLocation.address}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <div>
                  <div className="text-sm text-emerald-600">
                    Towing Location
                  </div>
                  <div className="font-medium">
                    {orderDetails.towingLocation.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border-t border-emerald-100 pt-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-emerald-600">Payment Status</div>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700"
              >
                {orderDetails.isFullyWaived ? "Fully Waived" : "Not Waived"}
              </Badge>
            </div>
            <div className="flex justify-between items-center font-semibold text-emerald-800">
              <div>Total Amount</div>
              <div>RM {orderDetails.totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingDetail;
