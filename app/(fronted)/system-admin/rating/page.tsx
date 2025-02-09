"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { rating, columns } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import SheetForm from "@/components/common/SheetForm";
import { addFeedback, deleteFeedback, getAllFeedback, getAllUserBooking, getFeedbackInfo, updateFeedback } from "@/lib/api/system_admin";

const Rating = () => {
  const [data, setData] = useState<rating[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [key, setKey] = useState(0); // Add this to force re-render of SheetController
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getAllFeedback();
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
      const response = await getFeedbackInfo(selectedId);
      return response?.data;
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteFeedback(id);
      toast(response?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        type: response?.success === true ? "success" : "error",
      });

      const response2 = await getAllFeedback();
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
        const response = await updateFeedback(selectedId, formData.userID, formData.comment, formData.rating);
        toast(response?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: response?.success === true ? "success" : "error",
        });
      } else {
        const response = await addFeedback(formData.userID, formData.comment, formData.rating);
        toast(response?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          type: response?.success === true ? "success" : "error",
        });
      }
      
      const response2 = await getAllFeedback();
      setData(response2?.data);
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
            label: "Name", 
            type: "select", 
            name: "userID",
            options: userList.length === 0 ? [{ label: "No user found", value: 0 }] : userList.map((user: any) => ({
              label: user.name,
              value: user.id
            }))
          },
          { name: "comment", label: "Comment", type: "description" },
          { 
            name: "rating", 
            label: "Rating", 
            type: "select",
            options: [                        
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5", value: 5 },
            ] 
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