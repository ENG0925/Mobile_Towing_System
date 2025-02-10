"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Car, MapPin, Clock, DollarSign } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAccountDetail, insertBooking } from "@/lib/api/user";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Confirmation: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams?.get("data");
  const decodedString = data ? atob(data) : "";
  const parsedData = decodedString ? JSON.parse(decodedString) : {};

  // Extract the values from the parsed data
  const { vehicleID, vehicle, plateNumber, serviceLocation, towingLocation, hasInsurancePolicy } =
    parsedData;

  // States for user data
  const [userData, setUserData] = useState({
    username: "",
    vehicle: "",
    plateNumber: "",
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
        const userID = localStorage.getItem("userId");
        const response = await getAccountDetail(Number(userID));
        const { name } = response.data;
        const { email } = response.data;



        // Mock data fetching
        
        const mockData = {
          username: name,
          vehicle: vehicle,
          plateNumber: plateNumber,
          email: email,
          insurance: hasInsurancePolicy,
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

  const handleConfirmOrder = async() => {
    if (!agreeToTerms) return;

    const today = new Date();
    const bookingDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    const userID = Number(localStorage.getItem("userId"));

    const orderData = {
      userID,
      vehicleID,
      bookingDate,
      serviceLocation,
      towingLocation,
      distance,
      estimateCost,
    };

    const response = await insertBooking(orderData);
    toast(response?.message, {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: response?.success === true ? "success" : "error",
    });

    if (response?.success === true) {
      router.push("/home");
    }
  };

  const calculateDistance = (
    serviceLocation: string,
    towingLocation: string
  ): number => {
    // If either location is invalid, return default distance
    if (!serviceLocation || !towingLocation) {
      return 7;
    }

    // Predefined coordinates (you can expand this list)
    const locationCoordinates: { [key: string]: { lat: number; lon: number } } =
      {
        "Bukit Bintang (Monorail), Jalan Sultan Ismail, Bukit Bintang, 50200, Kuala Lumpur, Malaysia":
          { lat: 3.1460769, lon: 101.7115145 },
        "University of Malaya Medical Centre, Jalan Profesor Diraja Ungku Aziz, Section 11, 50603 Petaling Jaya, Kuala Lumpur, Malaysia":
          { lat: 3.111719492887163, lon: 101.65439103578916 },
        "Persiaran Subang Permai, UEP Subang Jaya, 47200 Subang Jaya City Council, Selangor, Malaysia":
          { lat: 3.057960485298728, lon: 101.59811226786121 },
        "Jalan USJ 2/1, UEP Subang Jaya, 47200 Subang Jaya City Council, Selangor, Malaysia":
          { lat: 3.056919270350411, lon: 101.58955958104865 },
        "Jalan Wawasan 4/5, Wawasan 4, 47160 Subang Jaya City Council, Selangor, Malaysia":
          { lat: 3.0322595451129675, lon: 101.62662120242109 },
      };

    // Find coordinates for service and towing locations (case-insensitive)
    const getCoordinates = (location: string) => {
      // Try exact match first
      if (locationCoordinates[location]) {
        return locationCoordinates[location];
      }

      // Try partial match
      const matchedKey = Object.keys(locationCoordinates).find((key) =>
        key.toLowerCase().includes(location.toLowerCase())
      );

      return matchedKey ? locationCoordinates[matchedKey] : null;
    };

    // Get coordinates
    const serviceCoords = getCoordinates(serviceLocation);
    const towingCoords = getCoordinates(towingLocation);

    // If no coordinates found, return default
    if (!serviceCoords || !towingCoords) {
      return 7;
    }

    // Haversine formula for distance calculation
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(towingCoords.lat - serviceCoords.lat);
    const dLon = toRadians(towingCoords.lon - serviceCoords.lon);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(serviceCoords.lat)) *
        Math.cos(toRadians(towingCoords.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate and round the distance
    return Math.round(R * c * 10) / 10; // Round to 1 decimal place
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
              <p className="font-medium">{userData.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vehicle</p>
              <p className="font-medium">{userData.vehicle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Car Number</p>
              <p className="font-medium">{userData.plateNumber}</p>
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
