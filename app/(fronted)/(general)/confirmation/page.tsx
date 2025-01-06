"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Car, MapPin, Clock, DollarSign } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const Confirmation: React.FC = () => {
  const searchParams = useSearchParams();

  // Decode the data parameter from the URL
  const encodedObject = searchParams.get("data") || "";
  const decodedString = atob(encodedObject);
  const parsedData = JSON.parse(decodedString); // Parse the JSON string back into an object

  // Extract the values from the parsed data
  const { vehicleId, vehicle, carNumber, serviceLocation, towingLocation } =
    parsedData;

  // States for user data
  const [userData, setUserData] = useState({
    name: "",
    vehicle: "",
    carNumber: "",
    email: "",
    insurance: false,
  });

  // States for calculations and form
  const [distance, setDistance] = useState(0);
  const [estimateCost, setEstimateCost] = useState(0);
  const [eta, setEta] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Fetch user data effect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Mock data fetching
        const mockData = {
          name: "Lim Jie Qing",
          vehicle: vehicle,
          carNumber: carNumber,
          email: "limjieqing.123456@gmail.com",
          insurance: true,
        };
        setUserData(mockData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [searchParams]);

  // Calculate distance and cost effect
  useEffect(() => {
    const calculateDistanceAndCost = () => {
      // Replace with actual distance calculation logic
      const mockDistance = calculateDistance(serviceLocation, towingLocation);
      setDistance(mockDistance);

      // Calculate cost based on distance
      const cost = mockDistance <= 5 ? 0 : (mockDistance - 5) * 60;
      setEstimateCost(cost);
    };

    calculateDistanceAndCost();
  }, [serviceLocation, towingLocation]);

  // Calculate ETA effect
  useEffect(() => {
    const calculateETA = () => {
      // Replace with actual ETA calculation using mapping API
      const now = new Date();
      // Mock 30 minutes travel time from MMU to service location
      const etaTime = new Date(now.getTime() + 30 * 60000);
      setEta(
        etaTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    calculateETA();
  }, [serviceLocation]);

  const handleConfirmOrder = () => {
    if (!agreeToTerms) return;

    const orderData = {
      ...userData,
      serviceLocation,
      towingLocation,
      estimateCost,
      eta,
    };

    console.log("Order Confirmed:", orderData);
    // Here you would submit the order to your backend
  };

  const calculateDistance = (
    serviceLocation: string,
    towingLocation: string
  ) => {
    // Implement your logic to calculate distance based on locations
    // For now, returning a mock value
    return 7; // Replace with actual distance calculation
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Booking Confirmation
      </h1>

      {/* Customer Details Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vehicle</p>
              <p className="font-medium">{userData.vehicle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Car Number</p>
              <p className="font-medium">{userData.carNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Insurance Status</p>
              <p
                className={`font-medium ${
                  userData.insurance ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {userData.insurance ? "Insured" : "Not Insured"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Details Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Towing Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Service Location</p>
              <p className="font-medium">{serviceLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Towing Location</p>
              <p className="font-medium">{towingLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Estimated Time of Arrival</p>
              <p className="font-medium">{eta}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Estimation Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cost Estimation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Distance</p>
                <p className="font-medium">{distance} km</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Estimated Cost</p>
                <p className="font-medium text-xl">
                  {estimateCost === 0
                    ? "FREE"
                    : `RM ${estimateCost.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Confirmation */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked: any) => setAgreeToTerms(true)}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the terms and conditions
          </label>
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={!agreeToTerms}
          className={`w-full py-3 rounded-lg text-white text-center ${
            agreeToTerms
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
