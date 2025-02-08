"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { payment } from "@/lib/api/user";

const Payment = () => {
  const searchParams = useSearchParams();
  const data = searchParams?.get("data");
  const decodedString = data ? atob(data) : "";
  const parsedData = decodedString ? JSON.parse(decodedString) : {};

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    secCode: "",
    bank: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const paymentSuccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate payment processing with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const today = new Date();
      const bookingDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
        
      const updatedData = {
        ...parsedData,
        paymentDate: bookingDate, // Payment date
        paymentMethod: selectedMethod, // Selected payment method
      };

      const response = await payment(updatedData);
      toast(response?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: response?.success === true ? "success" : "error",
      });
      
      if (response?.success === false) return;
      router.push("/user/bookinghistory");
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Select Payment Method</h1>
      <form onSubmit={paymentSuccess}>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
            <div
              onClick={() => handleMethodSelect("credit")}
              className="flex items-center cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                            ${
                              selectedMethod === "credit"
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                            }`}
              >
                {selectedMethod === "credit" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="font-medium">Credit Card</span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/179/179457.png"
                alt="credit-icon"
                width={24}
                height={24}
                className="ml-3"
              />
            </div>

            {selectedMethod === "credit" && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Card Holder Name
                  </label>
                  <input
                    id="cardName"
                    value={formValues.cardName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex p-2">
                  <label htmlFor="expDate">MM/DD:</label>
                  <input
                    id="expDate"
                    value={formValues.expDate}
                    onChange={handleInputChange}
                    className="block w-1/2 rounded-md border-0 m-2 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                  <label htmlFor="secCode">CVV:</label>
                  <input
                    id="secCode"
                    value={formValues.secCode}
                    onChange={handleInputChange}
                    className="block w-1/2 rounded-md border-0 m-2 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
            <div
              onClick={() => handleMethodSelect("ebank")}
              className="flex items-center cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                            ${
                              selectedMethod === "ebank"
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                            }`}
              >
                {selectedMethod === "ebank" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="font-medium">E-Banking</span>
              <img
                src="https://www.hsbc.com.my/content/dam/hsbc/my/images/ways-to-bank/fpx-logo.jpg"
                alt="fpx-icon"
                width={24}
                height={24}
                className="ml-3"
              />
            </div>

            {selectedMethod === "ebank" && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Select Bank
                </label>
                <select
                  id="bank"
                  value={formValues.bank}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Choose your bank</option>
                  <option value="MB">Maybank</option>
                  <option value="CB">CIMB Bank</option>
                  <option value="PB">Public Bank</option>
                  <option value="RB">RHB Bank</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg mt-6"
          disabled={!selectedMethod || isLoading}
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </Button>
      </form>
    </div>
  );
};

export default Payment;
