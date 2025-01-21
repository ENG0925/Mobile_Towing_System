"use client";
import React from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle type is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  color: z.string().min(1, "Color is required"),
  hasInsurance: z.string().min(1),
  policyHolderName: z.string().optional(),
  policyNumber: z.string().optional(),
  icNumber: z.string().optional(),
  uploadFile: z.any().optional(),
});

const EditVehicle = () => {
  const pathname: any = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleType: "",
      plateNumber: "",
      color: "",
      hasInsurance: "",
      policyHolderName: "",
      policyNumber: "",
      icNumber: "",
      uploadFile: null,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Vehicle</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Vehicle Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vehicle type" {...field} />
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
                    <Input placeholder="Enter plate number" {...field} />
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
                    <Input placeholder="Enter color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasInsurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Have Insurance?</FormLabel>
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

            {form.watch("hasInsurance") === "yes" && (
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
                        <Input placeholder="Enter policy number" {...field} />
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
                        <Input placeholder="Enter IC number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uploadFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Upload File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" className="w-full">
              Add Vehicle
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditVehicle;
