
import { DBConfig } from "@/config/db";
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { newPassword } = await req.json();

    const userID = Number(localStorage.getItem('userID'));

    const connection = await mysql.createConnection(DBConfig);
    await connection.beginTransaction();

    await connection.execute('UPDATE user SET password = ? WHERE id = ?', [newPassword, userID]);

    await connection.commit();
    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Updated password successfully' 
    });
    
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: "Something went wrong",
    });
  }
}