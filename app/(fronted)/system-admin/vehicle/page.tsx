"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { vehicle, columns } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import SheetForm from "@/components/common/SheetForm";
import { addVehicle, deleteVehicle, getAllUserBooking, getAllVehicle, getVehicleInfo, updateVehicle } from "@/lib/api/system_admin";

const Vehicle = () => {
  const [data, setData] = useState<vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [key, setKey] = useState(0);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getAllVehicle();
        setData(response?.data);

        const responseUser = await getAllUserBooking();
        setUserList(responseUser?.data);
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
      const response = await getVehicleInfo(selectedId);
      return response?.data;
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await deleteVehicle(id);
      toast(response?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: response?.success === true ? "success" : "error",
      });
      const response2 = await getAllVehicle();
      setData(response2?.data);
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
        const response = await updateVehicle(selectedId, formData.userID, formData.plateNumber, formData.model, formData.color);
        toast(response?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: response?.success === true ? "success" : "error",
        });
      } else {
        const response = await addVehicle(formData.userID, formData.plateNumber, formData.model, formData.color);
        toast(response?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: response?.success === true ? "success" : "error",
        });
      }
      
      const response = await getAllVehicle();
      setData(response?.data);

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
        title={isEditing ? "Edit Vehicle" : "Add Vehicle"}
        description={isEditing ? "Edit vehicle information" : "Add new vehicle"}
        fields={[
          { 
            label: "Name", 
            type: "select", 
            name: "userID",
            options: userList.length === 0 ? [{ label: "No user found", value: 0 }] : userList.map((user: any) => ({
              label: user.name,
              value: user.id
            }))
          },
          { name: "plateNumber", type: "text", label: "Plate Number" },
          { name: "model", type: "text", label: "Model" },
          { name: "color", type: "text", label: "Color" },
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
              filterName="Filter name..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Vehicle;