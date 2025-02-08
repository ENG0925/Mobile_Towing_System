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
import { login } from "@/lib/api/user";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const router = useRouter();
  const formSchema = z.object({
    inputValue: z.string().min(3),
    password: z.string().min(3),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputValue: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await login(values.inputValue, values.password);
    toast(response?.message, {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      type: response?.success === true ? "success" : "error",
    });

    if (response?.success === true) {
      router.push("/");
      localStorage.setItem("userId", response?.id.toString());
    }
  };

  return (
    <div className="min-h-screen content-center mx-12">
      <div className="text-6xl font-bold">Sign In</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="inputValue"
            render={({ field }) => {
              return (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">
                    Username/ Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username/ EmailAddress"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full mt-6">
            Sign In Account
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full mt-6"
            onClick={() => router.push("/authorization/registration")}
          >
            Register Account
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
