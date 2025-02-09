import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryUser] = await connection.execute(`SELECT * FROM user WHERE userID = ? `, [id]);
    
    const user = queryUser as User[];

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get user info successfully',
      data: user[0]
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
