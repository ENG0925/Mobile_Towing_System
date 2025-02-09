"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVehicleInfo } from "@/lib/api/user";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle type is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  color: z.string().min(1, "Color is required"),
  hasInsurance: z.boolean(),
  policyHolderName: z.string().optional(),
  policyNumber: z.string().optional(),
  icNumber: z.string().optional(),
  uploadFile: z.any().optional(),
});

const EditVehicle = () => {
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<String>("");
  const router = useRouter();
  const pathname: any = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleType: "",
      plateNumber: "",
      color: "",
      hasInsurance: false,
      policyHolderName: "",
      policyNumber: "",
      icNumber: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getVehicleInfo(Number(id));
        const data = response.data;

        // Reset form values after fetching data
        form.reset({
          vehicleType: data.vehicleType || "",
          plateNumber: data.plateNumber || "",
          color: data.color || "",
          hasInsurance: data.hasInsurance ?? false,
          policyHolderName: data.policyHolderName || "",
          policyNumber: data.policyNumber || "",
          icNumber: data.icNumber || "",
        });
        setFile(data.file);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]); // Depend on `form` so it has access to reset()


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading vehicle data...</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Vehicle Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Vehicle Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter vehicle type"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Plate Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter plate number"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter color" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("hasInsurance") && (
              <>
                <FormField
                  control={form.control}
                  name="policyHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Policy Holder Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter policy holder name"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="policyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Policy Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter policy number"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">IC Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter IC number"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button">
                  <a href={`/policyFile/${file}`} target="_blank" rel="noopener noreferrer">
                    Open Policy File
                  </a>
                </Button>
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditVehicle;
