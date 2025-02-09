"use client";
import React, { useEffect, useState } from "react";
import { Eye, MoreVertical, ShieldCheck, ShieldX, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { deleteVehicle, getAllVehicle } from "@/lib/api/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface VehicleData {
  id: number;
  color: string;
  plateNumber: string;
  model: string;
  hasInsurancePolicy: boolean;
}

const Vehicle = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userID = localStorage.getItem("userId");

      const response = await getAllVehicle(Number(userID));
      setVehicles(response.data);
    };
    fetchData();
  }, []);

  const getInsuranceStatus = (hasInsurance: boolean) => {
    return {
      icon: hasInsurance ? (
        <ShieldCheck className="w-4 h-4" />
      ) : (
        <ShieldX className="w-4 h-4" />
      ),
      class: hasInsurance
        ? "bg-emerald-100 text-emerald-700"
        : "bg-red-100 text-red-700",
      text: hasInsurance ? "Insured" : "Not Insured",
    };
  };

  const getVehicles = () => [
    {
      id: 1,
      vehicle: "Proton Saga",
      plateNumber: "JBC 1234",
      color: "Red",
      hasInsurance: true,
    },
    {
      id: 2,
      vehicle: "Toyota Vios",
      plateNumber: "WXY 5678",
      color: "Black",
      hasInsurance: false,
    },
    {
      id: 3,
      vehicle: "Honda City",
      plateNumber: "ABC 9012",
      color: "White",
      hasInsurance: true,
    },
  ];

  const handleVehicleClick = (id: number) => {
    router.push(`/user/vehicle/${id}`);
  };

  const handleDelete = async(id: number) => {
    const response = await deleteVehicle(id);
    toast(response?.message, {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: response?.success === true ? "success" : "error",
    });
    
    if (response?.success === false) return;

    const userID = localStorage.getItem("userId");

    const responseVehicle = await getAllVehicle(Number(userID));
    setVehicles(responseVehicle.data);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Add Vehicle Button */}
          <div className="flex justify-start">
            <button
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              onClick={() => router.push("/user/vehicle/add")}
            >
              Add New Vehicle
            </button>
          </div>

          {vehicles?.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                            getInsuranceStatus(vehicle.hasInsurancePolicy).class
                          }`}
                        >
                          {getInsuranceStatus(vehicle.hasInsurancePolicy).icon}
                          {getInsuranceStatus(vehicle.hasInsurancePolicy).text}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Vehicle Model</p>
                          <p className="font-medium">{vehicle.model}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Car Number</p>
                          <p className="font-medium">{vehicle.plateNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Color</p>
                          <p className="font-medium">{vehicle.color}</p>
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
                          onClick={() => handleVehicleClick(vehicle.id)}
                        >
                          <Eye className="w-5 h-5 text-gray-500" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Trash2 className="w-5 h-5 text-gray-500" />
                          Delete Vehicle
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No vehicles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
