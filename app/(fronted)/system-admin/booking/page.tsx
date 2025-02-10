"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { booking, columns } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import SheetForm from "@/components/common/SheetForm";
import {
  addBooking,
  getAllBooking,
  getAllDriverBooking,
  getAllUserBooking,
  getAllVehicleBooking,
  getBookingInfo,
  updateBooking,
} from "@/lib/api/system_admin";

const Booking = () => {
  const [data, setData] = useState<booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [key, setKey] = useState(0);
  const [userList, setUserList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const responseBooking = await getAllBooking();
        setData(responseBooking?.data);

        const responseUser = await getAllUserBooking();
        setUserList(responseUser?.data);

        const responseVehicle = await getAllVehicleBooking();
        setVehicleList(responseVehicle?.data);

        const responseDriver = await getAllDriverBooking();
        setDriverList(responseDriver?.data);
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
      const response = await getBookingInfo(selectedId);
      return response?.data;
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
    setKey((prevKey) => prevKey + 1); // Increment key to force re-render
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedId(null);
    setIsEditing(false);
    setKey((prevKey) => prevKey + 1); // Increment key to force re-render
    setOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (isEditing) {
        const data = { ...formData, bookingNo: selectedId };
        const response = await updateBooking(data);
        toast(response?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: response?.success === true ? "success" : "error",
        });
      } else {
        const response = await addBooking(formData);
        toast(response?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: response?.success === true ? "success" : "error",
        });
      }

      const responseBooking = await getAllBooking();
      setData(responseBooking?.data);
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
          {
            label: "Name",
            type: "select",
            name: "userID",
            options:
              userList.length === 0
                ? [{ label: "No user found", value: 0 }]
                : userList.map((user: any) => ({
                    label: user.name,
                    value: user.id,
                  })),
          },
          {
            label: "Vehicle",
            type: "select",
            name: "vehicleID",
            options:
              vehicleList.length === 0
                ? [{ label: "No vehicle found", value: 0 }]
                : vehicleList.map((vehicle: any) => ({
                    label: `${vehicle.model}, ${vehicle.plateNumber}`,
                    value: vehicle.id,
                  })),
          },
          {
            label: "Driver",
            type: "select",
            name: "driverID",
            options:
              driverList.length === 0
                ? [{ label: "No driver found", value: 0 }]
                : driverList.map((driver: any) => ({
                    label: driver.name,
                    value: driver.id,
                  })),
          },
          { label: "Booking Date", type: "date", name: "bookingDate" },
          {
            label: "Service Location",
            type: "description",
            name: "serviceLocation",
          },
          {
            label: "Towing Location",
            type: "description",
            name: "towingLocation",
          },
          { label: "Distance", type: "number", name: "distance" },
          { label: "Estimate Cost", type: "number", name: "estimatedCost" },
          {
            label: "Status",
            type: "select",
            name: "status",
            options: [
              { label: "Complete", value: "complete" },
              { label: "Unpaid", value: "unpaid" },
              { label: "In Progress", value: "in-progress" },
              { label: "Pending", value: "pending" },
              { label: "Cancel", value: "cancel" },
            ],
          },
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
