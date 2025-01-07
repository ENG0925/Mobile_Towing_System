"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Mail, Phone, Lock, User } from "lucide-react";

const AccountSetting = () => {
  // Updated initial user data structure
  const [userData, setUserData] = useState({
    name: "Lim Jie Qing",
    email: "limjieqing.123456@gmail.com",
    contact: "+60 12-345 6789",
    password: "123456", // This would come from your backend
  });

  // Updated form states
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    contact: userData.contact,
    currentPassword: "",
    newPassword: "",
  });

  // Edit states
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Update personal info function
  const handleUpdatePersonal = async () => {
    try {
      // Password validation
      if (formData.newPassword) {
        if (formData.currentPassword !== userData.password) {
          alert("Current password is incorrect");
          return;
        }
      }

      // Here you would make an API call to update the database
      // await updatePersonalInfo(formData);

      setUserData((prev) => ({
        ...prev,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        password: formData.newPassword || prev.password,
      }));
      setIsEditingPersonal(false);

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } catch (error) {
      console.error("Failed to update personal info:", error);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {/* Personal Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
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
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
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
                      setFormData((prev) => ({
                        ...prev,
                        contact: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <button
                  onClick={handleUpdatePersonal}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
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
                    <p className="font-medium">{userData.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium">{userData.contact}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
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
                      setFormData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
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
                      setFormData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <button
                  onClick={handleUpdatePersonal}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
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
