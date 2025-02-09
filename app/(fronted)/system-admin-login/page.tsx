"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "@/lib/api/system_admin";
export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(formData.username, formData.password);
    toast(response?.message, {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: response?.success === true ? "success" : "error",
    });

    if (!response?.success) return;
    localStorage.setItem("systemAdminID", response.id);
    router.push("/system-admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-[#1b4b38]">
            System Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                type="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1b4b38] hover:bg-[#2c5c48] text-white"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
