import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Booking {
  id: number;
  name: string;
  department:string;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryBooking] = await connection.execute(`SELECT * FROM booking WHERE userID = ? `, [id]);
    
    const user = queryBooking as Booking[];

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get booking info successfully',
      data: booking[0]
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
