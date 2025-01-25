
import { DBConfig } from "@/config/db";
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface User {
    id: number;
}
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { newPassword, id } = await req.json();

    const buffer = Buffer.from(newPassword);
    const hashedPassword = buffer.toString("base64");

    const connection = await mysql.createConnection(DBConfig);
    await connection.beginTransaction();

    const [queryUser] = await connection.execute('SELECT id FROM user WHERE id = ?', [id]);
    
    const user = queryUser as User[];

    if (user.length === 0) {
        connection.end();
        return NextResponse.json({ 
            success: false, 
            message: "User not found",
        });
    }

    await connection.execute('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, id]);

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