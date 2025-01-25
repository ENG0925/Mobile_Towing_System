"use client";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Sample data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    joinDate: "2024-01-15",
  },
  // Add more sample users
];

export default function User() {
  const [users, setUsers] = useState(initialUsers);

  const handleBlockUser = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      )
    );
  };

  return (
    <div className="flex min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-[#1b4b38]">User</h1>
      </div>
    </div>
  );
}
