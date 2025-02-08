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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

// Form schemas
const personalFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(8, "Contact number must be at least 8 digits"),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include at least one letter, one number, and one special character (@, $, !, %, *, ?, &)."
    ),
});

const AccountSetting = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Personal information form
  const personalForm = useForm<z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      username: "",
      email: "",
      contact: "",
    },
  });

  // Password form
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await getAccountDetail(Number(id));
        setUserData(response.data);

        // Set form default values
        personalForm.reset({
          username: response.data.name,
          email: response.data.email,
          contact: response.data.phoneNumber,
        });
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdatePersonal = async (
    values: z.infer<typeof personalFormSchema>
  ) => {
    try {
      const userID = localStorage.getItem("userId");
      const responseProfile = await updateProfile(
        values.username,
        values.email,
        Number(values.contact),
        Number(userID)
      );

      toast(responseProfile?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: responseProfile?.success === true ? "success" : "error",
      });

      if (responseProfile?.success) {
        setUserData((prev) => ({
          ...prev!,
          name: values.username,
          email: values.email,
          phoneNumber: values.contact,
        }));
        setIsEditingPersonal(false);
      }
    } catch (error) {
      console.error("Failed to update personal information:", error);
    }
  };

  const handleUpdatePassword = async (
    values: z.infer<typeof passwordFormSchema>
  ) => {
    try {
      const userID = localStorage.getItem("userId");

      if (values.currentPassword !== userData?.password) {
        toast("Current password wrong", {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: "error",
        });
        return;
      }

      const responsePassword = await updatePassword(
        values.newPassword,
        Number(userID)
      );

      toast(responsePassword?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: responsePassword?.success === true ? "success" : "error",
      });

      if (responsePassword?.success) {
        setUserData((prev) => ({
          ...prev!,
          password: values.newPassword,
        }));
        setIsEditingPassword(false);
        passwordForm.reset();
      }
    } catch (error) {
      console.error("Failed to update password:", error);
    }
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
              <Form {...personalForm}>
                <form
                  onSubmit={personalForm.handleSubmit(handleUpdatePersonal)}
                  className="space-y-4"
                >
                  <FormField
                    control={personalForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalForm.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!personalForm.formState.isDirty}
                  >
                    Save Changes
                  </Button>
                </form>
              </Form>
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
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handleUpdatePassword)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!passwordForm.formState.isDirty}
                  >
                    Update Password
                  </Button>
                </form>
              </Form>
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
