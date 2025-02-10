"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "@/lib/api/driver";

interface LoginFormData {
  username: string;
  password: string;
}

interface DriverLoginProps {
  onLogin: (data: LoginFormData) => void;
}

const DriverLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<LoginFormData>({
    username: "",
    password: "",
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(formData.username, formData.password);
    toast(response?.message, {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: response?.success === true ? "success" : "error",
    });

    if (!response?.success) return;

    localStorage.setItem("driverID", response.id);
    router.push(`/driver/driver-booking`);
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-emerald-800">
            Driver Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-emerald-700"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="border-emerald-200 focus:ring-emerald-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-emerald-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="border-emerald-200 focus:ring-emerald-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverLogin;
