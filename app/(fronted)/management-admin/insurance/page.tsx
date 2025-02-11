"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { Insurance, columns } from "./columns";
import { getInsuranceInfo } from "@/lib/api/management_admin";

const InsurancePage = () => {
  const [data, setData] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getInsuranceInfo();
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
              filterData="policyNo"
              filterName="Filter policy number..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InsurancePage;