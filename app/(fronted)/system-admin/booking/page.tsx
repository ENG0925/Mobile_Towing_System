"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { booking, columns } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import SheetForm from "@/components/common/SheetForm";

const Booking = () => {
  const [data, setData] = useState<booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [key, setKey] = useState(0); // Add this to force re-render of SheetController

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // const response = await getAllAdmin();
        // setData(response?.data.data);
        const response = [
          {
            bookingNo: 1,
            name: "John Doe",
            vehicle: "Car",
            bookingDate: "2022-01-01",
            serviceLocation: "Location 1",
            towingLocation: "Location 2",
            distance: 100,
            status: "payment",
            estimateCost: 100,
            isWaive: false
          },
          {
            bookingNo: 2,
            name: "Jane Doe",
            vehicle: "Car",
            bookingDate: "2022-01-01",
            serviceLocation: "Location 1",
            towingLocation: "Location 2",
            distance: 100,
            status: "payment",
            estimateCost: 100,
            isWaive: false
          },
          {
            bookingNo: 3,
            name: "Jay Chou",
            vehicle: "Car",
            bookingDate: "2022-01-01",
            serviceLocation: "Location 1",
            towingLocation: "Location 2",
            distance: 100,
            status: "booking complete",
            estimateCost: 100,
            isWaive: false
          },
          {
            bookingNo: 4,
            name: "Jackie Chan",
            vehicle: "Car",
            bookingDate: "2022-01-01",
            serviceLocation: "Location 1",
            towingLocation: "Location 2",
            distance: 100,
            status: "in progress",
            estimateCost: 100,
            isWaive: false
          },
          {
            bookingNo: 5,
            name: "Jet Li",
            vehicle: "Car",
            bookingDate: "2022-01-01",
            serviceLocation: "Location 1",
            towingLocation: "Location 2",
            distance: 100,
            status: "cancel",
            estimateCost: 100,
            isWaive: true
          },
        ];
        setData(response);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchAdminData = async () => {
    if (!selectedId) return null;
    try {
      // const response = await getAdmin(selectedId);
      // return response?.data.data;
      return {
        bookingNo: 1,
        name: "John Doe",
        vehicle: "Car",
        bookingDate: "2022-01-01",
        serviceLocation: "Location 1",
        towingLocation: "Location 2",
        distance: 100,
        status: "payment",
        estimateCost: 100,
        isWaive: false
      };
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log("Delete ID: ", id);
      
      // const response = await deleteAdmin(id);
      // if (response?.data.success === true) {
      //   const responseData = await getAllAdmin();
      //   setData(responseData?.data.data);
      // }
      // toast(response?.data.message, {
      //   position: "top-center",
      //   autoClose: 5000,
      //   theme: "light",
      //   type: response?.data.success === true ? "success" : "error",
      // });
    } catch (error) {
      toast(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: "error",
      });
    }
  };

  const handlePassEdit = (id: number) => {
    setSelectedId(id);
    setIsEditing(true);
    setKey(prevKey => prevKey + 1); // Increment key to force re-render
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedId(null);
    setIsEditing(false);
    setKey(prevKey => prevKey + 1); // Increment key to force re-render
    setOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (isEditing) {
        // Handle edit
        // const response = await updateAdmin(selectedId, formData);
        console.log("Editing admin:", selectedId, formData);
      } else {
        // Handle add
        // const response = await createAdmin(formData);
        console.log("Adding new admin:", formData);
      }
      
      // Refresh the table data
      // const refreshedData = await getAllAdmin();
      // setData(refreshedData?.data.data);
      
      toast("Operation successful!", {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: "success",
      });
    } catch (error) {
      toast(`Error: ${error}`, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: "error",
      });
    }
  };

  return (
    <>
      <SheetForm
        key={key} 
        open={open}
        setOpen={setOpen}
        title={isEditing ? "Edit Booking Detail" : "Add Booking"}
        description={isEditing ? "Edit booking detail" : "Add new booking"}
        fields={[
          { label: "Name", type: "text", name: "name" },
          { label: "Vehicle Model", type: "text", name: "vehicle" },
          { label: "Booking Date", type: "date", name: "bookingDate" },
          { label: "Service Location", type: "description", name: "serviceLocation" },
          { label: "Towing Location", type: "description", name: "towingLocation" },
          { label: "Distance", type: "number", name: "distance" },
          { label: "Estimate Cost", type: "number", name: "estimateCost" },
          { 
            label: "Status", 
            type: "select", 
            name: "status",
            options: [                        
              { label: "Payment", value: "payment" },                                                                                                                                                
              { label: "Complete", value: "booking complete" },
              { label: "In Progress", value: "in progress" },
              { label: "Cancel", value: "cancel" }
            ] 
          },
          { 
            label: "Waive", 
            type: "select", 
            name: "isWaive",
            options: [                        
              { label: "Waive", value: true },                                                                                                                                                
              { label: "No Waive", value: false },
            ] 
          }
        ]}
        onSubmit={handleSubmit}
        fetchData={isEditing ? fetchAdminData : undefined}
        isLoading={loading}
      />
      
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <span className="ml-2 text-gray-500">Loading...</span>
        </div>
      )}
      
      {!loading && (
        <div>
          <div className="">
            <Button onClick={handleAdd}>+ Add</Button>
            
            <DataTable
              columns={columns({
                handlePassEdit,
                handleDelete,
              })}
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