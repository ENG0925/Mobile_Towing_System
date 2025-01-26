"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Mail, Phone, Lock, User } from "lucide-react";
import {
  getAccountDetail,
  updatePassword,
  updateProfile,
} from "@/lib/api/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

const AccountSetting = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    username: userData?.name || "",
    email: userData?.email || "",
    contact: userData?.phoneNumber || "",
    currentPassword: "",
    newPassword: "",
  });

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await getAccountDetail(Number(id));
        setUserData(response.data);

        // Initialize form data with fetched user data
        setFormData((prev) => ({
          ...prev,
          username: response.data.name,
          email: response.data.email,
          contact: response.data.phoneNumber,
        }));
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdatePersonal = async () => {
    try {
      // Check if password change is valid
      const userID = localStorage.getItem("userId");
      if (formData.newPassword) {
        console.log("formData.currentPassword", formData.currentPassword);
        console.log("userData?.password", userData?.password);
        if (formData.currentPassword != userData?.password) {
          toast("Current password wong", {
            position: "top-center",
            autoClose: 5000,
            theme: "light",
            type: "error",
          });
          return;
        }
        const responsePassword = await updatePassword(
          formData.newPassword,
          Number(userID)
        );
        toast(responsePassword?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: responsePassword?.success === true ? "success" : "error",
        });
      }

      // API call for updating user data (e.g., name, email, contact)
      const responseProfile = await updateProfile(
        formData.username,
        formData.email,
        Number(formData.contact),
        Number(userID)
      );
      toast(responseProfile?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: responseProfile?.success === true ? "success" : "error",
      });

      if (responseProfile?.success === false) {
        return;
      }

      setUserData((prev) => ({
        ...prev!,
        name: formData.username,
        email: formData.email,
        phoneNumber: formData.contact,
        password: formData.newPassword || prev?.password || "", // Ensures valid type
      }));

      setIsEditingPersonal(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } catch (error) {
      console.error("Failed to update personal information:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {/* Personal Information Card */}
        <Card>
          <CardHeader className="flex items-center justify-between flex-row">
            <CardTitle>Personal Information</CardTitle>
            <button
              onClick={() => setIsEditingPersonal(!isEditingPersonal)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Edit2 className="w-5 h-5 text-gray-500" />
            </button>
          </CardHeader>
          <CardContent>
            {isEditingPersonal ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={(e) =>
                      handleInputChange("contact", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <button
                  onClick={handleUpdatePersonal}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
                  disabled={
                    formData.username === userData?.name &&
                    formData.email === userData?.email &&
                    formData.contact === userData?.phoneNumber
                  }
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{userData?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{userData?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium">{userData?.phoneNumber}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card>
          <CardHeader className="flex items-center justify-between flex-row">
            <CardTitle>Change Password</CardTitle>
            <button
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Edit2 className="w-5 h-5 text-gray-500" />
            </button>
          </CardHeader>
          <CardContent>
            {isEditingPassword ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      handleInputChange("currentPassword", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">New Password</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      handleInputChange("newPassword", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <button
                  onClick={handleUpdatePersonal}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
                  disabled={!formData.newPassword || !formData.currentPassword}
                >
                  Update Password
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-medium">••••••••</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSetting;
