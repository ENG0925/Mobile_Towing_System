"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { BookingDeail, columns } from "./columns";
import { getAllBooking } from "@/lib/api/driver";

const DriverAllTask = () => {
  const [data, setData] = useState<BookingDeail[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await getAllBooking(localStorage.getItem("driverID"));
          setData(response.data);
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
      <div className="min-h-screen bg-emerald-50 p-4">
        
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
                filterData="customerName"
                filterName="Filter name..."
              />
            </div>
          </div>
        )}
            
      </div>
    </>
  );
};

export default DriverAllTask;
