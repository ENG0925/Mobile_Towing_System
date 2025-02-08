"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { rating, columns } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import SheetForm from "@/components/common/SheetForm";

const Rating = () => {
  const [data, setData] = useState<rating[]>([]);
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
            id: 1,
            name: "John Doe",
            comment: "Good Service !",
            rating: "5",
            numlike: 10,
          },
          {
            id: 2,
            name: "Jane Doe",
            comment: "Normal Service",
            rating: "3",
            numlike: 5,
          },
          {
            id: 3,
            name: "Jay Chou",
            comment: "What a good service !!",
            rating: "5",
            numlike: 1000,
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
        id: 1,
        name: "John Doe",
        adminLevel: "Admin",
        password: "123456"
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
        console.log("Editing rating:", selectedId, formData);
      } else {
        // Handle add
        // const response = await createAdmin(formData);
        console.log("Adding new rating:", formData);
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
        key={key} // Add key prop here
        open={open}
        setOpen={setOpen}
        title={isEditing ? "Edit Rating" : "Add Rating"}
        description={isEditing ? "Edit rating information" : "Add new rating"}
        fields={[
          {
            id: 1,
            name: "name",
            comment: "comment",
            rating: "rating",
            numlike: "numlike",
          },
          {
            id: 2,
            name: "name",
            comment: "Normal Service",
            rating: "3",
            numlike: 5,
          },
          {
            id: 3,
            name: "Jay Chou",
            comment: "What a good service !!",
            rating: "5",
            numlike: 1000,
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
              filterName="Filter name..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Rating;