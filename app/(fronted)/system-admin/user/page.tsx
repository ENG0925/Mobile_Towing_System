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
    name: "Jayden Lai",
    email: "jayden@gmail.com",
    status: "active",
    joinDate: "2024-02-6",
  },
  {
    id: 2,
    name: "Jason Tan",
    email: "john@gmail.com",
    status: "active",
    joinDate: "2024-04-11",
  },
  {
    id: 3,
    name: "William Eng",
    email: "Eng@gmail.com",
    status: "active",
    joinDate: "2024-09-25",
  },{
    id: 4,
    name: "Soukmead Ong",
    email: "Song@gmail.com",
    status: "active",
    joinDate: "2024-08-17",
  },
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
