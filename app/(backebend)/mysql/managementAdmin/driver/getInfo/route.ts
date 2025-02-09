import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Driver {
  id: number;
  name: string;
  phoneNumber: number;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryDriver] = await connection.execute(`SELECT * FROM driver WHERE userID = ? `, [id]);
    
    const user = queryDriver as Driver[];

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get driver info successfully',
      data: driver[0]
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
