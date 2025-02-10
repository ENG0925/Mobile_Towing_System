"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { booking, columns } from "./columns";
import { getAllBookings } from "@/lib/api/management_admin";

const Booking = () => {
  const [data, setData] = useState<booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const responseBooking = await getAllBookings();
        setData(responseBooking?.data);
        
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
              filterName="Filter username..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;