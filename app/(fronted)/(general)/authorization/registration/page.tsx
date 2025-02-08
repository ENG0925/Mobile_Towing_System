"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUsernameAndEmail, registerAccount } from "@/lib/api/user";
import { promises as fs } from "fs";

const Registration = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // Track current step

  // Vehicle Registration Schema
  const vehicleSchema = z.object({
    vehicleType: z.string().min(3),
    plateNumber: z.string().min(3),
    color: z.string().min(1),
  });

  // Policy Upload Schema
  const policySchema = z
    .object({
      hasPolicy: z.string().min(1),
      policyHolderName: z.string().optional(),
      policyNumber: z.string().optional(),
      icNumber: z.string().optional(),
      uploadFile: z
        .instanceof(File)
        .nullable()
        .optional()
        .refine(
          (file) => {
            if (!file) return true;
            return file.type === "application/pdf";
          },
          {
            message: "Only PDF files are allowed",
          }
        ),
    })
    .superRefine((data, ctx) => {
      if (data.hasPolicy === "yes") {
        if (!data.policyHolderName || data.policyHolderName.length < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Policy holder name is required when you have a policy",
            path: ["policyHolderName"],
          });
        }

        if (!data.policyNumber || data.policyNumber.length < 11) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Policy number is required at least 11 character word or number",
            path: ["policyNumber"],
          });
        }

        if (!data.icNumber || data.icNumber.length < 12) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "IC number is required at least 12 number",
            path: ["icNumber"],
          });
        }

        if (!data.uploadFile) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File upload is required when you have a policy",
            path: ["uploadFile"],
          });
        }
      }
    });

  // Account Registration Schema
  const accountSchema = z
    .object({
      username: z.string().min(3),
      password: z
        .string()
        .min(6)
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be at least 8 characters long and include at least one letter, one number, and one special character (@, $, !, %, *, ?, &)."
        ),
      confirmPassword: z.string().min(6),
      contactNumber: z.string().min(8),
      email: z.string().email(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  // Forms for each step
  const vehicleForm = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vehicleType: "",
      plateNumber: "",
      color: "",
    },
  });

  const policyForm = useForm<z.infer<typeof policySchema>>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      hasPolicy: "",
      policyHolderName: "",
      policyNumber: "",
      icNumber: "",
      uploadFile: undefined,
    },
  });

  const accountForm = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      email: "",
    },
  });

  const handleVehicleSubmit = async (values: z.infer<typeof vehicleSchema>) => {
    setStep(2);
  };

  const handlePolicySubmit = async (values: z.infer<typeof policySchema>) => {
    setStep(3);
  };

  const handleAccountSubmit = async (values: z.infer<typeof accountSchema>) => {
    const finalData = {
      vehicle: vehicleForm.getValues(),
      policy: {
          hasPolicy: policyForm.getValues().hasPolicy === "yes",
          policyHolderName: policyForm.getValues().policyHolderName || "",
          policyNumber: policyForm.getValues().policyNumber || "",
          icNumber: policyForm.getValues().icNumber || "",
      },
      account: values,
      uploadFile: policyForm.getValues().uploadFile || null
    };


    const checkUnit = await checkUsernameAndEmail(finalData.account.username, finalData.account.email);

    if(checkUnit?.success === false) {
      toast(checkUnit?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: checkUnit?.success === true ? "success" : "error",
      });
      return;
    }

    
    const file = policyForm.getValues().uploadFile as any;
    const formData = new FormData();

    if (file) formData.append("pdf", file);
    formData.append("vehicle", JSON.stringify(finalData.vehicle));
    formData.append("account", JSON.stringify(finalData.account));
    formData.append("policy", JSON.stringify(finalData.policy));
      
    const response = await registerAccount(formData);

    toast(response?.message, {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: response?.success === true ? "success" : "error",
    });

    if (response?.success === false) return;  

    router.push("/"); 
    localStorage.setItem("userId", response?.id.toString());
  };

  return (
    <div className="min-h-screen content-center mx-12">
      <div className="text-6xl font-bold mb-6">
        {step === 1 && "Register Vehicle"}
        {step === 2 && "Upload Policy"}
        {step === 3 && "Create Account"}
      </div>

      {step === 1 && (
        <Form {...vehicleForm}>
          <form onSubmit={vehicleForm.handleSubmit(handleVehicleSubmit)}>
            <FormField
              control={vehicleForm.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Vehicle Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Vehicle Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={vehicleForm.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Plate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Plate Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={vehicleForm.control}
              name="color"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-6">
              Next
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...policyForm}>
          <form onSubmit={policyForm.handleSubmit(handlePolicySubmit)}>
            <FormField
              control={policyForm.control}
              name="hasPolicy"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Have Policy?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {policyForm.watch("hasPolicy") === "yes" && (
              <>
                <FormField
                  control={policyForm.control}
                  name="policyHolderName"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="text-lg">
                        Policy Holder Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Policy Holder Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={policyForm.control}
                  name="policyNumber"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="text-lg">Policy Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Policy number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={policyForm.control}
                  name="icNumber"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="text-lg">IC Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="IC Number"
                          {...field}
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={policyForm.control}
                  name="uploadFile"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="text-lg">Upload File</FormLabel>
                      <FormControl>
                        <Input
                          // {...field}
                          type="file"
                          accept=".pdf"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          } // Handle File or null
                          name={field.name}
                          placeholder="Upload File"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full"
              >
                Back
              </Button>
              <Button type="submit" className="w-full">
                Next
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === 3 && (
        <Form {...accountForm}>
          <form onSubmit={accountForm.handleSubmit(handleAccountSubmit)}>
            <FormField
              control={accountForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={accountForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={accountForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={accountForm.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contact Number"
                      {...field}
                      type="text"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={accountForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
                className="w-full"
              >
                Back
              </Button>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Registration;
