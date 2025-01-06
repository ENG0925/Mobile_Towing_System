"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Mail, Phone, Lock } from "lucide-react";

const AccountSetting = () => {
  // Sample initial user data - would come from your database
  const [userData, setUserData] = useState({
    photo: "/api/placeholder/150/150",
    name: "Lim Jie Qing",
    email: "limjieqing.123456@gmail.com",
    contact: "+60 12-345 6789",
    password: "123456",
  });

  // Edit states
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: userData.name,
    contact: userData.contact,
    password: "",
    newEmail: userData.email,
    otp: "",
  });

  // Update personal info function
  const handleUpdatePersonal = async () => {
    try {
      // Here you would make an API call to update the database
      // await updatePersonalInfo(formData);

      setUserData((prev) => ({
        ...prev,
        name: formData.name,
        contact: formData.contact,
        password: formData.password ? "••••••••" : prev.password,
      }));
      setIsEditingPersonal(false);
    } catch (error) {
      console.error("Failed to update personal info:", error);
    }
  };

  // Update email function with OTP verification
  const handleUpdateEmail = async () => {
    if (!showOTPInput) {
      // First step: Send OTP
      // await sendOTP(formData.newEmail);
      setShowOTPInput(true);
      return;
    }

    try {
      // Verify OTP and update email
      // await verifyOTPAndUpdateEmail(formData.newEmail, formData.otp);
      setUserData((prev) => ({
        ...prev,
        email: formData.newEmail,
      }));
      setIsEditingEmail(false);
      setShowOTPInput(false);
    } catch (error) {
      console.error("Failed to update email:", error);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Photo and Name */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4">
            <img
              src={userData.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>

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
                <div>
                  <label className="text-sm text-gray-500">New Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Leave blank to keep current password"
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
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium">{userData.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Password</p>
                    <p className="font-medium">{userData.password}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Settings Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Email Settings</CardTitle>
            <button
              onClick={() => setIsEditingEmail(!isEditingEmail)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Edit2 className="w-5 h-5 text-gray-500" />
            </button>
          </CardHeader>
          <CardContent>
            {isEditingEmail ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">
                    New Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.newEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newEmail: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                {showOTPInput && (
                  <div>
                    <label className="text-sm text-gray-500">Enter OTP</label>
                    <input
                      type="text"
                      value={formData.otp}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          otp: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded-lg mt-1"
                      placeholder="Enter the OTP sent to your new email"
                    />
                  </div>
                )}
                <button
                  onClick={handleUpdateEmail}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
                >
                  {showOTPInput ? "Verify OTP" : "Send OTP"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{userData.email}</p>
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
