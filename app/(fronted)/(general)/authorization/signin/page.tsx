"use client";

// SignInPage.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignInPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSignIn = async (e: React.FormEvent) => {
    console.log(e);

    e.preventDefault();

    // Add authentication logic here
  };

  return (
    <div className="min-h-screen content-center mx-12">
      <div className="text-6xl bold">Sign In</div>

      <form onSubmit={handleSignIn} className="space-y-4 mt-8">
        <Input
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button type="submit" className="w-full">
          Sign In Account
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/register-vehicle")}
        >
          Register Account
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
