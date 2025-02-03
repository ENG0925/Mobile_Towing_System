"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { getAllVehicle } from "@/lib/api/user";

interface Vehicle {
  id: number;
  vehicle: string;
  plateNumber: string;
  hasInsurancePolicy: boolean;
}

interface SelectVehicleProps {
  onNext: () => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
}

interface SelectServiceLocationProps {
  onNext: () => void;
  onBack: () => void;
  serviceLocation: string;
  setServiceLocation: (location: string) => void;
}

interface SelectTowingLocationProps {
  onNext: () => void;
  onBack: () => void;
  towingLocation: string;
  setTowingLocation: (location: string) => void;
}

// Step 1: Vehicle Selection Component
const SelectVehicle: React.FC<SelectVehicleProps> = ({
  onNext,
  selectedVehicle,
  setSelectedVehicle,
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Replace with your actual API call
    const fetchVehicles = async () => {
      const userID = localStorage.getItem("userId");
      const response = await getAllVehicle(Number(userID));
      setVehicles(response.data);
    };
    fetchVehicles();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Select Vehicle For Towing</h1>
      <Card>
        <CardContent className="p-6">
          <RadioGroup
            value={selectedVehicle?.id?.toString()}
            onValueChange={(value) => {
              const vehicle = vehicles.find((v) => v.id.toString() === value);
              setSelectedVehicle(vehicle || null);
            }}
            className="space-y-4"
          ><></>
            {vehicles.length === 0 && (
              <div className="text-gray-500 text-center">
                No vehicles found. Please add a vehicle first.
              </div>
            )}

            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50"
              >
                <RadioGroupItem
                  value={vehicle.id.toString()}
                  id={`vehicle-${vehicle.id}`}
                />
                <label
                  htmlFor={`vehicle-${vehicle.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-medium">{vehicle.vehicle}</div>
                  <div className="text-sm text-gray-500">
                    {vehicle.plateNumber}
                  </div>
                </label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedVehicle}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 2: Service Location Selection Component
const SelectServiceLocation: React.FC<SelectServiceLocationProps> = ({
  onNext,
  onBack,
  serviceLocation,
  setServiceLocation,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Select Service Location</h1>
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4 mb-4 items-center">
            <MapPin className="h-5 w-5 text-gray-500 " />
            <Input
              placeholder="Enter your current location"
              value={serviceLocation}
              onChange={(e) => setServiceLocation(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-between">
        <Button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!serviceLocation}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 3: Towing Location Selection Component
const SelectTowingLocation: React.FC<SelectTowingLocationProps> = ({
  onNext,
  onBack,
  towingLocation,
  setTowingLocation,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Select Towing Location</h1>
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4 mb-4 items-center">
            <MapPin className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Enter destination location"
              value={towingLocation}
              onChange={(e) => setTowingLocation(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-between">
        <Button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!towingLocation}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Main Booking Flow Component
const BookingFlow = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [serviceLocation, setServiceLocation] = useState("");
  const [towingLocation, setTowingLocation] = useState("");

  const validateLocation = async (location: string) => {
    // Basic validation to ensure location is not empty
    return location.trim().length > 0;
  };

  const handleNext = async () => {
    if (step === 1 && selectedVehicle) {
      setStep(2);
    } else if (step === 2 && serviceLocation) {
      const isValidLocation = await validateLocation(serviceLocation);
      if (!isValidLocation) {
        alert("Please enter a valid service location");
        return;
      }
      setStep(3);
    } else if (step === 3 && towingLocation) {
      const isValidLocation = await validateLocation(towingLocation);
      if (!isValidLocation) {
        alert("Please enter a valid towing location");
        return;
      }

      const queryParams = {
        // vehicleId: selectedVehicle?.id.toString(),
        plateNumber: selectedVehicle?.plateNumber,
        serviceLocation: serviceLocation,
        towingLocation: towingLocation,
        vehicle: selectedVehicle?.vehicle,
        vehicleID: selectedVehicle?.id,
        hasInsurancePolicy: selectedVehicle?.hasInsurancePolicy,
      };

      const encodedParams = btoa(JSON.stringify(queryParams));
      router.push(`/confirmation?data=${encodedParams}`);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <div>
      {step === 1 && (
        <SelectVehicle
          onNext={handleNext}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
        />
      )}
      {step === 2 && (
        <SelectServiceLocation
          onNext={handleNext}
          onBack={handleBack}
          serviceLocation={serviceLocation}
          setServiceLocation={setServiceLocation}
        />
      )}
      {step === 3 && (
        <SelectTowingLocation
          onNext={handleNext}
          onBack={handleBack}
          towingLocation={towingLocation}
          setTowingLocation={setTowingLocation}
        />
      )}
    </div>
  );
};

export default BookingFlow;
