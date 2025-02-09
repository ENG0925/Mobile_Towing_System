"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { systemAdmin, columns } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import SheetForm from "@/components/common/SheetForm";
import { addSystemAdmin, deleteSystemAdmin, getAllSystemAdmin, getSystemAdminInfo, updateSystemAdmin } from "@/lib/api/system_admin";

const SystemAdmin = () => {
  const [data, setData] = useState<systemAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [key, setKey] = useState(0); // Add this to force re-render of SheetController

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getAllSystemAdmin();
        setData(response?.data);
        
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
      const response = await getSystemAdminInfo(selectedId);
      return response?.data;
      
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteSystemAdmin(id);
      toast(response?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: response?.success === true ? "success" : "error",
      });
      
      const responseData = await getAllSystemAdmin();
      setData(responseData?.data);
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
        const response = await updateSystemAdmin(selectedId, formData.name, formData.password);
        toast(response?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: response?.success === true ? "success" : "error",
        });
      } else {
        const response = await addSystemAdmin(formData.name, formData.password);
        toast(response?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: response?.success === true ? "success" : "error",
        });
      }
      
      const responseData = await getAllSystemAdmin();
      setData(responseData?.data);
      
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
        key={key} // Add key prop here
        open={open}
        setOpen={setOpen}
        title={isEditing ? "Edit System Admin" : "Add System Admin"}
        description={isEditing ? "Edit system admin information" : "Add new system admin"}
        fields={[
          { label: "Name", name: "name", type: "text" },
          { label: "Password", name: "password", type: "text" },
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

export default SystemAdmin;