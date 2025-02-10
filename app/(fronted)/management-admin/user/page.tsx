"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { user, columns } from "./columns";
import { getAllUser } from "@/lib/api/management_admin";

const User = () => {
  const [data, setData] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getAllUser();
        setData(response?.data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <span className="ml-2 text-gray-500">Loading...</span>
        </div>
      )}
      
      {!loading && (
        <div>
          <div className="">
            <DataTable
              columns={columns({})}
              data={data}
              filterData="name"
              filterName="Filter name..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default User;