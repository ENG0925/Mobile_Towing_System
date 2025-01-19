"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { testingConnectionDB } from "@/lib/api/seed";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await testingConnectionDB();

        if (response?.data?.success) {
          router.push("/home");
        } else {
          setError(true);
          toast(`${response?.data?.message}`, {
            position: "top-center",
            autoClose: 5000,
            theme: "light",
            type: "error",
          });
        }
      } catch (error) {
        setError(true);
        toast(`${error}`, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex  items-center justify-center h-screen">
          {/* <ReloadIcon className="animate-spin w-12 h-12 text-gray-500" /> */}
          <span className="ml-2 text-gray-500">Loading...</span>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-9xl font-bold text-red-500">404</div>
          <div className="text-5xl font-bold text-gray-800">
            Sorry, page not found 
          </div>
        </div>
      )}
    </div>
  );
}
