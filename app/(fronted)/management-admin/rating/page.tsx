"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { rating, columns } from "./columns";
import { getAllRating } from "@/lib/api/management_admin";
const Rating = () => {
  const [data, setData] = useState<rating[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getAllRating();
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

export default Rating;